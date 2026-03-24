import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#0B0B0B",
        crimson: "#8B0000",
        gold: "#D4AF37",
        parchment: "#F4E9C9",
        mist: "#EAE3D3"
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(212, 175, 55, 0.18), 0 24px 80px rgba(139, 0, 0, 0.24)",
        card: "0 24px 80px rgba(0, 0, 0, 0.45)"
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(circle at top, rgba(212, 175, 55, 0.16), transparent 36%), radial-gradient(circle at bottom right, rgba(139, 0, 0, 0.24), transparent 42%)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" }
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0 1px rgba(212, 175, 55, 0.14), 0 10px 30px rgba(212, 175, 55, 0.12)" },
          "50%": { boxShadow: "0 0 0 1px rgba(212, 175, 55, 0.3), 0 16px 48px rgba(212, 175, 55, 0.22)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" }
        },
        drift: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(18px, -18px, 0)" }
        },
        twinkle: {
          "0%, 100%": { opacity: "0.25" },
          "50%": { opacity: "0.9" }
        }
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2.6s ease-in-out infinite",
        shimmer: "shimmer 10s linear infinite",
        drift: "drift 12s ease-in-out infinite",
        twinkle: "twinkle 5s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
