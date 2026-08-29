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
        <header className="sticky top-0 z-20 flex h-14 sm:h-16 items-center gap-3 border-b bg-white px-4 sm:px-6 shadow-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden rounded-lg p-2 text-slate-600 hover:bg-slate-100 active:bg-slate-200 min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <svg className="size-5 sm:size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-lg sm:text-xl font-semibold text-slate-800">Visitors</h1>
        </header>

        <main className="flex-1 p-3 sm:p-4 lg:p-6">
          <div className="rounded-xl border bg-white shadow-sm">
            <div className="border-b px-4 sm:px-6 py-3 sm:py-4">
              <input
                type="text"
                placeholder="Search by IP, location, page..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 sm:w-72 min-h-[44px]"
              />
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-16 sm:py-20">
                <div className="size-8 animate-spin rounded-full border-4 border-amber-400 border-t-transparent" />
              </div>
            ) : paginated.length === 0 ? (
              <div className="py-16 sm:py-20 text-center text-sm text-slate-500">No visitors found.</div>
            ) : (
              <>
                {/* Mobile Card View */}
                <div className="block sm:hidden divide-y">
                  {paginated.map((v) => (
                    <div key={v.id} className="p-4 space-y-1.5 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-medium text-slate-700">{v.ip_address}</span>
                        <span className="text-xs text-slate-400">{new Date(v.created_at).toLocaleDateString()}</span>
                      </div>
                      <p className="text-xs text-slate-500 truncate">{v.location || "--"} {v.platform ? `• ${v.platform}` : ""}</p>
                      <p className="text-xs text-slate-400 truncate" title={v.page_url}>{v.page_url || "--"}</p>
                      <p className="text-xs text-slate-400">{v.timezone || ""}{v.screen_resolution ? ` • ${v.screen_resolution}` : ""}</p>
                    </div>
                  ))}
                </div>

                {/* Desktop Table View */}
                <div className="hidden sm:block overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        <th className="px-4 py-3 whitespace-nowrap">IP</th>
                        <th className="px-4 py-3 whitespace-nowrap">Location</th>
                        <th className="px-4 py-3 whitespace-nowrap">Page</th>
                        <th className="px-4 py-3 whitespace-nowrap">Platform</th>
                        <th className="px-4 py-3 whitespace-nowrap">Timezone</th>
                        <th className="px-4 py-3 whitespace-nowrap">Screen</th>
                        <th className="px-4 py-3 whitespace-nowrap">Visited</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginated.map((v) => (
                        <tr key={v.id} className="border-b last:border-0 hover:bg-slate-50">
                          <td className="px-4 py-3 font-mono text-xs text-slate-700 whitespace-nowrap">{v.ip_address}</td>
                          <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{v.location || "--"}</td>
                          <td className="max-w-[200px] truncate px-4 py-3 text-slate-600" title={v.page_url}>
                            {v.page_url || "--"}
                          </td>
                          <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{v.platform || "--"}</td>
                          <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">{v.timezone || "--"}</td>
                          <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">{v.screen_resolution || "--"}</td>
                          <td className="whitespace-nowrap px-4 py-3 text-xs text-slate-500">
                            {new Date(v.created_at).toLocaleString()}
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
