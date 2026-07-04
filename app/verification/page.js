import SectionHeading from "@/common/SectionHeading";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";

const VerificationPage = async ({ searchParams }) => {
  const supabase = await createClient();
  const params = await searchParams;

  const v_no = params?.v_no?.trim() || "";
  const name = params?.name?.trim() || "";
  const f_name = params?.f_name?.trim() || "";

  const hasQuery = v_no || name || f_name;

  let members = null;
  let error = null;

  if (hasQuery) {
    let query = supabase
      .from("advocates")
      .select("v_no, name, f_name, sbc_enrollment_no, mobile, image")
      .order("id", { ascending: true });

    if (v_no) {
      query = query.eq("v_no", Number(v_no));
    } else if (name) {
      query = query.ilike("name", `%${name}%`);
    } else if (f_name) {
      query = query.ilike("f_name", `%${f_name}%`);
    }

    const result = await query;
    members = result.data;
    error = result.error;

    if (error) {
      console.error("Verification query error:", error.message);
    }
  }

  return (
    <section className="py-16 md:py-24 px-4 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Verify Membership"
          title="Advocate Verification"
        />

        {/* Subtitle */}
        <p className="text-muted-foreground text-sm mb-10 -mt-2 max-w-lg">
          Fill in <span className="text-foreground font-medium">any one</span>{" "}
          field below to verify an advocate's membership status.
        </p>

        {/* Form */}
        <form className="mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
            {/* V No */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="v_no"
                className="text-[11px] uppercase tracking-wider text-muted-foreground/70 font-semibold"
              >
                V No
              </label>
              <input
                id="v_no"
                type="number"
                name="v_no"
                placeholder="e.g. 1042"
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background
                   text-sm text-foreground placeholder:text-muted-foreground/40
                   focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent
                   transition-all duration-200"
              />
            </div>

            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="name"
                className="text-[11px] uppercase tracking-wider text-muted-foreground/70 font-semibold"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="e.g. Ahmed Khan"
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background
                   text-sm text-foreground placeholder:text-muted-foreground/40
                   focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent
                   transition-all duration-200"
              />
            </div>

            {/* Father Name */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="f_name"
                className="text-[11px] uppercase tracking-wider text-muted-foreground/70 font-semibold"
              >
                Father's Name
              </label>
              <input
                id="f_name"
                type="text"
                name="f_name"
                placeholder="e.g. Muhammad Ali"
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background
                   text-sm text-foreground placeholder:text-muted-foreground/40
                   focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent
                   transition-all duration-200"
              />
            </div>
          </div>

          {/* Hint */}
          <p className="text-[11px] text-muted-foreground/50 mt-2.5 max-w-3xl">
            Only one field is used at a time — priority order: V No → Full Name
            → Father's Name.
          </p>

          {/* Actions */}
          <div className="flex items-center gap-3 mt-5">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-accent text-accent-foreground text-sm font-semibold
                         hover:bg-accent/90 transition-all duration-200 shadow-sm"
            >
              Verify
            </button>
          </div>
        </form>

        {/* Results */}
        {hasQuery && (
          <>
            {/* Active search pill */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground/50 font-semibold">
                Searched for:
              </span>
              <span className="inline-flex items-center gap-1.5 bg-accent/10 border border-accent/20 text-accent text-xs font-medium px-2.5 py-1 rounded-full">
                {v_no && `V No: ${v_no}`}
                {name && `Name: ${name}`}
                {f_name && `Father: ${f_name}`}
              </span>
              <Link
                href="?"
                className="text-[11px] text-muted-foreground/50 hover:text-foreground transition-colors underline underline-offset-2"
              >
                Clear
              </Link>
            </div>

            {/* Result count */}
            <p className="text-muted-foreground text-sm mb-6 px-1">
              {members && members.length > 0 ? (
                <>
                  Found{" "}
                  <span className="text-foreground font-semibold">
                    {members.length}
                  </span>{" "}
                  matching advocate{members.length !== 1 ? "s" : ""}
                </>
              ) : (
                <span className="text-foreground/60">
                  No advocates found for the provided details.
                </span>
              )}
            </p>

            {/* Grid */}
            {members && members.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
                {members.map((member) => (
                  <div
                    key={member.v_no}
                    className="group flex flex-col rounded-xl border border-border/50
                               bg-card hover:border-accent/50
                               shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                  >
                    {/* Image */}
                    <div className="relative w-full aspect-square bg-muted overflow-hidden">
                      <Image
                        src={member.image || "/user.jpg"}
                        alt={member.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      <span
                        className="absolute top-2 right-2 bg-accent text-accent-foreground
                                        text-[10px] font-bold px-2 py-0.5 rounded-full shadow"
                      >
                        {member.v_no}
                      </span>
                      <div className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-primary via-accent to-secondary" />
                    </div>

                    {/* Info */}
                    <div className="flex flex-col gap-2 p-3">
                      <p className="text-foreground font-bold text-sm leading-snug line-clamp-2 min-h-[2.5rem]">
                        {member.name}
                      </p>

                      <div className="border-t border-border/40" />

                      <div className="flex flex-col gap-0.5">
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60 font-semibold">
                          Father
                        </span>
                        <p className="text-foreground/80 text-xs leading-snug line-clamp-2">
                          {member.f_name}
                        </p>
                      </div>

                      <div className="flex flex-col gap-0.5">
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60 font-semibold">
                          Enrollment
                        </span>
                        <p className="text-foreground font-semibold text-xs tracking-wide">
                          {member.sbc_enrollment_no || "—"}
                        </p>
                      </div>

                      {member.mobile && (
                        <span
                          className="flex items-center gap-1.5 mt-0.5 text-xs text-accent
                                     hover:text-accent transition-colors truncate group/phone"
                        >
                          <span className="text-base leading-none">📞</span>
                          <span className="truncate group-hover/phone:underline underline-offset-2">
                            {member.mobile.split("/")[0].trim()}
                          </span>
                        </span>
                      )}

                      {/* Verified badge */}
                      <div className="mt-1 flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 rounded-md px-2 py-1">
                        <span className="text-green-500 text-xs">✓</span>
                        <span className="text-green-500 text-[10px] font-semibold uppercase tracking-wide">
                          Verified Member
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Empty state — no query yet */}
        {!hasQuery && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="text-5xl mb-4 opacity-30">🔎</span>
            <p className="text-muted-foreground text-sm max-w-xs">
              Enter a leader number, name, or father's name above to verify an
              advocate's membership.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default VerificationPage;
