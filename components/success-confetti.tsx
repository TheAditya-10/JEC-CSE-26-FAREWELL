"use client";

import { motion } from "framer-motion";

const pieces = Array.from({ length: 24 });
const palette = ["#D4AF37", "#8B0000", "#F4E9C9"];

export function SuccessConfetti() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((_, index) => (
        <motion.span
          key={index}
          initial={{
            opacity: 0,
            x: `${(index * 13) % 100}%`,
            y: "-10%",
            rotate: 0
          }}
          animate={{
            opacity: [0, 1, 1, 0],
            y: "110%",
            rotate: 240 + index * 12
          }}
          transition={{
            duration: 3.8 + (index % 5) * 0.25,
            delay: index * 0.07,
            ease: "easeOut"
          }}
          className="absolute h-3 w-1.5 rounded-full"
          style={{
            left: `${(index * 11) % 100}%`,
            backgroundColor: palette[index % palette.length]
          }}
        />
      ))}
    </div>
  );
}
