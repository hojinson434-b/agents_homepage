// Agent.js — 개별 에이전트 클래스
// 각 팀원(디자인, 프론트, Firebase 등)의 기본 단위

import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()

export default class Agent {
  constructor({ name, model = 'sonnet', role, owns = [], dependsOn = [], requiresApproval = [] }) {
    this.name = name
    this.model = this._resolveModel(model)
    this.role = role
    this.owns = owns               // 파일 소유권 목록
    this.dependsOn = dependsOn     // 의존하는 에이전트 이름 목록
    this.requiresApproval = requiresApproval  // 사용자 승인 필요한 작업 목록
    this.conversationHistory = []   // 대화 기록 (독립된 컨텍스트)
    this.status = 'idle'           // idle | working | done | error
  }

  // 모델 이름을 실제 모델 ID로 변환
  _resolveModel(model) {
    const modelMap = {
      opus: 'claude-opus-4-6',
      sonnet: 'claude-sonnet-4-5-20250929',
      haiku: 'claude-haiku-4-5-20251001',
    }
    return modelMap[model] || model
  }

  // 시스템 프롬프트 생성 — 에이전트의 역할과 규칙을 정의
  _buildSystemPrompt(projectContext) {
    return `당신은 "${this.name}" 에이전트입니다.

## 역할
${this.role}

## 파일 소유권
당신이 수정할 수 있는 파일:
${this.owns.map(f => `- ${f}`).join('\n')}

⚠️ 위 목록에 없는 파일은 절대 수정하지 마세요.

## 프로젝트 정보
${projectContext || '프로젝트 정보가 아직 제공되지 않았습니다.'}

## 작업 규칙
1. 한국어로 주석과 설명을 작성하세요.
2. 소유권 밖의 파일을 수정하려면 해당 에이전트에게 메시지를 보내세요.
3. 작업 완료 시 결과를 명확히 보고하세요.
4. 에러 발생 시 즉시 보고하세요.`
  }

  // 에이전트에게 작업 지시
  async run(task, projectContext = '', tools = []) {
    this.status = 'working'

    // 대화 기록에 새 작업 추가
    this.conversationHistory.push({
      role: 'user',
      content: task,
    })

    try {
      const params = {
        model: this.model,
        max_tokens: 8192,
        system: this._buildSystemPrompt(projectContext),
        messages: this.conversationHistory,
      }

      // 도구가 있으면 추가
      if (tools.length > 0) {
        params.tools = tools
      }

      const response = await client.messages.create(params)

      // 응답을 대화 기록에 추가 (컨텍스트 유지)
      const assistantContent = response.content
        .filter(block => block.type === 'text')
        .map(block => block.text)
        .join('\n')

      this.conversationHistory.push({
        role: 'assistant',
        content: assistantContent,
      })

      this.status = 'done'

      return {
        agent: this.name,
        status: 'success',
        result: assistantContent,
        toolUse: response.content.filter(block => block.type === 'tool_use'),
        stopReason: response.stop_reason,
      }
    } catch (error) {
      this.status = 'error'
      return {
        agent: this.name,
        status: 'error',
        error: error.message,
      }
    }
  }

  // 다른 에이전트에게 메시지 보내기 (Messenger를 통해)
  sendMessage(toAgent, message) {
    return {
      from: this.name,
      to: toAgent,
      message,
      timestamp: new Date().toISOString(),
    }
  }

  // 승인이 필요한 작업인지 확인
  needsApproval(taskDescription) {
    return this.requiresApproval.some(keyword =>
      taskDescription.includes(keyword)
    )
  }

  // 대화 기록 초기화 (새 작업 시작 시)
  resetContext() {
    this.conversationHistory = []
    this.status = 'idle'
  }
}
