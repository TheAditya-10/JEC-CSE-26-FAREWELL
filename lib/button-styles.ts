import { cn } from "@/lib/utils";

const baseStyles =
  "inline-flex items-center justify-center rounded-full border px-6 py-3.5 text-sm font-medium tracking-[0.18em] transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 disabled:cursor-not-allowed disabled:opacity-50";

const variants = {
  primary:
    "border-gold/70 bg-gradient-to-r from-gold/90 via-[#E1C76B] to-gold text-obsidian shadow-glow hover:-translate-y-0.5",
  secondary:
    "border-gold/30 bg-white/6 text-mist backdrop-blur-md hover:border-gold/60 hover:bg-white/10",
  ghost:
    "border-white/10 bg-transparent text-mist hover:border-gold/40 hover:text-gold"
};

export function buttonStyles({
  variant = "primary",
  fullWidth,
  className
}: {
  variant?: "primary" | "secondary" | "ghost";
  fullWidth?: boolean;
  className?: string;
}) {
  return cn(baseStyles, variants[variant], fullWidth && "w-full", className);
}
