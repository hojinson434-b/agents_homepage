// custom.config.js — 빈 설정 템플릿
// 새 프로젝트를 시작할 때 이 파일을 복사해서 수정하세요

export default {
  project: {
    name: '프로젝트 이름',
    path: '../프로젝트-경로',
    techStack: [],
    description: '프로젝트 설명',
  },

  team: {
    lead: {
      model: 'opus',       // opus | sonnet | haiku
      mode: 'plan-only',   // 팀 리드는 항상 plan-only 권장
    },

    members: [
      // 에이전트 추가 예시:
      // {
      //   name: '에이전트 이름',
      //   model: 'sonnet',
      //   role: '역할 설명',
      //   owns: ['파일패턴/**'],
      //   dependsOn: ['다른 에이전트 이름'],
      //   requiresApproval: ['위험 작업 키워드'],
      // },
    ],
  },

  rules: {
    language: 'ko',
    commitStyle: '[타입] 설명',
    soloThreshold: '단일 파일 수정은 팀 없이 단독 실행',
  },
}
