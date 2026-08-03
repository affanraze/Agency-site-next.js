'use client';

import { useState, useEffect } from 'react';

interface Service {
  id: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  price: string;
}

export default function ServicesManagerPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    tagline: '',
    description: '',
    deliverables: '',
    price: '',
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/admin/services');
      if (res.ok) {
        const data = await res.json();
        setServices(data);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const deliverablesArray = formData.deliverables
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean);

    const method = editingService ? 'PUT' : 'POST';
    const body = editingService
      ? { ...formData, deliverables: deliverablesArray, id: editingService.id }
      : { ...formData, deliverables: deliverablesArray };

    const res = await fetch('/api/admin/services', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      setEditingService(null);
      setFormData({ title: '', tagline: '', description: '', deliverables: '', price: '' });
      fetchServices();
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      tagline: service.tagline || '',
      description: service.description,
      deliverables: (service.deliverables || []).join('\n'),
      price: service.price || '',
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    const res = await fetch('/api/admin/services', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (res.ok) fetchServices();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
      <div className="border-b border-ivory/10 pb-4">
        <h1 className="font-serif text-2xl sm:text-3xl text-ivory mb-1">Services Management</h1>
        <p className="text-xs text-ivory/50">Add or edit services, titles, deliverables, and prices.</p>
      </div>

      {/* Form */}
      <div className="p-4 sm:p-6 bg-ivory/5 border border-ivory/10 rounded-sm">
        <h2 className="font-serif text-lg sm:text-xl text-ivory mb-4">
          {editingService ? 'Edit Service' : 'Add New Service'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase font-mono tracking-widest text-ivory/60 mb-1">Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="w-full px-3 py-2 bg-ink border border-ivory/15 rounded-sm text-ivory text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase font-mono tracking-widest text-ivory/60 mb-1">Tagline</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                placeholder="Short tagline"
                className="w-full px-3 py-2 bg-ink border border-ivory/15 rounded-sm text-ivory text-sm focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] uppercase font-mono tracking-widest text-ivory/60 mb-1">Description *</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              className="w-full px-3 py-2 bg-ink border border-ivory/15 rounded-sm text-ivory text-sm focus:outline-none focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase font-mono tracking-widest text-ivory/60 mb-1">
                Deliverables (One per line)
              </label>
              <textarea
                rows={4}
                value={formData.deliverables}
                onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
                placeholder="Brand Identity&#10;Market Positioning"
                className="w-full px-3 py-2 bg-ink border border-ivory/15 rounded-sm text-ivory text-xs focus:outline-none focus:border-primary font-mono"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase font-mono tracking-widest text-ivory/60 mb-1">Optional Price/Package</label>
              <input
                type="text"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="e.g. From $3,500"
                className="w-full px-3 py-2 bg-ink border border-ivory/15 rounded-sm text-ivory text-sm focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 bg-primary text-ivory rounded-sm text-xs font-semibold uppercase tracking-widest hover:bg-primary-light transition-colors"
            >
              {editingService ? 'Update Service' : 'Save Service'}
            </button>
            {editingService && (
              <button
                type="button"
                onClick={() => {
                  setEditingService(null);
                  setFormData({ title: '', tagline: '', description: '', deliverables: '', price: '' });
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
        <h2 className="font-serif text-lg sm:text-xl text-ivory mb-4">Current Services ({services.length})</h2>
        {loading ? (
          <div className="text-sm text-ivory/50 font-mono">Loading services...</div>
        ) : (
          <div className="space-y-4">
            {services.map((service) => (
              <div key={service.id} className="p-4 sm:p-5 bg-ivory/5 border border-ivory/10 rounded-sm flex flex-col sm:flex-row justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs text-primary font-bold">{service.id}</span>
                    <h3 className="font-serif text-lg sm:text-xl text-ivory">{service.title}</h3>
                  </div>
                  <p className="text-xs text-ivory/60 mb-2 font-light leading-relaxed">{service.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {service.deliverables?.map((d, i) => (
                      <span key={i} className="text-[10px] font-mono text-primary/80 bg-primary/10 px-2 py-0.5 rounded">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-ivory/10">
                  {service.price && <span className="text-xs font-mono text-ivory font-bold">{service.price}</span>}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(service)}
                      className="px-2.5 py-1 bg-ivory/10 text-ivory text-xs font-mono rounded hover:bg-ivory/20"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="px-2.5 py-1 bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-mono rounded hover:bg-red-500/30"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
