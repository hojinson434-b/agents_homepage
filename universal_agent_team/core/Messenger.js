// Messenger.js — 에이전트 간 통신 시스템
// 에이전트끼리 메시지를 주고받고, 토론하고, 피드백을 교환

export default class Messenger {
  constructor() {
    this.messages = []    // 전체 메시지 기록
    this.channels = {}    // 에이전트별 수신함
  }

  // 에이전트 채널 등록
  registerAgent(agentName) {
    if (!this.channels[agentName]) {
      this.channels[agentName] = []
    }
  }

  // 1:1 메시지 전송
  send(from, to, content, type = 'message') {
    const msg = {
      id: this.messages.length + 1,
      from,
      to,
      content,
      type,         // message | request | feedback | approval
      timestamp: new Date().toISOString(),
      read: false,
    }

    this.messages.push(msg)

    // 수신자 채널에 추가
    if (this.channels[to]) {
      this.channels[to].push(msg)
    }

    return msg
  }

  // 전체 브로드캐스트 (팀 리드 → 모든 팀원)
  broadcast(from, content, type = 'message') {
    const sent = []

    for (const agentName of Object.keys(this.channels)) {
      if (agentName !== from) {
        sent.push(this.send(from, agentName, content, type))
      }
    }

    return sent
  }

  // 특정 에이전트의 안 읽은 메시지 가져오기
  getUnread(agentName) {
    if (!this.channels[agentName]) return []

    const unread = this.channels[agentName].filter(m => !m.read)
    // 읽음 처리
    unread.forEach(m => { m.read = true })

    return unread
  }

  // 특정 에이전트의 전체 메시지 가져오기
  getMessages(agentName) {
    return this.channels[agentName] || []
  }

  // 두 에이전트 간 대화 기록
  getConversation(agent1, agent2) {
    return this.messages.filter(m =>
      (m.from === agent1 && m.to === agent2) ||
      (m.from === agent2 && m.to === agent1)
    )
  }

  // 피드백 전송 (QA → 다른 에이전트)
  sendFeedback(from, to, content) {
    return this.send(from, to, content, 'feedback')
  }

  // 승인 요청 (에이전트 → 사용자)
  requestApproval(from, content) {
    return this.send(from, 'user', content, 'approval')
  }

  // 전체 메시지 로그 출력
  getLog() {
    return this.messages.map(m =>
      `[${m.timestamp}] ${m.from} → ${m.to} (${m.type}): ${m.content}`
    ).join('\n')
  }

  // 초기화
  reset() {
    this.messages = []
    this.channels = {}
  }
}
