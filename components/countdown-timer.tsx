"use client";

import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";

type CountdownTimerProps = {
  targetDateISO: string;
};

function getCountdown(targetDateISO: string) {
  const distance = new Date(targetDateISO).getTime() - Date.now();

  if (distance <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((distance / (1000 * 60)) % 60),
    seconds: Math.floor((distance / 1000) % 60)
  };
}

export function CountdownTimer({ targetDateISO }: CountdownTimerProps) {
  const [countdown, setCountdown] = useState(() => getCountdown(targetDateISO));

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCountdown(getCountdown(targetDateISO));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [targetDateISO]);

  const items = useMemo(
    () => [
      { label: "Days", value: countdown.days },
      { label: "Hours", value: countdown.hours },
      { label: "Minutes", value: countdown.minutes },
      { label: "Seconds", value: countdown.seconds }
    ],
    [countdown]
  );

  return (
    <div className="grid gap-3 sm:grid-cols-4">
      {items.map((item) => (
        <Card key={item.label} className="border-gold/10 px-4 py-5 text-center">
          <p className="text-3xl font-semibold text-gold sm:text-4xl">{item.value}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.34em] text-mist/55">{item.label}</p>
        </Card>
      ))}
    </div>
  );
}
