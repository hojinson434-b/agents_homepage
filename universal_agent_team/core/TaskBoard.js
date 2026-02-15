// TaskBoard.js — 공유 작업 목록
// 모든 에이전트가 볼 수 있는 중앙 작업 관리 보드

export default class TaskBoard {
  constructor() {
    this.tasks = []
    this.nextId = 1
  }

  // 작업 추가
  addTask({ assignee, task, dependsOn = [], requiresApproval = false, priority = 'medium' }) {
    const newTask = {
      id: this.nextId++,
      assignee,
      task,
      dependsOn,
      requiresApproval,
      priority,
      status: 'pending',    // pending | blocked | in_progress | done | error
      result: null,
      createdAt: new Date().toISOString(),
      completedAt: null,
    }

    // 의존성이 있으면 blocked 상태로 시작
    if (dependsOn.length > 0) {
      newTask.status = 'blocked'
    }

    this.tasks.push(newTask)
    return newTask
  }

  // 팀 리드의 계획을 일괄 등록
  addTasksFromPlan(plan) {
    if (!plan.tasks) return []

    const added = []
    for (const t of plan.tasks) {
      added.push(this.addTask({
        assignee: t.assignee,
        task: t.task,
        dependsOn: t.dependsOn || [],
        requiresApproval: t.requiresApproval || false,
        priority: t.priority || 'medium',
      }))
    }
    return added
  }

  // 실행 가능한 작업 목록 반환 (의존성 해결된 것만)
  getReadyTasks() {
    return this.tasks.filter(t => {
      if (t.status !== 'pending') return false

      // 의존하는 작업이 모두 완료되었는지 확인
      const allDepsResolved = t.dependsOn.every(depId => {
        const depTask = this.tasks.find(dt => dt.id === depId)
        return depTask && depTask.status === 'done'
      })

      return allDepsResolved
    })
  }

  // 차단 해제 — 의존성이 해결된 blocked 작업을 pending으로 변경
  unblockTasks() {
    let unblocked = 0

    this.tasks.forEach(t => {
      if (t.status !== 'blocked') return

      const allDepsResolved = t.dependsOn.every(depId => {
        const depTask = this.tasks.find(dt => dt.id === depId)
        return depTask && depTask.status === 'done'
      })

      if (allDepsResolved) {
        t.status = 'pending'
        unblocked++
      }
    })

    return unblocked
  }

  // 작업 상태 업데이트
  updateTask(taskId, status, result = null) {
    const task = this.tasks.find(t => t.id === taskId)
    if (!task) return null

    task.status = status
    task.result = result

    if (status === 'done' || status === 'error') {
      task.completedAt = new Date().toISOString()
    }

    // 완료되면 차단된 작업들 해제 시도
    if (status === 'done') {
      this.unblockTasks()
    }

    return task
  }

  // 특정 에이전트의 작업 목록
  getTasksFor(agentName) {
    return this.tasks.filter(t => t.assignee === agentName)
  }

  // 승인 필요한 작업 목록
  getApprovalRequired() {
    return this.tasks.filter(t => t.requiresApproval && t.status === 'pending')
  }

  // 전체 진행률
  getProgress() {
    const total = this.tasks.length
    if (total === 0) return { total: 0, done: 0, percent: 0 }

    const done = this.tasks.filter(t => t.status === 'done').length
    const inProgress = this.tasks.filter(t => t.status === 'in_progress').length
    const errors = this.tasks.filter(t => t.status === 'error').length

    return {
      total,
      done,
      inProgress,
      errors,
      pending: total - done - inProgress - errors,
      percent: Math.round((done / total) * 100),
    }
  }

  // 현재 보드 상태를 문자열로 출력
  toString() {
    const statusIcons = {
      pending: '⏳',
      blocked: '🔒',
      in_progress: '🔄',
      done: '✅',
      error: '❌',
    }

    const lines = this.tasks.map(t =>
      `${statusIcons[t.status]} [${t.id}] ${t.assignee} — ${t.task} (${t.status})`
    )

    const progress = this.getProgress()
    lines.push(`\n진행률: ${progress.done}/${progress.total} (${progress.percent}%)`)

    return lines.join('\n')
  }

  // 보드 초기화
  reset() {
    this.tasks = []
    this.nextId = 1
  }
}
