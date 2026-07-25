import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Start A Project — Contact Branvoy Agency',
  description: 'Initiate a partnership inquiry with Branvoy. We evaluate every brand inquiry within 24 business hours.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
