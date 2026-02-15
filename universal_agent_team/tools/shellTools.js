// shellTools.js — 쉘 명령어 실행 도구
// 에이전트가 npm, git 등 터미널 명령어를 실행할 때 사용

import { execSync } from 'child_process'

// Claude API tool_use 형식의 도구 정의
export const shellToolDefinitions = [
  {
    name: 'run_command',
    description: '쉘 명령어를 실행합니다. 프로젝트 디렉토리에서 실행됩니다.',
    input_schema: {
      type: 'object',
      properties: {
        command: {
          type: 'string',
          description: '실행할 쉘 명령어',
        },
        cwd: {
          type: 'string',
          description: '명령어를 실행할 디렉토리 경로 (선택)',
        },
      },
      required: ['command'],
    },
  },
]

// 위험한 명령어 목록 — 이 명령어들은 사용자 승인 필요
const DANGEROUS_COMMANDS = [
  'rm -rf',
  'rm -r',
  'drop table',
  'delete from',
  'git push --force',
  'git reset --hard',
  'npm publish',
  'firebase deploy',
]

export function executeShellTool(toolName, input, projectPath = '.') {
  if (toolName !== 'run_command') {
    return { success: false, error: `알 수 없는 도구: ${toolName}` }
  }

  const { command, cwd } = input
  const workDir = cwd || projectPath

  // 위험한 명령어 검사
  const isDangerous = DANGEROUS_COMMANDS.some(dc =>
    command.toLowerCase().includes(dc)
  )

  if (isDangerous) {
    return {
      success: false,
      error: `위험한 명령어 감지: "${command}" — 사용자 승인이 필요합니다.`,
      requiresApproval: true,
    }
  }

  try {
    const output = execSync(command, {
      cwd: workDir,
      encoding: 'utf-8',
      timeout: 30000,         // 30초 타임아웃
      maxBuffer: 1024 * 1024, // 1MB
    })

    return {
      success: true,
      output: output.trim(),
    }
  } catch (error) {
    return {
      success: false,
      error: error.message,
      stderr: error.stderr?.trim() || '',
    }
  }
}
