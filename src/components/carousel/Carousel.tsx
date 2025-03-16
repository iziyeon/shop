import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SLIDES = [
  {
    id: 1,
    image: '/images/fashion.jpg',
    title: '물빠진 청바지!',
    description: '이제 막 도착한 패션 청바지를 구경해 보세요',
    link: '/category/fashion'
  },
  {
    id: 2,
    image: '/images/digital.jpg',
    title: '신속한 업무처리!', 
    description: '다양한 디지털 상품을 둘러보세요',
    link: '/category/digital'
  },
  {
    id: 3,
    image: '/images/accessories.jpg',
    title: '새로운 액세서리!',
    description: '신상 액세서리를 구경해 보세요',
    link: '/category/accessories'
  }
];

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[600px] bg-neutral">
      {SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0'
          }`}
        >
          <div className="relative h-full">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-center text-white">
                <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
                <p className="mb-8 text-lg">{slide.description}</p>
                <Link to={slide.link} className="btn btn-primary">
                  바로가기
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* 이전/다음 버튼 추가 */}
      <button 
        onClick={() => setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1))}
        className="absolute left-2 top-1/2 -translate-y-1/2 btn btn-circle btn-ghost text-white text-2xl"
      >
        ❮
      </button>
      <button 
        onClick={() => setCurrentSlide((prev) => (prev + 1) % SLIDES.length)}
        className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-circle btn-ghost text-white text-2xl"
      >
        ❯
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentSlide === index ? 'bg-primary' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
