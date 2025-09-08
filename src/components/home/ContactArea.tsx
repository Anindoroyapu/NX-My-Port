"use client";
import { useTemplate } from "@/contexts/TemplateProvider";
import { handleAxiosError } from "@/utils/handleAxiosError";
import useApi from "@/utils/useApi";
import React, { useState } from "react";

export default function ContactArea() {
  const { post } = useApi();
  const { setMessage } = useTemplate();

  type TFormData = {
    fullName: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
  };

  const [formData, setFormData] = useState<TFormData>({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const handleContact = async () => {
    try {
      const { message } = await post<any>(`Booking`, {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      });
      setMessage("success", message);
    } catch (ex) {
      setMessage("error", handleAxiosError(ex));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <section id="contact" className="contact-area">
      <div className="container">
        <div className="row">
          <div className="col-xl-12 col-lg-12">
            <div className="section-title section-black-title wow fadeInUp delay-0-2s">
              <h2>Contact Me</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4">
            <div className="contact-content-part  wow fadeInUp delay-0-2s">
              <div className="single-contact wow fadeInUp" data-wow-delay=".2s">
                <span className="circle-btn">
                  <i className="ri-map-pin-line"></i>
                </span>
                <h2>our office:</h2>
                <p>KUET IT Park, KUET , Khulna</p>
              </div>

              <div className="single-contact wow fadeInUp" data-wow-delay=".4s">
                <span className="circle-btn">
                  <i className="ri-headphone-line"></i>
                </span>
                <h2>contact number:</h2>
                <p>+880 1533 780593</p>
              </div>

              <div className="single-contact wow fadeInUp" data-wow-delay=".6s">
                <span className="circle-btn">
                  <i className="ri-mail-line"></i>
                </span>
                <h2>Email us:</h2>
                <p>anindoroy112@gmail.com</p>
              </div>

              <div className="single-contact wow fadeInUp" data-wow-delay=".6s">
                <h2>Socials</h2>
                <div className="about-social">
                  <ul>
                    <li>
                      <a
                        target="_blank"
                        href="https://www.facebook.com/anindoroy441/"
                      >
                        <i className="ri-facebook-circle-fill"></i>
                      </a>
                    </li>

                    <li>
                      <a
                        target="_blank"
                        href="https://www.linkedin.com/in/anindo-roy-791026256"
                      >
                        <i className="ri-linkedin-fill"></i>
                      </a>
                    </li>
                    <li>
                      <a target="_blank" href="https://github.com/anindoroyapu">
                        <i className="ri-github-line"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="contact-form contact-form-area wow fadeInUp delay-0-4s">
              <div
                // id="contactForm"
                className="contact-form"
                onSubmit={handleContact}
              >
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <input
                        type="text"
                        id="fullName"
                        className="form-control"
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
                  <div className="col-md-12">
                    <div className="form-group mb-0">
                      <button
                        type="submit"
                        className="theme-btn"
                        onClick={handleContact}
                      >
                        Send Me Message <i className="ri-mail-line"></i>
                      </button>
                      {/* <div id="msgSubmit" className="hidden"></div> */}
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
        </div>
      </div>
    </section>
  );
}
