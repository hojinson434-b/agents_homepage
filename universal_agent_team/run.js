#!/usr/bin/env node

// run.js — 에이전트 팀 실행 진입점
// 사용법:
//   node run.js --config templates/web-saas.config.js
//   node run.js --config templates/web-saas.config.js --task "주문 관리 페이지 만들어줘"
//   node run.js --config templates/web-saas.config.js --solo 프론트엔드 --task "버튼 수정"

import { createInterface } from 'readline'
import Orchestrator from './core/Orchestrator.js'

// CLI 인자 파싱
function parseArgs() {
  const args = process.argv.slice(2)
  const parsed = {}

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--config' && args[i + 1]) {
      parsed.config = args[++i]
    } else if (args[i] === '--task' && args[i + 1]) {
      parsed.task = args[++i]
    } else if (args[i] === '--solo' && args[i + 1]) {
      parsed.solo = args[++i]
    } else if (args[i] === '--help') {
      parsed.help = true
    }
  }

  return parsed
}

// 도움말 출력
function printHelp() {
  console.log(`
╔══════════════════════════════════════════════╗
║     Universal Agent Team Framework v1.0      ║
║     범용 멀티 에이전트 팀 프레임워크            ║
╚══════════════════════════════════════════════╝

사용법:
  node run.js --config <설정파일> [옵션]

옵션:
  --config <경로>    팀 설정 파일 경로 (필수)
  --task <작업>      실행할 작업 (없으면 대화형 모드)
  --solo <에이전트>  단독 모드로 특정 에이전트만 실행
  --help             도움말 표시

예시:
  # 대화형 모드 (작업을 입력받음)
  node run.js --config templates/web-saas.config.js

  # 특정 작업 바로 실행
  node run.js --config templates/web-saas.config.js --task "주문 관리 페이지 만들어줘"

  # 단독 모드 (간단한 작업)
  node run.js --config templates/web-saas.config.js --solo 프론트엔드 --task "버튼 색상 수정"

설정 템플릿:
  templates/web-saas.config.js    SaaS 대시보드
  templates/custom.config.js      빈 템플릿
`)
}

// 대화형 입력 (readline)
function askQuestion(prompt) {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  return new Promise(resolve => {
    rl.question(prompt, answer => {
      rl.close()
      resolve(answer.trim())
    })
  })
}

// 메인 실행
async function main() {
  const args = parseArgs()

  if (args.help || !args.config) {
    printHelp()
    process.exit(0)
  }

  // 설정 파일 로드
  console.log(`\n설정 로드 중: ${args.config}`)

  let config
  try {
    const configModule = await import(`./${args.config}`)
    config = configModule.default
  } catch (error) {
    console.error(`설정 파일 로드 실패: ${error.message}`)
    process.exit(1)
  }

  console.log(`프로젝트: ${config.project.name}`)
  console.log(`기술 스택: ${config.project.techStack.join(', ')}`)
  console.log(`팀원: ${config.team.members.map(m => m.name).join(', ')}`)

  // Orchestrator 생성
  const orchestrator = new Orchestrator(config)

  // 단독 모드
  if (args.solo && args.task) {
    console.log(`\n단독 모드: ${args.solo}`)
    const result = await orchestrator.runSolo(args.solo, args.task)
    console.log('\n결과:', JSON.stringify(result, null, 2))
    return
  }

  // 작업이 지정되어 있으면 바로 실행
  if (args.task) {
    const result = await orchestrator.run(args.task)
    console.log('\n최종 결과:', result.success ? '성공' : '실패')
    return
  }

  // 대화형 모드
  console.log('\n대화형 모드 시작 (종료: "exit" 또는 Ctrl+C)')
  console.log('─'.repeat(50))

  while (true) {
    const input = await askQuestion('\n📝 작업을 입력하세요: ')

    if (input === 'exit' || input === '종료') {
      console.log('에이전트 팀을 종료합니다.')
      break
    }

    if (input === 'status' || input === '상태') {
      const status = orchestrator.getStatus()
      console.log('\n현재 상태:')
      console.log(status.board || '작업 없음')
      continue
    }

    if (input === 'reset' || input === '초기화') {
      orchestrator.reset()
      console.log('초기화 완료')
      continue
    }

    if (!input) continue

    const result = await orchestrator.run(input)
    console.log('\n─'.repeat(50))
    console.log(result.success ? '작업 완료' : '작업 중 에러 발생')
  }
}

main().catch(error => {
  console.error('실행 에러:', error.message)
  process.exit(1)
})
