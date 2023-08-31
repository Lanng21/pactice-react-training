import React, { ReactNode, memo } from 'react';

interface ButtonProps {
  children?: ReactNode;
  size?: 'large' | 'medium' | 'small';
  kind?: 'primary' | 'secondary' | 'error';
  className?: string;
  disabled?: boolean;
  onClick: () => void;
}

const Button = ({
  children,
  size,
  kind,
  className,
  onClick,
  disabled,
}: ButtonProps) => {
  return (
    <button
      className={`${size} ${kind} ${className}`}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  size: 'medium',
  kind: 'primary',
  className: '',
  children: '',
  disabled: false,
};

export default memo(Button);
