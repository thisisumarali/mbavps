"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddAdvocatePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    v_no: "",
    name: "",
    f_name: "",
    sbc_enrollment_no: "",
    mobile: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    setError("");

    if (!form.v_no || !form.name) {
      setError("V No and Full Name are required.");
      return;
    }

    setSubmitting(true);

    try {
      let imageUrl = null;

      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append(
          "upload_preset",
          process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
        );

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          },
        );

        const data = await res.json();

        if (!data.secure_url) {
          throw new Error(data.error?.message || "Image upload failed");
        }

        imageUrl = data.secure_url;
      }

      const res = await fetch("/api/advocates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          v_no: Number(form.v_no),
          name: form.name.trim(),
          f_name: form.f_name.trim() || null,
          sbc_enrollment_no: form.sbc_enrollment_no.trim() || null,
          mobile: form.mobile.trim() || null,
          image: imageUrl,
        }),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.message || "Failed to add advocate");
      }

      router.push("/admin/advocates");
      router.refresh();
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-12 px-4 md:px-10 lg:px-16">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Add Advocate</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Fill in the details and optionally upload a photo.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary/50" />

          <div className="p-6 md:p-8 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                Photo (optional)
              </label>

              <div className="flex items-center gap-5">
                <div
                  className="w-24 h-24 rounded-xl border-2 border-dashed border-border bg-muted overflow-hidden flex items-center justify-center cursor-pointer hover:border-accent transition-all"
                  onClick={() => document.getElementById("img-input").click()}
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl text-muted-foreground">📷</span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <button
                    type="button"
                    onClick={() => document.getElementById("img-input").click()}
                    className="px-4 py-2 rounded-lg border border-border text-sm font-medium hover:border-accent hover:text-accent transition-all"
                  >
                    {imagePreview ? "Change Photo" : "Upload Photo"}
                  </button>

                  {imagePreview && (
                    <button
                      type="button"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview(null);
                      }}
                      className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-red-500 transition-all"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <input
                  id="img-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
            </div>

            <div className="h-px bg-border" />

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                V No <span className="text-accent">*</span>
              </label>
              <input
                name="v_no"
                type="number"
                value={form.v_no}
                onChange={handleChange}
                placeholder="e.g. 1148"
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm
                           focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                  Full Name <span className="text-accent">*</span>
                </label>
                <input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Ahmed Khan"
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm
                             focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                  Father's Name
                </label>
                <input
                  name="f_name"
                  type="text"
                  value={form.f_name}
                  onChange={handleChange}
                  placeholder="e.g. Muhammad Ali"
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm
                             focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                  SBC Enrollment No
                </label>
                <input
                  name="sbc_enrollment_no"
                  type="text"
                  value={form.sbc_enrollment_no}
                  onChange={handleChange}
                  placeholder="e.g. 6756/HC/KHI"
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm
                             focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                  Mobile
                </label>
                <input
                  name="mobile"
                  type="text"
                  value={form.mobile}
                  onChange={handleChange}
                  placeholder="e.g. 0300-1234567"
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm
                             focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
                />
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-500 font-medium">{error}</p>
            )}

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="px-6 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold
                           hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {submitting ? "Saving…" : "Add Advocate"}
              </button>

              <button
                type="button"
                onClick={() => router.push("/admin/advocates")}
                className="px-6 py-2.5 rounded-lg border border-border text-sm font-medium
                           hover:border-accent hover:text-accent transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
