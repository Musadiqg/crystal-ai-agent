import { useId } from "react";

type Props = {
  size?: number;
  className?: string;
  /** Larger hero illustration */
  variant?: "icon" | "hero";
};

/** Faceted crystal mark — gradient reads as glass / prism. */
export function CrystalMark({ size = 24, className = "", variant = "icon" }: Props) {
  const id = useId().replace(/:/g, "");
  const gid = `cg-${id}`;
  const gid2 = `cg2-${id}`;

  if (variant === "hero") {
    return (
      <svg
        className={className}
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        aria-hidden
      >
        <defs>
          <linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ecfeff" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#a5f3fc" stopOpacity="0.9" />
            <stop offset="65%" stopColor="#818cf8" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.75" />
          </linearGradient>
          <linearGradient id={gid2} x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <path d="M100 12L168 68L142 168L58 168L32 68L100 12Z" stroke={`url(#${gid})`} strokeWidth="1.2" fill="rgba(15,23,42,0.35)" />
        <path d="M100 12L168 68L100 100L32 68L100 12Z" fill={`url(#${gid})`} opacity="0.85" />
        <path d="M168 68L142 168L100 100L168 68Z" fill="#67e8f9" opacity="0.25" />
        <path d="M32 68L58 168L100 100L32 68Z" fill="#a5b4fc" opacity="0.22" />
        <path d="M100 100L142 168L58 168L100 100Z" fill={`url(#${gid2})`} />
        <path d="M100 12V100M32 68L168 68M58 168L142 168" stroke="rgba(255,255,255,0.12)" strokeWidth="0.75" />
      </svg>
    );
  }

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
    >
      <defs>
        <linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ecfeff" />
          <stop offset="45%" stopColor="#7dd3fc" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>
      <path d="M16 3L27 12L22 26L10 26L5 12L16 3Z" stroke={`url(#${gid})`} strokeWidth="1.2" fill="rgba(15,23,42,0.5)" />
      <path d="M16 3L27 12L16 17L5 12L16 3Z" fill={`url(#${gid})`} opacity="0.9" />
      <path d="M27 12L22 26L16 17L27 12Z" fill="#a5b4fc" opacity="0.35" />
      <path d="M5 12L10 26L16 17L5 12Z" fill="#38bdf8" opacity="0.3" />
    </svg>
  );
}
