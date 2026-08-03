import type { Metadata } from "next";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import PageTransition from "@/components/PageTransition";
import PageLoader from "@/components/PageLoader";

export const metadata: Metadata = {
  metadataBase: new URL("https://branvoy.agency"),
  title: {
    default: "Branvoy — Restrained Editorial Digital Marketing Agency | Dubai",
    template: "%s | Branvoy Agency",
  },
  description:
    "Branvoy is a Dubai-based editorial digital marketing agency delivering restrained, measurable brand authority. Brand strategy, performance marketing, content & web design for ambitious brands.",
  keywords: [
    "digital marketing agency Dubai",
    "brand strategy Dubai",
    "performance marketing agency",
    "editorial marketing agency",
    "social media marketing Dubai",
    "paid ads agency",
    "web design agency Dubai",
    "content marketing",
    "Branvoy",
    "luxury brand marketing",
  ],
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: "https://branvoy.agency",
    siteName: "Branvoy Agency",
    title: "Branvoy — Restrained Editorial Digital Marketing Agency | Dubai",
    description:
      "A Dubai-based digital marketing agency that believes in the power of restraint—delivering brand authority that speaks louder because it doesn't shout.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Branvoy Digital Marketing Agency Dubai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Branvoy — Restrained Editorial Digital Marketing Agency",
    description:
      "A Dubai digital marketing agency delivering restrained, measurable brand authority.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Branvoy Agency",
  url: "https://branvoy.agency",
  logo: "https://branvoy.agency/agency-logo-circle.png",
  description:
    "A Dubai-based editorial digital marketing agency delivering restrained brand authority and measurable performance results.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dubai",
    addressCountry: "AE",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@branvoy.agency",
    contactType: "customer service",
  },
  sameAs: [
    "https://www.instagram.com/branvoy.agency",
    "https://www.facebook.com/branvoy.agency",
    "https://www.linkedin.com/company/branvoy/",
  ],
  foundingDate: "2022",
  areaServed: ["AE", "GB", "US", "PK"],
  serviceType: [
    "Brand Strategy",
    "Performance Marketing",
    "Content Production",
    "Web Design",
  ],
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
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Manrope:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="canonical" href="https://branvoy.agency" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-ivory text-ink selection:bg-primary selection:text-ivory">
        {/* Minimal server-rendered overlay so starter animation can display immediately
            on first visit. This is intentionally neutral so it only
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
