import { memo } from 'react';
import classNames from 'classnames';

interface IconProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Icon = memo(({ name, size = 'md', className }: IconProps) => {
  return (
    <span className={classNames(
      'material-icons',
      {
        'text-base': size === 'sm',
        'text-xl': size === 'md',
        'text-2xl': size === 'lg'
      },
      className
    )}>
      {name}
    </span>
  );
});

Icon.displayName = 'Icon';

export default Icon;
