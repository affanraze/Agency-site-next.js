import type { Metadata } from 'next';
 import "../globals.css"
export const metadata: Metadata = {
  title: 'Selected Portfolio & Case Studies — Branvoy Agency',
  description: 'View our portfolio of luxury, D2C e-commerce, tech, and B2B digital campaigns engineered for high ROI and brand authority.',
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
