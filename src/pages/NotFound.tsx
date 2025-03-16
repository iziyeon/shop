import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <Helmet>
        <title>페이지를 찾을 수 없습니다 | React Shop</title>
      </Helmet>

      <div className="text-center">
        <h1 className="text-9xl font-bold text-blue-600">404</h1>
        <h2 className="text-3xl font-semibold mt-4 mb-6">페이지를 찾을 수 없습니다</h2>
        <p className="text-gray-500 mb-8">
          요청하신 페이지가 존재하지 않거나, 이동되었거나, 이름이 변경되었을 수 있습니다.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link 
            to="/" 
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition-colors"
          >
            홈으로 돌아가기
          </Link>
          
          <Link 
            to="/category/electronics" 
            className="px-6 py-3 border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700 font-semibold rounded transition-colors"
          >
            쇼핑 계속하기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
