"use client";

import { useEffect, useMemo, useState } from "react";

const phrases = [
  "Let’s make your ending memorable.",
  "An evening dedicated to stories, memories, and legacy."
];

export function HeroTyping() {
  const [displayText, setDisplayText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const activePhrase = useMemo(() => phrases[phraseIndex], [phraseIndex]);

  useEffect(() => {
    const speed = isDeleting ? 45 : 70;

    const timeout = window.setTimeout(() => {
      if (!isDeleting) {
        const next = activePhrase.slice(0, displayText.length + 1);
        setDisplayText(next);

        if (next === activePhrase) {
          window.setTimeout(() => setIsDeleting(true), 1100);
        }
        return;
      }

      const next = activePhrase.slice(0, Math.max(0, displayText.length - 1));
      setDisplayText(next);

      if (next.length === 0) {
        setIsDeleting(false);
        setPhraseIndex((current) => (current + 1) % phrases.length);
      }
    }, speed);

    return () => window.clearTimeout(timeout);
  }, [activePhrase, displayText, isDeleting]);

  return (
    <p className="min-h-8 text-sm uppercase tracking-[0.34em] text-gold/80 sm:text-base">
      {displayText}
      <span className="ml-1 inline-block h-5 w-px bg-gold/80 align-middle animate-pulse" />
    </p>
  );
}
