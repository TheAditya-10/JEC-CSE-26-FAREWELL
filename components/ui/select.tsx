import type { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Select({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3.5 text-sm text-mist transition focus:border-gold/70 focus:outline-none focus:ring-2 focus:ring-gold/30",
        className
      )}
      {...props}
    />
  );
}
