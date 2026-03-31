
-- Family groups
CREATE TABLE public.family_groups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT 'Gia đình',
  code text UNIQUE NOT NULL DEFAULT substr(md5(random()::text), 1, 6),
  quest_title text,
  quest_target integer DEFAULT 50,
  quest_progress integer DEFAULT 0,
  quest_week date DEFAULT date_trunc('week', CURRENT_DATE)::date,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Family members
CREATE TABLE public.family_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id uuid REFERENCES public.family_groups(id) ON DELETE CASCADE NOT NULL,
  user_id uuid NOT NULL,
  role text NOT NULL DEFAULT 'member',
  color text NOT NULL DEFAULT '#E84E3F',
  joined_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(family_id, user_id)
);

-- Cheers
CREATE TABLE public.cheers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id uuid REFERENCES public.family_groups(id) ON DELETE CASCADE NOT NULL,
  from_user_id uuid NOT NULL,
  to_user_id uuid NOT NULL,
  cheer_type text NOT NULL DEFAULT '❤️',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Duel results
CREATE TABLE public.duel_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id uuid REFERENCES public.family_groups(id) ON DELETE CASCADE NOT NULL,
  challenger_id uuid NOT NULL,
  opponent_id uuid NOT NULL,
  challenger_score integer NOT NULL DEFAULT 0,
  opponent_score integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Voice posts
CREATE TABLE public.voice_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id uuid REFERENCES public.family_groups(id) ON DELETE CASCADE NOT NULL,
  user_id uuid NOT NULL,
  text text NOT NULL DEFAULT '',
  reactions jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Story sentences
CREATE TABLE public.story_sentences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id uuid REFERENCES public.family_groups(id) ON DELETE CASCADE NOT NULL,
  user_id uuid NOT NULL,
  sentence text NOT NULL,
  week date NOT NULL DEFAULT date_trunc('week', CURRENT_DATE)::date,
  order_num integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Daily phrase log
CREATE TABLE public.daily_phrase_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  phrase_date date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, phrase_date)
);

-- Enable RLS on all tables
ALTER TABLE public.family_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cheers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.duel_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.voice_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.story_sentences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_phrase_log ENABLE ROW LEVEL SECURITY;

-- RLS: Family groups - members can see their groups
CREATE POLICY "Members can view their family groups" ON public.family_groups
  FOR SELECT TO authenticated
  USING (id IN (SELECT family_id FROM public.family_members WHERE user_id = auth.uid()));

CREATE POLICY "Authenticated can create family groups" ON public.family_groups
  FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Members can update their family groups" ON public.family_groups
  FOR UPDATE TO authenticated
  USING (id IN (SELECT family_id FROM public.family_members WHERE user_id = auth.uid()));

-- RLS: Family members
CREATE POLICY "Members can view family members" ON public.family_members
  FOR SELECT TO authenticated
  USING (family_id IN (SELECT family_id FROM public.family_members fm WHERE fm.user_id = auth.uid()));

CREATE POLICY "Authenticated can join families" ON public.family_members
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Members can leave" ON public.family_members
  FOR DELETE TO authenticated
  USING (user_id = auth.uid());

-- RLS: Cheers - family members can see and send
CREATE POLICY "Family members can manage cheers" ON public.cheers
  FOR ALL TO authenticated
  USING (family_id IN (SELECT family_id FROM public.family_members WHERE user_id = auth.uid()))
  WITH CHECK (family_id IN (SELECT family_id FROM public.family_members WHERE user_id = auth.uid()) AND from_user_id = auth.uid());

-- RLS: Duel results
CREATE POLICY "Family members can manage duels" ON public.duel_results
  FOR ALL TO authenticated
  USING (family_id IN (SELECT family_id FROM public.family_members WHERE user_id = auth.uid()))
  WITH CHECK (family_id IN (SELECT family_id FROM public.family_members WHERE user_id = auth.uid()));

-- RLS: Voice posts
CREATE POLICY "Family members can manage voice posts" ON public.voice_posts
  FOR ALL TO authenticated
  USING (family_id IN (SELECT family_id FROM public.family_members WHERE user_id = auth.uid()))
  WITH CHECK (family_id IN (SELECT family_id FROM public.family_members WHERE user_id = auth.uid()) AND user_id = auth.uid());

-- RLS: Story sentences
CREATE POLICY "Family members can manage stories" ON public.story_sentences
  FOR ALL TO authenticated
  USING (family_id IN (SELECT family_id FROM public.family_members WHERE user_id = auth.uid()))
  WITH CHECK (family_id IN (SELECT family_id FROM public.family_members WHERE user_id = auth.uid()) AND user_id = auth.uid());

-- RLS: Daily phrase log
CREATE POLICY "Users can manage own phrase log" ON public.daily_phrase_log
  FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Enable realtime for key tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.cheers;
ALTER PUBLICATION supabase_realtime ADD TABLE public.voice_posts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.story_sentences;
