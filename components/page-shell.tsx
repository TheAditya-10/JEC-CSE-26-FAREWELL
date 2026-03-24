import Link from "next/link";
import type { PropsWithChildren } from "react";
import { ArrowLeft } from "lucide-react";
import { PageTransition } from "@/components/motion/page-transition";

type PageShellProps = PropsWithChildren<{
  eyebrow: string;
  title: string;
  description: string;
  backHref?: string;
}>;

export function PageShell({
  eyebrow,
  title,
  description,
  backHref = "/",
  children
}: PageShellProps) {
  return (
    <PageTransition className="mx-auto min-h-screen w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="mb-10 flex items-center justify-between gap-4">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.26em] text-mist/65 transition hover:text-gold"
        >
          <ArrowLeft className="h-4 w-4" />
          Return
        </Link>

        <div className="rounded-full border border-gold/20 bg-gold/10 px-4 py-2 text-[10px] uppercase tracking-[0.34em] text-gold">
          JEC CSE &apos;26
        </div>
      </div>

      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs uppercase tracking-[0.42em] text-gold/70">{eyebrow}</p>
        <h1 className="mt-4 font-display text-4xl text-white sm:text-5xl">{title}</h1>
        <p className="mt-4 text-base leading-8 text-mist/70 sm:text-lg">{description}</p>
      </div>

      <div className="mx-auto mt-12 max-w-3xl">{children}</div>
    </PageTransition>
  );
}
