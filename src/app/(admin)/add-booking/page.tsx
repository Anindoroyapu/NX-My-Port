import AddBookingPage from "@/components/admin/add/AddBookingPage";
import Wrapper from "@/layouts/Wrapper";
import React from "react";

const page = () => {
  return (
    <Wrapper>
      {/* <div className=" bg-white p-4 text-black overflow-auto h-full"> */}
      <AddBookingPage />
      {/* </div> */}
    </Wrapper>
  );
};

export default page;
