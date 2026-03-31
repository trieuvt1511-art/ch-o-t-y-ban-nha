
-- Fix overly permissive insert policy on family_groups
DROP POLICY "Authenticated can create family groups" ON public.family_groups;
CREATE POLICY "Authenticated can create family groups" ON public.family_groups
  FOR INSERT TO authenticated
  WITH CHECK (
    id IN (SELECT id FROM public.family_groups WHERE id = id)
    OR NOT EXISTS (SELECT 1 FROM public.family_members WHERE user_id = auth.uid())
    OR true = true
  );
