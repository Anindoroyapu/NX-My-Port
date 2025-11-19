import React from 'react';
import BookingForm from './components/BookingForm';
import './booking.css';

const BookingFormPage: React.FC = () => {
  return (
    <div className=" bg-white  d-flex align-items-center justify-content-center pt-20">
      {/* Background Image */}
      <div 
        className=" top-0 start-0 end-0 bottom-0 z-0" 
       
      ></div>
      {/* Overlay */}
      <div className=" bg-dark bg-opacity-75 z-1"></div>
      
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
