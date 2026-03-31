
-- 1. families
CREATE TABLE public.families (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT 'Gia đình',
  invite_code text NOT NULL UNIQUE DEFAULT substr(md5(random()::text), 1, 6),
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.families ENABLE ROW LEVEL SECURITY;

-- 2. members
CREATE TABLE public.members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id uuid NOT NULL REFERENCES public.families(id) ON DELETE CASCADE,
  name text NOT NULL,
  emoji text NOT NULL DEFAULT '😊',
  color text NOT NULL DEFAULT '#E84E3F',
  xp integer NOT NULL DEFAULT 0,
  streak integer NOT NULL DEFAULT 0,
  last_active date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;

-- 3. family_feed
CREATE TABLE public.family_feed (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id uuid NOT NULL REFERENCES public.families(id) ON DELETE CASCADE,
  member_id uuid NOT NULL REFERENCES public.members(id) ON DELETE CASCADE,
  type text NOT NULL DEFAULT 'cheer',
  content text NOT NULL DEFAULT '',
  audio_url text,
  reactions jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.family_feed ENABLE ROW LEVEL SECURITY;

-- 4. family_quests
CREATE TABLE public.family_quests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id uuid NOT NULL REFERENCES public.families(id) ON DELETE CASCADE,
  week text NOT NULL,
  title text NOT NULL,
  target_xp integer NOT NULL DEFAULT 50,
  current_xp integer NOT NULL DEFAULT 0,
  completed boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.family_quests ENABLE ROW LEVEL SECURITY;

-- 5. duels
CREATE TABLE public.duels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id uuid NOT NULL REFERENCES public.families(id) ON DELETE CASCADE,
  challenger_id uuid NOT NULL REFERENCES public.members(id) ON DELETE CASCADE,
  opponent_id uuid NOT NULL REFERENCES public.members(id) ON DELETE CASCADE,
  challenger_score integer NOT NULL DEFAULT 0,
  opponent_score integer NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.duels ENABLE ROW LEVEL SECURITY;

-- 6. family_stories
CREATE TABLE public.family_stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id uuid NOT NULL REFERENCES public.families(id) ON DELETE CASCADE,
  week text NOT NULL,
  sentences jsonb NOT NULL DEFAULT '[]'::jsonb,
  completed boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.family_stories ENABLE ROW LEVEL SECURITY;

-- 7. daily_phrases
CREATE TABLE public.daily_phrases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL UNIQUE DEFAULT CURRENT_DATE,
  spanish text NOT NULL,
  vietnamese text NOT NULL,
  checkins jsonb NOT NULL DEFAULT '[]'::jsonb
);
ALTER TABLE public.daily_phrases ENABLE ROW LEVEL SECURITY;

-- ========== RLS POLICIES ==========

-- families: anyone can read (to join by code), authenticated can create
CREATE POLICY "Anyone can read families" ON public.families FOR SELECT USING (true);
CREATE POLICY "Anyone can create families" ON public.families FOR INSERT WITH CHECK (true);
CREATE POLICY "Members can update families" ON public.families FOR UPDATE USING (
  id IN (SELECT family_id FROM public.members)
);

-- members: public read within family, anyone can insert
CREATE POLICY "Anyone can read members" ON public.members FOR SELECT USING (true);
CREATE POLICY "Anyone can create members" ON public.members FOR INSERT WITH CHECK (true);
CREATE POLICY "Members can update self" ON public.members FOR UPDATE USING (true);
CREATE POLICY "Members can delete self" ON public.members FOR DELETE USING (true);

-- family_feed: read/write for family members
CREATE POLICY "Read family feed" ON public.family_feed FOR SELECT USING (true);
CREATE POLICY "Create family feed" ON public.family_feed FOR INSERT WITH CHECK (true);
CREATE POLICY "Update family feed" ON public.family_feed FOR UPDATE USING (true);

-- family_quests
CREATE POLICY "Read quests" ON public.family_quests FOR SELECT USING (true);
CREATE POLICY "Create quests" ON public.family_quests FOR INSERT WITH CHECK (true);
CREATE POLICY "Update quests" ON public.family_quests FOR UPDATE USING (true);

-- duels
CREATE POLICY "Read duels" ON public.duels FOR SELECT USING (true);
CREATE POLICY "Create duels" ON public.duels FOR INSERT WITH CHECK (true);
CREATE POLICY "Update duels" ON public.duels FOR UPDATE USING (true);

-- family_stories
CREATE POLICY "Read stories" ON public.family_stories FOR SELECT USING (true);
CREATE POLICY "Create stories" ON public.family_stories FOR INSERT WITH CHECK (true);
CREATE POLICY "Update stories" ON public.family_stories FOR UPDATE USING (true);

-- daily_phrases: public read, insert/update
CREATE POLICY "Read phrases" ON public.daily_phrases FOR SELECT USING (true);
CREATE POLICY "Create phrases" ON public.daily_phrases FOR INSERT WITH CHECK (true);
CREATE POLICY "Update phrases" ON public.daily_phrases FOR UPDATE USING (true);

-- ========== REALTIME ==========
ALTER PUBLICATION supabase_realtime ADD TABLE public.members;
ALTER PUBLICATION supabase_realtime ADD TABLE public.family_feed;
ALTER PUBLICATION supabase_realtime ADD TABLE public.family_quests;
ALTER PUBLICATION supabase_realtime ADD TABLE public.duels;
ALTER PUBLICATION supabase_realtime ADD TABLE public.family_stories;
