import { Link, useLocation } from 'react-router-dom';
import { useMemo } from 'react';

import { CATEGORY_TITLE } from '../../config/constants';

interface BreadcrumbItem {
  name: string;
  path: string;
  active: boolean;
}

const Breadcrumbs = () => {
  const location = useLocation();
  
  const breadcrumbs = useMemo(() => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    
    // 항상 홈을 포함한 경로 생성
    const items: BreadcrumbItem[] = [
      { name: '홈', path: '/', active: false }
    ];
    
    // 경로에 따라 추가적인 빵 부스러기 생성
    let currentPath = '';
    
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      let name = segment.charAt(0).toUpperCase() + segment.slice(1);
      
      // 카테고리 또는 제품 ID인 경우 적절한 이름 설정
      if (segment === 'category' && index < pathSegments.length - 1) {
        // 다음 세그먼트가 실제 카테고리
        return;
      } else if (segment === 'product' && index < pathSegments.length - 1) {
        // 다음 세그먼트가 제품 ID
        return;
      } else if (pathSegments[index - 1] === 'category') {
        // 카테고리 이름으로 변환
        name = CATEGORY_TITLE[segment] || name;
      } else if (segment === 'cart') {
        name = '장바구니';
      }
      
      items.push({
        name,
        path: currentPath,
        active: index === pathSegments.length - 1
      });
    });
    
    return items;
  }, [location.pathname]);
  
  if (breadcrumbs.length <= 1) {
    return null; // 홈만 있는 경우에는 표시하지 않음
  }

  return (
    <nav className="py-4 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <ol className="flex flex-wrap text-sm">
          {breadcrumbs.map((breadcrumb, index) => (
            <li key={breadcrumb.path} className="flex items-center">
              {index > 0 && <span className="mx-2 text-gray-500">/</span>}
              {breadcrumb.active ? (
                <span className="font-medium text-gray-700 dark:text-gray-300">{breadcrumb.name}</span>
              ) : (
                <Link 
                  to={breadcrumb.path} 
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {breadcrumb.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
