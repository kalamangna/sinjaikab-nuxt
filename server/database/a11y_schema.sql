-- ==============================================================================
-- Skema Basis Data Telemetri Widget Aksesibilitas Sinjai (a11y-sinjaikab)
-- Dapat dijalankan langsung di SQL Editor Supabase
-- ==============================================================================

-- 1. Tabel Registrasi & Agregat Domain Pengguna
CREATE TABLE IF NOT EXISTS a11y_domains (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    domain VARCHAR(255) UNIQUE NOT NULL,
    first_seen_at TIMESTAMPTZ DEFAULT NOW(),
    last_active_at TIMESTAMPTZ DEFAULT NOW(),
    total_impressions BIGINT DEFAULT 1,
    is_active BOOLEAN DEFAULT TRUE
);

-- 2. Tabel Catatan Aktivitas & Fitur yang Digunakan (Zero-PII)
CREATE TABLE IF NOT EXISTS a11y_events (
    id BIGSERIAL PRIMARY KEY,
    domain VARCHAR(255) NOT NULL,
    event_type VARCHAR(50) NOT NULL,    -- 'impression', 'modal_open', 'feature_toggle', 'reset'
    feature_name VARCHAR(50),           -- 'textSize', 'contrast', 'dyslexiaFont', dll.
    feature_value VARCHAR(50),          -- '2', 'dark', 'true', dll.
    path VARCHAR(500),                  -- URL path halaman host (/berita, dsb.)
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indeks performa untuk analitik cepat
CREATE INDEX IF NOT EXISTS idx_a11y_events_domain_created ON a11y_events(domain, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_a11y_events_feature ON a11y_events(feature_name);
CREATE INDEX IF NOT EXISTS idx_a11y_events_type ON a11y_events(event_type);

-- Row Level Security (RLS)
ALTER TABLE a11y_domains ENABLE ROW LEVEL SECURITY;
ALTER TABLE a11y_events ENABLE ROW LEVEL SECURITY;

-- Kebijakan akses untuk service role / API
CREATE POLICY "Allow server API access to a11y_domains" ON a11y_domains
    FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow server API access to a11y_events" ON a11y_events
    FOR ALL USING (true) WITH CHECK (true);
