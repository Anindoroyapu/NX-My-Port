import BookingListPage from "@/components/booking/BookingListPage";
import Wrapper from "@/layouts/Wrapper";
import React from "react";

const Page = () => {
  return (
    <Wrapper>
      <div className="h-screen bg-white p-4 text-black">
        <BookingListPage />
      </div>
    </Wrapper>
  );
};

export default Page;
