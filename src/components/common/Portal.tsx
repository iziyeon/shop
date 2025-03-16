import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  children: React.ReactNode;
  containerId?: string;
}

const Portal = ({ children, containerId = 'portal-root' }: Props) => {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let element = document.getElementById(containerId);
    
    if (!element) {
      element = document.createElement('div');
      element.id = containerId;
      document.body.appendChild(element);
    }
    
    setContainer(element);

    return () => {
      if (element?.parentNode && !element.childNodes.length) {
        element.parentNode.removeChild(element);
      }
    };
  }, [containerId]);

  return container ? createPortal(children, container) : null;
};

export default Portal;
