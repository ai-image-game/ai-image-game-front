# AI Image Game

AI가 생성한 이미지를 보고 단어를 맞추는 게임입니다. 행맨 게임의 변형으로, AI가 생성한 이미지를 힌트로 사용하여 단어를 추측합니다.

## 주요 기능

- 🎨 AI가 생성한 이미지 기반 게임
- 🧩 행맨 스타일의 단어 맞추기 게임
- 🎮 무료 플레이
- 📱 반응형 디자인 (PC/모바일 지원)
- 🔗 SNS 공유 기능

## 기술 스택

- Frontend: Next.js
- Styling: CSS Modules
- API: REST API
- WebSocket: 실시간 게임 상태 동기화

## 프로젝트 구조

```
src/
├── components/
│   ├── jsx/           # React 컴포넌트
│   │   ├── App.jsx    # 메인 앱 컴포넌트
│   │   ├── Intro.jsx  # 게임 소개 화면
│   │   ├── ImageGame.jsx  # 게임 메인 컴포넌트
│   │   └── ...
│   └── css/           # CSS 모듈
├── pages/
│   ├── index.js       # 메인 페이지
│   └── styles/        # 전역 스타일
└── common/            # 공통 유틸리티
```

## 주요 컴포넌트

- `App.jsx`: 전체 애플리케이션 레이아웃 관리
- `Intro.jsx`: 게임 소개 화면
- `ImageGame.jsx`: 게임 메인 로직
- `ImageArea.jsx`: AI 이미지 표시
- `HangManArea.jsx`: 행맨 영역 UI
- `AlphabetInput.jsx`: 알파벳 입력 UI

## 반응형 디자인

- PC (769px 이상): 좌우 광고 배치
- 태블릿 (425px ~ 768px): 상하 광고 배치
- 모바일 (425px 이하): 상단 광고만 표시

## 시작하기

1. 저장소 클론
```bash
git clone [repository-url]
```

2. 의존성 설치
```bash
npm install
```

3. 개발 서버 실행
```bash
npm run dev
```

4. 빌드
```bash
npm run build
```

## 환경 변수

- `NEXT_PUBLIC_SERVER_URL`: 프론트엔드에서 접근할 서버 URL
- `PRIVATE_SERVER_URL`: 서버 사이드에서 사용할 서버 URL
