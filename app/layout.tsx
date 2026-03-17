import type { Metadata } from "next";
import { Playfair_Display, Dancing_Script, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-display-var",
  subsets: ["latin"],
});

const dancingScript = Dancing_Script({
  variable: "--font-script-var",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-body-var",
  subsets: ["latin"],
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
        className={`${playfair.variable} ${dancingScript.variable} ${inter.variable} font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
