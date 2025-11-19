"use client";
import React, { useState } from 'react';
import { BookingFormData } from '../types';
import { PHOTOGRAPHY_SERVICES, PHOTOGRAPHY_PACKAGES, PAYMENT_METHODS } from '../constants';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { Textarea } from './ui/Textarea';
import { Button } from './ui/Button';
import { Label } from './ui/Label';
import useApi from '@/utils/useApi';

const initialFormData: BookingFormData = {
  fullName: 'asha lenscraft',
  email: 'asha@example.com',
  phone: ' +1 234 567 890',
  subject: ' Wedding Photoshoot',
  bookingType: PHOTOGRAPHY_SERVICES[0],
  bookingCost: "0",
  package: PHOTOGRAPHY_PACKAGES[0],
  startDate: '  ',
  endDate: '',
  location: '',
  message: '',
  paymentMethod: PAYMENT_METHODS[0],
  status: 'pending',
  paymentStatus: 'unpaid',
  totalCost: '100'
};

const CameraIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w.w3.org/2000/svg" className={className} style={{width: '3rem', height: '3rem'}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
        <circle cx="12" cy="13" r="3"></circle>
    </svg>
);

const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} style={{width: '4rem', height: '4rem'}} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
);


const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState<BookingFormData>(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
const { post } = useApi();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
 
    try {
   const { message } = await post<any>(`Booking`, {
      ...formData
      });}
    catch (error) {
      console.error('Error submitting booking form:', error);
    } finally {

    }
   
  };

  if (isSubmitted) {
    return (
      <div className="bg-white bg-opacity-10 backdrop-blur-md text-white p-4 p-md-5 rounded-3 shadow-lg border border-white border-opacity-25 text-center">
        <CheckCircleIcon className="text-info mx-auto mb-4" />
        <h2 className="display-5 fw-bold mb-3">Thank You!</h2>
        <p className="fs-5 text-white-50 mb-4">Your booking request has been sent successfully. We will get back to you shortly.</p>
        <Button onClick={() => { setIsSubmitted(false); setFormData(initialFormData); }}>
          Make Another Booking
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-md text-black p-4  rounded-3 shadow-lg border border-white border-opacity-25">
      <div className="text-center mb-5">
        <CameraIcon className="mx-auto mb-3 text-info"/>
        <h1 className="display-4 fw-bold text-black">Asha Lenscraft</h1>
        <p className="text-black mt-2 fs-5">Book Your Photoshoot</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className=" ">
            <div className="contact-form contact-form-area wow fadeInUp delay-0-4s">
              <div
               
                className="contact-form flex"

              >
                <div className=" ">
                  <div className=" col-md-6">
                    <div className="form-group ">
                      <label htmlFor="name">Full Name</label>
                      <input
                        type="text"
                        id="fullName"
                        className="form-control form-control-sm"
                        value={formData.fullName}
                        placeholder="Steve Milner"
                        // required
                        data-error="Please enter your Name"
                        name="fullName"
                        onChange={handleChange}
                      />
                      <label htmlFor="name" className="for-icon">
                        <i className="far fa-user"></i>
                      </label>
                      <div className="help-block with-errors"></div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={formData.email}
                        placeholder="hello@websitename.com"
                        // required
                        data-error="Please enter your Email"
                        name="email"
                        onChange={handleChange}
                      />
                      <label htmlFor="email" className="for-icon">
                        <i className="far fa-envelope"></i>
                      </label>
                      <div className="help-block with-errors"></div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        type="text"
                        id="phone"
                        className="form-control"
                        value={formData.phone}
                        placeholder="+880 1*** ******"
                        // required
                        data-error="Please enter your Phone Number"
                        name="phone"
                        onChange={handleChange}
                      />
                      <label htmlFor="email" className="for-icon">
                        <i className="far fa-envelope"></i>
                      </label>
                      <div className="help-block with-errors"></div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="subject">Subject</label>
                      <input
                        type="text"
                        id="subject"
                        className="form-control"
                        value={formData.subject}
                        placeholder="Your Subject"
                        // required
                        data-error="Please enter your Subject"
                        name="subject"
                        onChange={handleChange}
                      />
                      <label htmlFor="subject" className="for-icon">
                        <i className="far fa-user"></i>
                      </label>
                      <div className="help-block with-errors"></div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="message">Your Message</label>
                      <textarea
                        name="message"
                        id="message"
                        className="form-control"
                        rows={4}
                        value={formData.message}
                        placeholder="Write Your message"
                        // required
                        data-error="Please Write your Message"
                        onChange={handleChange}
                      ></textarea>
                      <div className="help-block with-errors"></div>
                    </div>
                  </div>
              
                  <div className="col-md-12 text-center">
                    <p className="input-success">
                      We have received your mail, We will get back to you soon!
                    </p>
                    <p className="input-error">
                      Sorry, Message could not send! Please try again.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
        <div className="pt-2">
          <Button type="submit" className="w-100 btn-lg" disabled={isLoading}>
            {isLoading ? 'Sending Request...' : 'Book Now'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
