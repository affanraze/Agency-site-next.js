import type { Metadata } from "next";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import PageTransition from "@/components/PageTransition";
import PageLoader from "@/components/PageLoader";

export const metadata: Metadata = {
  title: "Branvoy — Restrained Editorial Digital Marketing Agency",
  description: "A digital marketing agency that believes in the power of restraint—delivering work that speaks louder because it doesn't shout.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:ital,opsz,wght@0,14..32,300..700;1,14..32,300..700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col bg-ivory text-ink selection:bg-primary selection:text-ivory">
        {/* Minimal server-rendered overlay so starter animation can display immediately
            on first visit. This is intentionally neutral (no branding) so it only
            serves as an instant visual block until the client PageLoader runs. */}
        <div id="initial-loader" aria-hidden="true" className="fixed inset-0 z-[99999] bg-[#0F190E]" />

        <PageLoader />
        <LenisProvider>
          <Header />
          <PageTransition>
            <main className="flex-1">{children}</main>
          </PageTransition>
          <Footer />
          <FloatingWhatsApp />
        </LenisProvider>
      </body>
    </html>
  );
}

