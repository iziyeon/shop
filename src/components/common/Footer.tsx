import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 첫 번째 컬럼 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">React Shop</h3>

            <div className="flex space-x-4">
              <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub">
                <i className="fab fa-github text-gray-300 hover:text-white text-xl"></i>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                <i className="fab fa-facebook text-gray-300 hover:text-white text-xl"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                <i className="fab fa-instagram text-gray-300 hover:text-white text-xl"></i>
              </a>
            </div>
          </div>

          {/* 두 번째 컬럼 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">카테고리</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link to="/category/electronics" className="hover:text-white">전자제품</Link>
              </li>
              <li>
                <Link to="/category/jewelery" className="hover:text-white">쥬얼리</Link>
              </li>
              <li>
                <Link to="/category/men's clothing" className="hover:text-white">남성의류</Link>
              </li>
              <li>
                <Link to="/category/women's clothing" className="hover:text-white">여성의류</Link>
              </li>
            </ul>
          </div>

          {/* 세 번째 컬럼 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">고객서비스</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link to="/" className="hover:text-white">FAQ</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white">배송정보</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white">반품 & 환불</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white">개인정보 보호정책</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Copyright. iziyeon.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
