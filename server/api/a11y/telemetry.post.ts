// server/api/a11y/telemetry.post.ts
import { recordTelemetry } from '../../utils/supabase';

export default defineEventHandler(async (event) => {
  // Enable CORS for all host websites embedding the widget
  setResponseHeaders(event, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });

  try {
    let body = await readBody(event);

    // If body was sent as text/plain or string, parse JSON
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        body = null;
      }
    }

    if (!body || typeof body !== 'object' || !body.domain) {
      setResponseStatus(event, 204);
      return '';
    }

    // Exclude internal environments (vercel.app, localhost) and admin dashboard
    const cleanDomain = String(body.domain || '').toLowerCase().trim().replace(/^www\./i, '');
    const cleanPath = String(body.path || '/').toLowerCase().trim();
    if (
      cleanDomain.includes('.vercel.app') ||
      cleanDomain.includes('localhost') ||
      cleanDomain === '127.0.0.1' ||
      cleanPath.includes('/admin/a11y-stats')
    ) {
      setResponseStatus(event, 204);
      return '';
    }

    body.domain = cleanDomain;
    await recordTelemetry(body);
    setResponseStatus(event, 204);
    return '';
  } catch {
    setResponseStatus(event, 204);
    return '';
  }
});
