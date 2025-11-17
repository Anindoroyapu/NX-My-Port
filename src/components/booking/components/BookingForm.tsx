"use client";
import React, { useState } from 'react';
import { BookingFormData } from '../types';
import { PHOTOGRAPHY_SERVICES, PHOTOGRAPHY_PACKAGES, PAYMENT_METHODS } from '../constants';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { Textarea } from './ui/Textarea';
import { Button } from './ui/Button';
import { Label } from './ui/Label';

const initialFormData: BookingFormData = {
  full_name: '',
  email: '',
  phone: '',
  subject: '',
  booking_type: PHOTOGRAPHY_SERVICES[0],
  package: PHOTOGRAPHY_PACKAGES[0],
  start_date: '',
  end_date: '',
  location: '',
  message: '',
  payment_method: PAYMENT_METHODS[0],
  status: 'pending',
  payment_status: 'unpaid',
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call to /Booking
    setTimeout(() => {
      console.log('Form submitted to /Booking with payload:', formData);
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
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
    <div className="bg-white bg-opacity-10 backdrop-blur-md text-white p-4 p-md-5 rounded-3 shadow-lg border border-white border-opacity-25">
      <div className="text-center mb-5">
        <CameraIcon className="mx-auto mb-3 text-info"/>
        <h1 className="display-4 fw-bold">Asha Lenscraft</h1>
        <p className="text-white-50 mt-2 fs-5">Book Your Photoshoot</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row g-4 mb-3">
          <div className="col-md-6">
            <Label htmlFor="full_name">Full Name</Label>
            <Input id="full_name" name="full_name" type="text" value={formData.full_name} onChange={handleChange} placeholder="e.g. John Doe" required />
          </div>
          <div className="col-md-6">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="e.g. john.doe@example.com" required />
          </div>
        </div>

        <div className="row g-4 mb-3">
            <div className="col-md-6">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="e.g. +1 234 567 890" required />
            </div>
            <div className="col-md-6">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" name="subject" type="text" value={formData.subject} onChange={handleChange} placeholder="e.g. Wedding Photoshoot" required />
            </div>
        </div>

        <div className="row g-4 mb-3">
            <div className="col-md-6">
                <Label htmlFor="booking_type">Booking Type</Label>
                <Select id="booking_type" name="booking_type" value={formData.booking_type} onChange={handleChange} required>
                {PHOTOGRAPHY_SERVICES.map(service => (
                    <option key={service} value={service}>{service}</option>
                ))}
                </Select>
            </div>
             <div className="col-md-6">
                <Label htmlFor="package">Select Package</Label>
                <Select id="package" name="package" value={formData.package} onChange={handleChange} required>
                {PHOTOGRAPHY_PACKAGES.map(pkg => (
                    <option key={pkg} value={pkg}>{pkg}</option>
                ))}
                </Select>
            </div>
        </div>

        <div className="row g-4 mb-3">
          <div className="col-md-6">
            <Label htmlFor="start_date">Start Date</Label>
            <Input id="start_date" name="start_date" type="date" value={formData.start_date} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <Label htmlFor="end_date">End Date (Optional)</Label>
            <Input id="end_date" name="end_date" type="date" value={formData.end_date} onChange={handleChange} />
          </div>
        </div>
        
        <div className="row g-4 mb-3">
            <div className="col-md-6">
                <Label htmlFor="location">Location / Venue</Label>
                <Input id="location" name="location" type="text" value={formData.location} onChange={handleChange} placeholder="e.g. Central Park, NYC" required />
            </div>
            <div className="col-md-6">
                <Label htmlFor="payment_method">Payment Method</Label>
                <Select id="payment_method" name="payment_method" value={formData.payment_method} onChange={handleChange} required>
                {PAYMENT_METHODS.map(method => (
                    <option key={method} value={method}>{method}</option>
                ))}
                </Select>
            </div>
        </div>

        <div className="mb-4">
          <Label htmlFor="message">Message / Details</Label>
          <Textarea 
            id="message" 
            name="message" 
            rows={4} 
            value={formData.message} 
            onChange={handleChange} 
            placeholder="Tell us more about your event, desired style, or any specific requests." 
          />
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
