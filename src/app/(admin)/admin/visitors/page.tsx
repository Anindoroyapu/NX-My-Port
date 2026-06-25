"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import { useEffect, useMemo, useState } from "react";

type Visitor = {
  id: number;
  ip_address: string;
  user_agent: string;
  page_url: string;
  referrer: string;
  location: string;
  browser_language: string;
  timezone: string;
  screen_resolution: string;
  platform: string;
  created_at: string;
};

export default function AdminVisitors() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 15;

  useEffect(() => {
    fetch("/api/admin/visitors")
      .then((r) => r.json())
      .then((res) => {
        if (res.error === 0) setVisitors(res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return visitors.filter((v) =>
      !q ||
      v.ip_address?.toLowerCase().includes(q) ||
      v.location?.toLowerCase().includes(q) ||
      v.page_url?.toLowerCase().includes(q) ||
      v.platform?.toLowerCase().includes(q)
    );
  }, [visitors, search]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

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
          <h1 className="text-xl font-semibold text-slate-800">Visitors</h1>
        </header>

        <main className="flex-1 p-6">
          <div className="rounded-xl border bg-white shadow-sm">
            <div className="border-b px-6 py-4">
              <input
                type="text"
                placeholder="Search by IP, location, page..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 sm:w-72"
              />
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="size-8 animate-spin rounded-full border-4 border-amber-400 border-t-transparent" />
              </div>
            ) : paginated.length === 0 ? (
              <div className="py-20 text-center text-sm text-slate-500">No visitors found.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      <th className="px-4 py-3">IP</th>
                      <th className="px-4 py-3">Location</th>
                      <th className="px-4 py-3">Page</th>
                      <th className="px-4 py-3">Platform</th>
                      <th className="px-4 py-3">Timezone</th>
                      <th className="px-4 py-3">Screen</th>
                      <th className="px-4 py-3">Visited</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginated.map((v) => (
                      <tr key={v.id} className="border-b last:border-0 hover:bg-slate-50">
                        <td className="px-4 py-3 font-mono text-xs text-slate-700">{v.ip_address}</td>
                        <td className="px-4 py-3 text-slate-600">{v.location || "--"}</td>
                        <td className="max-w-[200px] truncate px-4 py-3 text-slate-600" title={v.page_url}>
                          {v.page_url || "--"}
                        </td>
                        <td className="px-4 py-3 text-slate-600">{v.platform || "--"}</td>
                        <td className="px-4 py-3 text-xs text-slate-500">{v.timezone || "--"}</td>
                        <td className="px-4 py-3 text-xs text-slate-500">{v.screen_resolution || "--"}</td>
                        <td className="whitespace-nowrap px-4 py-3 text-xs text-slate-500">
                          {new Date(v.created_at).toLocaleString()}
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
