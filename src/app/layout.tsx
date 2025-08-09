import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import Script from "next/script";
import GA4ButtonTracker from "@/components/ga4-button-tracker";
import { GA4Debug } from "@/components/ga4-debug";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AgentPro - Transform Customer Support with Intelligent AI Agents",
  description: "Deploy enterprise-grade AI agents that understand your business, speak your brand voice, and deliver exceptional customer experiences at scale.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <Script
          crossOrigin="anonymous"
          src="//unpkg.com/same-runtime/dist/index.global.js"
        />

        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XWT5762FH8"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XWT5762FH8');
          `}
        </Script>
      </head>
      <body suppressHydrationWarning className="antialiased">
        <GA4ButtonTracker />
        <ClientBody>{children}</ClientBody>
        <GA4Debug />
      </body>
    </html>
  );
}
