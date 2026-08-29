"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import { useEffect, useState } from "react";

type Stats = {
  totalBookings: number;
  totalRevenue: number;
  totalContacts: number;
  totalVisitors: number;
  totalLeads: number;
};

type RecentBooking = {
  id: number;
  fullName: string;
  email: string;
  bookingType: string;
  status: string;
  created_at: string;
};

type RecentContact = {
  id: number;
  fullName: string;
  email: string;
  subject: string;
  created_at: string;
};

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentBookings, setRecentBookings] = useState<RecentBooking[]>([]);
  const [recentContacts, setRecentContacts] = useState<RecentContact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((res) => {
        if (res.error === 0) {
          setStats(res.data.stats);
          setRecentBookings(res.data.recentBookings);
          setRecentContacts(res.data.recentContacts);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="size-8 animate-spin rounded-full border-4 border-amber-400 border-t-transparent" />
      </div>
    );
  }

  const cards = [
    { label: "Total Bookings", value: stats?.totalBookings ?? 0, color: "from-blue-500 to-blue-600" },
    { label: "Revenue", value: `$${Number(stats?.totalRevenue ?? 0).toLocaleString()}`, color: "from-green-500 to-green-600" },
    { label: "Messages", value: stats?.totalContacts ?? 0, color: "from-purple-500 to-purple-600" },
    { label: "Visitors", value: stats?.totalVisitors ?? 0, color: "from-orange-500 to-orange-600" },
    { label: "Leads", value: stats?.totalLeads ?? 0, color: "from-pink-500 to-pink-600" },
  ];

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
          <h1 className="text-lg sm:text-xl font-semibold text-slate-800">Dashboard</h1>
        </header>

        <main className="flex-1 p-3 sm:p-4 lg:p-6">
          <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {cards.map((card) => (
              <div
                key={card.label}
                className={`rounded-xl bg-gradient-to-br ${card.color} p-4 sm:p-5 text-white shadow-lg`}
              >
                <p className="text-xs sm:text-sm font-medium text-white/80 truncate">{card.label}</p>
                <p className="mt-1 sm:mt-2 text-xl sm:text-2xl lg:text-3xl font-bold truncate">{card.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 sm:mt-6 lg:mt-8 grid gap-4 sm:gap-6 lg:grid-cols-2">
            <div className="rounded-xl border bg-white p-4 sm:p-6 shadow-sm">
              <h2 className="mb-3 sm:mb-4 text-base sm:text-lg font-semibold text-slate-800">Recent Bookings</h2>
              {recentBookings.length === 0 ? (
                <p className="text-sm text-slate-500">No bookings yet.</p>
              ) : (
                <div className="space-y-2 sm:space-y-3">
                  {recentBookings.map((b) => (
                    <div key={b.id} className="flex items-center justify-between rounded-lg border p-3 sm:p-3 gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-slate-800 truncate">{b.fullName}</p>
                        <p className="text-xs text-slate-500 truncate">{b.email}</p>
                      </div>
                      <span className="shrink-0 rounded-full bg-amber-100 px-2.5 sm:px-3 py-1 text-xs font-medium text-amber-700 whitespace-nowrap">
                        {b.status || "pending"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-xl border bg-white p-4 sm:p-6 shadow-sm">
              <h2 className="mb-3 sm:mb-4 text-base sm:text-lg font-semibold text-slate-800">Recent Messages</h2>
              {recentContacts.length === 0 ? (
                <p className="text-sm text-slate-500">No messages yet.</p>
              ) : (
                <div className="space-y-2 sm:space-y-3">
                  {recentContacts.map((c) => (
                    <div key={c.id} className="rounded-lg border p-3 sm:p-3">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-medium text-slate-800 truncate">{c.fullName}</p>
                        <span className="shrink-0 text-xs text-slate-400">{new Date(c.created_at).toLocaleDateString()}</span>
                      </div>
                      <p className="mt-1 text-xs text-slate-500 truncate">{c.subject || c.email}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
