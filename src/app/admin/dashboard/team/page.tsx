'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { uploadToCloudinary } from '@/lib/cloudinary';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
}

export default function TeamManagerPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState({ name: '', role: '', image: '' });

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const res = await fetch('/api/admin/team');
      if (res.ok) {
        const data = await res.json();
        setTeam(data);
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
      const res = await uploadToCloudinary(file, 'branvoy/team');
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
    const method = editingMember ? 'PUT' : 'POST';
    const body = editingMember ? { ...formData, id: editingMember.id } : formData;

    const res = await fetch('/api/admin/team', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      setEditingMember(null);
      setFormData({ name: '', role: '', image: '' });
      fetchTeam();
    }
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setFormData({ name: member.name, role: member.role, image: member.image });
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this team member?')) return;
    const res = await fetch('/api/admin/team', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (res.ok) fetchTeam();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
      <div className="border-b border-ivory/10 pb-4">
        <h1 className="font-serif text-2xl sm:text-3xl text-ivory mb-1">Team Management</h1>
        <p className="text-xs text-ivory/50">Manage team names, roles, and profile photos.</p>
      </div>

      {/* Form */}
      <div className="p-4 sm:p-6 bg-ivory/5 border border-ivory/10 rounded-sm">
        <h2 className="font-serif text-lg sm:text-xl text-ivory mb-4">
          {editingMember ? 'Edit Team Member' : 'Add New Team Member'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase font-mono tracking-widest text-ivory/60 mb-1">
                Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-3 py-2 bg-ink border border-ivory/15 rounded-sm text-ivory text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-[11px] uppercase font-mono tracking-widest text-ivory/60 mb-1">
                Role *
              </label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                required
                className="w-full px-3 py-2 bg-ink border border-ivory/15 rounded-sm text-ivory text-sm focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] uppercase font-mono tracking-widest text-ivory/60 mb-1">
              Image URL or Upload to Cloudinary
            </label>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="/team/team-1.jpg or Cloudinary URL"
                required
                className="flex-1 px-3 py-2 bg-ink border border-ivory/15 rounded-sm text-ivory text-xs sm:text-sm focus:outline-none focus:border-primary"
              />
              <label className="px-4 py-2 bg-ivory/10 hover:bg-ivory/20 text-ivory text-xs uppercase font-mono rounded-sm cursor-pointer transition-colors border border-ivory/20 text-center whitespace-nowrap">
                {uploading ? 'Uploading...' : 'Cloudinary Upload'}
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            </div>
          </div>

          {formData.image && (
            <div className="flex items-center gap-3 pt-2">
              <div className="relative w-12 h-14 rounded overflow-hidden border border-ivory/20 bg-ink">
                <Image src={formData.image} alt="Preview" fill className="object-cover" />
              </div>
              <span className="text-xs text-primary font-mono">Image loaded preview</span>
            </div>
          )}

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 bg-primary text-ivory rounded-sm text-xs font-semibold uppercase tracking-widest hover:bg-primary-light transition-colors"
            >
              {editingMember ? 'Update Member' : 'Save Member'}
            </button>
            {editingMember && (
              <button
                type="button"
                onClick={() => {
                  setEditingMember(null);
                  setFormData({ name: '', role: '', image: '' });
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
        <h2 className="font-serif text-lg sm:text-xl text-ivory mb-4">Current Team ({team.length})</h2>
        {loading ? (
          <div className="text-sm text-ivory/50 font-mono">Loading team...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {team.map((member) => (
              <div
                key={member.id}
                className="p-4 bg-ivory/5 border border-ivory/10 rounded-sm flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-12 h-16 rounded overflow-hidden border border-ivory/15 bg-ink flex-shrink-0">
                    {member.image ? (
                      <Image src={member.image} alt={member.name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] text-ivory/40">No pic</div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-serif text-base sm:text-lg text-ivory truncate">{member.name}</h3>
                    <p className="text-xs text-primary font-mono uppercase truncate">{member.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(member)}
                    className="px-2.5 py-1 bg-ivory/10 text-ivory text-xs font-mono rounded hover:bg-ivory/20 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(member.id)}
                    className="px-2.5 py-1 bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-mono rounded hover:bg-red-500/30 transition-colors"
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
