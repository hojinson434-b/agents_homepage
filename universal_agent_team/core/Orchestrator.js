// Orchestrator.js — 에이전트 팀 조율 엔진
// 팀 리드의 계획을 받아 에이전트들을 병렬/순차 실행하는 핵심 엔진

import Agent from './Agent.js'
import TeamLead from './TeamLead.js'
import TaskBoard from './TaskBoard.js'
import Messenger from './Messenger.js'
import Logger from './Logger.js'

export default class Orchestrator {
  constructor(config) {
    this.config = config
    this.logger = new Logger(config.project?.name || '프로젝트')
    this.taskBoard = new TaskBoard()
    this.messenger = new Messenger()

    // 팀 리드 초기화
    this.teamLead = new TeamLead({
      model: config.team.lead.model,
    })

    // 팀원 에이전트 초기화
    this.agents = {}
    for (const memberConfig of config.team.members) {
      const agent = new Agent(memberConfig)
      this.agents[memberConfig.name] = agent
      this.messenger.registerAgent(memberConfig.name)
    }

    // 팀 리드와 사용자 채널 등록
    this.messenger.registerAgent('팀 리드')
    this.messenger.registerAgent('user')

    this.logger.info(`팀 구성 완료: 팀 리드 + ${Object.keys(this.agents).length}명`)
  }

  // 프로젝트 컨텍스트 문자열 생성
  _buildProjectContext() {
    const p = this.config.project
    return `프로젝트: ${p.name}
경로: ${p.path || '미정'}
기술 스택: ${(p.techStack || []).join(', ')}`
  }

  // 팀 정보 객체 생성 (팀 리드에게 전달)
  _buildTeamInfo() {
    return {
      members: this.config.team.members.map(m => ({
        name: m.name,
        role: m.role,
        owns: m.owns || [],
      })),
    }
  }

  // 메인 실행 — 사용자 요청을 받아 팀을 운영
  async run(userRequest) {
    this.logger.section('새 작업 시작')
    this.logger.info(`요청: "${userRequest}"`)

    // 1단계: 팀 리드가 작업 분석 및 분배
    this.logger.section('1단계: 팀 리드 작업 분석')
    const plan = await this.teamLead.planTasks(
      userRequest,
      this._buildTeamInfo(),
      this._buildProjectContext()
    )

    if (plan.error) {
      this.logger.error(`팀 리드 분석 실패: ${plan.error}`)
      return { success: false, error: plan.error }
    }

    this.logger.info(`분석 완료: ${plan.analysis || ''}`)

    // 2단계: 작업 보드에 등록
    this.logger.section('2단계: 작업 보드 등록')
    const tasks = this.taskBoard.addTasksFromPlan(plan)
    this.logger.info(`${tasks.length}개 작업 등록됨`)
    this.logger.info(this.taskBoard.toString())

    // 3단계: 승인 필요한 작업 확인
    const approvalNeeded = this.taskBoard.getApprovalRequired()
    if (approvalNeeded.length > 0) {
      this.logger.warn('승인 필요한 작업:')
      approvalNeeded.forEach(t => {
        this.logger.warn(`  - [${t.id}] ${t.assignee}: ${t.task}`)
        this.messenger.requestApproval(t.assignee, t.task)
      })
      // 실제로는 여기서 사용자 입력을 기다려야 함
    }

    // 4단계: 병렬 그룹별 실행
    this.logger.section('3단계: 작업 실행')
    const allResults = []

    if (plan.parallelGroups) {
      // 그룹 단위로 순차 실행 (그룹 내부는 병렬)
      for (const group of plan.parallelGroups) {
        this.logger.info(`그룹 ${group.group} 실행: ${group.description}`)

        const groupTasks = group.taskIds
          .map(id => this.taskBoard.tasks.find(t => t.id === id))
          .filter(Boolean)

        const results = await this._executeParallel(groupTasks)
        allResults.push(...results)

        this.logger.info(`그룹 ${group.group} 완료`)
        this.logger.info(this.taskBoard.toString())
      }
    } else {
      // parallelGroups가 없으면 준비된 작업부터 순차 실행
      let readyTasks = this.taskBoard.getReadyTasks()

      while (readyTasks.length > 0) {
        const results = await this._executeParallel(readyTasks)
        allResults.push(...results)
        readyTasks = this.taskBoard.getReadyTasks()
      }
    }

    // 5단계: 결과 종합
    this.logger.section('4단계: 결과 종합')
    const summary = await this.teamLead.summarizeResults(allResults)
    this.logger.info(summary)

    const progress = this.taskBoard.getProgress()
    this.logger.section('최종 결과')
    this.logger.info(`완료: ${progress.done}/${progress.total} (${progress.percent}%)`)
    if (progress.errors > 0) {
      this.logger.error(`에러: ${progress.errors}개`)
    }

    return {
      success: progress.errors === 0,
      summary,
      progress,
      results: allResults,
      messageLog: this.messenger.getLog(),
    }
  }

  // 여러 작업을 병렬로 실행
  async _executeParallel(tasks) {
    const promises = tasks.map(task => this._executeTask(task))
    return Promise.all(promises)
  }

  // 개별 작업 실행
  async _executeTask(task) {
    const agent = this.agents[task.assignee]

    if (!agent) {
      this.logger.error(`에이전트 "${task.assignee}"를 찾을 수 없습니다`)
      this.taskBoard.updateTask(task.id, 'error', '에이전트 없음')
      return { agent: task.assignee, status: 'error', error: '에이전트 없음' }
    }

    // 승인 필요 여부 확인
    if (agent.needsApproval(task.task)) {
      this.logger.warn(`⚠️ "${task.assignee}" 에이전트의 작업이 승인을 기다리고 있습니다`)
      this.logger.warn(`   작업: ${task.task}`)
      // 실제로는 승인 대기 로직 필요
    }

    // 안 읽은 메시지가 있으면 에이전트에게 전달
    const unread = this.messenger.getUnread(task.assignee)
    let taskWithContext = task.task
    if (unread.length > 0) {
      const msgContext = unread
        .map(m => `[${m.from}에게서 온 메시지]: ${m.content}`)
        .join('\n')
      taskWithContext = `${task.task}\n\n--- 다른 에이전트의 메시지 ---\n${msgContext}`
    }

    this.taskBoard.updateTask(task.id, 'in_progress')
    this.logger.info(`▶ ${task.assignee}: ${task.task}`)

    const result = await agent.run(
      taskWithContext,
      this._buildProjectContext(),
      this.config.tools || []
    )

    if (result.status === 'success') {
      this.taskBoard.updateTask(task.id, 'done', result.result)
      this.logger.info(`✓ ${task.assignee} 완료`)
    } else {
      this.taskBoard.updateTask(task.id, 'error', result.error)
      this.logger.error(`✗ ${task.assignee} 실패: ${result.error}`)
    }

    return result
  }

  // 단일 에이전트 모드 — 팀이 필요 없는 간단한 작업용 (팁 6번)
  async runSolo(agentName, task) {
    const agent = this.agents[agentName]
    if (!agent) {
      return { status: 'error', error: `에이전트 "${agentName}"를 찾을 수 없습니다` }
    }

    this.logger.info(`단독 모드: ${agentName} — ${task}`)
    return agent.run(task, this._buildProjectContext())
  }

  // 상태 확인
  getStatus() {
    return {
      project: this.config.project?.name,
      progress: this.taskBoard.getProgress(),
      board: this.taskBoard.toString(),
      agents: Object.entries(this.agents).map(([name, agent]) => ({
        name,
        status: agent.status,
      })),
    }
  }

  // 전체 초기화
  reset() {
    this.taskBoard.reset()
    this.messenger.reset()
    this.teamLead.resetContext()
    Object.values(this.agents).forEach(a => a.resetContext())
    this.logger.info('전체 초기화 완료')
  }
}
