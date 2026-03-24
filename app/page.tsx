import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CodeXml,
  MapPin,
  MessageCircleHeart,
  WalletCards
} from "lucide-react";
import { CountdownTimer } from "@/components/countdown-timer";
import { FloatingCode } from "@/components/floating-code";
import { HeroTyping } from "@/components/hero-typing";
import { PageTransition } from "@/components/motion/page-transition";
import { Card } from "@/components/ui/card";
import { buttonStyles } from "@/lib/button-styles";
import {
  EVENT_DATE_LABEL,
  EVENT_NAME,
  EVENT_SUBTITLE,
  EVENT_VENUE_LABEL,
  getNextFarewellDate
} from "@/lib/constants";

const experienceCards = [
  {
    icon: WalletCards,
    title: "Secure Confirmation",
    description: "A calm, guided registration and payment flow built to respect the occasion."
  },
  {
    icon: MessageCircleHeart,
    title: "Meaningful Additions",
    description: "Anonymous suggestions and thoughtful companion booking, handled with warmth."
  },
  {
    icon: CodeXml,
    title: "Crafted with Intention",
    description: "A premium digital tribute shaped by juniors who value your legacy."
  }
];

export default function HomePage() {
  const countdownTarget = getNextFarewellDate().toISOString();

  return (
    <PageTransition className="mx-auto min-h-screen w-full max-w-7xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-hero-radial px-6 py-12 shadow-card backdrop-blur-xl sm:px-10 sm:py-16 lg:px-14 lg:py-20">
        <FloatingCode />

        <div className="relative z-10 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.42em] text-gold/75">A Farewell Experience</p>
            <h1 className="mt-5 font-display text-5xl leading-tight text-white sm:text-6xl lg:text-7xl">
              {EVENT_NAME}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-mist/72 sm:text-xl">
              {EVENT_SUBTITLE}
            </p>

            <div className="my-8 h-px w-full max-w-md hero-divider" />

            <HeroTyping />

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/register"
                className={buttonStyles({
                  className: "animate-pulse-glow px-8 py-4 text-xs tracking-[0.3em]"
                })}
              >
                Grace Your Presence
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-xs uppercase tracking-[0.28em] text-mist/60 backdrop-blur-md">
                Black, Gold, and Memory
              </div>
            </div>
          </div>

          <Card className="border-gold/15 bg-black/35">
            <div className="space-y-6">
              <div className="rounded-[1.75rem] border border-gold/15 bg-gold/8 p-5">
                <div className="flex items-start gap-3">
                  <CalendarDays className="mt-1 h-5 w-5 text-gold" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.32em] text-gold/72">Date</p>
                    <p className="mt-2 text-lg text-mist">{EVENT_DATE_LABEL}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 text-gold" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.32em] text-gold/72">Venue</p>
                    <p className="mt-2 text-lg text-mist">{EVENT_VENUE_LABEL}</p>
                  </div>
                </div>
              </div>

              <p className="text-sm leading-7 text-mist/65">
                This evening is reserved for remembrance, gratitude, and the quiet pride of all that your batch leaves behind.
              </p>
            </div>
          </Card>
        </div>
      </section>

      <section className="mt-20">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.38em] text-gold/70">Countdown</p>
            <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">
              The evening draws nearer
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-mist/60">
            A live countdown now tracks the next upcoming March 2 celebration window.
          </p>
        </div>

        <CountdownTimer targetDateISO={countdownTarget} />
      </section>

      <section className="mt-20 grid gap-6 lg:grid-cols-3">
        {experienceCards.map(({ icon: Icon, title, description }) => (
          <Card key={title} className="border-white/8 bg-white/[0.045]">
            <div className="rounded-2xl border border-gold/12 bg-gold/8 p-3 text-gold w-fit">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-6 font-display text-2xl text-white">{title}</h3>
            <p className="mt-4 text-sm leading-7 text-mist/65">{description}</p>
          </Card>
        ))}
      </section>
    </PageTransition>
  );
}
