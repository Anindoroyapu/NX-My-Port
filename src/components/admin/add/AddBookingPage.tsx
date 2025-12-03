"use client";
import { useTemplate } from "@/contexts/TemplateProvider";
import { handleAxiosError } from "@/utils/handleAxiosError";
import useApi from "@/utils/useApi";
import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";

interface BookingData {
  full_name: string;
  email: string;
  phone: string;
  subject: string;
  booking_type: string;
  start_date: string;
  end_date: string;
  location: string;
  message: string;
  package: string;
  total_cost: number;
  booking_cost: number;
  payment_method: string;
  status: string;
  payment_status: string;
}

const AddBookingPage = () => {
  const { setMessage } = useTemplate();
  const [formData, setFormData] = useState<BookingData>({
    full_name: "",
    email: "",
    phone: "",
    subject: "",
    booking_type: "",
    start_date: "",
    end_date: "",
    location: "",
    message: "",
    package: "",
    total_cost: 0,
    booking_cost: 0,
    payment_method: "",
    status: "pending",
    payment_status: "unpaid",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "total_cost" || name === "booking_cost"
          ? parseFloat(value) || 0
          : value,
    });
  };
  const { post } = useApi();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // e.preventDefault();
    // try {
    //   const { message } = await post<any>(`Booking`, {
    //     fullName: formData.full_name,
    //     email: formData.email,
    //     phone: formData.phone,
    //     subject: formData.subject,
    //     bookingType: formData.booking_type,
    //     startDate: formData.start_date,
    //     endDate: formData.end_date,
    //     location: formData.location,
    //     message: formData.message,
    //     package: formData.package,
    //     totalCost: formData.total_cost,
    //     bookingCost: formData.booking_cost,
    //     paymentMethodE: formData.payment_method,
    //     status: formData.status,
    //     paymentStatus: formData.payment_status,
    //   });
    //   setMessage("success", message);
    // } catch (ex) {
    //   setMessage("error", handleAxiosError(ex));
    // }

    await fetch("http://admin.ashaa.xyz/api/Booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  };

  return (
    <div className=" bg-white ">
      <Card className=" border-0">
        <Card.Header className="bg-primary text-white">
          <h3 className="mb-0">Add New Booking</h3>
        </Card.Header>

        <Card.Body className="">
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="">
                  <Form.Label>Full Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="">
                  <Form.Label>Email *</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Phone *</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Booking Type *</Form.Label>
                  <Form.Select
                    name="booking_type"
                    value={formData.booking_type}
                    onChange={handleChange}
                    required
                  >
                    <option value="portrait">Portrait</option>
                    <option value="wedding">Wedding</option>
                    <option value="event">Event</option>
                    <option value="corporate">Corporate</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Package</Form.Label>
                  <Form.Control
                    type="text"
                    name="package"
                    value={formData.package}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Start Date *</Form.Label>
                  <Form.Control
                    type="date"
                    name="start_date"
                    value={formData.start_date}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>End Date *</Form.Label>
                  <Form.Control
                    type="date"
                    name="end_date"
                    value={formData.end_date}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Location *</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Total Cost *</Form.Label>
                  <Form.Control
                    type="number"
                    name="total_cost"
                    value={formData.total_cost}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Booking Cost *</Form.Label>
                  <Form.Control
                    type="number"
                    name="booking_cost"
                    value={formData.booking_cost}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Payment Method</Form.Label>
                  <Form.Select
                    name="payment_method"
                    value={formData.payment_method}
                    onChange={handleChange}
                  >
                    <option value="">Select Method</option>
                    <option value="cash">Cash</option>
                    <option value="card">Card</option>
                    <option value="bank_transfer">Bank Transfer</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row> */}

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="completed">Completed</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Payment Status</Form.Label>
                  <Form.Select
                    name="payment_status"
                    value={formData.payment_status}
                    onChange={handleChange}
                  >
                    <option value="unpaid">Unpaid</option>
                    <option value="paid">Paid</option>
                    <option value="partial">Partial</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            {/* <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="message"
                value={formData.message}
                onChange={handleChange}
              />
            </Form.Group> */}

            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <Button variant="secondary" type="button" className="px-4">
                Cancel
              </Button>
              <Button variant="primary" type="submit" className="px-4">
                Add Booking
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AddBookingPage;
