import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { AmbientBackground } from "@/components/ambient-background";
import { MusicToggle } from "@/components/music-toggle";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair"
});

export const metadata: Metadata = {
  title: "JEC CSE '26 Farewell",
  description:
    "A premium farewell invitation, registration, and celebration experience for JEC CSE seniors."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} bg-obsidian text-mist antialiased`}>
        <AmbientBackground />
        <MusicToggle />
        {children}
      </body>
    </html>
  );
}
