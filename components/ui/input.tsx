import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3.5 text-sm text-mist placeholder:text-mist/40 transition focus:border-gold/70 focus:outline-none focus:ring-2 focus:ring-gold/30",
        className
      )}
      {...props}
    />
  );
}
