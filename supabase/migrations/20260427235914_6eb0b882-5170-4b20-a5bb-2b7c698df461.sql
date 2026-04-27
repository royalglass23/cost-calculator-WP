
-- Pricing versions: every change creates a new row; only one is active.
CREATE TABLE public.pricing_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  version INTEGER NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT false,
  rules JSONB NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by UUID
);

CREATE UNIQUE INDEX pricing_versions_version_unique ON public.pricing_versions(version);
CREATE UNIQUE INDEX pricing_versions_one_active
  ON public.pricing_versions(is_active) WHERE is_active = true;

ALTER TABLE public.pricing_versions ENABLE ROW LEVEL SECURITY;

-- Public can read the active pricing version (used for client-side preview hints).
CREATE POLICY "Public can read active pricing"
  ON public.pricing_versions FOR SELECT
  USING (is_active = true);

-- Authenticated staff can read all versions.
CREATE POLICY "Authenticated can read all pricing"
  ON public.pricing_versions FOR SELECT
  TO authenticated USING (true);

-- Leads
CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Contact
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  role TEXT NOT NULL,
  suburb TEXT NOT NULL,
  timeframe TEXT NOT NULL,
  consent BOOLEAN NOT NULL,
  marketing_opt_in BOOLEAN NOT NULL DEFAULT false,
  -- Estimate
  estimate_low NUMERIC(10,2) NOT NULL,
  estimate_high NUMERIC(10,2) NOT NULL,
  estimate_mid NUMERIC(10,2) NOT NULL,
  pricing_version_id UUID NOT NULL REFERENCES public.pricing_versions(id),
  -- Review
  needs_review BOOLEAN NOT NULL DEFAULT false,
  review_reasons JSONB NOT NULL DEFAULT '[]'::jsonb,
  status TEXT NOT NULL DEFAULT 'new',
  -- Tracking
  source TEXT,
  utm JSONB,
  user_agent TEXT,
  ip_hash TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX leads_created_at_idx ON public.leads(created_at DESC);
CREATE INDEX leads_email_idx ON public.leads(email);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a lead (insert), nobody public can read.
CREATE POLICY "Anyone can submit a lead"
  ON public.leads FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated staff can read leads"
  ON public.leads FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "Authenticated staff can update leads"
  ON public.leads FOR UPDATE
  TO authenticated USING (true);

-- Lead answers (full wizard payload + pricing snapshot).
CREATE TABLE public.lead_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  answers JSONB NOT NULL,
  pricing_snapshot JSONB NOT NULL,
  breakdown JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX lead_answers_lead_id_idx ON public.lead_answers(lead_id);

ALTER TABLE public.lead_answers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert lead answers"
  ON public.lead_answers FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated staff can read lead answers"
  ON public.lead_answers FOR SELECT
  TO authenticated USING (true);
