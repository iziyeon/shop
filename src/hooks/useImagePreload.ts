import { useState, useEffect } from 'react';

export const useImagePreload = (src: string) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const image = new Image();
    
    image.onload = () => setIsLoaded(true);
    image.onerror = () => setError(new Error(`Failed to load image: ${src}`));
    
    image.src = src;

    return () => {
      image.onload = null;
      image.onerror = null;
    };
  }, [src]);

  return { isLoaded, error };
};
