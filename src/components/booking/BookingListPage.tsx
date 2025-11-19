"use client";
import React from "react";
import { handleAxiosError } from "@/utils/handleAxiosError";
import useApi from "@/utils/useApi";

type Booking = {
  id?: string | number;
  name?: string;
  email?: string;
  date?: string;
  status?: "approved" | "pending" | "rejected" | string;
  code?: string;
  initials?: string;
  color?: string;
};

const BookingListPage = () => {
  const { get } = useApi();

  const [bookings, setBookings] = React.useState<Booking[]>([]);
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [perPage, setPerPage] = React.useState<number>(10);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await get<any>("Booking");
        const list: Booking[] = Array.isArray(res)
          ? res
          : Array.isArray(res?.data)
          ? res.data
          : [];
        setBookings(list);
      } catch (ex) {
        console.error(handleAxiosError(ex));
      }
    };
    fetchData();
  }, [get]);

  const normalized = (s?: string | number) =>
    String(s ?? "").toLowerCase().trim();

  const filtered = React.useMemo(() => {
    const q = normalized(search);
    return bookings.filter((b) => {
      if (statusFilter !== "all" && normalized(b.status) !== statusFilter) {
        return false;
      }
      if (!q) return true;
      return (
        normalized(b.name).includes(q) ||
        normalized(b.email).includes(q) ||
        normalized(b.code).includes(q) ||
        normalized(b.id).includes(q)
      );
    });
  }, [bookings, search, statusFilter]);

  const visible = filtered.slice(0, perPage);

  return (
    <div className="max-w-7xl mx-auto my-6 px-4">
      <div className="bg-white shadow rounded-md overflow-hidden">
        <header className="px-5 py-4 bg-white flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold m-0">Booking List</h3>
              <span className="text-sm text-gray-500">
                Manage bookings, approvals & exports
              </span>
            </div>
            <nav aria-label="breadcrumb" className="mt-2">
              <ol className="flex gap-2 text-sm text-gray-500">
                <li>
                  <a href="#" className="hover:underline">
                    Home
                  </a>
                </li>
                <li aria-current="page" className="text-gray-400">
                  /
                </li>
                <li className="text-gray-700">Bookings</li>
              </ol>
            </nav>
          </div>

          <div className="flex gap-2">
            <button className="inline-flex items-center gap-2 bg-green-600 text-white px-3 py-1.5 rounded hover:bg-green-700">
              <span className="text-xl leading-none">＋</span>
              <span>Add Booking</span>
            </button>
            <button
              className="border border-gray-300 text-gray-700 px-3 py-1.5 rounded hover:bg-gray-50"
              title="Refresh list"
              onClick={() => {
                (async () => {
                  try {
                    const res = await get<any>("Booking");
                    const list: Booking[] = Array.isArray(res)
                      ? res
                      : Array.isArray(res?.data)
                      ? res.data
                      : [];
                    setBookings(list);
                  } catch (ex) {
                    console.error(handleAxiosError(ex));
                  }
                })();
              }}
            >
              ⟳ Refresh
            </button>
          </div>
        </header>

        <div className="px-5 py-6">
          {/* Controls */}
          <div className="flex flex-col md:flex-row md:items-center gap-3 mb-5">
            <div className="flex-1">
              <div className="flex items-center bg-white border border-gray-200 rounded shadow-sm overflow-hidden">
                <span className="px-3 text-gray-500">🔍</span>
                <input
                  className="flex-1 px-3 py-2 outline-none"
                  placeholder="Search bookings by name, id or email..."
                  type="search"
                  aria-label="Search bookings"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  className="px-3 text-gray-500 hover:bg-gray-100"
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setSearch("")}
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="w-36">
              <select
                className="w-full border border-gray-200 rounded px-2 py-2 text-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                aria-label="Filter by status"
              >
                <option value="all">All status</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div className="w-36">
              <select
                className="w-full border border-gray-200 rounded px-2 py-2 text-sm"
                value={String(perPage)}
                onChange={(e) => setPerPage(Number(e.target.value))}
                aria-label="Results per page"
              >
                <option value="10">10 / page</option>
                <option value="20">20 / page</option>
                <option value="50">50 / page</option>
              </select>
            </div>

            <div className="ml-auto">
              <div className="inline-flex gap-2">
                <button className="px-3 py-1.5 border border-blue-400 text-blue-600 rounded text-sm">
                  CSV
                </button>
                <button className="px-3 py-1.5 border border-blue-400 text-blue-600 rounded text-sm">
                  PDF
                </button>
              </div>
            </div>
          </div>

          {/* List / Table */}
          <div className="overflow-x-auto rounded-md border border-gray-100">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left w-10">
                    <input aria-label="select all" type="checkbox" />
                  </th>
                  <th className="px-4 py-3 text-left">Booking</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-100">
                {visible.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center text-gray-500 py-8">
                      No bookings found
                    </td>
                  </tr>
                ) : (
                  visible.map((b, idx) => {
                    const initials =
                      b.initials ??
                      (b.name
                        ? b.name
                            .split(" ")
                            .map((s) => s[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()
                        : "BK");
                    const colorClass =
                      b.color === "warning"
                        ? "bg-yellow-400 text-black"
                        : b.color === "danger"
                        ? "bg-red-600 text-white"
                        : "bg-blue-600 text-white";
                    return (
                      <tr
                        key={b.id ?? idx}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-4 py-4">
                          <input
                            type="checkbox"
                            aria-label={`select booking ${b.id ?? idx}`}
                          />
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-4">
                            <div
                              className={`${colorClass} rounded-full inline-flex items-center justify-center`}
                              style={{ width: 44, height: 44, fontWeight: 600 }}
                              aria-hidden
                            >
                              {initials}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">
                                {b.name ?? `Booking ${b.id ?? ""}`}
                              </div>
                              <div className="text-sm text-gray-500">
                                {b.name ?? "No name"} • {b.email ?? "—"}
                              </div>
                              <div className="text-sm text-gray-400">
                                {b.code ??
                                  `#BK-${String(b.id ?? "").padStart(5, "0")}`}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                          {b.date ?? "—"}
                        </td>
                        <td className="px-4 py-4">
                          {String(b.status).toLowerCase() === "approved" ? (
                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm">
                              Approved
                            </span>
                          ) : String(b.status).toLowerCase() === "pending" ? (
                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm">
                              Pending
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-800 text-sm">
                              {b.status ? b.status : "Unknown"}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-4 text-right">
                          <div className="inline-flex gap-2">
                            <button className="px-2 py-1 text-sm border border-blue-300 text-blue-700 rounded">
                              View
                            </button>
                            <button className="px-2 py-1 text-sm bg-green-600 text-white rounded">
                              Approve
                            </button>
                            <button className="px-2 py-1 text-sm bg-red-600 text-white rounded">
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Bulk actions & pagination */}
          <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-sm border border-red-300 text-red-600 rounded">
                Delete Selected
              </button>
              <button className="px-3 py-1.5 text-sm border border-yellow-300 text-yellow-700 rounded">
                Mark as Read
              </button>
              <button
                className="px-3 py-1.5 text-sm border border-gray-300 rounded"
                onClick={() => {
                  setSearch("");
                  setStatusFilter("all");
                }}
              >
                Clear Filters
              </button>
            </div>

            <div className="flex items-center gap-4">
              <small className="text-sm text-gray-500">
                Showing {visible.length} of {filtered.length} matching bookings
              </small>

              <nav aria-label="Bookings pagination">
                <div className="inline-flex items-center gap-1">
                  <button className="px-3 py-1 border border-gray-200 rounded text-sm">
                    Previous
                  </button>
                  <span className="px-3 py-1 bg-gray-100 rounded text-sm">1</span>
                  <button className="px-3 py-1 border border-gray-200 rounded text-sm">
                    2
                  </button>
                  <button className="px-3 py-1 border border-gray-200 rounded text-sm">
                    Next
                  </button>
                </div>
              </nav>
            </div>
          </div>
        </div>

        <footer className="px-5 py-3 bg-white border-t border-gray-100 flex items-center justify-between">
          <small className="text-sm text-gray-500">
            Tip: Use search or filters to quickly find bookings
          </small>
          <div className="flex gap-3">
            <button className="text-sm text-gray-500 hover:underline">Help</button>
            <button className="text-sm text-gray-500 hover:underline">Privacy</button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default BookingListPage;
