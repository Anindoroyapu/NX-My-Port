import { redirect } from "next/navigation";

export default function BookingListRedirect() {
  redirect("/admin/bookings");
}
