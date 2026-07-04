"use client";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const navItems = [
  { label: "Advocates", href: "/admin/advocates", icon: "👤" },
  { label: "Add Advocate", href: "/admin/add-advocate", icon: "➕" },
  { label: "Messages", href: "/admin/messages", icon: "✉️" },
];

const SIDEBAR_WIDTH = 260;

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") return <>{children}</>;

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar — fixed, never scrolls */}
      <aside
        style={{
          width: SIDEBAR_WIDTH,
          minWidth: SIDEBAR_WIDTH,
          background: "#1a5c3a",
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          zIndex: 40,
        }}
      >
        {/* Brand */}
        <div
          style={{
            padding: "24px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <p
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
              marginBottom: 4,
            }}
          >
            Admin Panel
          </p>
          <p
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.3,
            }}
          >
            Malir Bar Association
          </p>
        </div>

        {/* Nav */}
        <nav
          style={{
            flex: 1,
            padding: "16px 12px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
            overflowY: "auto",
          }}
        >
          <p
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
              padding: "0 12px",
              marginBottom: 8,
            }}
          >
            Navigation
          </p>
          {navItems.map(({ label, href, icon }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 12px",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 500,
                  textDecoration: "none",
                  transition: "all 0.15s",
                  background: active ? "rgba(255,255,255,0.15)" : "transparent",
                  color: active ? "#fff" : "rgba(255,255,255,0.55)",
                  boxShadow: active
                    ? "inset 0 0 0 1px rgba(255,255,255,0.1)"
                    : "none",
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.9)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "rgba(255,255,255,0.55)";
                  }
                }}
              >
                <span style={{ fontSize: 16 }}>{icon}</span>
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Logout — pinned to bottom */}
        <div
          style={{
            padding: "12px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 12px",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 500,
              border: "none",
              cursor: "pointer",
              transition: "all 0.15s",
              background: "transparent",
              color: "rgba(255,255,255,0.45)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(239,68,68,0.15)";
              e.currentTarget.style.color = "#fca5a5";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "rgba(255,255,255,0.45)";
            }}
          >
            <span style={{ fontSize: 16 }}>🚪</span>
            Logout
          </button>
        </div>
      </aside>

      {/* Main content — offset by sidebar, scrolls independently */}
      <main
        style={{
          marginLeft: SIDEBAR_WIDTH,
          flex: 1,
          minHeight: "100vh",
          overflowY: "auto",
        }}
      >
        {children}
      </main>
    </div>
  );
}
