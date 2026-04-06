import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display, Geist_Mono } from "next/font/google";
import "./globals.css";

const STAMP_IMAGE = "/terminated-transparent.png";
const STAMP_WIDTH = 432;
const STAMP_HEIGHT = 578;

function resolveMetadataBase(): URL {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
  if (fromEnv) {
    return new URL(fromEnv.endsWith("/") ? fromEnv.slice(0, -1) : fromEnv);
  }
  if (process.env.VERCEL_URL) {
    return new URL(`https://${process.env.VERCEL_URL}`);
  }
  return new URL("http://localhost:3000");
}

const siteTitle = "Terminated PFP";
const siteDescription =
  "Stamp your photo with the TERMINATED seal and download it. Runs locally in your browser.";

export const metadata: Metadata = {
  metadataBase: resolveMetadataBase(),
  title: siteTitle,
  description: siteDescription,
  icons: {
    icon: [
      {
        url: STAMP_IMAGE,
        type: "image/png",
        sizes: `${STAMP_WIDTH}x${STAMP_HEIGHT}`,
      },
    ],
    shortcut: STAMP_IMAGE,
    apple: [{ url: STAMP_IMAGE, type: "image/png" }],
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dm-serif",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${dmSerif.variable} ${geistMono.variable} h-full`}
    >
      <body className="flex min-h-screen flex-col">{children}</body>
    </html>
  );
}
