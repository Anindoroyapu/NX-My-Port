import React from 'react';
import BookingForm from './components/BookingForm';
import './booking.css';

const BookingFormPage: React.FC = () => {
  return (
    <div className="position-relative  min-vh-100 w-100 d-flex align-items-center justify-content-center p-[40px]">
      {/* Background Image */}
      <div 
        className="position-absolute top-0 start-0 end-0 bottom-0 z-0" 
        style={{ 
          backgroundImage: "url('https://picsum.photos/1920/1080?grayscale&blur=2')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
      {/* Overlay */}
      <div className="position-absolute top-0 start-0 end-0 bottom-0 bg-dark bg-opacity-75 z-1"></div>
      
      {/* Content */}
      <main className="position-relative z-2 container">
        <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-10">
                <BookingForm />
            </div>
        </div>
      </main>
    </div>
  );
};

export default BookingFormPage;
