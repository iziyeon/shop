import { memo, useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';

interface CarouselProps {
  images: string[];
  interval?: number;
  showDots?: boolean;
}

export const Carousel = memo(({ 
  images, 
  interval = 5000,
  showDots = true 
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlers = useSwipeable({
    onSwipedLeft: () => showNext(),
    onSwipedRight: () => showPrev()
  });

  useEffect(() => {
    const timer = setInterval(() => {
      showNext();
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  const showNext = () => {
    setCurrentIndex(current => 
      current === images.length - 1 ? 0 : current + 1
    );
  };

  const showPrev = () => {
    setCurrentIndex(current => 
      current === 0 ? images.length - 1 : current - 1
    );
  };

  return (
    <div {...handlers} className="relative w-full overflow-hidden">
      {/* 이미지 슬라이더 */}
      <div 
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <img 
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover flex-shrink-0"
          />
        ))}
      </div>

      {/* 네비게이션 버튼 */}
      <button 
        onClick={showPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2"
      >
        ←
      </button>
      <button 
        onClick={showNext}
        className="absolute right-4 top-1/2 -translate-y-1/2"
      >
        →
      </button>

      {/* 하단 인디케이터 */}
      {showDots && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
});

Carousel.displayName = 'Carousel';
