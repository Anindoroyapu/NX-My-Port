"use client";
import React, { useState } from "react";
import { BookingFormData } from "../types";
import {
  PHOTOGRAPHY_SERVICES,
  PHOTOGRAPHY_PACKAGES,
  PAYMENT_METHODS,
} from "../constants";

const initialFormData: BookingFormData = {
  fullName: "",
  email: "",
  phone: "",
  subject: "",
  bookingType: PHOTOGRAPHY_SERVICES[0],
  bookingCost: "",
  package: PHOTOGRAPHY_PACKAGES[0],
  startDate: "",
  endDate: "",
  location: "",
  message: "",
  paymentMethod: PAYMENT_METHODS[0],
  status: "pending",
  paymentStatus: "unpaid",
  totalCost: "",
};

const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState<BookingFormData>(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const payload = {
        ...formData,
        status: "pending",
        paymentStatus: "unpaid",
      };

      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const responseBody = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(
          responseBody?.message || "Unable to save your booking request.",
        );
      }

      setIsSubmitted(true);
      setFormData(initialFormData);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Error submitting booking form";
      setErrorMessage(message);
      console.error("Error submitting booking form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="contact-area relative">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="contact-form contact-form-area wow fadeInUp delay-0-4s bg-white rounded-4 shadow-lg p-4 p-md-5 text-center">
                <span className="circle-btn mx-auto mb-3 d-flex align-items-center justify-content-center">
                  <i className="ri-checkbox-circle-line"></i>
                </span>
                <h2>Booking Saved</h2>
                <p className="mb-4">
                  Your booking request has been stored in the database. We will
                  review it and get back to you soon.
                </p>
                <button
                  type="button"
                  className="theme-btn"
                  onClick={() => {
                    setIsSubmitted(false);
                    setErrorMessage(null);
                    setFormData(initialFormData);
                  }}
                >
                  Make Another Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section id="booking" className="contact-area relative">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="contact-content-part wow fadeInUp delay-0-2s">
              <div className="single-contact wow fadeInUp" data-wow-delay=".2s">
                <span className="circle-btn">
                  <i className="ri-camera-line"></i>
                </span>
                <h2>our service:</h2>
                <p>Wedding, Portrait, Event, Family, and Product Photography</p>
              </div>

              <div className="single-contact wow fadeInUp" data-wow-delay=".4s">
                <span className="circle-btn">
                  <i className="ri-calendar-2-line"></i>
                </span>
                <h2>booking note:</h2>
                <p>
                  Submit your date, location, and package details and we will
                  save it to the booking table.
                </p>
              </div>

              <div className="single-contact wow fadeInUp" data-wow-delay=".6s">
                <span className="circle-btn">
                  <i className="ri-mail-line"></i>
                </span>
                <h2>Email us:</h2>
                <p>Use the form on the right to send a booking request</p>
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="contact-form contact-form-area wow fadeInUp delay-0-4s">
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="fullName">Full Name</label>
                      <input
                        type="text"
                        id="fullName"
                        className="form-control"
                        value={formData.fullName}
                        placeholder="Steve Milner"
                        name="fullName"
                        onChange={handleChange}
                      />
                      <label htmlFor="fullName" className="for-icon">
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
                        name="phone"
                        onChange={handleChange}
                      />
                      <label htmlFor="phone" className="for-icon">
                        <i className="far fa-phone"></i>
                      </label>
                      <div className="help-block with-errors"></div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="subject">Subject</label>
                      <input
                        type="text"
                        id="subject"
                        className="form-control"
                        value={formData.subject}
                        placeholder="Wedding photoshoot"
                        name="subject"
                        onChange={handleChange}
                      />
                      <label htmlFor="subject" className="for-icon">
                        <i className="far fa-file-lines"></i>
                      </label>
                      <div className="help-block with-errors"></div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="bookingType">Service Type</label>
                      <select
                        id="bookingType"
                        className="form-control"
                        value={formData.bookingType}
                        name="bookingType"
                        onChange={handleChange}
                      >
                        {PHOTOGRAPHY_SERVICES.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                      <label htmlFor="bookingType" className="for-icon">
                        <i className="far fa-camera"></i>
                      </label>
                      <div className="help-block with-errors"></div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="package">Package</label>
                      <select
                        id="package"
                        className="form-control"
                        value={formData.package}
                        name="package"
                        onChange={handleChange}
                      >
                        {PHOTOGRAPHY_PACKAGES.map((pkg) => (
                          <option key={pkg} value={pkg}>
                            {pkg}
                          </option>
                        ))}
                      </select>
                      <label htmlFor="package" className="for-icon">
                        <i className="far fa-box"></i>
                      </label>
                      <div className="help-block with-errors"></div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="startDate">Start Date</label>
                      <input
                        type="date"
                        id="startDate"
                        className="form-control"
                        value={formData.startDate}
                        name="startDate"
                        onChange={handleChange}
                      />
                      <label htmlFor="startDate" className="for-icon">
                        <i className="far fa-calendar"></i>
                      </label>
                      <div className="help-block with-errors"></div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="endDate">End Date</label>
                      <input
                        type="date"
                        id="endDate"
                        className="form-control"
                        value={formData.endDate}
                        name="endDate"
                        onChange={handleChange}
                      />
                      <label htmlFor="endDate" className="for-icon">
                        <i className="far fa-calendar-check"></i>
                      </label>
                      <div className="help-block with-errors"></div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="location">Location</label>
                      <input
                        type="text"
                        id="location"
                        className="form-control"
                        value={formData.location}
                        placeholder="Studio, venue, or city"
                        name="location"
                        onChange={handleChange}
                      />
                      <label htmlFor="location" className="for-icon">
                        <i className="far fa-location-dot"></i>
                      </label>
                      <div className="help-block with-errors"></div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="paymentMethod">Payment Method</label>
                      <select
                        id="paymentMethod"
                        className="form-control"
                        value={formData.paymentMethod}
                        name="paymentMethod"
                        onChange={handleChange}
                      >
                        {PAYMENT_METHODS.map((method) => (
                          <option key={method} value={method}>
                            {method}
                          </option>
                        ))}
                      </select>
                      <label htmlFor="paymentMethod" className="for-icon">
                        <i className="far fa-credit-card"></i>
                      </label>
                      <div className="help-block with-errors"></div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="message">Project Details</label>
                      <textarea
                        name="message"
                        id="message"
                        className="form-control"
                        rows={5}
                        value={formData.message}
                        placeholder="Tell us about the mood, guests, deliverables, or any special instructions"
                        onChange={handleChange}
                      ></textarea>
                      <div className="help-block with-errors"></div>
                    </div>
                  </div>

                  {errorMessage ? (
                    <div className="col-md-12">
                      <div className="alert alert-danger mb-0" role="alert">
                        {errorMessage}
                      </div>
                    </div>
                  ) : null}

                  <div className="col-md-12">
                    <div className="form-group mb-0">
                      <button
                        type="submit"
                        className="theme-btn"
                        disabled={isLoading}
                      >
                        {isLoading ? "Sending Request..." : "Book Now"}{" "}
                        <i className="ri-calendar-event-line"></i>
                      </button>
                      <button
                        type="button"
                        className="px-3 text-black"
                        onClick={() => setFormData(initialFormData)}
                        disabled={isLoading}
                      >
                        Reset
                      </button>
                    </div>
                  </div>

                  <div className="col-md-12 text-center">
                    <p className="input-success">
                      We have received your booking request, we will get back to
                      you soon!
                    </p>
                    <p className="input-error">
                      Sorry, booking could not send! Please try again.
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
