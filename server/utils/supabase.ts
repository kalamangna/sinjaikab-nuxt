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

export function normalizeDomain(domain: string): string {
  return (domain || 'unknown')
    .toLowerCase()
    .trim()
    .replace(/^www\./i, '')
    .slice(0, 255);
}

export async function recordTelemetry(payload: TelemetryPayload) {
  const config = useRuntimeConfig();
  const supabaseUrl = config.supabaseUrl;
  const supabaseKey = config.supabaseKey;

  const cleanDomain = normalizeDomain(payload.domain);
  const cleanPath = (payload.path || '/').trim().slice(0, 500);
  const nowIso = new Date().toISOString();

  // Exclude internal vercel preview domains, localhost, and admin dashboard
  if (
    cleanDomain.includes('.vercel.app') ||
    cleanDomain.includes('localhost') ||
    cleanDomain === '127.0.0.1' ||
    cleanPath.toLowerCase().includes('/admin/a11y-stats')
  ) {
    return true;
  }

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

      // Fetch domains (filter out vercel preview & localhost, merge www into apex)
      const rawDomains: any[] = await $fetch(`${supabaseUrl}/rest/v1/a11y_domains?select=*&order=last_active_at.desc`, {
        headers,
      });

      const domainMap = new Map<string, any>();
      for (const d of rawDomains || []) {
        const dom = normalizeDomain(d.domain);
        if (dom.includes('.vercel.app') || dom.includes('localhost') || dom === '127.0.0.1') continue;
        const impressions = Number(d.total_impressions) || 0;
        if (impressions <= 0 && d.is_active === false) continue;

        if (domainMap.has(dom)) {
          const existing = domainMap.get(dom);
          existing.total_impressions = (Number(existing.total_impressions) || 0) + impressions;
          if (new Date(d.last_active_at) > new Date(existing.last_active_at)) {
            existing.last_active_at = d.last_active_at;
          }
          if (new Date(d.first_seen_at) < new Date(existing.first_seen_at)) {
            existing.first_seen_at = d.first_seen_at;
          }
        } else {
          domainMap.set(dom, {
            ...d,
            domain: dom,
            total_impressions: impressions,
          });
        }
      }
      const domains = Array.from(domainMap.values()).sort(
        (a, b) => new Date(b.last_active_at).getTime() - new Date(a.last_active_at).getTime()
      );

      // Fetch recent events (filter out vercel preview, localhost, admin stats, and normalize domain)
      const rawEvents: any[] = await $fetch(`${supabaseUrl}/rest/v1/a11y_events?select=*&order=created_at.desc&limit=300`, {
        headers,
      });
      const events = (rawEvents || [])
        .filter((e) => {
          const dom = normalizeDomain(e.domain);
          const p = (e.path || '').toLowerCase();
          return !dom.includes('.vercel.app') && !dom.includes('localhost') && dom !== '127.0.0.1' && !p.includes('/admin/a11y-stats');
        })
        .map((e) => ({
          ...e,
          domain: normalizeDomain(e.domain),
        }));

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
  const memoryDomainMap = new Map<string, any>();
  for (const d of Array.from(memoryDomains.values())) {
    const dom = normalizeDomain(d.domain);
    if (dom.includes('.vercel.app') || dom.includes('localhost') || dom === '127.0.0.1') continue;
    if (memoryDomainMap.has(dom)) {
      const existing = memoryDomainMap.get(dom);
      existing.total_impressions += Number(d.total_impressions) || 0;
    } else {
      memoryDomainMap.set(dom, { ...d, domain: dom, total_impressions: Number(d.total_impressions) || 1 });
    }
  }
  const domains = Array.from(memoryDomainMap.values()).sort(
    (a, b) => new Date(b.last_active_at).getTime() - new Date(a.last_active_at).getTime()
  );

  const events = memoryEvents
    .filter((e) => {
      const dom = normalizeDomain(e.domain);
      const p = (e.path || '').toLowerCase();
      return !dom.includes('.vercel.app') && !dom.includes('localhost') && dom !== '127.0.0.1' && !p.includes('/admin/a11y-stats');
    })
    .map((e) => ({
      ...e,
      domain: normalizeDomain(e.domain),
    }));

  const featureCounts: Record<string, number> = {};
  events.filter((e) => e.type === 'feature_toggle' && e.feature).forEach((e) => {
    if (e.feature) featureCounts[e.feature] = (featureCounts[e.feature] || 0) + 1;
  });

  return {
    totalDomains: domains.length,
    totalEventsSampled: events.length,
    totalImpressions: events.filter((e) => e.type === 'impression').length,
    totalModalOpens: events.filter((e) => e.type === 'modal_open').length,
    featureCounts,
    domains,
    recentEvents: events.slice(0, 30),
  };
}
