# React Shop

## 프로젝트 개요
React와 TailwindCSS를 활용하여 개발한 현대적인 온라인 쇼핑몰 애플리케이션입니다. 이 프로젝트는 React의 강력한 컴포넌트 기반 아키텍처와 TailwindCSS의 유틸리티 우선 CSS 프레임워크를 결합하여 사용자 친화적인 쇼핑 경험을 제공합니다.

## 주요 기능
- **제품 카테고리 브라우징**: 전자제품, 주얼리, 남성 의류, 여성 의류 등 다양한 카테고리별 제품 탐색
- **제품 상세 정보**: 각 제품에 대한 상세 설명, 가격, 평점 등 종합적인 정보 제공
- **장바구니 기능**: 원하는 제품을 장바구니에 추가하고 관리
- **반응형 디자인**: 모바일부터 데스크톱까지 다양한 디바이스에서 최적화된 사용자 경험

## 기술 스택
- **프론트엔드 프레임워크**: React
- **라우팅**: React Router
- **상태 관리**: Context API
- **스타일링**: TailwindCSS
- **API 통신**: Axios
- **타입 시스템**: TypeScript
- **헬멧 관리**: React Helmet Async
- **에러 처리**: ErrorBoundary

## 설치 방법
프로젝트를 로컬 환경에서 실행하기 위한 단계별 가이드입니다.

### 전제 조건
- Node.js (v14.0.0 이상)
- npm (v6.0.0 이상) 또는 yarn (v1.22.0 이상)

### 설치 단계
1. 저장소 클론
```bash
git clone https://github.com/yourusername/react-shop.git
cd react-shop
```

2. 의존성 설치
```bash
npm install
# 또는
yarn install
```

3. 개발 서버 실행
```bash
npm start
# 또는
yarn start
```

4. 빌드 생성
```bash
npm run build
# 또는
yarn build
```

## 프로젝트 구조
```
react-shop/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── ErrorBoundary.tsx
│   │   │   ├── Slider.tsx
│   │   │   └── ...
│   │   ├── FeaturedProducts.tsx
│   │   └── ...
│   ├── config/
│   │   └── constants.ts
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── ProductDetail.tsx
│   │   ├── Category.tsx
│   │   ├── Cart.tsx
│   │   └── ...
│   ├── App.tsx
│   └── index.tsx
├── package.json
└── README.md
```

## API 사용법
이 프로젝트는 [Fake Store API](https://fakestoreapi.com/)를 사용하여 제품 데이터를 가져옵니다. API 엔드포인트 및 사용 방법에 대한 자세한 내용은 다음과 같습니다:
- 모든 제품 가져오기: `GET /products`
- 특정 카테고리 제품 가져오기: `GET /products/category/{categoryName}`
- 단일 제품 상세 정보 가져오기: `GET /products/{id}`

## 주요 컴포넌트
- **Slider**: 홈페이지 상단에 표시되는 회전 배너
- **FeaturedProducts**: 카테고리별 추천 상품을 표시하는 컴포넌트
- **ErrorBoundary**: 애플리케이션 오류를 우아하게 처리하는 컴포넌트

## 성능 최적화
- React.memo, useCallback, useMemo를 활용한 렌더링 최적화
- 이미지 지연 로딩(lazy loading) 구현
- 코드 분할(Code-splitting)을 통한 초기 로딩 시간 단축

## 접근성
- ARIA 속성 적용
- 키보드 네비게이션 지원
- 대체 텍스트 제공
- 색상 대비 최적화

## 브라우저 지원
- Chrome (최신 2개 버전)
- Firefox (최신 2개 버전)
- Safari (최신 2개 버전)
- Edge (최신 2개 버전)

## 기여 방법
1. 저장소 포크
2. 기능 브랜치 생성 (`git checkout -b feature/amazing-feature`)
3. 변경사항 커밋 (`git commit -m 'Add some amazing feature'`)
4. 브랜치에 푸시 (`git push origin feature/amazing-feature`)
5. Pull Request 개설

## 주소
- https://shop-plum-five.vercel.app/
