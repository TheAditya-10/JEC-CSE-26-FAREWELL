"use client";

import { motion } from "framer-motion";

const snippets = [
  "<legacy year=\"2026\" />",
  "const stories = seniors.map(memory);",
  "await celebrate({ dignity: true });",
  "batch.leaveMark('JEC CSE');"
];

export function FloatingCode() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block">
      {snippets.map((snippet, index) => (
        <motion.div
          key={snippet}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.35, y: 0 }}
          transition={{
            delay: 0.4 + index * 0.15,
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="absolute rounded-full border border-gold/10 bg-black/30 px-4 py-2 font-mono text-xs text-gold/70 backdrop-blur-md"
          style={{
            left: `${10 + index * 19}%`,
            top: `${index % 2 === 0 ? 16 + index * 12 : 24 + index * 10}%`
          }}
        >
          {snippet}
        </motion.div>
      ))}
    </div>
  );
}
