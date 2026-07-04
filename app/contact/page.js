"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import SectionHeading from "@/common/SectionHeading";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaArrowRight,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

const CONTACT_DETAILS = [
  {
    icon: FaMapMarkerAlt,
    label: "Address",
    lines: [
      "Malir Bar Association",
      "District Courts, Malir",
      "Karachi, Sindh, Pakistan",
    ],
  },
  {
    icon: FaPhoneAlt,
    label: "Phone",
    lines: ["+92 21 3456 7890", "+92 300 123 4567"],
  },
  {
    icon: FaEnvelope,
    label: "Email",
    lines: ["info@malirbar.org.pk", "secretary@malirbar.org.pk"],
  },
  {
    icon: FaClock,
    label: "Office Hours",
    lines: [
      "Monday – Friday: 9:00 AM – 5:00 PM",
      "Saturday: 9:00 AM – 1:00 PM",
      "Sunday & Public Holidays: Closed",
    ],
  },
];

function InfoCard({ item }) {
  const Icon = item.icon;
  return (
    <div className="flex gap-4 p-4 md:p-5 rounded-sm border border-transparent hover:border-accent/30 hover:bg-white hover:shadow-md transition-all duration-200 group">
      <div className="shrink-0 w-11 h-11 rounded-sm bg-primary/10 border border-primary/20 group-hover:bg-primary flex items-center justify-center transition-colors duration-200">
        <Icon className="text-primary group-hover:text-white text-base transition-colors duration-200" />
      </div>
      <div className="min-w-0">
        <p className="text-accent text-[11px] font-bold uppercase tracking-[0.2em] mb-1">
          {item.label}
        </p>
        {item.lines.map((line, i) => (
          <p
            key={i}
            className="text-gray-600 text-sm leading-relaxed break-words"
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

const EMPTY = { name: "", phone: "", email: "", subject: "", message: "" };

export default function ContactPage() {
  const supabase = createClient();
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.subject || !form.message) {
      setErrorMsg("Please fill in all required fields.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    const { error } = await supabase.from("messages").insert({
      name: form.name,
      phone: form.phone || null,
      email: form.email,
      subject: form.subject,
      message: form.message,
    });

    if (error) {
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
      return;
    }

    setForm(EMPTY);
    setStatus("success");
  };

  return (
    <main className="overflow-x-hidden">
      {/* HERO */}
      <section className="bg-primary py-14 md:py-20 px-4 md:px-10 lg:px-20 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full border border-accent/10 pointer-events-none" />
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full border border-accent/20 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <p className="text-accent text-xs font-bold uppercase tracking-[0.3em] mb-2">
            Get in Touch
          </p>
          <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight">
            Contact Us
          </h1>
          <div className="mt-4 flex items-center gap-3">
            <span className="w-10 h-px bg-accent/50" />
            <span className="w-2 h-2 rotate-45 bg-accent" />
            <span className="w-10 h-px bg-accent/50" />
          </div>
          <p className="text-white/70 text-sm md:text-base mt-5 max-w-xl leading-relaxed">
            We welcome inquiries from members, advocates, and the public. Reach
            out to the Malir Bar Association — we are here to assist you.
          </p>
        </div>
      </section>

      {/* CONTACT DETAILS + FORM */}
      <section className="bg-surface/70 py-16 md:py-24 px-4 md:px-10 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <SectionHeading eyebrow="Contact" title="Reach Out to Us" />
          <div className="flex flex-col lg:flex-row gap-10 md:gap-14 items-start">
            {/* Left */}
            <div className="w-full lg:w-[40%] shrink-0 space-y-2">
              {CONTACT_DETAILS.map((item) => (
                <InfoCard key={item.label} item={item} />
              ))}
              <div className="flex gap-3 pt-4 pl-1">
                {[
                  { icon: FaFacebookF, href: "#" },
                  { icon: FaTwitter, href: "#" },
                  { icon: FaLinkedinIn, href: "#" },
                ].map(({ icon: Icon, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    className="w-10 h-10 rounded-sm border border-accent/30 hover:bg-primary hover:border-primary flex items-center justify-center text-primary hover:text-white transition-all duration-200"
                  >
                    <Icon className="text-sm" />
                  </a>
                ))}
              </div>
            </div>

            {/* Right: Form */}
            <div className="w-full flex-1 bg-white rounded-sm border border-gray-100 shadow-sm overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-primary via-accent to-secondary" />
              <div className="p-6 md:p-10">
                <p className="text-accent text-xs font-bold uppercase tracking-[0.3em] mb-1">
                  Send a Message
                </p>
                <h3 className="text-foreground text-xl md:text-2xl font-bold mb-6">
                  We'd Love to Hear From You
                </h3>

                {/* Success state */}
                {status === "success" ? (
                  <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
                    <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-600 text-2xl">✓</span>
                    </div>
                    <h4 className="text-foreground font-bold text-lg">
                      Message Sent!
                    </h4>
                    <p className="text-gray-500 text-sm max-w-xs">
                      Thank you for reaching out. We'll get back to you as soon
                      as possible.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-2 text-primary text-sm font-semibold underline underline-offset-2"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1 flex flex-col gap-1.5">
                        <label className="text-gray-500 text-xs font-semibold uppercase tracking-widest">
                          Full Name <span className="text-accent">*</span>
                        </label>
                        <input
                          name="name"
                          type="text"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          className="w-full px-4 py-3 rounded-sm border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary/30 bg-surface text-foreground text-sm placeholder-gray-400 outline-none transition-all duration-200"
                        />
                      </div>
                      <div className="flex-1 flex flex-col gap-1.5">
                        <label className="text-gray-500 text-xs font-semibold uppercase tracking-widest">
                          Phone Number
                        </label>
                        <input
                          name="phone"
                          type="tel"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+92 300 000 0000"
                          className="w-full px-4 py-3 rounded-sm border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary/30 bg-surface text-foreground text-sm placeholder-gray-400 outline-none transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-gray-500 text-xs font-semibold uppercase tracking-widest">
                        Email Address <span className="text-accent">*</span>
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-sm border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary/30 bg-surface text-foreground text-sm placeholder-gray-400 outline-none transition-all duration-200"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-gray-500 text-xs font-semibold uppercase tracking-widest">
                        Subject <span className="text-accent">*</span>
                      </label>
                      <input
                        name="subject"
                        type="text"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="What is this regarding?"
                        className="w-full px-4 py-3 rounded-sm border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary/30 bg-surface text-foreground text-sm placeholder-gray-400 outline-none transition-all duration-200"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-gray-500 text-xs font-semibold uppercase tracking-widest">
                        Message <span className="text-accent">*</span>
                      </label>
                      <textarea
                        name="message"
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Write your message here..."
                        className="w-full px-4 py-3 rounded-sm border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary/30 bg-surface text-foreground text-sm placeholder-gray-400 outline-none transition-all duration-200 resize-none"
                      />
                    </div>

                    {status === "error" && (
                      <p className="text-red-500 text-sm font-medium">
                        {errorMsg}
                      </p>
                    )}

                    <button
                      onClick={handleSubmit}
                      disabled={status === "loading"}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-sm
                                 bg-primary hover:bg-primary/90 text-white font-semibold text-sm tracking-wide
                                 border border-accent/30 hover:border-accent shadow
                                 transition-all duration-200 group disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {status === "loading" ? "Sending…" : "Send Message"}
                      {status !== "loading" && (
                        <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="bg-white py-16 md:py-20 px-4 md:px-10 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <p className="text-accent text-xs font-bold uppercase tracking-[0.3em]">
              Location
            </p>
            <span className="flex-1 h-px bg-accent/30 max-w-[180px]" />
          </div>
          <h2 className="text-foreground text-2xl md:text-3xl font-bold uppercase tracking-wide mb-8">
            Find Us
          </h2>
          <div className="relative w-full h-64 sm:h-80 md:h-[420px] rounded-sm overflow-hidden shadow-xl ring-1 ring-accent/20">
            <iframe
              title="Malir Bar Association Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.7!2d67.19!3d24.89!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDUzJzI0LjAiTiA2N8KwMTEnMjQuMCJF!5e0!3m2!1sen!2spk!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-white/95 border border-accent/20 shadow-lg rounded-sm px-3 py-2 md:px-4 md:py-3 pointer-events-none">
              <p className="text-foreground font-bold text-xs md:text-sm">
                Malir Bar Association
              </p>
              <p className="text-primary text-[11px] md:text-xs mt-0.5">
                District Courts, Malir · Karachi
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
