// searchTools.js — 코드 검색 도구
// 에이전트가 프로젝트 내 파일/코드를 검색할 때 사용

import { readdirSync, readFileSync, statSync } from 'fs'
import { join, extname } from 'path'

// Claude API tool_use 형식의 도구 정의
export const searchToolDefinitions = [
  {
    name: 'search_files',
    description: '디렉토리에서 파일명 패턴으로 파일을 검색합니다.',
    input_schema: {
      type: 'object',
      properties: {
        directory: {
          type: 'string',
          description: '검색할 디렉토리 경로',
        },
        pattern: {
          type: 'string',
          description: '파일명에 포함될 문자열 (예: ".jsx", "Button")',
        },
      },
      required: ['directory'],
    },
  },
  {
    name: 'search_content',
    description: '파일 내용에서 특정 텍스트를 검색합니다.',
    input_schema: {
      type: 'object',
      properties: {
        directory: {
          type: 'string',
          description: '검색할 디렉토리 경로',
        },
        query: {
          type: 'string',
          description: '검색할 텍스트',
        },
        extensions: {
          type: 'array',
          items: { type: 'string' },
          description: '검색할 파일 확장자 목록 (예: [".js", ".jsx"])',
        },
      },
      required: ['directory', 'query'],
    },
  },
  {
    name: 'list_directory',
    description: '디렉토리의 파일/폴더 목록을 반환합니다.',
    input_schema: {
      type: 'object',
      properties: {
        directory: {
          type: 'string',
          description: '목록을 볼 디렉토리 경로',
        },
      },
      required: ['directory'],
    },
  },
]

// 재귀적으로 파일 목록 수집
function collectFiles(dir, maxDepth = 5, currentDepth = 0) {
  if (currentDepth >= maxDepth) return []

  const results = []
  const skipDirs = ['node_modules', '.git', '.next', 'dist', 'build']

  try {
    const entries = readdirSync(dir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = join(dir, entry.name)

      if (entry.isDirectory()) {
        if (!skipDirs.includes(entry.name)) {
          results.push(...collectFiles(fullPath, maxDepth, currentDepth + 1))
        }
      } else {
        results.push(fullPath)
      }
    }
  } catch {
    // 접근 권한 없는 디렉토리 무시
  }

  return results
}

export function executeSearchTool(toolName, input) {
  switch (toolName) {
    case 'search_files':
      return searchFiles(input.directory, input.pattern || '')
    case 'search_content':
      return searchContent(input.directory, input.query, input.extensions)
    case 'list_directory':
      return listDirectory(input.directory)
    default:
      return { success: false, error: `알 수 없는 도구: ${toolName}` }
  }
}

function searchFiles(directory, pattern) {
  try {
    const files = collectFiles(directory)
    const matched = pattern
      ? files.filter(f => f.toLowerCase().includes(pattern.toLowerCase()))
      : files

    return {
      success: true,
      files: matched,
      count: matched.length,
    }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

function searchContent(directory, query, extensions = ['.js', '.jsx', '.ts', '.tsx', '.json']) {
  try {
    const files = collectFiles(directory)
    const targetFiles = files.filter(f => extensions.includes(extname(f)))
    const results = []

    for (const filePath of targetFiles) {
      try {
        const content = readFileSync(filePath, 'utf-8')
        const lines = content.split('\n')

        lines.forEach((line, index) => {
          if (line.includes(query)) {
            results.push({
              file: filePath,
              line: index + 1,
              content: line.trim(),
            })
          }
        })
      } catch {
        // 읽기 실패한 파일 무시
      }
    }

    return {
      success: true,
      results,
      count: results.length,
    }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

function listDirectory(directory) {
  try {
    const entries = readdirSync(directory, { withFileTypes: true })

    const items = entries.map(entry => ({
      name: entry.name,
      type: entry.isDirectory() ? 'directory' : 'file',
      size: entry.isFile() ? statSync(join(directory, entry.name)).size : null,
    }))

    return { success: true, items }
  } catch (error) {
    return { success: false, error: error.message }
  }
}
