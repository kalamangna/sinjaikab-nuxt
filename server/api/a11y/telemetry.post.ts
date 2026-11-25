// server/api/a11y/telemetry.post.ts
import { isAllowedTelemetryDomain, normalizeDomain, recordTelemetry } from '../../utils/supabase';

const ALLOWED_EVENT_TYPES = new Set(['impression', 'modal_open', 'feature_toggle', 'reset']);

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

    if (!body || typeof body !== 'object' || typeof body.domain !== 'string') {
      setResponseStatus(event, 204);
      return '';
    }

    if (body.type !== undefined && !ALLOWED_EVENT_TYPES.has(String(body.type))) {
      setResponseStatus(event, 204);
      return '';
    }

    const cleanDomain = normalizeDomain(body.domain);
    const cleanPath = String(body.path || '/').toLowerCase().trim();
    if (!isAllowedTelemetryDomain(cleanDomain) || cleanPath.includes('/admin/a11y-stats')) {
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
