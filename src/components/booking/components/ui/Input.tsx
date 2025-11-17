import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = (props) => {
  const className = `form-control form-control-sm`;
  return <input {...props} className={className} />;
};
