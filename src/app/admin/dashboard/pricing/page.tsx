'use client';

import { useState, useEffect } from 'react';

interface PricingTier {
  id: number;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
}

export default function PricingManagerPage() {
  const [pricing, setPricing] = useState<PricingTier[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTier, setEditingTier] = useState<PricingTier | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    period: '/ month',
    description: '',
    features: '',
  });

  useEffect(() => {
    fetchPricing();
  }, []);

  const fetchPricing = async () => {
    try {
      const res = await fetch('/api/admin/pricing');
      if (res.ok) {
        const data = await res.json();
        setPricing(data);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const featuresArray = formData.features
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    const method = editingTier ? 'PUT' : 'POST';
    const body = editingTier
      ? { ...formData, features: featuresArray, id: editingTier.id }
      : { ...formData, features: featuresArray };

    const res = await fetch('/api/admin/pricing', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      setEditingTier(null);
      setFormData({ name: '', price: '', period: '/ month', description: '', features: '' });
      fetchPricing();
    }
  };

  const handleEdit = (tier: PricingTier) => {
    setEditingTier(tier);
    setFormData({
      name: tier.name,
      price: tier.price,
      period: tier.period || '/ month',
      description: tier.description || '',
      features: (tier.features || []).join('\n'),
    });
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this pricing tier?')) return;
    const res = await fetch('/api/admin/pricing', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (res.ok) fetchPricing();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
      <div className="border-b border-ivory/10 pb-4">
        <h1 className="font-serif text-2xl sm:text-3xl text-ivory mb-1">Pricing Tiers Management</h1>
        <p className="text-xs text-ivory/50">Manage package prices, descriptions, and feature lists.</p>
      </div>

      {/* Form */}
      <div className="p-4 sm:p-6 bg-ivory/5 border border-ivory/10 rounded-sm">
        <h2 className="font-serif text-lg sm:text-xl text-ivory mb-4">
          {editingTier ? 'Edit Pricing Tier' : 'Add New Tier'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] uppercase font-mono tracking-widest text-ivory/60 mb-1">
                Tier Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="Growth"
                className="w-full px-3 py-2 bg-ink border border-ivory/15 rounded-sm text-ivory text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase font-mono tracking-widest text-ivory/60 mb-1">
                Price *
              </label>
              <input
                type="text"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
                placeholder="$5,000 or Custom"
                className="w-full px-3 py-2 bg-ink border border-ivory/15 rounded-sm text-ivory text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase font-mono tracking-widest text-ivory/60 mb-1">
                Period
              </label>
              <input
                type="text"
                value={formData.period}
                onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                placeholder="/ month"
                className="w-full px-3 py-2 bg-ink border border-ivory/15 rounded-sm text-ivory text-sm focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] uppercase font-mono tracking-widest text-ivory/60 mb-1">
              Short Description
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="For established brands scaling..."
              className="w-full px-3 py-2 bg-ink border border-ivory/15 rounded-sm text-ivory text-sm focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase font-mono tracking-widest text-ivory/60 mb-1">
              Included Features (One per line)
            </label>
            <textarea
              rows={4}
              value={formData.features}
              onChange={(e) => setFormData({ ...formData, features: e.target.value })}
              placeholder="Full brand positioning&#10;3 paid channel management"
              className="w-full px-3 py-2 bg-ink border border-ivory/15 rounded-sm text-ivory text-xs focus:outline-none focus:border-primary font-mono"
            />
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 bg-primary text-ivory rounded-sm text-xs font-semibold uppercase tracking-widest hover:bg-primary-light transition-colors"
            >
              {editingTier ? 'Update Tier' : 'Save Tier'}
            </button>
            {editingTier && (
              <button
                type="button"
                onClick={() => {
                  setEditingTier(null);
                  setFormData({ name: '', price: '', period: '/ month', description: '', features: '' });
                }}
                className="px-6 py-2.5 bg-ivory/10 text-ivory/70 rounded-sm text-xs uppercase font-mono hover:bg-ivory/20"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* List */}
      <div>
        <h2 className="font-serif text-lg sm:text-xl text-ivory mb-4">Current Pricing Tiers ({pricing.length})</h2>
        {loading ? (
          <div className="text-sm text-ivory/50 font-mono">Loading pricing...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pricing.map((tier) => (
              <div key={tier.id} className="p-4 sm:p-5 bg-ivory/5 border border-ivory/10 rounded-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="font-serif text-lg sm:text-xl text-ivory">{tier.name}</h3>
                    <span className="font-mono text-xs sm:text-sm text-primary font-bold whitespace-nowrap">
                      {tier.price} <span className="text-[10px] text-ivory/40">{tier.period}</span>
                    </span>
                  </div>
                  <p className="text-xs text-ivory/50 mb-4 font-light leading-relaxed">{tier.description}</p>

                  <ul className="space-y-1.5 mb-6">
                    {tier.features?.map((f, idx) => (
                      <li key={idx} className="text-xs text-ivory/70 flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-2 pt-3 border-t border-ivory/10">
                  <button
                    onClick={() => handleEdit(tier)}
                    className="flex-1 py-1.5 bg-ivory/10 text-ivory text-xs font-mono rounded hover:bg-ivory/20"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(tier.id)}
                    className="px-3 py-1.5 bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-mono rounded hover:bg-red-500/30"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
