import { useState, useRef } from 'react';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import Portal from './Portal';

interface PopoverProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  placement?: 'top' | 'right' | 'bottom' | 'left';
}

const Popover = ({ trigger, content, placement = 'bottom' }: PopoverProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(contentRef, () => setIsOpen(false));

  return (
    <div className="relative inline-block">
      <div ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>
      {isOpen && (
        <Portal>
          <div
            ref={contentRef}
            className={`absolute z-50 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 ${
              placement === 'top' ? 'bottom-full mb-2' :
              placement === 'right' ? 'left-full ml-2' :
              placement === 'bottom' ? 'top-full mt-2' :
              'right-full mr-2'
            }`}
            style={{
              minWidth: '200px',
              transform: 'translateY(0)'
            }}
          >
            {content}
          </div>
        </Portal>
      )}
    </div>
  );
};

export default Popover;
