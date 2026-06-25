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

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-1 flex-col lg:ml-64">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b bg-white px-6 shadow-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden rounded-lg p-2 text-slate-600 hover:bg-slate-100"
          >
            <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-xl font-semibold text-slate-800">Bookings</h1>
        </header>

        <main className="flex-1 p-6">
          <div className="rounded-xl border bg-white shadow-sm">
            <div className="flex flex-col gap-4 border-b px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
              <input
                type="text"
                placeholder="Search by name, email or ID..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 sm:w-72"
              />
              <select
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm outline-none focus:border-amber-400 sm:w-40"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="size-8 animate-spin rounded-full border-4 border-amber-400 border-t-transparent" />
              </div>
            ) : paginated.length === 0 ? (
              <div className="py-20 text-center text-sm text-slate-500">No bookings found.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      <th className="px-4 py-3">ID</th>
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Email</th>
                      <th className="px-4 py-3">Type</th>
                      <th className="px-4 py-3">Package</th>
                      <th className="px-4 py-3">Cost</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Date</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginated.map((b) => (
                      <tr key={b.id} className="border-b last:border-0 hover:bg-slate-50">
                        <td className="px-4 py-3 font-medium text-slate-700">#{b.id}</td>
                        <td className="px-4 py-3 text-slate-700">{b.fullName}</td>
                        <td className="px-4 py-3 text-slate-500">{b.email}</td>
                        <td className="px-4 py-3 text-slate-600">{b.bookingType || "--"}</td>
                        <td className="px-4 py-3 text-slate-600">{b.package_name || "--"}</td>
                        <td className="px-4 py-3 text-slate-700">
                          {b.totalCost ? `$${b.totalCost}` : "--"}
                        </td>
                        <td className="px-4 py-3">
                          <select
                            value={b.status || "pending"}
                            onChange={(e) => updateStatus(b.id, e.target.value)}
                            className={`rounded-full px-3 py-1 text-xs font-medium outline-none ${
                              b.status === "approved"
                                ? "bg-green-100 text-green-700"
                                : b.status === "rejected"
                                ? "bg-red-100 text-red-700"
                                : "bg-amber-100 text-amber-700"
                            }`}
                          >
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </td>
                        <td className="px-4 py-3 text-xs text-slate-500">
                          {new Date(b.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={() => deleteBooking(b.id)}
                            className="rounded-lg px-3 py-1 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex items-center justify-between border-t px-6 py-4">
                <span className="text-sm text-slate-500">
                  Page {page} of {totalPages}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="rounded-lg border px-3 py-1.5 text-sm text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-40"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="rounded-lg border px-3 py-1.5 text-sm text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-40"
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
