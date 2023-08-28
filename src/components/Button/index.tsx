import React, { ReactNode, memo } from 'react';

interface ButtonProps {
  children?: ReactNode;
  size?: 'large' | 'medium' | 'small';
  kind?: 'primary' | 'secondary' | 'error';
  className?: string;
  onClick: () => void;
}

function Button({ children, size, kind, className, onClick }: ButtonProps) {
  return (
    <button
      className={`${size} ${kind} ${className}`}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  size: 'medium',
  kind: 'primary',
  className: '',
  children: '',
};

export default memo(Button);
