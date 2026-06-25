"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import { useEffect, useMemo, useState } from "react";

type Booking = {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  bookingType: string;
  startDate: string;
  endDate: string;
  location: string;
  message: string;
  package_name: string;
  paymentMethod: string;
  status: string;
  paymentStatus: string;
  bookingCost: string;
  totalCost: string;
  created_at: string;
};

export default function AdminBookings() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    fetch("/api/admin/bookings")
      .then((r) => r.json())
      .then((res) => {
        if (res.error === 0) setBookings(res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return bookings.filter((b) => {
      if (statusFilter !== "all" && b.status !== statusFilter) return false;
      if (!q) return true;
      return (
        b.fullName.toLowerCase().includes(q) ||
        b.email.toLowerCase().includes(q) ||
        String(b.id).includes(q)
      );
    });
  }, [bookings, search, statusFilter]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const updateStatus = async (id: number, status: string) => {
    await fetch("/api/admin/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
  };

  const deleteBooking = async (id: number) => {
    if (!confirm("Delete this booking?")) return;
    await fetch("/api/admin/bookings", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  const statusClass = (s: string) =>
    s === "approved"
      ? "bg-green-100 text-green-700"
      : s === "rejected"
      ? "bg-red-100 text-red-700"
      : "bg-amber-100 text-amber-700";

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-1 flex-col lg:ml-64">
        <header className="sticky top-0 z-20 flex h-14 sm:h-16 items-center gap-3 border-b bg-white px-4 sm:px-6 shadow-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden rounded-lg p-2 text-slate-600 hover:bg-slate-100 active:bg-slate-200 min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <svg className="size-5 sm:size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-lg sm:text-xl font-semibold text-slate-800">Bookings</h1>
        </header>

        <main className="flex-1 p-3 sm:p-4 lg:p-6">
          <div className="rounded-xl border bg-white shadow-sm">
            <div className="flex flex-col gap-3 border-b px-4 sm:px-6 py-3 sm:py-4 sm:flex-row sm:items-center sm:justify-between">
              <input
                type="text"
                placeholder="Search by name, email or ID..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 sm:w-72 min-h-[44px]"
              />
              <select
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-amber-400 sm:w-40 min-h-[44px]"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-16 sm:py-20">
                <div className="size-8 animate-spin rounded-full border-4 border-amber-400 border-t-transparent" />
              </div>
            ) : paginated.length === 0 ? (
              <div className="py-16 sm:py-20 text-center text-sm text-slate-500">No bookings found.</div>
            ) : (
              <>
                {/* Mobile Card View */}
                <div className="block sm:hidden divide-y">
                  {paginated.map((b) => (
                    <div key={b.id} className="p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-slate-800">#{b.id} {b.fullName}</span>
                        <span className={`rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap ${statusClass(b.status || "pending")}`}>
                          {b.status || "pending"}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 space-y-1">
                        <p className="truncate">{b.email}</p>
                        <p>{b.bookingType || "--"} {b.package_name ? `• ${b.package_name}` : ""}</p>
                        <p>{b.totalCost ? `$${b.totalCost}` : "--"} • {new Date(b.created_at).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center gap-2 pt-1">
                        <select
                          value={b.status || "pending"}
                          onChange={(e) => updateStatus(b.id, e.target.value)}
                          className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs outline-none bg-white min-h-[36px]"
                        >
                          <option value="pending">Pending</option>
                          <option value="approved">Approved</option>
                          <option value="rejected">Rejected</option>
                        </select>
                        <button
                          onClick={() => deleteBooking(b.id)}
                          className="rounded-lg px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 min-h-[36px]"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop Table View */}
                <div className="hidden sm:block overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        <th className="px-4 py-3 whitespace-nowrap">ID</th>
                        <th className="px-4 py-3 whitespace-nowrap">Name</th>
                        <th className="px-4 py-3 whitespace-nowrap">Email</th>
                        <th className="px-4 py-3 whitespace-nowrap">Type</th>
                        <th className="px-4 py-3 whitespace-nowrap">Package</th>
                        <th className="px-4 py-3 whitespace-nowrap">Cost</th>
                        <th className="px-4 py-3 whitespace-nowrap">Status</th>
                        <th className="px-4 py-3 whitespace-nowrap">Date</th>
                        <th className="px-4 py-3 text-right whitespace-nowrap">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginated.map((b) => (
                        <tr key={b.id} className="border-b last:border-0 hover:bg-slate-50">
                          <td className="px-4 py-3 font-medium text-slate-700">#{b.id}</td>
                          <td className="px-4 py-3 text-slate-700 whitespace-nowrap">{b.fullName}</td>
                          <td className="px-4 py-3 text-slate-500 truncate max-w-[160px]">{b.email}</td>
                          <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{b.bookingType || "--"}</td>
                          <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{b.package_name || "--"}</td>
                          <td className="px-4 py-3 text-slate-700 whitespace-nowrap">
                            {b.totalCost ? `$${b.totalCost}` : "--"}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <select
                              value={b.status || "pending"}
                              onChange={(e) => updateStatus(b.id, e.target.value)}
                              className={`rounded-full px-3 py-1 text-xs font-medium outline-none ${statusClass(b.status || "pending")}`}
                            >
                              <option value="pending">Pending</option>
                              <option value="approved">Approved</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          </td>
                          <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">
                            {new Date(b.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3 text-right whitespace-nowrap">
                            <button
                              onClick={() => deleteBooking(b.id)}
                              className="rounded-lg px-3 py-1 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 min-h-[36px]"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t px-4 sm:px-6 py-3 sm:py-4">
                <span className="text-sm text-slate-500 order-2 sm:order-1">
                  Page {page} of {totalPages} ({filtered.length} total)
                </span>
                <div className="flex gap-2 order-1 sm:order-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="rounded-lg border px-4 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-40 min-h-[44px]"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="rounded-lg border px-4 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-40 min-h-[44px]"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
