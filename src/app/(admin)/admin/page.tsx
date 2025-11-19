import Dashboard from "@/components/admin/order/Dashboard";
import Wrapper from "@/layouts/Wrapper";
import React from "react";

const Page = () => {
  return (
    <Wrapper>
      <div className="h-screen bg-white p-4 text-black">
        <Dashboard />
      </div>
    </Wrapper>

  );
};

export default Page;
