import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type Props = {
  src: string;
};

function formatTime(s: number) {
  if (!Number.isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export function AudioDemo({ src }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);
  const [loadError, setLoadError] = useState(false);
  const [ready, setReady] = useState(false);

  const pct = duration > 0 ? (current / duration) * 100 : 0;

  const toggle = useCallback(() => {
    const el = audioRef.current;
    if (!el || loadError) return;
    if (playing) {
      el.pause();
    } else {
      void el.play().catch(() => setLoadError(true));
    }
  }, [playing, loadError]);

  const seek = useCallback(
    (clientX: number) => {
      const el = audioRef.current;
      const bar = barRef.current;
      if (!el || !bar || !duration || loadError) return;
      const rect = bar.getBoundingClientRect();
      const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
      el.currentTime = (x / rect.width) * duration;
    },
    [duration, loadError]
  );

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onLoaded = () => {
      setDuration(el.duration || 0);
      setReady(true);
      setLoadError(false);
    };
    const onError = () => {
      setLoadError(true);
      setReady(false);
    };
    el.addEventListener("loadedmetadata", onLoaded);
    el.addEventListener("error", onError);
    el.load();
    return () => {
      el.removeEventListener("loadedmetadata", onLoaded);
      el.removeEventListener("error", onError);
    };
  }, [src]);

  return (
    <motion.div
      className="audio-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          setPlaying(false);
          setCurrent(0);
        }}
        onTimeUpdate={() => setCurrent(audioRef.current?.currentTime ?? 0)}
      />
      <div className="audio-card-top">
        <span className="audio-label">Crystal · call sample</span>
        <span className="audio-hint">Stereo · MP3</span>
      </div>
      <div className="audio-row">
        <button
          type="button"
          className="audio-play"
          onClick={toggle}
          disabled={loadError}
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M8 5v14l11-7L8 5z" />
            </svg>
          )}
        </button>
        <div className="audio-main">
          <div
            ref={barRef}
            className="audio-bar"
            role="slider"
            aria-valuenow={Math.round(pct)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Seek"
            tabIndex={0}
            onPointerDown={(e) => {
              seek(e.clientX);
              const move = (ev: PointerEvent) => seek(ev.clientX);
              const up = () => {
                window.removeEventListener("pointermove", move);
                window.removeEventListener("pointerup", up);
              };
              window.addEventListener("pointermove", move);
              window.addEventListener("pointerup", up);
            }}
            onKeyDown={(e) => {
              const el = audioRef.current;
              if (!el || !duration) return;
              if (e.key === "ArrowRight") el.currentTime = Math.min(el.currentTime + 5, duration);
              if (e.key === "ArrowLeft") el.currentTime = Math.max(el.currentTime - 5, 0);
            }}
          >
            <div className="audio-bar-fill" style={{ width: `${pct}%` }} />
          </div>
          <div className="audio-times">
            <span>{formatTime(current)}</span>
            <span>{ready && !loadError ? formatTime(duration) : "—:—"}</span>
          </div>
        </div>
      </div>
      {loadError && (
        <p className="audio-error">
          Add <code>demo.mp3</code> to <code>landing/public/audio/</code> then rebuild.
        </p>
      )}
    </motion.div>
  );
}
