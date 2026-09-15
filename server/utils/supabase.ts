// server/utils/supabase.ts
// Direct Supabase PostgREST client for maximum speed and zero extra dependencies on Vercel Serverless

interface TelemetryPayload {
  domain: string;
  path?: string;
  type: 'impression' | 'modal_open' | 'feature_toggle' | 'reset';
  feature?: string;
  value?: string;
  timestamp?: number;
}

// In-memory fallback cache when Supabase credentials are not configured yet
const memoryDomains = new Map<string, { domain: string; first_seen_at: string; last_active_at: string; total_impressions: number }>();
const memoryEvents: Array<TelemetryPayload & { created_at: string; id: number }> = [];
let eventIdCounter = 1;

export async function recordTelemetry(payload: TelemetryPayload) {
  const config = useRuntimeConfig();
  const supabaseUrl = config.supabaseUrl;
  const supabaseKey = config.supabaseKey;

  const cleanDomain = (payload.domain || 'unknown').toLowerCase().trim().slice(0, 255);
  const cleanPath = (payload.path || '/').trim().slice(0, 500);
  const nowIso = new Date().toISOString();

  // If Supabase credentials are configured, persist to database
  if (supabaseUrl && supabaseKey) {
    try {
      const headers = {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
      };

      // 1. Record event
      await $fetch(`${supabaseUrl}/rest/v1/a11y_events`, {
        method: 'POST',
        headers: { ...headers, Prefer: 'return=minimal' },
        body: {
          domain: cleanDomain,
          event_type: payload.type || 'impression',
          feature_name: payload.feature || null,
          feature_value: payload.value || null,
          path: cleanPath,
          created_at: nowIso,
        },
      });

      // 2. Upsert domain record with incremented impression count
      const existingRows: any[] = await $fetch(
        `${supabaseUrl}/rest/v1/a11y_domains?domain=eq.${encodeURIComponent(cleanDomain)}&select=id,total_impressions`,
        { headers }
      ).catch(() => []);

      if (existingRows && existingRows.length > 0) {
        const currentImpressions = Number(existingRows[0].total_impressions) || 1;
        const newImpressions = payload.type === 'impression' ? currentImpressions + 1 : currentImpressions;
        await $fetch(`${supabaseUrl}/rest/v1/a11y_domains?id=eq.${existingRows[0].id}`, {
          method: 'PATCH',
          headers: { ...headers, Prefer: 'return=minimal' },
          body: {
            last_active_at: nowIso,
            total_impressions: newImpressions,
          },
        }).catch(() => {});
      } else {
        await $fetch(`${supabaseUrl}/rest/v1/a11y_domains`, {
          method: 'POST',
          headers: { ...headers, Prefer: 'return=minimal' },
          body: {
            domain: cleanDomain,
            first_seen_at: nowIso,
            last_active_at: nowIso,
            total_impressions: 1,
            is_active: true,
          },
        }).catch(() => {});
      }
      return true;
    } catch (error) {
      console.warn('[A11y Telemetry] Supabase error, falling back to memory:', error);
    }
  }

  // Fallback: In-memory store (for dev / preview)
  const existing = memoryDomains.get(cleanDomain);
  if (existing) {
    existing.last_active_at = nowIso;
    if (payload.type === 'impression') existing.total_impressions++;
  } else {
    memoryDomains.set(cleanDomain, {
      domain: cleanDomain,
      first_seen_at: nowIso,
      last_active_at: nowIso,
      total_impressions: 1,
    });
  }

  memoryEvents.unshift({
    ...payload,
    domain: cleanDomain,
    path: cleanPath,
    created_at: nowIso,
    id: eventIdCounter++,
  });

  if (memoryEvents.length > 500) memoryEvents.pop();
  return true;
}

export async function getTelemetryStats() {
  const config = useRuntimeConfig();
  const supabaseUrl = config.supabaseUrl;
  const supabaseKey = config.supabaseKey;

  if (supabaseUrl && supabaseKey) {
    try {
      const headers = {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
      };

      // Fetch domains
      const domains: any[] = await $fetch(`${supabaseUrl}/rest/v1/a11y_domains?select=*&order=last_active_at.desc`, {
        headers,
      });

      // Fetch recent 200 events for feature distribution
      const events: any[] = await $fetch(`${supabaseUrl}/rest/v1/a11y_events?select=*&order=created_at.desc&limit=200`, {
        headers,
      });

      const totalImpressions = domains.reduce((sum, d) => sum + (Number(d.total_impressions) || 0), 0);
      const totalModalOpens = events.filter((e) => e.event_type === 'modal_open').length;

      // Group feature frequency
      const featureCounts: Record<string, number> = {};
      events.filter((e) => e.event_type === 'feature_toggle' && e.feature_name).forEach((e) => {
        featureCounts[e.feature_name] = (featureCounts[e.feature_name] || 0) + 1;
      });

      return {
        totalDomains: domains.length,
        totalEventsSampled: events.length,
        totalImpressions,
        totalModalOpens,
        featureCounts,
        domains,
        recentEvents: events.slice(0, 30),
      };
    } catch (error) {
      console.warn('[A11y Telemetry] Error reading Supabase stats, fallback to memory:', error);
    }
  }

  // Fallback: In-memory store
  const domains = Array.from(memoryDomains.values());
  const featureCounts: Record<string, number> = {};
  memoryEvents.filter((e) => e.type === 'feature_toggle' && e.feature).forEach((e) => {
    if (e.feature) featureCounts[e.feature] = (featureCounts[e.feature] || 0) + 1;
  });

  return {
    totalDomains: domains.length,
    totalEventsSampled: memoryEvents.length,
    totalImpressions: memoryEvents.filter((e) => e.type === 'impression').length,
    totalModalOpens: memoryEvents.filter((e) => e.type === 'modal_open').length,
    featureCounts,
    domains,
    recentEvents: memoryEvents.slice(0, 30),
  };
}
