// fileTools.js — 파일 읽기/쓰기/수정 도구
// 에이전트가 프로젝트 파일을 조작할 때 사용하는 도구 정의

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { dirname } from 'path'

// Claude API tool_use 형식의 도구 정의
export const fileToolDefinitions = [
  {
    name: 'read_file',
    description: '파일 내용을 읽습니다. 파일 경로를 지정하세요.',
    input_schema: {
      type: 'object',
      properties: {
        path: {
          type: 'string',
          description: '읽을 파일의 절대 경로',
        },
      },
      required: ['path'],
    },
  },
  {
    name: 'write_file',
    description: '파일에 내용을 작성합니다. 디렉토리가 없으면 자동으로 생성합니다.',
    input_schema: {
      type: 'object',
      properties: {
        path: {
          type: 'string',
          description: '작성할 파일의 절대 경로',
        },
        content: {
          type: 'string',
          description: '파일에 작성할 내용',
        },
      },
      required: ['path', 'content'],
    },
  },
  {
    name: 'file_exists',
    description: '파일이 존재하는지 확인합니다.',
    input_schema: {
      type: 'object',
      properties: {
        path: {
          type: 'string',
          description: '확인할 파일의 절대 경로',
        },
      },
      required: ['path'],
    },
  },
]

// 도구 실행 함수 — tool_use 요청을 실제로 처리
export function executeFileTool(toolName, input, allowedPaths = []) {
  // 파일 소유권 검증 — 허용된 경로만 수정 가능
  if (toolName === 'write_file' && allowedPaths.length > 0) {
    const isAllowed = allowedPaths.some(pattern => {
      if (pattern.includes('**')) {
        const base = pattern.split('**')[0]
        return input.path.startsWith(base)
      }
      return input.path.endsWith(pattern) || input.path.includes(pattern)
    })

    if (!isAllowed) {
      return {
        success: false,
        error: `파일 소유권 위반: ${input.path}는 수정 허용 목록에 없습니다.`,
      }
    }
  }

  switch (toolName) {
    case 'read_file':
      return readFile(input.path)
    case 'write_file':
      return writeFile(input.path, input.content)
    case 'file_exists':
      return { success: true, exists: existsSync(input.path) }
    default:
      return { success: false, error: `알 수 없는 도구: ${toolName}` }
  }
}

function readFile(filePath) {
  try {
    if (!existsSync(filePath)) {
      return { success: false, error: `파일이 존재하지 않습니다: ${filePath}` }
    }
    const content = readFileSync(filePath, 'utf-8')
    return { success: true, content }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

function writeFile(filePath, content) {
  try {
    // 디렉토리가 없으면 생성
    const dir = dirname(filePath)
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true })
    }

    writeFileSync(filePath, content, 'utf-8')
    return { success: true, path: filePath }
  } catch (error) {
    return { success: false, error: error.message }
  }
}
