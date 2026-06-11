import Link from "next/link";

interface InfoPageLayoutProps {
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
}

export default function InfoPageLayout({
  title,
  eyebrow = "HAAVIRA",
  children,
}: InfoPageLayoutProps) {
  return (
    <article className="bg-white">
      <div className="site-container mx-auto max-w-3xl px-[var(--container-px)] py-16 sm:py-24">
        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-gold">
          {eyebrow}
        </p>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          {title}
        </h1>
        <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted sm:text-base">
          {children}
        </div>
        <div className="mt-14 border-t border-border pt-8">
          <p className="text-sm text-muted">
            Questions?{" "}
            <Link
              href="/contact"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              Contact us
            </Link>{" "}
            at{" "}
            <a
              href="mailto:support@haavira.com"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              support@haavira.com
            </a>
          </p>
        </div>
      </div>
    </article>
  );
}

export function InfoSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-sans text-lg font-bold uppercase tracking-wide text-foreground sm:text-xl">
        {title}
      </h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

export function InfoList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
