"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      router.push("/admin/advocates");
    } else {
      const data = await res.json();
      setError(data.error || "Invalid credentials");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm border border-border rounded-2xl p-8 bg-card shadow-sm">
        <h1 className="text-xl font-bold mb-1">Admin Login</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Malir Bar Association — Admin Panel
        </p>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="px-3 py-2.5 rounded-lg border border-border bg-background text-sm
                         focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="px-3 py-2.5 rounded-lg border border-border bg-background text-sm
                         focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 font-medium">{error}</p>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-accent text-accent-foreground text-sm font-semibold
                       hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
}