// Shared TTS helper — centralizes Web Speech API usage

let cachedVoices: SpeechSynthesisVoice[] = [];

// Preferred Spanish (Spain / Madrid) voices ranked by naturalness
const PREFERRED_VOICE_NAMES = [
  'Jorge',        // macOS/iOS natural Spanish (Spain)
  'Mónica',       // macOS/iOS natural Spanish (Spain)
  'Google español', // Chrome Spanish (Spain)
  'Microsoft Pablo', // Windows Spanish (Spain)
  'Microsoft Helena', // Windows Spanish (Spain)
  'Paulina',      // fallback
];

function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    const voices = speechSynthesis.getVoices();
    if (voices.length > 0) {
      cachedVoices = voices;
      resolve(voices);
      return;
    }
    // Some browsers load voices async
    const handler = () => {
      cachedVoices = speechSynthesis.getVoices();
      resolve(cachedVoices);
      speechSynthesis.removeEventListener('voiceschanged', handler);
    };
    speechSynthesis.addEventListener('voiceschanged', handler);
    // Timeout fallback for browsers that never fire voiceschanged
    setTimeout(() => {
      if (cachedVoices.length === 0) {
        cachedVoices = speechSynthesis.getVoices();
        resolve(cachedVoices);
      }
    }, 1000);
  });
}

function pickBestVoice(lang: string): SpeechSynthesisVoice | null {
  const voices = cachedVoices.length > 0 ? cachedVoices : speechSynthesis.getVoices();
  if (voices.length === 0) return null;

  // 1. Try preferred voice names first (most natural)
  for (const name of PREFERRED_VOICE_NAMES) {
    const match = voices.find(v =>
      v.name.includes(name) && v.lang.startsWith(lang.slice(0, 2))
    );
    if (match) return match;
  }

  // 2. Exact lang match (es-ES for Madrid accent)
  const exactMatch = voices.find(v => v.lang === lang);
  if (exactMatch) return exactMatch;

  // 3. Any Spanish voice
  const anySpanish = voices.find(v => v.lang.startsWith('es'));
  if (anySpanish) return anySpanish;

  return null;
}

// Pre-load voices on module init
if (typeof speechSynthesis !== 'undefined') {
  loadVoices();
}

export function speak(text: string, options?: { lang?: string; rate?: number }) {
  if (typeof speechSynthesis === 'undefined') return;

  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  const lang = options?.lang || 'es-ES';
  u.lang = lang;
  u.rate = options?.rate || 0.85;

  const voice = pickBestVoice(lang);
  if (voice) {
    u.voice = voice;
  }

  speechSynthesis.speak(u);
}

// Expose for ListeningScreen which uses its own utterance
export { loadVoices, pickBestVoice };

// MediaRecorder helper with graceful fallback
export function isRecordingSupported(): boolean {
  return !!(navigator.mediaDevices?.getUserMedia && typeof MediaRecorder !== 'undefined');
}

export interface RecordingResult {
  blob: Blob;
  url: string;
  duration: number;
}

export function createRecorder(
  onComplete: (result: RecordingResult) => void,
  onError: (msg: string) => void,
  maxDuration = 15000,
): { start: () => Promise<void>; stop: () => void } {
  let mediaRecorder: MediaRecorder | null = null;
  let stream: MediaStream | null = null;
  let startTime = 0;
  let timer: ReturnType<typeof setTimeout> | null = null;

  const cleanup = () => {
    if (timer) clearTimeout(timer);
    stream?.getTracks().forEach(t => t.stop());
    stream = null;
    mediaRecorder = null;
  };

  return {
    async start() {
      if (!isRecordingSupported()) {
        onError('Trình duyệt không hỗ trợ ghi âm. Hãy dùng Chrome.');
        return;
      }
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const chunks: Blob[] = [];
        const mimeType = typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported?.('audio/webm') ? 'audio/webm' : '';
        mediaRecorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);

        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) chunks.push(e.data);
        };

        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: mimeType || 'audio/webm' });
          const url = URL.createObjectURL(blob);
          const duration = (Date.now() - startTime) / 1000;
          onComplete({ blob, url, duration });
          cleanup();
        };

        mediaRecorder.onerror = () => {
          onError('Lỗi khi ghi âm');
          cleanup();
        };

        startTime = Date.now();
        mediaRecorder.start();

        timer = setTimeout(() => {
          if (mediaRecorder?.state === 'recording') mediaRecorder.stop();
        }, maxDuration);
      } catch {
        onError('Không thể truy cập microphone. Hãy cho phép quyền micro.');
        cleanup();
      }
    },
    stop() {
      if (mediaRecorder?.state === 'recording') mediaRecorder.stop();
      else cleanup();
    },
  };
}
