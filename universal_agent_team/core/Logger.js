// Logger.js — 작업 로그 기록
// 팀 전체의 작업 흐름을 시각적으로 추적

export default class Logger {
  constructor(projectName = '프로젝트') {
    this.projectName = projectName
    this.logs = []
    this.startTime = Date.now()
  }

  _timestamp() {
    const elapsed = ((Date.now() - this.startTime) / 1000).toFixed(1)
    return `[${elapsed}s]`
  }

  _log(level, message) {
    const entry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      elapsed: Date.now() - this.startTime,
    }
    this.logs.push(entry)

    const prefix = {
      info: '  ℹ',
      warn: '  ⚠',
      error: '  ✗',
      success: '  ✓',
    }

    console.log(`${this._timestamp()} ${prefix[level] || ' '} ${message}`)
  }

  info(message) { this._log('info', message) }
  warn(message) { this._log('warn', message) }
  error(message) { this._log('error', message) }
  success(message) { this._log('success', message) }

  // 구분선 출력
  section(title) {
    const line = '─'.repeat(50)
    console.log(`\n${line}`)
    console.log(`  ${title}`)
    console.log(line)
  }

  // 전체 로그 반환
  getLogs() {
    return this.logs
  }

  // 에러만 반환
  getErrors() {
    return this.logs.filter(l => l.level === 'error')
  }

  // 소요 시간 요약
  getTimingSummary() {
    const totalMs = Date.now() - this.startTime
    const seconds = (totalMs / 1000).toFixed(1)
    return `총 소요 시간: ${seconds}초`
  }
}
