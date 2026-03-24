"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { PropsWithChildren } from "react";
import { buttonStyles } from "@/lib/button-styles";

type ButtonProps = PropsWithChildren<
  HTMLMotionProps<"button"> & {
    variant?: "primary" | "secondary" | "ghost";
    fullWidth?: boolean;
  }
>;

export function Button({
  className,
  variant = "primary",
  fullWidth,
  children,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={buttonStyles({ variant, fullWidth, className })}
      {...props}
    >
      {children}
    </motion.button>
  );
}
