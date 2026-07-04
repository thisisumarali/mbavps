"use client";
import { useState, useEffect, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";

const PAGE_SIZE = 20;

export default function AdminAdvocatesPage() {
  const supabase = createClient();
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState({ name: "", v_no: "", f_name: "" });
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [uploading, setUploading] = useState(null);
  const [successId, setSuccessId] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [editTarget, setEditTarget] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [editSaving, setEditSaving] = useState(false);
  const [editError, setEditError] = useState("");
  const fileInputRefs = useRef({});
  const totalPages = Math.ceil(count / PAGE_SIZE);

  /* ─── Fetch ─────────────────────────────────────────────── */
  const fetchMembers = async () => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    let query = supabase
      .from("advocates")
      .select("v_no, name, f_name, sbc_enrollment_no, mobile, image", {
        count: "exact",
      })
      .order("id", { ascending: true })
      .range(from, to);

    if (search.v_no) {
      query = query.eq("v_no", Number(search.v_no));
    } else if (search.name) {
      query = query.ilike("name", `%${search.name}%`);
    } else if (search.f_name) {
      query = query.ilike("f_name", `%${search.f_name}%`);
    }

    const { data, count: total } = await query;
    setMembers(data || []);
    setCount(total || 0);
  };

  useEffect(() => {
    fetchMembers();
  }, [page, search]);

  /* ─── Image Upload ───────────────────────────────────────── */
  const handleImageUpload = async (member, file) => {
    if (!file) return;
    setUploading(member.v_no);
    try {
      if (member.image) {
        try {
          await fetch("/api/cloudinary", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              public_id: `advocates/advocate_${member.v_no}`,
            }),
          });
        } catch {}
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
      );
      formData.append("public_id", `advocates/advocate_${member.v_no}`);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData },
      );
      const cloudinaryData = await res.json();
      if (!cloudinaryData.secure_url)
        throw new Error(
          cloudinaryData.error?.message || "No secure_url returned",
        );

      const { error } = await supabase
        .from("advocates")
        .update({ image: cloudinaryData.secure_url })
        .eq("v_no", member.v_no);
      if (error) throw new Error("Supabase error: " + error.message);

      setMembers((prev) =>
        prev.map((m) =>
          m.v_no === member.v_no
            ? { ...m, image: cloudinaryData.secure_url + `?v=${Date.now()}` }
            : m,
        ),
      );
      setSuccessId(member.v_no);
      setTimeout(() => setSuccessId(null), 2500);
    } catch (err) {
      alert("Upload failed: " + err.message);
    } finally {
      setUploading(null);
    }
  };

  /* ─── Delete ─────────────────────────────────────────────── */
  const handleDelete = async (member) => {
    if (
      !confirm(
        `Delete advocate "${member.name}" (V No: ${member.v_no})?\nThis cannot be undone.`,
      )
    )
      return;

    setDeleting(member.v_no);
    try {
      // Delete Cloudinary image (best effort)
      if (member.image) {
        try {
          await fetch("/api/cloudinary", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              public_id: `advocates/advocate_${member.v_no}`,
            }),
          });
        } catch {}
      }

      const { error } = await supabase
        .from("advocates")
        .delete()
        .eq("v_no", member.v_no);
      if (error) throw new Error("Supabase error: " + error.message);

      setMembers((prev) => prev.filter((m) => m.v_no !== member.v_no));
      setCount((c) => c - 1);
    } catch (err) {
      alert("Delete failed: " + err.message);
    } finally {
      setDeleting(null);
    }
  };

  /* ─── Edit / Update ──────────────────────────────────────── */
  const openEdit = (member) => {
    setEditTarget(member);
    setEditForm({
      name: member.name || "",
      f_name: member.f_name || "",
      sbc_enrollment_no: member.sbc_enrollment_no || "",
      mobile: member.mobile || "",
    });
    setEditError("");
  };

  const closeEdit = () => {
    setEditTarget(null);
    setEditForm({});
    setEditError("");
  };

  const handleEditSave = async () => {
    if (!editForm.name.trim()) {
      setEditError("Full Name is required.");
      return;
    }
    setEditSaving(true);
    setEditError("");
    try {
      const { error } = await supabase
        .from("advocates")
        .update({
          name: editForm.name.trim(),
          f_name: editForm.f_name.trim() || null,
          sbc_enrollment_no: editForm.sbc_enrollment_no.trim() || null,
          mobile: editForm.mobile.trim() || null,
        })
        .eq("v_no", editTarget.v_no);

      if (error) throw new Error("Supabase error: " + error.message);

      setMembers((prev) =>
        prev.map((m) =>
          m.v_no === editTarget.v_no ? { ...m, ...editForm } : m,
        ),
      );
      closeEdit();
    } catch (err) {
      setEditError(err.message);
    } finally {
      setEditSaving(false);
    }
  };

  /* ─── Render ─────────────────────────────────────────────── */
  return (
    <section className="py-16 px-4 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Admin — Manage Advocates</h1>
        <p className="text-muted-foreground text-sm mb-8">
          Click an image to change the photo. Use Edit to update details, or
          Delete to remove an advocate.
        </p>

        {/* Search */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mb-3">
          {[
            {
              key: "v_no",
              label: "V No",
              type: "number",
              placeholder: "e.g. 1042",
            },
            {
              key: "name",
              label: "Full Name",
              type: "text",
              placeholder: "e.g. Ahmed Khan",
            },
            {
              key: "f_name",
              label: "Father's Name",
              type: "text",
              placeholder: "e.g. Muhammad Ali",
            },
          ].map(({ key, label, type, placeholder }) => (
            <div key={key} className="flex flex-col gap-1.5">
              <label className="text-[11px] uppercase tracking-wider text-muted-foreground/70 font-semibold">
                {label}
              </label>
              <input
                type={type}
                value={search[key]}
                onChange={(e) => {
                  const cleared = { name: "", v_no: "", f_name: "" };
                  setSearch({ ...cleared, [key]: e.target.value });
                  setPage(1);
                }}
                placeholder={placeholder}
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background
                   text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
              />
            </div>
          ))}
        </div>
        <p className="text-[11px] text-muted-foreground/50 mb-6">
          Only one field is used at a time — priority: V No → Full Name →
          Father's Name.
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between mb-6 text-sm text-muted-foreground">
          <span>
            Showing{" "}
            <strong className="text-foreground">
              {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, count)}
            </strong>{" "}
            of <strong className="text-foreground">{count}</strong> advocates
          </span>
          <span>
            Page <strong className="text-foreground">{page}</strong> of{" "}
            <strong className="text-foreground">{totalPages}</strong>
          </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {members.map((member) => (
            <div
              key={member.v_no}
              className="flex flex-col rounded-xl border border-border/50 bg-card shadow-sm overflow-hidden"
            >
              {/* Clickable image area */}
              <div
                className="relative w-full aspect-square bg-muted overflow-hidden cursor-pointer group/img"
                onClick={() => fileInputRefs.current[member.v_no]?.click()}
              >
                <Image
                  src={member.image || "/user.jpg"}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 20vw"
                  className="object-cover object-center"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-xs font-semibold tracking-wide">
                    {uploading === member.v_no ? "Uploading…" : "Change Photo"}
                  </span>
                </div>

                {/* Success */}
                {successId === member.v_no && (
                  <div className="absolute inset-0 bg-green-500/80 flex items-center justify-center">
                    <span className="text-white text-3xl">✓</span>
                  </div>
                )}

                {/* Loading spinner */}
                {uploading === member.v_no && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  </div>
                )}

                {/* Has image indicator */}
                {member.image && (
                  <span className="absolute top-2 left-2 bg-green-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                    ✓
                  </span>
                )}

                <span className="absolute top-2 right-2 bg-accent text-accent-foreground text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                  {member.v_no}
                </span>

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={(el) => (fileInputRefs.current[member.v_no] = el)}
                  onChange={(e) =>
                    handleImageUpload(member, e.target.files?.[0])
                  }
                />
              </div>

              {/* Info */}
              <div className="p-3 flex flex-col gap-1.5">
                <p className="font-bold text-sm leading-snug line-clamp-2">
                  {member.name}
                </p>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {member.f_name}
                </p>
                <p className="text-xs font-semibold">
                  {member.sbc_enrollment_no || "—"}
                </p>

                {/* Action buttons */}
                <div className="flex gap-1.5 mt-1">
                  <button
                    onClick={() => openEdit(member)}
                    className="flex-1 py-1.5 rounded-lg text-[11px] font-semibold border border-border
                               hover:border-accent hover:text-accent transition-all"
                  >
                    ✏️ Edit
                  </button>

                  {/* <button
                    onClick={() => handleDelete(member)}
                    disabled={deleting === member.v_no}
                    className="flex-1 py-1.5 rounded-lg text-[11px] font-semibold border border-red-200
                               text-red-500 hover:bg-red-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    {deleting === member.v_no ? "…" : "🗑 Delete"}
                  </button> */}

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-12 flex-wrap">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-lg text-sm font-medium border border-border
                       hover:border-accent hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            ← Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(
              (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 2,
            )
            .reduce((acc, p, idx, arr) => {
              if (idx > 0 && p - arr[idx - 1] > 1) acc.push("...");
              acc.push(p);
              return acc;
            }, [])
            .map((p, idx) =>
              p === "..." ? (
                <span
                  key={`e-${idx}`}
                  className="px-1 text-muted-foreground text-sm"
                >
                  …
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium border transition-all
                    ${
                      p === page
                        ? "bg-accent text-accent-foreground border-accent"
                        : "border-border hover:border-accent hover:text-accent"
                    }`}
                >
                  {p}
                </button>
              ),
            )}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-lg text-sm font-medium border border-border
                       hover:border-accent hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            Next →
          </button>
        </div>
      </div>

      {/* ── Edit Modal ──────────────────────────────────────── */}
      {editTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.55)" }}
          onClick={(e) => e.target === e.currentTarget && closeEdit()}
        >
          <div className="w-full max-w-md rounded-2xl border border-border bg-card shadow-xl overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary/50" />

            <div className="p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-base font-bold">Edit Advocate</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    V No: <strong>{editTarget.v_no}</strong>
                  </p>
                </div>
                <button
                  onClick={closeEdit}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-border
                             text-muted-foreground hover:text-foreground hover:border-accent transition-all text-lg"
                >
                  ×
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {[
                  {
                    field: "name",
                    label: "Full Name",
                    placeholder: "e.g. Ahmed Khan",
                    required: true,
                  },
                  {
                    field: "f_name",
                    label: "Father's Name",
                    placeholder: "e.g. Muhammad Ali",
                  },
                  {
                    field: "sbc_enrollment_no",
                    label: "SBC Enrollment No",
                    placeholder: "e.g. 6756/HC/KHI",
                  },
                  {
                    field: "mobile",
                    label: "Mobile",
                    placeholder: "e.g. 0300-1234567",
                  },
                ].map(({ field, label, placeholder, required }) => (
                  <div key={field} className="flex flex-col gap-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                      {label}{" "}
                      {required && <span className="text-accent">*</span>}
                    </label>
                    <input
                      type="text"
                      value={editForm[field]}
                      onChange={(e) =>
                        setEditForm((f) => ({ ...f, [field]: e.target.value }))
                      }
                      placeholder={placeholder}
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm
                                 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
                    />
                  </div>
                ))}

                {editError && (
                  <p className="text-sm text-red-500 font-medium">
                    {editError}
                  </p>
                )}

                <div className="flex gap-3 pt-1">
                  <button
                    onClick={handleEditSave}
                    disabled={editSaving}
                    className="flex-1 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold
                               hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {editSaving ? "Saving…" : "Save Changes"}
                  </button>
                  <button
                    onClick={closeEdit}
                    className="flex-1 py-2.5 rounded-lg border border-border text-sm font-medium
                               hover:border-accent hover:text-accent transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
