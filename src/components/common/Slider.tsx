import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { useNavigate } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { CATEGORY } from '../../config/constants';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      title: "전자제품",
      category: CATEGORY.ELECTRONICS,
      description: "다양한 전자제품을 만나보세요"
    },
    {
      image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
      title: "쥬얼리",
      category: CATEGORY.JEWELRY,
      description: "특별한 순간을 빛내줄 쥬얼리"
    },
    {
      image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
      title: "남성 의류",
      category: CATEGORY.MEN_CLOTHING,
      description: "스타일리시한 남성 의류 컬렉션"
    },
    {
      image: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
      title: "여성 의류",
      category: CATEGORY.WOMEN_CLOTHING,
      description: "트렌디한 여성 의류 컬렉션"
    }
  ];

  const handleSlideClick = (category: string) => {
    navigate(`/category/${category}`);
  };

  return (
    <Carousel
      showThumbs={false}
      selectedItem={currentSlide}
      onChange={setCurrentSlide}
      infiniteLoop
      autoPlay
      interval={5000}
      showStatus={false}
      className="max-w-full mx-auto"
    >
      {slides.map((slide, index) => (
        <div 
          key={index} 
          className="h-[400px] md:h-[500px] lg:h-[600px] relative cursor-pointer"
          onClick={() => handleSlideClick(slide.category)}
        >
          <img 
            src={slide.image} 
            alt={slide.title}
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white">
            <h2 className="text-4xl font-bold mb-4 text-shadow-lg">{slide.title}</h2>
            <p className="text-xl text-shadow-lg">{slide.description}</p>
            <button className="mt-6 bg-white text-gray-900 px-6 py-2 rounded-md font-semibold hover:bg-gray-100 transition-colors">
              구경하기
            </button>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default Slider;
