import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-card backdrop-blur-2xl sm:p-8",
        className
      )}
      {...props}
    />
  );
}
