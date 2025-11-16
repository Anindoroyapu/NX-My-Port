import React from 'react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string | null;
}
const IconCheckCircle: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
);
const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, productName }) => {
  if (!isOpen) return null;

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-modal-title"
      className="modal fade show d-block"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={onClose}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div 
          className="modal-content text-center p-4 p-md-5 rounded-4 shadow-lg border-0"
          onClick={e => e.stopPropagation()}
        >
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, height: '6px',
            // background: 'linear-gradient(to right, #20c997, #6f42c1)', // Bootstrap teal to indigo
            borderTopLeftRadius: 'var(--bs-modal-border-radius)',
            borderTopRightRadius: 'var(--bs-modal-border-radius)',
          }}></div>
          
          <div 
            className="mx-auto bg-success-subtle rounded-circle d-flex align-items-center justify-content-center border border-5 border-white shadow-sm"
            style={{ width: '80px', height: '80px', marginTop: '-60px' }}
          >
            <IconCheckCircle className="text-success" style={{ width: '48px', height: '48px' }}/>
          </div>

          <div className="modal-body pt-4">
            <h2 id="success-modal-title" className="h3 fw-bold text-dark">Thank You!</h2>
            <p className="text-muted mt-2">
              <strong>{productName}</strong>your message has been successfully sent. We will get back to you shortly.
            </p>
          </div>
          
          <div className="modal-footer border-0 justify-content-center p-0 pt-3">
            <button 
              onClick={onClose}
              className="btn btn-success btn-lg w-5"
            >
             Okey!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;