"use client";

import { useState, useEffect } from "react";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const fetchMessages = async () => {
    setLoading(true);
    const res = await fetch("/api/messages", { cache: "no-store" });
    const data = await res.json();
    setMessages(data.messages || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const markRead = async (id) => {
    await fetch(`/api/messages/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_read: true }),
    });

    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, is_read: true } : m)),
    );

    if (selected?.id === id) {
      setSelected((prev) => ({ ...prev, is_read: true }));
    }
  };

  const deleteMsg = async (id) => {
    await fetch(`/api/messages/${id}`, {
      method: "DELETE",
    });

    setMessages((prev) => prev.filter((m) => m.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const unreadCount = messages.filter((m) => !m.is_read).length;

  const formatDate = (ts) =>
    new Date(ts).toLocaleString("en-PK", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <section className="py-10 px-6 md:px-10 lg:px-14 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Messages</h1>
            <p className="text-muted-foreground text-sm mt-1">
              {unreadCount > 0 ? (
                <span>
                  <strong className="text-foreground">{unreadCount}</strong>{" "}
                  unread message{unreadCount > 1 ? "s" : ""}
                </span>
              ) : (
                "All messages read"
              )}
            </p>
          </div>
          <button
            onClick={fetchMessages}
            className="px-4 py-2 rounded-lg text-sm font-medium border border-border hover:border-accent hover:text-accent transition-all"
          >
            ↻ Refresh
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-32 text-muted-foreground text-sm">
            Loading…
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-3 text-center">
            <span className="text-5xl">✉️</span>
            <p className="text-muted-foreground text-sm">No messages yet.</p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: selected ? "1fr 1fr" : "1fr",
              gap: 20,
              alignItems: "start",
            }}
          >
            <div className="flex flex-col gap-2">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => {
                    setSelected(msg);
                    if (!msg.is_read) markRead(msg.id);
                  }}
                  className="cursor-pointer rounded-xl border p-4 transition-all"
                  style={{
                    borderColor:
                      selected?.id === msg.id
                        ? "var(--color-accent, #b8960c)"
                        : undefined,
                    background:
                      selected?.id === msg.id
                        ? "rgba(184,150,12,0.04)"
                        : undefined,
                  }}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2 min-w-0">
                      {!msg.is_read && (
                        <span className="shrink-0 w-2 h-2 rounded-full bg-accent" />
                      )}
                      <p
                        className={`text-sm truncate ${
                          !msg.is_read ? "font-bold" : "font-medium"
                        }`}
                      >
                        {msg.name}
                      </p>
                    </div>
                    <span className="text-[11px] text-muted-foreground shrink-0">
                      {formatDate(msg.created_at)}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-accent truncate mb-1">
                    {msg.subject}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {msg.message}
                  </p>
                </div>
              ))}
            </div>

            {selected && (
              <div className="rounded-xl border border-border bg-card overflow-hidden sticky top-6">
                <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary/50" />
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="min-w-0">
                      <h2 className="text-base font-bold leading-snug">
                        {selected.subject}
                      </h2>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {formatDate(selected.created_at)}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteMsg(selected.id)}
                      className="shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium border border-red-200 text-red-500 hover:bg-red-50 transition-all"
                    >
                      Delete
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-5 p-4 rounded-lg bg-muted/40 border border-border">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-0.5">
                        Name
                      </p>
                      <p className="text-sm font-medium">{selected.name}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-0.5">
                        Phone
                      </p>
                      <p className="text-sm font-medium">
                        {selected.phone || "—"}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-0.5">
                        Email
                      </p>
                      <a
                        href={`mailto:${selected.email}`}
                        className="text-sm font-medium text-accent hover:underline break-all"
                      >
                        {selected.email}
                      </a>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-2">
                      Message
                    </p>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap text-foreground">
                      {selected.message}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
