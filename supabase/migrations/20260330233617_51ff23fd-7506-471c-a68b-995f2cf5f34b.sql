
-- Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT '',
  emoji TEXT NOT NULL DEFAULT '😊',
  level TEXT NOT NULL DEFAULT 'Beginner' CHECK (level IN ('Beginner', 'Elementary', 'Intermediate')),
  words_learned INTEGER NOT NULL DEFAULT 0,
  scenarios_completed INTEGER NOT NULL DEFAULT 0,
  streak INTEGER NOT NULL DEFAULT 0,
  last_active_date DATE NOT NULL DEFAULT CURRENT_DATE,
  weekly_xp INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT TO authenticated USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE TO authenticated USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

-- Learned words table
CREATE TABLE public.learned_words (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  word_id TEXT NOT NULL,
  learned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, word_id)
);

ALTER TABLE public.learned_words ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own learned words" ON public.learned_words
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Review cards for spaced repetition
CREATE TABLE public.review_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  word_id TEXT NOT NULL,
  scenario_id TEXT NOT NULL DEFAULT '',
  ease_factor REAL NOT NULL DEFAULT 2.5,
  interval INTEGER NOT NULL DEFAULT 1,
  repetitions INTEGER NOT NULL DEFAULT 0,
  next_review DATE NOT NULL DEFAULT CURRENT_DATE,
  UNIQUE(user_id, word_id)
);

ALTER TABLE public.review_cards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own review cards" ON public.review_cards
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
