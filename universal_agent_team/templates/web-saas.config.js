// web-saas.config.js — SaaS 대시보드 프로젝트 설정 템플릿
// Next.js + Firebase + Tailwind CSS 기반 관리자 대시보드

export default {
  project: {
    name: '소상공인 통합 관리 플랫폼',
    path: '../biz-dashboard',
    techStack: ['Next.js 14', 'Firebase', 'Tailwind CSS', 'Recharts'],
    description: '소상공인을 위한 주문/상품/고객/매출 통합 관리 대시보드',
  },

  team: {
    lead: {
      model: 'opus',
      mode: 'plan-only',
    },

    members: [
      {
        name: '디자인',
        model: 'sonnet',
        role: '디자인 시스템 정의. Tailwind 테마 설정, 색상/폰트/그림자 체계 수립, 컴포넌트별 스타일 명세 작성, 페이지 레이아웃 설계.',
        owns: [
          'tailwind.config.js',
          'app/globals.css',
          'docs/design-system.md',
          'docs/component-specs.md',
        ],
        dependsOn: [],
        requiresApproval: [],
      },
      {
        name: '프론트엔드',
        model: 'sonnet',
        role: 'React 컴포넌트 및 페이지 UI 구현. 디자인 에이전트의 스타일 명세를 따라 컴포넌트 제작, 반응형 대응, 접근성 준수.',
        owns: [
          'components/**',
          'app/**/page.js',
          'app/**/layout.js',
          'public/**',
        ],
        dependsOn: ['디자인'],
        requiresApproval: [],
      },
      {
        name: 'Firebase',
        model: 'sonnet',
        role: 'Firebase 설정 및 데이터베이스 설계. Firestore 컬렉션 스키마 정의, Auth 설정, 보안 규칙 작성, Storage 구조 설계.',
        owns: [
          'lib/firebase.js',
          'lib/firebase-admin.js',
          'firestore.rules',
          'storage.rules',
          'firebase.json',
          '.firebaserc',
        ],
        dependsOn: [],
        requiresApproval: ['인증 수정', '보안 규칙 변경', '데이터 마이그레이션'],
      },
      {
        name: '기능',
        model: 'sonnet',
        role: '비즈니스 로직 구현. 커스텀 훅(useOrders, useProducts 등), Context API, 유틸리티 함수, 데이터 처리 로직 작성.',
        owns: [
          'lib/hooks/**',
          'lib/contexts/**',
          'lib/utils/**',
          'lib/constants.js',
        ],
        dependsOn: ['Firebase'],
        requiresApproval: [],
      },
      {
        name: 'QA',
        model: 'sonnet',
        role: '코드 품질 검증. 디자인 일관성 확인, 보안 규칙 점검, 접근성 테스트, 성능 검증, 에이전트 간 충돌 감지.',
        owns: [
          '__tests__/**',
          'docs/qa-checklist.md',
        ],
        dependsOn: [],
        requiresApproval: [],
      },
    ],
  },

  rules: {
    language: 'ko',
    commitStyle: '[타입] 설명',
    soloThreshold: '단일 파일 수정이나 버그 1개 수정은 팀 없이 단독 실행',
  },
}
