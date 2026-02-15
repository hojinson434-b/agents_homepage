// gitTools.js — Git 관련 도구
// 에이전트가 커밋, 브랜치 등 Git 작업을 수행할 때 사용

import { execSync } from 'child_process'

// Claude API tool_use 형식의 도구 정의
export const gitToolDefinitions = [
  {
    name: 'git_status',
    description: '현재 Git 상태를 확인합니다.',
    input_schema: {
      type: 'object',
      properties: {
        cwd: {
          type: 'string',
          description: 'Git 저장소 경로',
        },
      },
      required: ['cwd'],
    },
  },
  {
    name: 'git_commit',
    description: '변경사항을 스테이징하고 커밋합니다.',
    input_schema: {
      type: 'object',
      properties: {
        cwd: {
          type: 'string',
          description: 'Git 저장소 경로',
        },
        message: {
          type: 'string',
          description: '커밋 메시지 (한국어)',
        },
        files: {
          type: 'array',
          items: { type: 'string' },
          description: '스테이징할 파일 목록 (비어있으면 전체 추가)',
        },
      },
      required: ['cwd', 'message'],
    },
  },
  {
    name: 'git_diff',
    description: '현재 변경사항을 확인합니다.',
    input_schema: {
      type: 'object',
      properties: {
        cwd: {
          type: 'string',
          description: 'Git 저장소 경로',
        },
      },
      required: ['cwd'],
    },
  },
]

export function executeGitTool(toolName, input) {
  const { cwd } = input

  switch (toolName) {
    case 'git_status':
      return runGitCommand('git status --short', cwd)
    case 'git_commit':
      return gitCommit(cwd, input.message, input.files)
    case 'git_diff':
      return runGitCommand('git diff', cwd)
    default:
      return { success: false, error: `알 수 없는 도구: ${toolName}` }
  }
}

function runGitCommand(command, cwd) {
  try {
    const output = execSync(command, {
      cwd,
      encoding: 'utf-8',
      timeout: 15000,
    })
    return { success: true, output: output.trim() }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

function gitCommit(cwd, message, files = []) {
  try {
    // 파일 스테이징
    if (files && files.length > 0) {
      for (const file of files) {
        execSync(`git add "${file}"`, { cwd, encoding: 'utf-8' })
      }
    } else {
      execSync('git add -A', { cwd, encoding: 'utf-8' })
    }

    // 커밋
    execSync(`git commit -m "${message}"`, { cwd, encoding: 'utf-8' })

    return { success: true, message: `커밋 완료: ${message}` }
  } catch (error) {
    return { success: false, error: error.message }
  }
}
