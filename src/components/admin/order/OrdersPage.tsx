"use client";
import { useMemo, useState } from "react";
import StatusBadge from "./StatusBadge";

const OrdersPage = () => {
  const allOrders = [
    {
      id: "#12345",
      customer: "John Doe",
      date: "2024-07-29",
      total: "$150.00",
      status: "Shipped",
    },
    {
      id: "#12346",
      customer: "Jane Smith",
      date: "2024-07-29",
      total: "$75.50",
      status: "Processing",
    },
    {
      id: "#12347",
      customer: "Mike Johnson",
      date: "2024-07-28",
      total: "$220.10",
      status: "Delivered",
    },
    {
      id: "#12348",
      customer: "Emily Brown",
      date: "2024-07-28",
      total: "$45.00",
      status: "Shipped",
    },
    {
      id: "#12349",
      customer: "Chris Lee",
      date: "2024-07-27",
      total: "$300.75",
      status: "Pending",
    },
    {
      id: "#12350",
      customer: "Sarah Wilson",
      date: "2024-07-27",
      total: "$99.99",
      status: "Cancelled",
    },
    {
      id: "#12351",
      customer: "David Martinez",
      date: "2024-07-26",
      total: "$12.00",
      status: "Delivered",
    },
    {
      id: "#12352",
      customer: "Jessica Taylor",
      date: "2024-07-26",
      total: "$180.25",
      status: "Shipped",
    },
    {
      id: "#12353",
      customer: "James Anderson",
      date: "2024-07-25",
      total: "$25.50",
      status: "Processing",
    },
    {
      id: "#12354",
      customer: "Linda Thomas",
      date: "2024-07-25",
      total: "$500.00",
      status: "Delivered",
    },
    {
      id: "#12355",
      customer: "Robert Jackson",
      date: "2024-07-24",
      total: "$85.00",
      status: "Pending",
    },
    {
      id: "#12356",
      customer: "Patricia White",
      date: "2024-07-24",
      total: "$19.99",
      status: "Shipped",
    },
    {
      id: "#12357",
      customer: "Charles Harris",
      date: "2024-07-23",
      total: "$230.00",
      status: "Cancelled",
    },
    {
      id: "#12358",
      customer: "Mary Martin",
      date: "2024-07-23",
      total: "$65.70",
      status: "Delivered",
    },
    {
      id: "#12359",
      customer: "Joseph Thompson",
      date: "2024-07-22",
      total: "$92.00",
      status: "Processing",
    },
    {
      id: "#12360",
      customer: "Jennifer Garcia",
      date: "2024-07-22",
      total: "$110.00",
      status: "Shipped",
    },
    {
      id: "#12361",
      customer: "Daniel Rodriguez",
      date: "2024-07-21",
      total: "$42.50",
      status: "Delivered",
    },
    {
      id: "#12362",
      customer: "William Martinez",
      date: "2024-07-21",
      total: "$14.99",
      status: "Pending",
    },
    {
      id: "#12363",
      customer: "Susan Robinson",
      date: "2024-07-20",
      total: "$78.00",
      status: "Shipped",
    },
    {
      id: "#12364",
      customer: "Donald Clark",
      date: "2024-07-20",
      total: "$199.50",
      status: "Processing",
    },
  ];

  const ORDERS_PER_PAGE = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredOrders = useMemo(() => {
    return allOrders
      .filter((order) => {
        if (statusFilter === "All") return true;
        return order.status === statusFilter;
      })
      .filter((order) => {
        const term = searchTerm.toLowerCase();
        return (
          order.id.toLowerCase().includes(term) ||
          order.customer.toLowerCase().includes(term)
        );
      });
  }, [statusFilter, searchTerm]);

  const totalPages = Math.ceil(filteredOrders.length / ORDERS_PER_PAGE);

  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * ORDERS_PER_PAGE;
    return filteredOrders.slice(startIndex, startIndex + ORDERS_PER_PAGE);
  }, [filteredOrders, currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const allStatuses = [
    "All",
    "Shipped",
    "Processing",
    "Delivered",
    "Pending",
    "Cancelled",
  ];

  return (
    <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl font-semibold text-slate-800 shrink-0">
          All Orders
        </h2>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search by ID or Customer..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-full sm:w-48"
          />
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white w-full sm:w-auto"
          >
            {allStatuses.map((status) => (
              <option key={status} value={status}>
                {status === "All" ? "All Statuses" : status}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="p-4 font-bold text-slate-500 uppercase text-xs tracking-wider">
                Order ID
              </th>
              <th className="p-4 font-bold text-slate-500 uppercase text-xs tracking-wider">
                Customer
              </th>
              <th className="p-4 font-bold text-slate-500 uppercase text-xs tracking-wider">
                Date
              </th>
              <th className="p-4 font-bold text-slate-500 uppercase text-xs tracking-wider">
                Total
              </th>
              <th className="p-4 font-bold text-slate-500 uppercase text-xs tracking-wider">
                Status
              </th>
              <th className="p-4 font-bold text-slate-500 uppercase text-xs tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.length > 0 ? (
              paginatedOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-slate-200 last:border-b-0 hover:bg-slate-50"
                >
                  <td className="p-4 text-slate-700 font-medium">{order.id}</td>
                  <td className="p-4 text-slate-700">{order.customer}</td>
                  <td className="p-4 text-slate-700">{order.date}</td>
                  <td className="p-4 text-slate-700">{order.total}</td>
                  <td className="p-4">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="p-4 text-sm font-medium text-blue-600 hover:underline cursor-pointer">
                    View Details
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                {/* FIX: Changed colSpan to be a number */}
                <td colSpan={6} className="text-center p-8 text-slate-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
          <span className="text-sm text-slate-600">
            Page {currentPage} of {totalPages} ({filteredOrders.length} total
            orders)
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="bg-white border border-slate-300 text-slate-700 font-bold py-2 px-4 rounded-md text-sm hover:bg-slate-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="bg-white border border-slate-300 text-slate-700 font-bold py-2 px-4 rounded-md text-sm hover:bg-slate-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
