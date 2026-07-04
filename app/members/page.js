import SectionHeading from "@/common/SectionHeading";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";

const PAGE_SIZE = 20;

const page = async ({ searchParams }) => {
  const supabase = await createClient();
  const params = await searchParams;
  const currentPage = Number(params?.page) || 1;
  const search = params?.search || "";
  const from = (currentPage - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;
  let query = supabase
    .from("advocates")
    .select("v_no, name, f_name, sbc_enrollment_no, mobile, image", {
      count: "exact",
    })
    .order("id", { ascending: true })
    .range(from, to);

  if (search) {
    query = query.or(`name.ilike.%${search}%,mobile.ilike.%${search}%`);
  }

  const { data: members, error, count } = await query;

  if (error) {
    console.error("Error fetching members:", error.message);
  }

  const totalPages = Math.ceil((count || 0) / PAGE_SIZE);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter(
      (p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 2,
    )
    .reduce((acc, p, idx, arr) => {
      if (idx > 0 && p - arr[idx - 1] > 1) acc.push("...");
      acc.push(p);
      return acc;
    }, []);

  return (
    <section className="py-16 md:py-24 px-4 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Our Members"
          title="Advocates of Malir Bar Association"
        />
        {/* Search */}
        <form className="mb-6">
          <div className="relative max-w-md">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
              🔍
            </span>
            <input
              type="text"
              name="search"
              defaultValue={search}
              placeholder="Search by name or phone no..."
              className="w-full pl-9 pr-10 py-2.5 rounded-lg border border-border bg-background
                 text-sm text-foreground placeholder:text-muted-foreground/50
                 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent
                 transition-all duration-200"
            />
            {search && (
              <Link
                href="?"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground
                   hover:text-foreground transition-colors text-lg leading-none"
                title="Clear search"
              >
                ×
              </Link>
            )}
          </div>
        </form>
        {/* Stats bar */}
        <div className="flex items-center justify-between mb-8 px-1">
          <p className="text-muted-foreground text-sm">
            Showing{" "}
            <span className="text-foreground font-semibold">
              {from + 1}–{Math.min(to + 1, count || 0)}
            </span>{" "}
            of <span className="text-foreground font-semibold">{count}</span>{" "}
            advocates
          </p>
          <p className="text-muted-foreground text-sm">
            Page{" "}
            <span className="text-foreground font-semibold">{currentPage}</span>{" "}
            of{" "}
            <span className="text-foreground font-semibold">{totalPages}</span>
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
          {members?.map((member) => (
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
                {/* Gradient overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                {/* Leader no badge over image */}
                <span
                  className="absolute top-2 right-2 bg-accent text-accent-foreground
                                  text-[10px] font-bold px-2 py-0.5 rounded-full shadow"
                >
                  {member.v_no}
                </span>
                {/* Color bar */}
                <div className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-primary via-accent to-secondary" />
              </div>

              {/* Info */}
              <div className="flex flex-col gap-2 p-3">
                {/* Name */}
                <p className="text-foreground font-bold text-sm leading-snug line-clamp-2 min-h-[2.5rem]">
                  {member.name}
                </p>

                <div className="border-t border-border/40" />

                {/* Father name */}
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60 font-semibold">
                    Father
                  </span>
                  <p className="text-foreground/80 text-xs leading-snug line-clamp-2">
                    {member.f_name}
                  </p>
                </div>

                {/* Enrollment */}
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60 font-semibold">
                    Enrollment
                  </span>
                  <p className="text-foreground font-semibold text-xs tracking-wide">
                    {member.sbc_enrollment_no || "—"}
                  </p>
                </div>

                {/* Mobile */}
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
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-14 flex-wrap">
          {currentPage > 1 ? (
            <Link
              href={`?page=${currentPage - 1}${search ? `&search=${search}` : ""}`}
              className="px-4 py-2 rounded-lg text-sm font-medium border border-border
                         hover:border-accent hover:text-accent hover:bg-accent/5 transition-all duration-200"
            >
              ← Prev
            </Link>
          ) : (
            <span className="px-4 py-2 rounded-lg text-sm font-medium border border-border/30 text-muted-foreground/30 cursor-not-allowed select-none">
              ← Prev
            </span>
          )}

          {pageNumbers.map((p, idx) =>
            p === "..." ? (
              <span
                key={`ellipsis-${idx}`}
                className="px-1 text-muted-foreground text-sm select-none"
              >
                …
              </span>
            ) : (
              <Link
                key={p}
                href={`?page=${p}${search ? `&search=${search}` : ""}`}
                className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium border transition-all duration-200
                  ${
                    p === currentPage
                      ? "bg-accent text-accent-foreground border-accent shadow-sm pointer-events-none"
                      : "border-border hover:border-accent hover:text-accent hover:bg-accent/5"
                  }`}
              >
                {p}
              </Link>
            ),
          )}

          {currentPage < totalPages ? (
            <Link
              href={`?page=${currentPage + 1}${search ? `&search=${search}` : ""}`}
              className="px-4 py-2 rounded-lg text-sm font-medium border border-border
                         hover:border-accent hover:text-accent hover:bg-accent/5 transition-all duration-200"
            >
              Next →
            </Link>
          ) : (
            <span className="px-4 py-2 rounded-lg text-sm font-medium border border-border/30 text-muted-foreground/30 cursor-not-allowed select-none">
              Next →
            </span>
          )}
        </div>
      </div>
    </section>
  );
};

export default page;
