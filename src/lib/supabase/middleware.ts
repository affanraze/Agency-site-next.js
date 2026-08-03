import { createServerClient } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';

// Used ONLY in middleware.ts to refresh the Supabase session on every request
export async function updateSession(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle misplaced admin paths (e.g. /contact/admin -> /admin, /services/admin/dashboard -> /admin/dashboard)
  if (!pathname.startsWith('/admin') && pathname.includes('/admin')) {
    const adminPath = pathname.substring(pathname.indexOf('/admin'));
    const url = request.nextUrl.clone();
    url.pathname = adminPath;
    return NextResponse.redirect(url);
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const isSupabaseConfigured =
    supabaseUrl &&
    supabaseAnonKey &&
    !supabaseUrl.includes('YOUR_PROJECT_ID');

  if (isSupabaseConfigured) {
    try {
      const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            supabaseResponse = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            );
          },
        },
      });

      const {
        data: { user },
      } = await supabase.auth.getUser();

      // Protect /admin/dashboard — redirect to /admin if not authenticated
      if (pathname.startsWith('/admin/dashboard') && !user) {
        const url = request.nextUrl.clone();
        url.pathname = '/admin';
        return NextResponse.redirect(url);
      }
    } catch {
      // Ignore Supabase connection error during initial dev setup
    }
  }

  return supabaseResponse;
}
