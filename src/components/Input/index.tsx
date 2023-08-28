import React, { memo } from 'react';

interface IInputProps {
  id: string;
  className?: string;
  value: string | number;
  type: string;
  name: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  id,
  className,
  value,
  type,
  name,
  label,
  onChange,
}: IInputProps) => {
  return (
    <label htmlFor={id}>
      {label}
      <input
        type={type}
        id={id}
        className={className}
        name={name}
        value={value}
        onChange={onChange}
      />
    </label>
  );
};

Input.defaultProps = {
  className: '',
};

export default memo(Input);
