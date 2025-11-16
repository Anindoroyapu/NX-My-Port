"use client";
import React, { useState, useMemo } from "react";

import SettingsPage from "./SettingsPage";
import ProductsPage from "./ProductsPage";
import AnalyticsPage from "./AnalyticsPage";
import Dashboard from "./Dashboard";
import OrdersPage from "./OrdersPage";
import Sidebar from "@/components/common/Sidebar";
import Header from "./Header";

const App = () => {
  const [activePage, setActivePage] = useState("Dashboard");
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const renderActivePage = () => {
    switch (activePage) {
      case "Dashboard":
        return <Dashboard />;
      case "Orders":
        return <OrdersPage />;
      case "Products":
        return <ProductsPage />;
      case "Customers":
        return <CustomersPage />;
      case "Analytics":
        return <AnalyticsPage />;
      case "Settings":
        return <SettingsPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column flex-lg-row position-relative">
      <Sidebar
        activePage={activePage}
        setActivePage={(page: any) => {
          setActivePage(page);
          setSidebarOpen(false); // Close sidebar on page change on mobile
        }}
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div
        className="flex-fill bg-light"
        style={{ marginLeft: window.innerWidth >= 992 ? "16rem" : "0" }}
      >
        <Header title={activePage} setSidebarOpen={setSidebarOpen} />
        <main className="p-3 p-sm-4 p-lg-5 pt-0">{renderActivePage()}</main>
      </div>
    </div>
  );
};

export default App;
