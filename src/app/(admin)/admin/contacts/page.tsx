"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import { useEffect, useMemo, useState } from "react";

type Contact = {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  created_at: string;
};

export default function AdminContacts() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    fetch("/api/admin/contacts")
      .then((r) => r.json())
      .then((res) => {
        if (res.error === 0) setContacts(res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return contacts.filter((c) =>
      !q ||
      c.fullName.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.subject?.toLowerCase().includes(q)
    );
  }, [contacts, search]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const deleteContact = async (id: number) => {
    if (!confirm("Delete this message?")) return;
    await fetch("/api/admin/contacts", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

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
          <h1 className="text-lg sm:text-xl font-semibold text-slate-800">Contact Messages</h1>
        </header>

        <main className="flex-1 p-3 sm:p-4 lg:p-6">
          <div className="rounded-xl border bg-white shadow-sm">
            <div className="border-b px-4 sm:px-6 py-3 sm:py-4">
              <input
                type="text"
                placeholder="Search by name, email or subject..."
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
              <div className="py-16 sm:py-20 text-center text-sm text-slate-500">No messages found.</div>
            ) : (
              <div className="divide-y">
                {paginated.map((c) => (
                  <div key={c.id} className="px-4 sm:px-6 py-3 sm:py-4">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-slate-800 text-sm sm:text-base">{c.fullName}</p>
                        <p className="text-xs sm:text-sm text-slate-500 truncate">{c.email}{c.phone ? ` • ${c.phone}` : ""}</p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-xs text-slate-400 whitespace-nowrap">
                          {new Date(c.created_at).toLocaleDateString()}
                        </span>
                        <button
                          onClick={() => deleteContact(c.id)}
                          className="rounded-lg px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 min-h-[36px]"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    {c.subject && (
                      <p className="mt-2 text-xs sm:text-sm font-medium text-slate-600">
                        Subject: {c.subject}
                      </p>
                    )}
                    <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed break-words">{c.message}</p>
                  </div>
                ))}
              </div>
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
