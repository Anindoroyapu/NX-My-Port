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
        // Support different possible response shapes
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
    String(s ?? "")
      .toLowerCase()
      .trim();

  const filtered = React.useMemo(() => {
    const q = normalized(search);
    return bookings.filter((b) => {
      if (statusFilter !== "all" && normalized(b.status) !== statusFilter) {
        return false;
      }
      if (!q) return true;
      // match name, email, code/id
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
    <div className="container my-5 ">
      <div className="card shadow-sm border-0">
        <div className="card-header bg-white d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
          <div className="d-flex flex-column">
            <div className="d-flex align-items-center gap-3">
              <h3 className="mb-0">Booking List</h3>
              <small className="text-muted">
                Manage bookings, approvals & exports
              </small>
            </div>
            <nav aria-label="breadcrumb" className="mt-2">
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item">
                  <a href="#" className="text-decoration-none small">
                    Home
                  </a>
                </li>
                <li
                  className="breadcrumb-item active small"
                  aria-current="page"
                >
                  Bookings
                </li>
              </ol>
            </nav>
          </div>

          <div className="d-flex gap-2">
            <button className="btn btn-success d-flex align-items-center gap-2">
              <span className="fs-6">＋</span>
              <span>Add Booking</span>
            </button>
            <button
              className="btn btn-outline-secondary"
              title="Refresh list"
              onClick={() => {
                // refetch quickly by calling the same fetch logic
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
        </div>

        <div className="card-body">
          {/* Controls */}
          <div className="row g-3 mb-4 align-items-center">
            <div className="col-12 col-md-6">
              <div className="input-group shadow-sm">
                <span className="input-group-text bg-white border-end-0">
                  🔍
                </span>
                <input
                  className="form-control border-start-0"
                  placeholder="Search bookings by name, id or email..."
                  type="search"
                  aria-label="Search bookings"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setSearch("")}
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="col-6 col-md-2">
              <select
                className="form-select form-select-sm"
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

            <div className="col-4 col-md-2">
              <select
                className="form-select form-select-sm"
                value={String(perPage)}
                onChange={(e) => setPerPage(Number(e.target.value))}
                aria-label="Results per page"
              >
                <option value="10">10 / page</option>
                <option value="20">20 / page</option>
                <option value="50">50 / page</option>
              </select>
            </div>

            <div className="col-8 col-md-2 text-md-end">
              <div
                className="btn-group"
                role="group"
                aria-label="export actions"
              >
                <button className="btn btn-outline-info btn-sm">CSV</button>
                <button className="btn btn-outline-info btn-sm">PDF</button>
              </div>
            </div>
          </div>

          {/* List / Table */}
          <div className="table-responsive shadow-sm rounded">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th style={{ width: 40 }}>
                    <input aria-label="select all" type="checkbox" />
                  </th>
                  <th>Booking</th>
                  <th className="text-nowrap">Date</th>
                  <th>Status</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>

              <tbody>
                {visible.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center text-muted py-4">
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
                        ? "bg-warning text-dark"
                        : b.color === "danger"
                        ? "bg-danger text-white"
                        : "bg-primary text-white";
                    return (
                      <tr key={b.id ?? idx}>
                        <td>
                          <input
                            type="checkbox"
                            aria-label={`select booking ${b.id ?? idx}`}
                          />
                        </td>
                        <td>
                          <div className="d-flex align-items-center gap-3">
                            <div
                              className={`rounded-circle ${colorClass} d-inline-flex justify-content-center align-items-center`}
                              style={{ width: 44, height: 44, fontWeight: 600 }}
                              aria-hidden
                            >
                              {initials}
                            </div>
                            <div className="flex-grow-1">
                              <div className="fw-semibold">
                                {b.name ?? `Booking ${b.id ?? ""}`}
                              </div>
                              <div className="text-muted small">
                                {b.name ?? "No name"} • {b.email ?? "—"}
                              </div>
                              <div className="small text-muted">
                                {b.code ??
                                  `#BK-${String(b.id ?? "").padStart(5, "0")}`}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="text-nowrap">{b.date ?? "—"}</td>
                        <td>
                          {String(b.status).toLowerCase() === "approved" ? (
                            <span className="badge rounded-pill bg-success">
                              Approved
                            </span>
                          ) : String(b.status).toLowerCase() === "pending" ? (
                            <span className="badge rounded-pill bg-warning text-dark">
                              Pending
                            </span>
                          ) : (
                            <span className="badge rounded-pill bg-danger">
                              {b.status ? b.status : "Unknown"}
                            </span>
                          )}
                        </td>
                        <td className="text-end">
                          <div className="btn-group" role="group">
                            <button className="btn btn-sm btn-outline-primary">
                              View
                            </button>
                            <button className="btn btn-sm btn-success">
                              Approve
                            </button>
                            <button className="btn btn-sm btn-danger">
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
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-3 gap-3">
            <div className="d-flex gap-2">
              <button className="btn btn-outline-danger btn-sm">
                Delete Selected
              </button>
              <button className="btn btn-outline-warning btn-sm">
                Mark as Read
              </button>
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => {
                  setSearch("");
                  setStatusFilter("all");
                }}
              >
                Clear Filters
              </button>
            </div>

            <div className="d-flex align-items-center gap-3">
              <small className="text-muted">
                Showing {visible.length} of {filtered.length} matching bookings
              </small>

              <nav aria-label="Bookings pagination">
                <ul className="pagination pagination-sm mb-0">
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Previous">
                      Previous
                    </a>
                  </li>
                  <li className="page-item active" aria-current="page">
                    <span className="page-link">1</span>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#" aria-label="Next">
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>

        <div className="card-footer bg-white border-top d-flex justify-content-between align-items-center">
          <small className="text-muted">
            Tip: Use search or filters to quickly find bookings
          </small>
          <div>
            <button className="btn btn-link btn-sm">Help</button>
            <button className="btn btn-link btn-sm">Privacy</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingListPage;
