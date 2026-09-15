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
    const body = await readBody(event);
    if (!body || typeof body !== 'object' || !body.domain) {
      setResponseStatus(event, 204);
      return '';
    }

    await recordTelemetry(body);
    setResponseStatus(event, 204);
    return '';
  } catch {
    setResponseStatus(event, 204);
    return '';
  }
});
