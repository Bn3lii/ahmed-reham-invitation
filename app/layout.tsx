import type { Metadata } from "next";
import { Cormorant_Garamond, Great_Vibes, Raleway } from "next/font/google";
import "./globals.css";

const displayFont = Cormorant_Garamond({
  variable: "--font-display-var",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const scriptFont = Great_Vibes({
  variable: "--font-script-var",
  subsets: ["latin"],
  weight: "400",
});

const bodyFont = Raleway({
  variable: "--font-body-var",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Ahmed & Reham Wedding",
  description: "Ahmed & Reham Wedding invitation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning
        className={`${displayFont.variable} ${scriptFont.variable} ${bodyFont.variable} font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
