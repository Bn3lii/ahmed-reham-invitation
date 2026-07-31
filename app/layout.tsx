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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://ahmed-reham-invitation-taupe.vercel.app");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Ahmed & Reham Wedding",
  description: "حضوركم شرف لنا — الأحد ٢ أغسطس ٢٠٢٦، قرية اللؤلؤة، الفيوم",
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Ahmed & Reham Wedding",
    title: "Ahmed & Reham Wedding",
    description: "حضوركم شرف لنا — الأحد ٢ أغسطس ٢٠٢٦، قرية اللؤلؤة، الفيوم",
    locale: "ar_EG",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmed & Reham Wedding",
    description: "حضوركم شرف لنا — الأحد ٢ أغسطس ٢٠٢٦، قرية اللؤلؤة، الفيوم",
  },
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
