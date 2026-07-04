import Link from "next/link";
import Image from "next/image";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaExternalLinkAlt,
  FaChevronRight,
} from "react-icons/fa";

const USEFUL_LINKS = [
  { label: "Pakistan Bar Council", href: "https://pakistanbarcouncil.org" },
  { label: "Punjab Bar Council", href: "#" },
  { label: "Islamabad Bar Council", href: "#" },
  { label: "Sindh Bar Council", href: "#" },
  { label: "KP Bar Council", href: "#" },
  { label: "Balochistan Bar Council", href: "#" },
  { label: "Gilgit-Baltistan Council", href: "#" },
  { label: "Azad Jammu & Kashmir Council", href: "#" },
];

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Executive Committee", href: "/executive-committee" },
  { label: "News & Notices", href: "/news-notices" },
  { label: "Events Gallery", href: "/events-gallery" },
  { label: "Advocate Verification", href: "/members" },
  { label: "Contact Us", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-neutral text-white">
      {/* ── Main footer grid ── */}
      <div
        className="max-w-6xl mx-auto px-4 md:px-10 lg:px-20 py-14 md:py-20
                      grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12"
      >
        {/* Col 1 — Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3 mb-5">
            <Link href="/">
              <Image src="/logo-1.png" width={80} height={80} alt="logo" />
            </Link>
            <div>
              <p className="text-white font-bold text-base leading-tight">
                Malir Bar Association
              </p>
              <p className="text-accent text-[10px] uppercase tracking-widest mt-0.5">
                Karachi · Pakistan
              </p>
            </div>
          </div>

          <p className="text-white/60 text-sm leading-relaxed mb-6">
            A statutory regulatory body of lawyers in Malir, safeguarding the
            rights and privileges of practicing lawyers within Sindh, Pakistan.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {[
              { icon: FaFacebook, href: "#", label: "Facebook" },
              { icon: FaTwitter, href: "#", label: "Twitter" },
              { icon: FaYoutube, href: "#", label: "YouTube" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-8 h-8 rounded-sm bg-white/10 hover:bg-accent
                           flex items-center justify-center transition-colors duration-200"
              >
                <Icon className="text-white text-sm" />
              </a>
            ))}
          </div>
        </div>

        {/* Col 2 — Quick Links */}
        <div>
          <h3
            className="text-white font-bold text-sm uppercase tracking-widest mb-5 pb-2
                         border-b border-accent/30"
          >
            Quick Links
          </h3>
          <ul className="space-y-2.5">
            {QUICK_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="flex items-center gap-2 text-white/60 hover:text-accent
                             text-sm transition-colors duration-150 group"
                >
                  <FaChevronRight
                    className="text-accent/50 text-[9px] group-hover:translate-x-0.5
                                             transition-transform duration-150"
                  />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 — Useful Links */}
        <div>
          <h3
            className="text-white font-bold text-sm uppercase tracking-widest mb-5 pb-2
                         border-b border-accent/30"
          >
            Useful Links
          </h3>
          <ul className="space-y-2.5">
            {USEFUL_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/60 hover:text-accent
                             text-sm transition-colors duration-150 group"
                >
                  <FaExternalLinkAlt
                    className="text-accent/40 text-[9px] shrink-0
                                                group-hover:text-accent transition-colors duration-150"
                  />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4 — Contact */}
        <div>
          <h3
            className="text-white font-bold text-sm uppercase tracking-widest mb-5 pb-2
                         border-b border-accent/30"
          >
            Contact Us
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-sm bg-primary/30 flex items-center justify-center shrink-0 mt-0.5">
                <FaMapMarkerAlt className="text-accent text-sm" />
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                MALIR BAR ASSOCIATION, District Malir Court, National Highway,
                Ghazi Dawood Brohi Goth, Shah Faisal Town
              </p>
            </li>

            <li className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-sm bg-primary/30 flex items-center justify-center shrink-0">
                <FaPhone className="text-accent text-sm" />
              </div>
              <div>
                <p className="text-white/40 text-[10px] uppercase tracking-widest">
                  Phone
                </p>
                <a
                  href="tel:03107768226"
                  className="text-white/80 hover:text-accent text-sm font-semibold transition-colors duration-150"
                >
                  0310 7768226
                </a>
                <span className="text-white/40 text-xs mx-1">·</span>
                <a
                  href="tel:02134504444"
                  className="text-white/80 hover:text-accent text-sm font-semibold transition-colors duration-150"
                >
                  021-34504444
                </a>
              </div>
            </li>

            <li className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-sm bg-primary/30 flex items-center justify-center shrink-0">
                <FaEnvelope className="text-accent text-sm" />
              </div>
              <div>
                <p className="text-white/40 text-[10px] uppercase tracking-widest">
                  Email
                </p>
                <a
                  href="mailto:info@malirbar.com"
                  className="text-white/80 hover:text-accent text-sm font-semibold transition-colors duration-150"
                >
                  info@malirbar.com
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/10">
        <div
          className="max-w-6xl mx-auto px-4 md:px-10 lg:px-20 py-4
                        flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/40"
        >
          <p>
            © {new Date().getFullYear()} Malir Bar Association. All rights
            reserved.
          </p>
          <p>
            Powered By{" "}
            <Link
              href="https://atmoclaw.com/"
              target="_blank"
              className="text-accent"
            >
              ATMOCLAW ♥
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
