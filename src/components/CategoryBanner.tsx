import { CATEGORY_TITLE } from '../config/constants';

interface CategoryBannerProps {
  category: string;
}

const CategoryBanner = ({ category }: CategoryBannerProps) => {
  // 카테고리에 맞는 이미지 URL 매핑
  const bannerImages: Record<string, string> = {
    'electronics': 'https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg',
    'jewelery': 'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg',
    "men's clothing": 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
    "women's clothing": 'https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg',
    '': 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg' // 기본 이미지
  };

  const bannerImage = bannerImages[category] || bannerImages[''];
  const categoryName = CATEGORY_TITLE[category] || '전체 상품';

  return (
    <div className="relative h-64 mb-10 overflow-hidden rounded-lg">
      <div className="absolute inset-0">
        <img 
          src={bannerImage} 
          alt={categoryName}
          className="w-full h-full object-cover brightness-75" 
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white text-shadow-lg">
          {categoryName}
        </h1>
      </div>
    </div>
  );
};

export default CategoryBanner;
