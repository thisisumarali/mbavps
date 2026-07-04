export default function SectionHeading({ eyebrow, title }) {
  return (
    <div className="text-center mb-12">
      <p className="text-accent text-xs font-bold uppercase tracking-[0.3em] mb-2">
        {eyebrow}
      </p>

      <h2 className="text-foreground text-3xl md:text-4xl font-bold leading-tight">
        {title}
      </h2>

      <div className="mt-4 flex justify-center items-center gap-3">
        <span className="w-10 h-px bg-accent/50" />
        <span className="w-2 h-2 rotate-45 bg-accent" />
        <span className="w-10 h-px bg-accent/50" />
      </div>
    </div>
  );
}
