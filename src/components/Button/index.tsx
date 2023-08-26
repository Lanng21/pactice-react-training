import React, { ReactNode, memo } from 'react';

interface ButtonProps {
  children?: ReactNode;
  size?: 'large' | 'medium' | 'small';
  kind?: 'primary' | 'secondary' | 'error';
  className?: string;
  type?: 'submit' | 'button';
  onClick: () => void;
}

function Button({
  children,
  size,
  kind,
  className,
  type,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={`${size} ${kind} ${className}`}
      type={type ? 'submit' : 'button'}
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
  type: 'button',
  children: '',
};

export default memo(Button);
