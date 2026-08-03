'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { uploadToCloudinary } from '@/lib/cloudinary';

interface Project {
  id: number;
  title: string;
  category: string;
  services: string;
  year: string;
  metric: string;
  metricLabel: string;
  image: string;
  summary: string;
  clientQuote: string;
  results: string[];
}

export default function ProjectsManagerPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Luxury',
    services: '',
    year: '2025',
    metric: '',
    metricLabel: '',
    image: '',
    summary: '',
    clientQuote: '',
    results: '',
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/admin/projects');
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const res = await uploadToCloudinary(file, 'branvoy/projects');
      setFormData((prev) => ({ ...prev, image: res.secure_url }));
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Upload failed. Check Cloudinary settings.';
      alert(msg);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const resultsArray = formData.results
      .split('\n')
      .map((r) => r.trim())
      .filter(Boolean);

    const method = editingProject ? 'PUT' : 'POST';
    const body = editingProject
      ? { ...formData, results: resultsArray, id: editingProject.id }
      : { ...formData, results: resultsArray };

    const res = await fetch('/api/admin/projects', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      setEditingProject(null);
      setFormData({
        title: '',
        category: 'Luxury',
        services: '',
        year: '2025',
        metric: '',
        metricLabel: '',
        image: '',
        summary: '',
        clientQuote: '',
        results: '',
      });
      fetchProjects();
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      category: project.category,
      services: project.services || '',
      year: project.year || '2025',
      metric: project.metric || '',
      metricLabel: project.metricLabel || '',
      image: project.image || '',
      summary: project.summary || '',
      clientQuote: project.clientQuote || '',
      results: (project.results || []).join('\n'),
    });
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    const res = await fetch('/api/admin/projects', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (res.ok) fetchProjects();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
      <div className="border-b border-ivory/10 pb-4">
        <h1 className="font-serif text-2xl sm:text-3xl text-ivory mb-1">Project & Work CRUD</h1>
        <p className="text-xs text-ivory/50">Manage case studies, metrics, summaries, and upload images to Cloudinary.</p>
      </div>

      {/* Form */}
      <div className="p-4 sm:p-6 bg-ivory/5 border border-ivory/10 rounded-sm">
        <h2 className="font-serif text-lg sm:text-xl text-ivory mb-4">
          {editingProject ? 'Edit Project' : 'Add New Project'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
              <label className="block text-[11px] uppercase font-mono tracking-widest text-ivory/60 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 bg-ink border border-ivory/15 rounded-sm text-ivory text-sm focus:outline-none focus:border-primary"
              >
                <option value="Luxury">Luxury</option>
                <option value="E-Commerce">E-Commerce</option>
                <option value="Tech">Tech</option>
                <option value="B2B">B2B</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] uppercase font-mono tracking-widest text-ivory/60 mb-1">Year</label>
              <input
                type="text"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="w-full px-3 py-2 bg-ink border border-ivory/15 rounded-sm text-ivory text-sm focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] uppercase font-mono tracking-widest text-ivory/60 mb-1">Services</label>
              <input
                type="text"
                value={formData.services}
                onChange={(e) => setFormData({ ...formData, services: e.target.value })}
                placeholder="Brand Identity & Paid Social"
                className="w-full px-3 py-2 bg-ink border border-ivory/15 rounded-sm text-ivory text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase font-mono tracking-widest text-ivory/60 mb-1">Metric (e.g. +184%)</label>
              <input
                type="text"
                value={formData.metric}
                onChange={(e) => setFormData({ ...formData, metric: e.target.value })}
                placeholder="+184%"
                className="w-full px-3 py-2 bg-ink border border-ivory/15 rounded-sm text-ivory text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase font-mono tracking-widest text-ivory/60 mb-1">Metric Label</label>
              <input
                type="text"
                value={formData.metricLabel}
                onChange={(e) => setFormData({ ...formData, metricLabel: e.target.value })}
                placeholder="Conversion Lift"
                className="w-full px-3 py-2 bg-ink border border-ivory/15 rounded-sm text-ivory text-sm focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] uppercase font-mono tracking-widest text-ivory/60 mb-1">Image URL or Cloudinary Upload</label>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://images.unsplash.com/... or Cloudinary URL"
                required
                className="flex-1 px-3 py-2 bg-ink border border-ivory/15 rounded-sm text-ivory text-xs sm:text-sm focus:outline-none focus:border-primary"
              />
              <label className="px-4 py-2 bg-ivory/10 hover:bg-ivory/20 text-ivory text-xs uppercase font-mono rounded-sm cursor-pointer border border-ivory/20 text-center whitespace-nowrap">
                {uploading ? 'Uploading...' : 'Cloudinary Upload'}
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            </div>
          </div>

          {formData.image && (
            <div className="relative w-36 h-20 rounded overflow-hidden border border-ivory/20 bg-ink">
              <Image src={formData.image} alt="Preview" fill className="object-cover" />
            </div>
          )}

          <div>
            <label className="block text-[11px] uppercase font-mono tracking-widest text-ivory/60 mb-1">Summary</label>
            <textarea
              rows={2}
              value={formData.summary}
              onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              className="w-full px-3 py-2 bg-ink border border-ivory/15 rounded-sm text-ivory text-sm focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase font-mono tracking-widest text-ivory/60 mb-1">Client Quote (Optional)</label>
            <input
              type="text"
              value={formData.clientQuote}
              onChange={(e) => setFormData({ ...formData, clientQuote: e.target.value })}
              placeholder="Branvoy transformed our acquisition..."
              className="w-full px-3 py-2 bg-ink border border-ivory/15 rounded-sm text-ivory text-sm focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase font-mono tracking-widest text-ivory/60 mb-1">Key Results (One per line)</label>
            <textarea
              rows={3}
              value={formData.results}
              onChange={(e) => setFormData({ ...formData, results: e.target.value })}
              placeholder="184% Organic conversion lift&#10;3.8x ROAS across Meta"
              className="w-full px-3 py-2 bg-ink border border-ivory/15 rounded-sm text-ivory text-xs focus:outline-none focus:border-primary font-mono"
            />
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 bg-primary text-ivory rounded-sm text-xs font-semibold uppercase tracking-widest hover:bg-primary-light transition-colors"
            >
              {editingProject ? 'Update Project' : 'Save Project'}
            </button>
            {editingProject && (
              <button
                type="button"
                onClick={() => {
                  setEditingProject(null);
                  setFormData({
                    title: '',
                    category: 'Luxury',
                    services: '',
                    year: '2025',
                    metric: '',
                    metricLabel: '',
                    image: '',
                    summary: '',
                    clientQuote: '',
                    results: '',
                  });
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
        <h2 className="font-serif text-lg sm:text-xl text-ivory mb-4">Current Projects ({projects.length})</h2>
        {loading ? (
          <div className="text-sm text-ivory/50 font-mono">Loading projects...</div>
        ) : (
          <div className="space-y-4">
            {projects.map((p) => (
              <div
                key={p.id}
                className="p-4 sm:p-5 bg-ivory/5 border border-ivory/10 rounded-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <div className="relative w-16 h-12 sm:w-20 sm:h-14 rounded overflow-hidden border border-ivory/15 bg-ink flex-shrink-0">
                    {p.image && <Image src={p.image} alt={p.title} fill className="object-cover" />}
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">
                        {p.category}
                      </span>
                      <h3 className="font-serif text-base sm:text-lg text-ivory truncate">{p.title}</h3>
                    </div>
                    <p className="text-xs text-ivory/50 font-light leading-snug line-clamp-2">{p.summary}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto gap-4 flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-ivory/10">
                  {p.metric && (
                    <div className="text-left sm:text-right">
                      <div className="font-serif text-base sm:text-lg text-primary">{p.metric}</div>
                      <div className="text-[9px] font-mono text-ivory/40 uppercase">{p.metricLabel}</div>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="px-2.5 py-1 bg-ivory/10 text-ivory text-xs font-mono rounded hover:bg-ivory/20"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
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
