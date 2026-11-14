import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Noto_Sans_Kannada, Press_Start_2P } from "next/font/google";
import "./globals.css";

const pixelFont = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
});

const kannadaFont = Noto_Sans_Kannada({
  subsets: ["kannada"],
  weight: ["400", "500", "700"],
  variable: "--font-kannada",
});

export const metadata: Metadata = {
  title: "Mission: Dhruva",
  description:
    "A Junior Astronaut Mission Trainer. A bilingual Mars outpost journey for ages 7 to 12, built for the NASA Space Apps Challenge 2026.",
};

export const viewport: Viewport = {
  themeColor: "#140d24",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${pixelFont.variable} ${kannadaFont.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
