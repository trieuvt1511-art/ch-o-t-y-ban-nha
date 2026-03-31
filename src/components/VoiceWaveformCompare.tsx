import { useState, useRef, useEffect, useCallback } from 'react';
import { Mic, Square, Play, RotateCcw } from 'lucide-react';
import { createRecorder, isRecordingSupported, type RecordingResult } from '@/lib/speech';

interface VoiceWaveformCompareProps {
  referenceText: string;
  voiceLang: string;
  speed: number;
}

function drawWaveform(
  canvas: HTMLCanvasElement,
  data: number[],
  color: string,
  label: string,
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  // Draw bars
  const barW = Math.max(1, (w - 20) / data.length - 1);
  const gap = 1;
  data.forEach((v, i) => {
    const barH = Math.max(2, (v / 255) * (h - 24));
    const x = 10 + i * (barW + gap);
    const y = (h - 24 - barH) / 2 + 12;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.roundRect(x, y, barW, barH, 1);
    ctx.fill();
  });

  // Label
  ctx.fillStyle = color;
  ctx.font = 'bold 10px sans-serif';
  ctx.fillText(label, 10, h - 4);
}

export function VoiceWaveformCompare({ referenceText, voiceLang, speed }: VoiceWaveformCompareProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState<RecordingResult | null>(null);
  const [refData, setRefData] = useState<number[]>([]);
  const [userDuration, setUserDuration] = useState(0);
  const [supported] = useState(isRecordingSupported);

  const refCanvasRef = useRef<HTMLCanvasElement>(null);
  const userCanvasRef = useRef<HTMLCanvasElement>(null);
  const recorderRef = useRef<ReturnType<typeof createRecorder> | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number>(0);
  const userDataRef = useRef<number[]>([]);

  // Capture reference waveform from TTS
  const captureReference = useCallback(() => {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(referenceText);
    u.lang = voiceLang;
    u.rate = speed;

    // Generate simulated waveform based on text length
    const bars = 60;
    const data: number[] = [];
    const words = referenceText.split(' ');
    for (let i = 0; i < bars; i++) {
      const wordIdx = Math.floor((i / bars) * words.length);
      const wordLen = words[wordIdx]?.length || 3;
      const base = 40 + wordLen * 12;
      data.push(Math.min(255, base + Math.random() * 60));
    }
    setRefData(data);
    speechSynthesis.speak(u);
  }, [referenceText, voiceLang, speed]);

  // Draw reference waveform
  useEffect(() => {
    if (refCanvasRef.current && refData.length > 0) {
      drawWaveform(refCanvasRef.current, refData, 'hsl(var(--primary))', '🔊 Mẫu');
    }
  }, [refData]);

  // Draw user waveform
  useEffect(() => {
    if (userCanvasRef.current && recording) {
      const data = userDataRef.current.length > 0 ? userDataRef.current : Array.from({ length: 60 }, () => Math.random() * 120 + 30);
      drawWaveform(userCanvasRef.current, data, 'hsl(var(--success))', '🎤 Bạn');
    }
  }, [recording]);

  const startRecording = useCallback(() => {
    if (!supported) return;
    userDataRef.current = [];

    const recorder = createRecorder(
      (result) => {
        setRecording(result);
        setIsRecording(false);
        setUserDuration(result.duration);
        cancelAnimationFrame(animFrameRef.current);
      },
      (err) => {
        console.error(err);
        setIsRecording(false);
        cancelAnimationFrame(animFrameRef.current);
      },
      10000,
    );

    recorderRef.current = recorder;

    // Start with analyser for live waveform
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      const audioCtx = new AudioContext();
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 128;
      source.connect(analyser);
      analyserRef.current = analyser;

      const bufLen = analyser.frequencyBinCount;
      const dataArr = new Uint8Array(bufLen);

      const draw = () => {
        analyser.getByteFrequencyData(dataArr);
        // Sample 60 bars
        const sampled: number[] = [];
        for (let i = 0; i < 60; i++) {
          const idx = Math.floor((i / 60) * bufLen);
          sampled.push(dataArr[idx]);
        }
        userDataRef.current = [...userDataRef.current.slice(-59), ...sampled.slice(-1)];

        if (userCanvasRef.current) {
          // Live drawing
          const liveData = userDataRef.current.length >= 60
            ? userDataRef.current.slice(-60)
            : [...Array(60 - userDataRef.current.length).fill(0), ...userDataRef.current];
          drawWaveform(userCanvasRef.current, liveData, 'hsl(var(--success))', '🎤 Đang ghi...');
        }
        animFrameRef.current = requestAnimationFrame(draw);
      };
      draw();

      // Stream is already obtained, start MediaRecorder separately
      recorder.start();
      setIsRecording(true);
    }).catch(() => {
      setIsRecording(false);
    });
  }, [supported]);

  const stopRecording = useCallback(() => {
    recorderRef.current?.stop();
    cancelAnimationFrame(animFrameRef.current);
    setIsRecording(false);
  }, []);

  const playRecording = useCallback(() => {
    if (!recording) return;
    const audio = new Audio(recording.url);
    audio.play();
  }, [recording]);

  const reset = useCallback(() => {
    setRecording(null);
    userDataRef.current = [];
    if (userCanvasRef.current) {
      const ctx = userCanvasRef.current.getContext('2d');
      ctx?.clearRect(0, 0, userCanvasRef.current.width, userCanvasRef.current.height);
    }
  }, []);

  if (!supported) {
    return (
      <div className="rounded-2xl bg-muted p-4 text-center text-sm text-muted-foreground">
        Trình duyệt không hỗ trợ ghi âm. Hãy dùng Chrome.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Reference waveform */}
      <div className="rounded-2xl bg-card shadow-card p-3">
        <canvas ref={refCanvasRef} width={360} height={60} className="w-full h-[60px] rounded-xl" />
        {refData.length === 0 && (
          <p className="text-xs text-muted-foreground text-center mt-1">Nhấn "Nghe" để xem waveform mẫu</p>
        )}
      </div>

      {/* User waveform */}
      <div className="rounded-2xl bg-card shadow-card p-3">
        <canvas ref={userCanvasRef} width={360} height={60} className="w-full h-[60px] rounded-xl" />
        {!recording && !isRecording && (
          <p className="text-xs text-muted-foreground text-center mt-1">Nhấn ghi âm để so sánh</p>
        )}
        {recording && (
          <p className="text-xs text-success text-center mt-1 font-bold">
            ⏱ {userDuration.toFixed(1)}s
          </p>
        )}
      </div>

      {/* Controls */}
      <div className="flex gap-2">
        {!isRecording ? (
          <button
            onClick={() => { captureReference(); startRecording(); }}
            className="flex-1 rounded-xl bg-destructive text-destructive-foreground py-3 font-bold text-sm flex items-center justify-center gap-2"
          >
            <Mic size={16} /> Ghi âm & So sánh
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="flex-1 rounded-xl bg-destructive text-destructive-foreground py-3 font-bold text-sm flex items-center justify-center gap-2 animate-pulse"
          >
            <Square size={16} /> Dừng ghi
          </button>
        )}

        {recording && !isRecording && (
          <>
            <button onClick={playRecording}
              className="w-12 h-12 rounded-xl bg-success text-success-foreground flex items-center justify-center">
              <Play size={16} />
            </button>
            <button onClick={reset}
              className="w-12 h-12 rounded-xl bg-muted text-muted-foreground flex items-center justify-center">
              <RotateCcw size={16} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
