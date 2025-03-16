import { Outlet } from 'react-router-dom';

/**
 * 메인 레이아웃 컴포넌트
 * 헤더와 푸터 사이에 페이지 내용을 렌더링합니다.
 */
const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
