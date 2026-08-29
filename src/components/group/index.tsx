"use client";

import FooterOne from "@/layouts/footers/FooterOne";
import HeaderOne from "@/layouts/headers/HeaderOne";
import React, { FormEvent, useEffect, useMemo, useState } from "react";
import Breadcrumb from "../common/Breadcrumb";

type EventItem = {
  id: string;
  eventName: string;
  eventDate: string;
  eventLocation: string;
  organizer: string;
  contact: string;
  details: string;
  createdAt: string;
};

const STORAGE_KEY = "group_event_items";

const DEMO_EVENT_COUNT = 120;

const createDemoEvents = (): EventItem[] => {
  const baseDate = new Date("2026-01-01T10:00:00.000Z");

  return Array.from({ length: DEMO_EVENT_COUNT }, (_, index) => {
    const dayOffset = index;
    const eventDate = new Date(baseDate);
    eventDate.setDate(baseDate.getDate() + dayOffset);

    return {
      id: `demo-${index + 1}`,
      eventName: `Demo Event ${index + 1}`,
      eventDate: eventDate.toISOString().slice(0, 10),
      eventLocation: `Hall ${((index % 8) + 1).toString()} - Zone ${
        (index % 5) + 1
      }`,
      organizer: `Organizer Team ${((index % 12) + 1).toString()}`,
      contact: `+8801700${(100000 + index).toString().slice(-6)}`,
      details:
        "This is demo event data for group-wise event management and testing.",
      createdAt: eventDate.toISOString(),
    };
  });
};

const demoItems = createDemoEvents();

const initialForm = {
  eventName: "",
  eventDate: "",
  eventLocation: "",
  organizer: "",
  contact: "",
  details: "",
};

export default function Group() {
  const [items, setItems] = useState<EventItem[]>(demoItems);
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      setItems(demoItems);
      return;
    }

    try {
      const parsed = JSON.parse(raw) as EventItem[];
      setItems(parsed);
    } catch {
      setItems([]);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const sortedItems = useMemo(() => {
    return [...items].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }, [items]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.eventName.trim()) {
      return;
    }

    const nextItem: EventItem = {
      id: crypto.randomUUID(),
      eventName: form.eventName.trim(),
      eventDate: form.eventDate,
      eventLocation: form.eventLocation.trim(),
      organizer: form.organizer.trim(),
      contact: form.contact.trim(),
      details: form.details.trim(),
      createdAt: new Date().toISOString(),
    };

    setItems((prev) => [nextItem, ...prev]);
    setForm(initialForm);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearAll = () => {
    setItems([]);
  };

  return (
    <>
      <HeaderOne />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <Breadcrumb title="Group Event Data" />

            <section className="py-5">
              <div className="container">
                <div className="row g-4">
                  <div className="col-lg-5">
                    <div
                      className="blog-sidebar-area"
                      style={{ position: "sticky", top: 90 }}
                    >
                      <h4 className="mb-3">Add New Event</h4>
                      <form
                        onSubmit={handleSubmit}
                        className="d-flex flex-column gap-3"
                      >
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Event Name"
                          value={form.eventName}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              eventName: e.target.value,
                            }))
                          }
                          required
                        />
                        <input
                          type="date"
                          className="form-control"
                          value={form.eventDate}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              eventDate: e.target.value,
                            }))
                          }
                        />
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Location"
                          value={form.eventLocation}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              eventLocation: e.target.value,
                            }))
                          }
                        />
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Organizer"
                          value={form.organizer}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              organizer: e.target.value,
                            }))
                          }
                        />
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Contact"
                          value={form.contact}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              contact: e.target.value,
                            }))
                          }
                        />
                        <textarea
                          className="form-control"
                          rows={5}
                          placeholder="Details"
                          value={form.details}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              details: e.target.value,
                            }))
                          }
                        />

                        <button type="submit" className="theme-btn">
                          Save Event Data
                        </button>
                      </form>
                    </div>
                  </div>

                  <div className="col-lg-7">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h4 className="mb-0">
                        Saved Events ({sortedItems.length})
                      </h4>
                      {sortedItems.length > 0 && (
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm"
                          onClick={clearAll}
                        >
                          Clear All
                        </button>
                      )}
                    </div>

                    {sortedItems.length === 0 && (
                      <div className="alert alert-info">
                        No event saved yet. Add an event from the left form.
                      </div>
                    )}

                    <div className="d-flex flex-column gap-3">
                      {sortedItems.map((item) => (
                        <article
                          key={item.id}
                          className="p-4 border rounded bg-white"
                        >
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <h5 className="mb-0">{item.eventName}</h5>
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() => removeItem(item.id)}
                            >
                              Remove
                            </button>
                          </div>

                          <p className="mb-1">
                            <strong>Date:</strong> {item.eventDate || "N/A"}
                          </p>
                          <p className="mb-1">
                            <strong>Location:</strong>{" "}
                            {item.eventLocation || "N/A"}
                          </p>
                          <p className="mb-1">
                            <strong>Organizer:</strong>{" "}
                            {item.organizer || "N/A"}
                          </p>
                          <p className="mb-1">
                            <strong>Contact:</strong> {item.contact || "N/A"}
                          </p>
                          <p className="mb-0">
                            <strong>Details:</strong> {item.details || "N/A"}
                          </p>
                        </article>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
          <FooterOne />
        </div>
      </div>
    </>
  );
}
