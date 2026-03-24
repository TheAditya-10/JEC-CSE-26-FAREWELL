"use client";

import { motion } from "framer-motion";
import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type PageTransitionProps = PropsWithChildren<{
  className?: string;
}>;

export function PageTransition({ className, children }: PageTransitionProps) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn("relative z-10", className)}
    >
      {children}
    </motion.main>
  );
}
