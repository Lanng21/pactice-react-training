import React, { memo } from 'react';

interface IInputProps {
  id: string;
  className?: string;
  value: string | number;
  type: string;
  name: string;
  label?: string;
  error?: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  id,
  className,
  value,
  type,
  name,
  label,
  error,
  onChange,
  placeholder,
}: IInputProps) => {
  return (
    <div className="input-container">
      <label htmlFor={id}>
        {label}
        <input
          type={type}
          id={id}
          className={className}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </label>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

Input.defaultProps = {
  className: '',
  error: '',
  placeholder: '',
  label: '',
};

export default memo(Input);
