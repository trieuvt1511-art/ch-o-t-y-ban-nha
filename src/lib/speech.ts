// Shared TTS helper — centralizes Web Speech API usage
export function speak(text: string, options?: { lang?: string; rate?: number }) {
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = options?.lang || 'es-ES';
  u.rate = options?.rate || 0.85;
  speechSynthesis.speak(u);
}

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
        mediaRecorder = new MediaRecorder(stream, { mimeType: MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : '' });

        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) chunks.push(e.data);
        };

        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: 'audio/webm' });
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

        // Auto-stop after maxDuration
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
