import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

function isSupabaseConfigured() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return url && !url.includes('YOUR_PROJECT_ID');
}

// GET — check if currently authenticated
export async function GET(request: NextRequest) {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) return NextResponse.json({ authenticated: true });
    } catch {
      // Fallback check below
    }
  }

  // Fallback dev token check when Supabase is not configured yet
  const token = request.cookies.get('admin_token')?.value;
  const secretToken = process.env.ADMIN_SECRET_TOKEN || 'branvoy_admin_token_2024';
  if (token === secretToken) {
    return NextResponse.json({ authenticated: true });
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}

// POST — sign in with email + password
export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (!error && data.user) {
        return NextResponse.json({ success: true });
      }
    } catch {
      // Fallback below if Supabase fails
    }
  }

  // Fallback dev password check
  const fallbackPassword = process.env.ADMIN_PASSWORD || 'branvoy2024';
  if (password === fallbackPassword) {
    const response = NextResponse.json({ success: true });
    const secretToken = process.env.ADMIN_SECRET_TOKEN || 'branvoy_admin_token_2024';
    response.cookies.set('admin_token', secretToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });
    return response;
  }

  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
}

// DELETE — sign out
export async function DELETE() {
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();
      await supabase.auth.signOut();
    } catch {
      // Ignore fallback
    }
  }

  const response = NextResponse.json({ success: true });
  response.cookies.delete('admin_token');
  return response;
}
