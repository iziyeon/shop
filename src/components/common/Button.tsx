import { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`btn ${variant === 'primary' ? 'btn-primary' : ''} 
        ${variant === 'secondary' ? 'btn-secondary' : ''} 
        ${variant === 'outline' ? 'btn-outline' : ''} 
        ${size === 'sm' ? 'btn-sm' : ''} 
        ${size === 'lg' ? 'btn-lg' : ''} 
        ${fullWidth ? 'w-full' : ''} 
        ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
