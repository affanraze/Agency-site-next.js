import { NextRequest, NextResponse } from 'next/server';
import { createClient, createServiceClient } from '@/lib/supabase/server';

async function requireAuth() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return !!user;
}

export async function GET() {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const supabase = await createServiceClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('id', { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await request.json();
  const supabase = await createServiceClient();

  const { data, error } = await supabase
    .from('projects')
    .insert({
      title: body.title,
      category: body.category,
      services: body.services || '',
      year: body.year || new Date().getFullYear().toString(),
      metric: body.metric || '',
      metric_label: body.metricLabel || '',
      image: body.image || '',
      summary: body.summary || '',
      client_quote: body.clientQuote || '',
      results: body.results || [],
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  // Normalize snake_case → camelCase for the client
  return NextResponse.json(normalizeProject(data), { status: 201 });
}

export async function PUT(request: NextRequest) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await request.json();
  const supabase = await createServiceClient();

  const { data, error } = await supabase
    .from('projects')
    .update({
      title: body.title,
      category: body.category,
      services: body.services || '',
      year: body.year || new Date().getFullYear().toString(),
      metric: body.metric || '',
      metric_label: body.metricLabel || '',
      image: body.image || '',
      summary: body.summary || '',
      client_quote: body.clientQuote || '',
      results: body.results || [],
    })
    .eq('id', body.id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(normalizeProject(data));
}

export async function DELETE(request: NextRequest) {
  if (!(await requireAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id } = await request.json();
  const supabase = await createServiceClient();

  const { error } = await supabase.from('projects').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

// Convert Supabase snake_case columns back to camelCase for the frontend
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeProject(p: any) {
  return {
    id: p.id,
    title: p.title,
    category: p.category,
    services: p.services,
    year: p.year,
    metric: p.metric,
    metricLabel: p.metric_label,
    image: p.image,
    summary: p.summary,
    clientQuote: p.client_quote,
    results: p.results,
  };
}
