
DROP POLICY IF EXISTS "Anyone can submit a lead" ON public.leads;
DROP POLICY IF EXISTS "Anyone can insert lead answers" ON public.lead_answers;
DROP POLICY IF EXISTS "Authenticated staff can update leads" ON public.leads;

-- Authenticated staff can update leads (status changes etc.) — restrict to authenticated only.
CREATE POLICY "Staff can update leads"
  ON public.leads FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);
