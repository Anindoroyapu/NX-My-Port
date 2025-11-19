export interface BookingFormData {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  bookingType: string;
  startDate: string;
  endDate: string;
  location: string;
  message: string;
  package: string;
  paymentMethod: string;
  status: string;
  paymentStatus: string;
  bookingCost: string;
  totalCost?: string;
}
