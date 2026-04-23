import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-ui",
  display: "swap",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CivicFix — Your City Has a Voice. Make It Heard.",
  description:
    "CivicFix is a civic intelligence platform that bridges citizens and municipal authorities. Report local issues, track resolution, and hold your city accountable — with full transparency.",
  keywords: [
    "civic tech",
    "municipal",
    "city issues",
    "public grievances",
    "citizen engagement",
    "urban reporting",
  ],
  openGraph: {
    title: "CivicFix — Your City Has a Voice.",
    description: "Report local issues. Track resolution. Civic transparency.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${display.variable} font-ui antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
