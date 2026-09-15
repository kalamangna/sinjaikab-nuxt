// server/api/a11y/stats.get.ts
import { getTelemetryStats } from '../../utils/supabase';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const expectedSecret = config.a11yAdminSecret || 'sinjaikab-a11y-2026';

  const query = getQuery(event);
  const authHeader = getHeader(event, 'x-a11y-key');
  const providedKey = authHeader || query.key;

  // Simple key validation for dashboard protection
  if (providedKey !== expectedSecret) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Kunci otorisasi tidak valid',
    });
  }

  // Disable caching so dashboard always gets fresh live data
  setHeader(event, 'Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
  setHeader(event, 'Pragma', 'no-cache');
  setHeader(event, 'Expires', '0');

  const stats = await getTelemetryStats();
  return {
    success: true,
    data: stats,
    generatedAt: new Date().toISOString(),
  };
});
