"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import { useEffect, useMemo, useState } from "react";

type Lead = {
  id: number;
  name: string;
  contact: string;
  created_at: string;
};

export default function AdminVisitorLeads() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    fetch("/api/admin/visitor-leads")
      .then((r) => r.json())
      .then((res) => {
        if (res.error === 0) setLeads(res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return leads.filter((l) =>
      !q ||
      l.name.toLowerCase().includes(q) ||
      l.contact.toLowerCase().includes(q)
    );
  }, [leads, search]);

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
          <h1 className="text-lg sm:text-xl font-semibold text-slate-800">Visitor Leads</h1>
        </header>

        <main className="flex-1 p-3 sm:p-4 lg:p-6">
          <div className="rounded-xl border bg-white shadow-sm">
            <div className="border-b px-4 sm:px-6 py-3 sm:py-4">
              <input
                type="text"
                placeholder="Search by name or contact..."
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
              <div className="py-16 sm:py-20 text-center text-sm text-slate-500">No leads yet.</div>
            ) : (
              <>
                {/* Mobile Card View */}
                <div className="block sm:hidden divide-y">
                  {paginated.map((l) => (
                    <div key={l.id} className="p-4 flex items-center justify-between">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-slate-800 truncate">{l.name}</p>
                        <p className="text-xs text-slate-500 truncate">{l.contact}</p>
                      </div>
                      <span className="shrink-0 text-xs text-slate-400 ml-3">
                        {new Date(l.created_at).toLocaleDateString()}
                      </span>
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
                        <th className="px-4 py-3 whitespace-nowrap">Contact</th>
                        <th className="px-4 py-3 whitespace-nowrap">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginated.map((l) => (
                        <tr key={l.id} className="border-b last:border-0 hover:bg-slate-50">
                          <td className="px-4 py-3 font-medium text-slate-700 whitespace-nowrap">#{l.id}</td>
                          <td className="px-4 py-3 text-slate-700 whitespace-nowrap">{l.name}</td>
                          <td className="px-4 py-3 text-slate-500 truncate max-w-[200px]">{l.contact}</td>
                          <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">
                            {new Date(l.created_at).toLocaleString()}
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
