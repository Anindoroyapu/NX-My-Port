import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea: React.FC<TextareaProps> = (props) => {
  const { className = '', ...rest } = props;

  return (
    <textarea
      {...rest}
      className={`${className} custom-textarea`}
      style={{
        width: '100%',
        minHeight: 120,
        padding: '12px 14px',
        background: '#0b1220',
        color: '#e6eef8',
        border: '1px solid #334155',
        borderRadius: 8,
        resize: 'vertical',
        fontSize: 14,
        lineHeight: '1.5',
        boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.2)',
        transition: 'box-shadow .15s ease, border-color .15s ease',
      }}
      onFocus={(e: React.FocusEvent<HTMLTextAreaElement>) => {
        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.12)';
        e.currentTarget.style.borderColor = '#3b82f6';
        const fn = (rest as any).onFocus;
        if (fn) fn(e);
      }}
      onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) => {
        e.currentTarget.style.boxShadow = 'inset 0 1px 2px rgba(0,0,0,0.2)';
        e.currentTarget.style.borderColor = '#334155';
        const fn = (rest as any).onBlur;
        if (fn) fn(e);
      }}
    />
  );
};
