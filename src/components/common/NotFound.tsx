import { Link } from 'react-router-dom';
import { SEO } from './SEO';

export default function NotFound() {
  return (
    <>
      <SEO title="페이지를 찾을 수 없습니다 | React Shop" />
      <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <p className="text-2xl mt-4 mb-8">페이지를 찾을 수 없습니다.</p>
        <Link to="/" className="btn btn-primary">
          메인으로 돌아가기
        </Link>
      </div>
    </>
  );
}
