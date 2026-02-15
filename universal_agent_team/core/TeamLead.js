// TeamLead.js — 팀 리드 에이전트
// 플랜 모드 전용 — 직접 코드를 작성하지 않고 조율만 담당

import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

export default class TeamLead {
  constructor({ model = 'opus' }) {
    this.model = this._resolveModel(model)
    this.conversationHistory = []
  }

  _resolveModel(model) {
    const modelMap = {
      opus: 'claude-opus-4-6',
      sonnet: 'claude-sonnet-4-5-20250929',
      haiku: 'claude-haiku-4-5-20251001',
    }
    return modelMap[model] || model
  }

  // 팀 리드의 시스템 프롬프트 — 조율에 집중
  _buildSystemPrompt(teamInfo, projectContext) {
    const memberList = teamInfo.members
      .map(m => `- ${m.name}: ${m.role} (소유 파일: ${m.owns.join(', ')})`)
      .join('\n')

    return `당신은 에이전트 팀의 "팀 리드"입니다.

## 핵심 규칙
⚠️ 당신은 절대 직접 코드를 작성하지 않습니다.
⚠️ 오직 작업 분석, 분배, 조율만 합니다.

## 팀원 목록
${memberList}

## 프로젝트 정보
${projectContext}

## 당신의 역할
1. 사용자의 요청을 분석합니다.
2. 작업을 분해하여 적절한 팀원에게 배정합니다.
3. 작업 간 의존성을 파악합니다 (병렬 가능 vs 순차 필요).
4. 위험한 작업(인증, 보안 등)은 사용자 승인을 요청합니다.

## 응답 형식
반드시 아래 JSON 형식으로 응답하세요:
{
  "analysis": "요청 분석 내용",
  "tasks": [
    {
      "id": 1,
      "assignee": "에이전트 이름",
      "task": "구체적인 작업 지시",
      "dependsOn": [],
      "requiresApproval": false,
      "priority": "high|medium|low"
    }
  ],
  "parallelGroups": [
    { "group": 1, "taskIds": [1, 2], "description": "동시 실행 가능" },
    { "group": 2, "taskIds": [3, 4], "description": "그룹1 완료 후 실행" }
  ]
}`
  }

  // 사용자 요청을 분석하고 작업 계획 생성
  async planTasks(userRequest, teamInfo, projectContext = '') {
    this.conversationHistory.push({
      role: 'user',
      content: `다음 요청을 분석하고 팀원들에게 작업을 분배해주세요:\n\n"${userRequest}"`,
    })

    try {
      const response = await client.messages.create({
        model: this.model,
        max_tokens: 4096,
        system: this._buildSystemPrompt(teamInfo, projectContext),
        messages: this.conversationHistory,
      })

      const resultText = response.content
        .filter(block => block.type === 'text')
        .map(block => block.text)
        .join('\n')

      this.conversationHistory.push({
        role: 'assistant',
        content: resultText,
      })

      // JSON 파싱 시도
      const jsonMatch = resultText.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0])
      }

      return { raw: resultText }
    } catch (error) {
      return { error: error.message }
    }
  }

  // 팀원 결과를 종합하여 최종 보고 생성
  async summarizeResults(results) {
    const summary = results
      .map(r => `[${r.agent}] 상태: ${r.status}\n결과: ${r.result || r.error}`)
      .join('\n\n---\n\n')

    this.conversationHistory.push({
      role: 'user',
      content: `팀원들의 작업 결과를 종합해서 보고해주세요:\n\n${summary}`,
    })

    try {
      const response = await client.messages.create({
        model: this.model,
        max_tokens: 4096,
        system: '당신은 팀 리드입니다. 팀원들의 결과를 종합하여 사용자에게 보고합니다. 한국어로 작성하세요.',
        messages: this.conversationHistory,
      })

      return response.content
        .filter(block => block.type === 'text')
        .map(block => block.text)
        .join('\n')
    } catch (error) {
      return `보고서 생성 실패: ${error.message}`
    }
  }

  resetContext() {
    this.conversationHistory = []
  }
}
