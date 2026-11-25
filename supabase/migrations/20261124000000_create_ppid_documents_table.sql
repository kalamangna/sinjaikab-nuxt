-- Tabel cache metadata dokumen publik PPID untuk SSR meta tag dan sitemap
CREATE TABLE IF NOT EXISTS public.ppid_documents (
    id BIGINT PRIMARY KEY,
    slug VARCHAR(255) UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    organization_name VARCHAR(255),
    published_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ,
    synced_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ppid_documents_updated_at ON public.ppid_documents(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_ppid_documents_published_at ON public.ppid_documents(published_at DESC);

ALTER TABLE public.ppid_documents ENABLE ROW LEVEL SECURITY;

-- Hanya izinkan pembacaan publik; penulisan dibatasi ke service_role
DROP POLICY IF EXISTS "Allow public select ppid_documents" ON public.ppid_documents;
CREATE POLICY "Allow public select ppid_documents"
    ON public.ppid_documents
    FOR SELECT
    USING (true);
