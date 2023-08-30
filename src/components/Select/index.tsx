import React, { ChangeEvent, memo } from 'react';

interface SelectProps {
  children: React.ReactNode;
  label: string;
  id: string;
  name: string;
  value: string;
  error?: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const Select = ({
  children,
  label,
  id,
  name,
  value,
  error,
  onChange,
}: SelectProps) => {
  return (
    <label htmlFor={id}>
      {label}
      <select id={id} name={name} value={value} onChange={onChange}>
        {children}
      </select>
      {error && <span className="error-message">{error}</span>}
    </label>
  );
};

Select.defaultProps = {
  error: '',
};

export default memo(Select);
