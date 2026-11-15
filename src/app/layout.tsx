import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Noto_Sans_Kannada, Space_Grotesk } from "next/font/google";
import "./globals.css";
import "./mission.css";

const pixelFont = Space_Grotesk({
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
    "Learn by keeping a little world alive. A bilingual Mars science adventure for ages 7 to 12. Created by Anthahkarana.",
};

export const viewport: Viewport = {
  themeColor: "#f5f3eb",
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
