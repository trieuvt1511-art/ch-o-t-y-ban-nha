import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Film, Headphones } from 'lucide-react';
import { LISTENING_VIDEOS, FILM_EXCERPTS } from '@/lib/listening-data';
import VideoLesson from '@/components/listening/VideoLesson';
import FilmExcerptCard from '@/components/listening/FilmExcerptCard';
import BottomNav from '@/components/BottomNav';

const DIFF_COLORS: Record<string, string> = {
  'Dễ': 'bg-success/15 text-success',
  'Trung bình': 'bg-secondary/15 text-secondary',
  'Khó': 'bg-primary/15 text-primary',
};

export default function ListeningScreen() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'videos' | 'films'>('videos');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [selectedFilm, setSelectedFilm] = useState<string | null>(null);

  const video = LISTENING_VIDEOS.find(v => v.id === selectedVideo);
  const film = FILM_EXCERPTS.find(f => f.id === selectedFilm);

  if (video) return <VideoLesson video={video} onBack={() => setSelectedVideo(null)} />;
  if (film) return <FilmExcerptCard excerpt={film} onBack={() => setSelectedFilm(null)} />;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <div className="w-full max-w-[390px] px-4 pt-6 pb-24">
        <div className="flex items-center gap-3 mb-5">
          <button onClick={() => navigate('/dashboard')} className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={22} />
          </button>
          <h1 className="text-xl font-bold text-foreground">Luyện nghe</h1>
        </div>

        {/* Tabs */}
        <div className="flex bg-muted rounded-lg p-1 mb-5">
          {[
            { key: 'videos' as const, label: 'Video', icon: Play },
            { key: 'films' as const, label: 'Phim ảnh', icon: Film },
          ].map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 flex items-center justify-center gap-2 rounded-md py-2.5 text-sm font-medium transition-all ${tab === t.key ? 'bg-card text-foreground shadow-card' : 'text-muted-foreground'}`}
            >
              <t.icon size={16} />
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'videos' ? (
          <div className="space-y-3">
            {LISTENING_VIDEOS.map((v, i) => (
              <button
                key={v.id}
                onClick={() => setSelectedVideo(v.id)}
                className="w-full rounded-lg bg-card shadow-card p-4 text-left transition-all hover:scale-[1.01] active:scale-[0.99] animate-scale-in"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Headphones size={22} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-sm truncate">{v.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{v.titleVi}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-md ${DIFF_COLORS[v.difficulty]}`}>
                        {v.difficulty}
                      </span>
                      <span className="text-xs text-muted-foreground">⏱ {v.duration}</span>
                      <span className="text-xs text-muted-foreground">📝 {v.questions.length} câu hỏi</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {FILM_EXCERPTS.map((f, i) => (
              <button
                key={f.id}
                onClick={() => setSelectedFilm(f.id)}
                className="w-full rounded-lg bg-card shadow-card p-4 text-left transition-all hover:scale-[1.01] active:scale-[0.99] animate-scale-in"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0">
                    <Film size={22} className="text-secondary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-sm">{f.filmTitle}</p>
                    <p className="text-xs text-muted-foreground">{f.filmTitleVi} — {f.sceneVi}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-md ${DIFF_COLORS[f.difficulty]}`}>
                        {f.difficulty}
                      </span>
                      <span className="text-xs text-muted-foreground">💬 {f.dialogue.length} câu</span>
                      <span className="text-xs text-muted-foreground">✏️ {f.fillBlanks.length} bài tập</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
}
