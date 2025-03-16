import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const slides = [
  {
    image: '/images/banner1.jpg',
    title: 'Shop with Confidence',
    description: 'Browse our handpicked collection of premium products',
    link: '/fashion'
  },
  {
    image: '/images/banner2.jpg', 
    title: 'New Arrivals',
    description: 'Check out our latest fashion collection',
    link: '/new-arrivals'
  },
  {
    image: '/images/banner3.jpg',
    title: 'Limited Time Offers',
    description: 'Don\'t miss out on our special deals',
    link: '/offers'
  }
];

export const SlideShow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[400px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="absolute inset-0">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </div>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">{slide.title}</h2>
            <p className="text-lg md:text-xl mb-4">{slide.description}</p>
            <Link
              to={slide.link}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      ))}
      
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default SlideShow;
