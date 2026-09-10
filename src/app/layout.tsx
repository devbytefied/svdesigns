import type { Metadata } from "next";
import "./globals.css";
import SiteFrame from "@/components/site-frame";

export const metadata: Metadata = {
  title: "SV Designs | Defender 6x6",
  description:
    "SV Designs Inc. — an automotive design enclave in New York. Bespoke Defender coachwork, manufactured for the few.",
  metadataBase: new URL("https://svdesigns.com"),
  openGraph: {
    title: "SV Designs | Defender 6x6",
    description:
      "Bespoke Defender coachwork from New York. Manufactured for the few.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">
        <SiteFrame>{children}</SiteFrame>
      </body>
    </html>
  );
}