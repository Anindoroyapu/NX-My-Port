import React from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label: React.FC<LabelProps> = ({ children, ...props }) => {
  return (
    <label className="form-label text-white-50" {...props}>
      {children}
    </label>
  );
};
