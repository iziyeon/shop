import { Link } from 'react-router-dom';
import { Button } from '../common/Button';

export default function EmptyCart() {
  return (
    <div className="text-center py-16">
      <h2 className="text-2xl font-bold mb-4">장바구니가 비어있습니다</h2>
      <p className="text-gray-600 mb-8">상품을 담아보세요!</p>
      <Link to="/">
        <Button variant="primary">쇼핑 계속하기</Button>
      </Link>
    </div>
  );
}
