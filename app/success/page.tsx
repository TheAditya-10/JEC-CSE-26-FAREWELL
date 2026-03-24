import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { PageTransition } from "@/components/motion/page-transition";
import { SuccessConfetti } from "@/components/success-confetti";
import { Card } from "@/components/ui/card";
import { buttonStyles } from "@/lib/button-styles";

type SuccessPageProps = {
  searchParams: Promise<{
    companion?: string;
  }>;
};

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const params = await searchParams;
  const isCompanion = params.companion === "true";

  return (
    <PageTransition className="relative mx-auto flex min-h-screen w-full max-w-5xl items-center px-4 py-24 sm:px-6 lg:px-8">
      <SuccessConfetti />

      <Card className="relative mx-auto max-w-3xl border-gold/15 bg-black/35 p-8 text-center sm:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold/25 bg-gold/10 text-gold">
          <CheckCircle2 className="h-8 w-8" />
        </div>

        <p className="mt-8 text-xs uppercase tracking-[0.42em] text-gold/75">Confirmation Secured</p>
        <h1 className="mt-5 font-display text-4xl text-white sm:text-5xl">
          Your presence is now a part of this farewell story.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-mist/70">
          {isCompanion
            ? "The companion reservation has been gracefully recorded alongside the primary invitation."
            : "We look forward to celebrating your journey."}
        </p>

        <div className="mx-auto my-8 h-px w-full max-w-sm hero-divider" />

        <p className="text-sm leading-7 text-mist/55">
          We look forward to celebrating your journey.
        </p>

        <div className="mt-10 flex justify-center">
          <Link href="/" className={buttonStyles({})}>
            Return to the Invitation
          </Link>
        </div>
      </Card>
    </PageTransition>
  );
}
