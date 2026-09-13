import type { Metadata } from "next";
import "./globals.css";
import SiteFrame from "@/components/site-frame";

export const metadata: Metadata = {
  title: "SV Designs | Defender 6x6",
  description: "Expertly crafted Land Rover Defenders | New York",
  metadataBase: new URL("https://svdesigns.com"),
  openGraph: {
    title: "SV Designs | Defender 6x6",
    description: "Expertly crafted Land Rover Defenders | New York",
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