import React, { ChangeEvent } from 'react';

interface SelectProps {
  children: React.ReactNode;
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

function Select({ children, label, id, name, value, onChange }: SelectProps) {
  return (
    <label htmlFor={id}>
      {label}
      <select id={id} name={name} value={value} onChange={onChange}>
        {children}
      </select>
    </label>
  );
}

export default Select;
