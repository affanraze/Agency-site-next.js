'use client';

import Link from 'next/link';

const cards = [
  { label: 'Team Members', href: '/admin/dashboard/team', desc: 'Add, edit, or remove team members and update photos via Cloudinary.', icon: '👤', color: 'border-blue-500/30 hover:border-blue-500/60' },
  { label: 'Services', href: '/admin/dashboard/services', desc: 'Manage service listings, descriptions, deliverables, and pricing.', icon: '⚡', color: 'border-primary/30 hover:border-primary/60' },
  { label: 'Projects / Work', href: '/admin/dashboard/projects', desc: 'Add case studies, edit metrics, upload project images to Cloudinary.', icon: '◎', color: 'border-purple-500/30 hover:border-purple-500/60' },
  { label: 'Pricing', href: '/admin/dashboard/pricing', desc: 'Update pricing tiers, package names, and included features.', icon: '$', color: 'border-yellow-500/30 hover:border-yellow-500/60' },
];

export default function DashboardOverviewPage() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="font-serif text-4xl text-ivory mb-2">Site Manager</h1>
        <p className="text-sm text-ivory/50 font-light">Manage all website content from this dashboard.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className={`block p-6 bg-ivory/3 border rounded-sm transition-all duration-300 group ${card.color}`}
          >
            <div className="text-3xl mb-4">{card.icon}</div>
            <h2 className="font-serif text-xl text-ivory mb-2 group-hover:text-primary transition-colors">{card.label}</h2>
            <p className="text-xs text-ivory/50 font-light leading-relaxed">{card.desc}</p>
          </Link>
        ))}
      </div>

      <div className="p-5 border border-primary/20 bg-primary/5 rounded-sm">
        <h3 className="text-xs font-mono uppercase tracking-widest text-primary mb-2">Cloudinary Setup</h3>
        <p className="text-xs text-ivory/60 font-light leading-relaxed">
          To enable direct Cloudinary image uploads, add these to your <code className="bg-ivory/10 px-1 rounded text-ivory/80">.env.local</code> file:<br />
          <code className="text-primary">NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name</code><br />
          <code className="text-primary">NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_unsigned_preset</code>
        </p>
      </div>
    </div>
  );
}
