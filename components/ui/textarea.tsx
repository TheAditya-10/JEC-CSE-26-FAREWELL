import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-40 w-full rounded-[1.5rem] border border-white/10 bg-black/30 px-4 py-4 text-sm text-mist placeholder:text-mist/40 transition focus:border-gold/70 focus:outline-none focus:ring-2 focus:ring-gold/30",
        className
      )}
      {...props}
    />
  );
}
