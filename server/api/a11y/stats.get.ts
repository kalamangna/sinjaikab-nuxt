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

  const stats = await getTelemetryStats();
  return {
    success: true,
    data: stats,
    generatedAt: new Date().toISOString(),
  };
});
