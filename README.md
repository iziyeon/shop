# React Shop

React와 TypeScript를 활용한 모던 이커머스 웹 애플리케이션입니다.

## 🚀 프로젝트 소개

React Shop은 Fake Store API를 활용하여 다양한 카테고리의 제품을 쇼핑할 수 있는 온라인 쇼핑몰입니다. 사용자 친화적인 UI와 반응형 디자인으로 모바일과 데스크톱 환경 모두에서 최적의 쇼핑 경험을 제공합니다.

## 🔨 기술 스택

- **Frontend**: React, TypeScript
- **스타일링**: TailwindCSS
- **라우팅**: React Router
- **상태 관리**: React Context API / Redux
- **API 통신**: Axios
- **빌드 도구**: Vite

## ✨ 주요 기능

- **제품 카테고리별 탐색**
  - 전자제품, 쥬얼리, 남성의류, 여성의류
  - 카테고리별 필터링 및 정렬 기능

- **제품 상세 정보**
  - 제품 이미지, 설명, 가격, 평점 등 상세 정보 제공
  - 관련 제품 추천

- **장바구니 기능**
  - 제품 추가/삭제
  - 수량 조절
  - 총 금액 계산

- **반응형 디자인**
  - 모바일, 태블릿, 데스크톱 환경 모두 지원

## 🔧 설치 및 실행

### 필수 조건
- Node.js 16.x 이상
- npm 8.x 이상 또는 yarn 1.22.x 이상

### 설치

```bash
# 저장소 클론
git clone https://github.com/username/react-shop.git
cd react-shop

# 의존성 설치
npm install
# 또는
yarn install
```

### 개발 환경 실행

```bash
npm run dev
# 또는
yarn dev
```

### 프로덕션 빌드

```bash
npm run build
# 또는
yarn build
```

## 🌐 프로젝트 구조

```
react-shop/
├── public/             # 정적 파일
│   └── images/         # 이미지 파일
├── src/                # 소스 코드
│   ├── components/     # 리액트 컴포넌트
│   │   ├── common/     # 공통 컴포넌트 (Header, Footer 등)
│   │   ├── home/       # 홈페이지 관련 컴포넌트
│   │   ├── product/    # 제품 관련 컴포넌트
│   │   └── cart/       # 장바구니 관련 컴포넌트
│   ├── contexts/       # Context API
│   ├── hooks/          # 커스텀 훅
│   ├── pages/          # 페이지 컴포넌트
│   ├── services/       # API 서비스
│   ├── types/          # TypeScript 타입 정의
│   ├── utils/          # 유틸리티 함수
│   ├── App.tsx         # 앱 루트 컴포넌트
│   ├── main.tsx        # 앱 진입점
│   └── ...
├── .gitignore
├── index.html
├── package.json
├── README.md
├── tsconfig.json
└── vite.config.ts
```

## 📱 스크린샷

![홈페이지](screenshot-home.png)
![제품 목록](screenshot-products.png)
![제품 상세](screenshot-detail.png)
![장바구니](screenshot-cart.png)

## 🔍 API 참조

이 프로젝트는 [Fake Store API](https://fakestoreapi.com/)를 사용합니다.

## 🤝 기여하기

이슈를 발견하셨거나 기능 제안이 있으시면 이슈를 등록해주세요.

1. Fork 하기
2. 새 브랜치 생성 (`git checkout -b feature/amazing-feature`)
3. 변경사항 커밋 (`git commit -m 'Add some amazing feature'`)
4. 브랜치에 푸시 (`git push origin feature/amazing-feature`)
5. Pull Request 열기

## 📄 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

## 👨‍💻 제작자

- iziyeon - [GitHub](https://github.com/iziyeon)
