import React, { useState, useEffect, useRef, useMemo } from "react";

/**
 * AaryxAvatar — Expressive chibi assistant with:
 *   • Mouse-tracking eyes + head tilt
 *   • Natural eye blinking
 *   • Proximity-aware excitement
 *   • Hover sparkle burst
 *   • 8 mood expressions
 *
 * Props:
 *   size   — pixel width/height (default 90)
 *   mood   — "idle" | "waving" | "thinking" | "answering" | "excited"
 *            | "worried" | "error" | "sleeping"
 */

const MOOD_CONFIG = {
  idle:      { mouthPath: "M44,54 Q50,59 56,54", eyeScale: 1, bobSpeed: 3, handAnim: "aaryx-wave", sparkle: true, blushOpacity: 0.4, browOffset: 0 },
  waving:    { mouthPath: "M44,54 Q50,60 56,54", eyeScale: 1, bobSpeed: 2.5, handAnim: "aaryx-wave", sparkle: true, blushOpacity: 0.5, browOffset: 0 },
  thinking:  { mouthPath: "M45,56 Q50,54 55,56", eyeScale: 0.85, bobSpeed: 4, handAnim: "aaryx-think", sparkle: false, blushOpacity: 0.2, browOffset: -2 },
  answering: { mouthPath: "M44,54 Q50,60 56,54", eyeScale: 1, bobSpeed: 2, handAnim: "aaryx-type", sparkle: true, blushOpacity: 0.5, browOffset: 0 },
  excited:   { mouthPath: "M43,53 Q50,62 57,53", eyeScale: 1.15, bobSpeed: 1.5, handAnim: "aaryx-wave-fast", sparkle: true, blushOpacity: 0.7, browOffset: -2 },
  worried:   { mouthPath: "M44,57 Q50,53 56,57", eyeScale: 0.9, bobSpeed: 5, handAnim: "none", sparkle: false, blushOpacity: 0.2, browOffset: 2 },
  error:     { mouthPath: "M44,57 Q50,52 56,57", eyeScale: 0.75, bobSpeed: 6, handAnim: "aaryx-shake", sparkle: false, blushOpacity: 0.1, browOffset: 3 },
  sleeping:  { mouthPath: "M46,55 Q50,57 54,55", eyeScale: 0, bobSpeed: 5, handAnim: "none", sparkle: false, blushOpacity: 0.6, browOffset: 0 },
};

export default function AaryxAvatar({ size = 90, mood = "waving" }) {
  const containerRef = useRef(null);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [headTilt, setHeadTilt] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isNear, setIsNear] = useState(false);

  const cfg = MOOD_CONFIG[mood] || MOOD_CONFIG.idle;
  const isSleeping = mood === "sleeping";

  // Mouse tracking — eyes follow + head tilts + proximity detection
  useEffect(() => {
    if (isSleeping) return;

    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Eye tracking
      const maxOffset = 3;
      const factor = Math.min(dist / 300, 1);
      setEyeOffset({
        x: (dx / (dist || 1)) * maxOffset * factor,
        y: (dy / (dist || 1)) * maxOffset * factor,
      });

      // Head tilt (subtle rotation toward mouse)
      const tilt = Math.max(-6, Math.min(6, (dx / 400) * 6));
      setHeadTilt(tilt);

      // Proximity — within 200px
      setIsNear(dist < 200);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isSleeping]);

  // Natural blinking — random interval between 2-5 seconds
  useEffect(() => {
    if (isSleeping) return;

    const scheduleBlink = () => {
      const delay = 2000 + Math.random() * 3000;
      return setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 150);
        blinkTimer.current = scheduleBlink();
      }, delay);
    };

    const blinkTimer = { current: scheduleBlink() };
    return () => clearTimeout(blinkTimer.current);
  }, [isSleeping]);

  // Determine effective mood (override with proximity/hover)
  const effectiveMood = useMemo(() => {
    if (isHovered && mood !== "error" && mood !== "sleeping") return "excited";
    if (isNear && mood === "idle") return "waving";
    return mood;
  }, [isHovered, isNear, mood]);

  const eCfg = MOOD_CONFIG[effectiveMood] || cfg;
  const showEyes = !isSleeping && !isBlinking;

  return (
    <div
      ref={containerRef}
      style={{ width: size, height: size }}
      className="relative select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setIsNear(false); }}
    >
      {/* Glow ring */}
      <div
        className="absolute inset-0 rounded-full transition-all duration-500"
        style={{
          background: effectiveMood === "error"
            ? "rgba(239,68,68,0.25)"
            : effectiveMood === "excited" || isHovered
            ? "rgba(250,204,21,0.3)"
            : isNear
            ? "rgba(168,85,247,0.3)"
            : "rgba(124,58,237,0.15)",
          boxShadow: isHovered
            ? "0 0 20px 4px rgba(168,85,247,0.4)"
            : isNear
            ? "0 0 12px 2px rgba(168,85,247,0.2)"
            : "none",
          animation: effectiveMood === "error" ? "aaryx-pulse-red 1.5s ease-in-out infinite" : "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        }}
      />

      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className="relative z-10"
        style={{
          animation: `aaryx-bob ${eCfg.bobSpeed}s ease-in-out infinite`,
          transform: `rotate(${headTilt}deg)`,
          transition: "transform 0.15s ease-out",
        }}
      >
        <defs>
          <radialGradient id={`avBg-${size}`} cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor={effectiveMood === "error" ? "#7f1d1d" : "#7c3aed"} stopOpacity="0.3" />
            <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0.8" />
          </radialGradient>
          <radialGradient id={`skinG-${size}`} cx="50%" cy="35%" r="50%">
            <stop offset="0%" stopColor="#fde8d8" />
            <stop offset="100%" stopColor="#f5c8a8" />
          </radialGradient>
          <linearGradient id={`hairG-${size}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={isHovered ? "#c084fc" : "#a855f7"} />
            <stop offset="100%" stopColor="#6d28d9" />
          </linearGradient>
        </defs>

        {/* BG circle */}
        <circle cx="50" cy="50" r="48" fill={`url(#avBg-${size})`} />

        {/* Hair back */}
        <ellipse cx="50" cy="38" rx="28" ry="30" fill={`url(#hairG-${size})`} />
        <ellipse cx="25" cy="50" rx="7" ry="18" fill="#7c3aed" />
        <ellipse cx="75" cy="50" rx="7" ry="18" fill="#7c3aed" />

        {/* Face */}
        <ellipse cx="50" cy="45" rx="22" ry="24" fill={`url(#skinG-${size})`} />

        {/* Hair bangs */}
        <path d="M28,35 Q35,18 50,20 Q65,18 72,35 Q68,25 50,27 Q32,25 28,35Z" fill={`url(#hairG-${size})`} />
        <path d="M30,35 Q28,28 32,42" stroke="#7c3aed" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M70,35 Q72,28 68,42" stroke="#7c3aed" strokeWidth="3" fill="none" strokeLinecap="round" />

        {/* === EYES === */}
        {isSleeping ? (
          <>
            <path d="M35,44 Q40,47 45,44" stroke="#6d28d9" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            <path d="M55,44 Q60,47 65,44" stroke="#6d28d9" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          </>
        ) : isBlinking ? (
          <>
            <path d="M35,44 Q40,46 45,44" stroke="#6d28d9" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M55,44 Q60,46 65,44" stroke="#6d28d9" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </>
        ) : effectiveMood === "error" ? (
          <>
            {/* X-mark eyes */}
            <g>
              <line x1="37" y1="41" x2="43" y2="47" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
              <line x1="43" y1="41" x2="37" y2="47" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
            </g>
            <g>
              <line x1="57" y1="41" x2="63" y2="47" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
              <line x1="63" y1="41" x2="57" y2="47" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
            </g>
          </>
        ) : (
          <>
            {/* Eye whites */}
            <ellipse cx="40" cy="44" rx={6 * eCfg.eyeScale} ry={6.5 * eCfg.eyeScale} fill="white" />
            <ellipse cx="60" cy="44" rx={6 * eCfg.eyeScale} ry={6.5 * eCfg.eyeScale} fill="white" />

            {/* Pupils */}
            <circle cx={40 + eyeOffset.x} cy={44 + eyeOffset.y} r={3.5 * eCfg.eyeScale} fill="#1e1b4b" />
            <circle cx={39 + eyeOffset.x * 0.6} cy={43 + eyeOffset.y * 0.6} r={1.2 * eCfg.eyeScale} fill="white" />
            <circle cx={60 + eyeOffset.x} cy={44 + eyeOffset.y} r={3.5 * eCfg.eyeScale} fill="#1e1b4b" />
            <circle cx={59 + eyeOffset.x * 0.6} cy={43 + eyeOffset.y * 0.6} r={1.2 * eCfg.eyeScale} fill="white" />

            {/* Excited sparkle eyes */}
            {effectiveMood === "excited" && (
              <>
                <circle cx="38" cy="42" r="1" fill="white" opacity="0.8" />
                <circle cx="58" cy="42" r="1" fill="white" opacity="0.8" />
              </>
            )}
          </>
        )}

        {/* Eyebrows */}
        <path d={`M35,${37 + eCfg.browOffset} Q40,${34 + eCfg.browOffset} 45,${37 + eCfg.browOffset}`} stroke="#6d28d9" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d={`M55,${37 + eCfg.browOffset} Q60,${34 + eCfg.browOffset} 65,${37 + eCfg.browOffset}`} stroke="#6d28d9" strokeWidth="1.5" fill="none" strokeLinecap="round" />

        {/* Blush */}
        <ellipse cx="33" cy="50" rx="4" ry="2.5" fill="#f9a8d4" opacity={eCfg.blushOpacity}>
          {isHovered && <animate attributeName="opacity" values={`${eCfg.blushOpacity};0.8;${eCfg.blushOpacity}`} dur="1s" repeatCount="indefinite" />}
        </ellipse>
        <ellipse cx="67" cy="50" rx="4" ry="2.5" fill="#f9a8d4" opacity={eCfg.blushOpacity}>
          {isHovered && <animate attributeName="opacity" values={`${eCfg.blushOpacity};0.8;${eCfg.blushOpacity}`} dur="1s" repeatCount="indefinite" />}
        </ellipse>

        {/* Mouth */}
        <path d={eCfg.mouthPath} stroke={effectiveMood === "error" ? "#ef4444" : "#c2410c"} strokeWidth="1.8" fill={effectiveMood === "excited" ? "#fde8d8" : "none"} strokeLinecap="round" />

        {/* Thinking bubble dots */}
        {effectiveMood === "thinking" && (
          <g>
            <circle cx="74" cy="30" r="2" fill="white" opacity="0.7">
              <animate attributeName="opacity" values="0.3;0.9;0.3" dur="1.2s" repeatCount="indefinite" />
            </circle>
            <circle cx="80" cy="24" r="2.5" fill="white" opacity="0.5">
              <animate attributeName="opacity" values="0.2;0.7;0.2" dur="1.2s" begin="0.2s" repeatCount="indefinite" />
            </circle>
            <circle cx="86" cy="18" r="3" fill="white" opacity="0.3">
              <animate attributeName="opacity" values="0.1;0.5;0.1" dur="1.2s" begin="0.4s" repeatCount="indefinite" />
            </circle>
          </g>
        )}

        {/* Body */}
        <path d="M38,66 Q38,62 42,62 L58,62 Q62,62 62,66 L64,80 Q64,84 50,84 Q36,84 36,80 Z" fill="#7c3aed" />
        <path d="M44,62 L50,67 L56,62" stroke="#a78bfa" strokeWidth="1" fill="none" />

        {/* Waving / expressive hand */}
        <g style={{
          transformOrigin: "76px 60px",
          animation: eCfg.handAnim !== "none"
            ? `${eCfg.handAnim} ${effectiveMood === "excited" ? "0.5s" : effectiveMood === "error" ? "0.3s" : "1.8s"} ease-in-out infinite`
            : "none",
        }}>
          <path d="M62,66 Q68,58 76,52" stroke="#f5c8a8" strokeWidth="5" fill="none" strokeLinecap="round" />
          <circle cx="76" cy="50" r="5" fill="#fde8d8" />
          <path d="M74,46 L73,43" stroke="#fde8d8" strokeWidth="2" strokeLinecap="round" />
          <path d="M76,45 L76,42" stroke="#fde8d8" strokeWidth="2" strokeLinecap="round" />
          <path d="M78,46 L79,43" stroke="#fde8d8" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Sparkles */}
        {eCfg.sparkle && (
          <>
            <g style={{ animation: "aaryx-sparkle 2s ease-in-out infinite" }}>
              <path d="M18,20 L19,17 L20,20 L23,21 L20,22 L19,25 L18,22 L15,21 Z" fill="#fbbf24" />
            </g>
            <g style={{ animation: "aaryx-sparkle 2s ease-in-out infinite 0.7s" }}>
              <path d="M80,25 L81,23 L82,25 L84,26 L82,27 L81,29 L80,27 L78,26 Z" fill="#a78bfa" />
            </g>
          </>
        )}

        {/* Excited extra stars */}
        {effectiveMood === "excited" && (
          <>
            <g style={{ animation: "aaryx-sparkle 0.8s ease-in-out infinite" }}>
              <path d="M14,35 L15,32 L16,35 L19,36 L16,37 L15,40 L14,37 L11,36 Z" fill="#fbbf24" />
            </g>
            <g style={{ animation: "aaryx-sparkle 0.8s ease-in-out infinite 0.3s" }}>
              <path d="M84,35 L85,32 L86,35 L89,36 L86,37 L85,40 L84,37 L81,36 Z" fill="#fbbf24" />
            </g>
            <g style={{ animation: "aaryx-float 1.5s ease-in-out infinite" }}>
              <text x="20" y="12" fontSize="7" fill="#f472b6">♥</text>
            </g>
            <g style={{ animation: "aaryx-float 1.5s ease-in-out infinite 0.5s" }}>
              <text x="78" y="10" fontSize="5" fill="#f472b6">♥</text>
            </g>
          </>
        )}

        {/* Hover sparkle burst */}
        {isHovered && effectiveMood !== "error" && (
          <>
            <circle cx="15" cy="45" r="1.5" fill="#fbbf24">
              <animate attributeName="r" values="0;2;0" dur="0.8s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0" dur="0.8s" repeatCount="indefinite" />
            </circle>
            <circle cx="85" cy="40" r="1.5" fill="#a78bfa">
              <animate attributeName="r" values="0;2.5;0" dur="0.9s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0" dur="0.9s" repeatCount="indefinite" />
            </circle>
            <circle cx="50" cy="8" r="1" fill="#fbbf24">
              <animate attributeName="r" values="0;1.5;0" dur="0.7s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0" dur="0.7s" repeatCount="indefinite" />
            </circle>
          </>
        )}

        {/* Sleeping Z's */}
        {isSleeping && (
          <g style={{ animation: "aaryx-zzz 2s ease-in-out infinite" }}>
            <text x="68" y="30" fontSize="10" fill="#a78bfa" fontWeight="bold" opacity="0.8">z</text>
            <text x="76" y="22" fontSize="8" fill="#a78bfa" fontWeight="bold" opacity="0.5">z</text>
            <text x="82" y="16" fontSize="6" fill="#a78bfa" fontWeight="bold" opacity="0.3">z</text>
          </g>
        )}

        {/* Error warning */}
        {effectiveMood === "error" && (
          <g style={{ animation: "aaryx-shake 0.5s ease-in-out infinite" }}>
            <circle cx="84" cy="20" r="8" fill="#ef4444" opacity="0.9" />
            <text x="84" y="24" fontSize="12" fill="white" textAnchor="middle" fontWeight="bold">!</text>
          </g>
        )}
      </svg>

      <style jsx>{`
        @keyframes aaryx-bob {
          0%, 100% { transform: translateY(0px) rotate(${headTilt}deg); }
          50% { transform: translateY(-3px) rotate(${headTilt}deg); }
        }
        @keyframes aaryx-wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-15deg); }
          50% { transform: rotate(10deg); }
          75% { transform: rotate(-10deg); }
        }
        @keyframes aaryx-wave-fast {
          0%, 100% { transform: rotate(0deg); }
          20% { transform: rotate(-25deg); }
          40% { transform: rotate(20deg); }
          60% { transform: rotate(-20deg); }
          80% { transform: rotate(15deg); }
        }
        @keyframes aaryx-think {
          0%, 100% { transform: rotate(0deg) translateY(0px); }
          50% { transform: rotate(5deg) translateY(-2px); }
        }
        @keyframes aaryx-type {
          0%, 100% { transform: rotate(0deg); }
          30% { transform: rotate(-5deg); }
          60% { transform: rotate(3deg); }
        }
        @keyframes aaryx-shake {
          0%, 100% { transform: rotate(0deg); }
          20% { transform: rotate(-8deg); }
          40% { transform: rotate(8deg); }
          60% { transform: rotate(-5deg); }
          80% { transform: rotate(5deg); }
        }
        @keyframes aaryx-sparkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes aaryx-float {
          0% { opacity: 0.8; transform: translateY(0px); }
          50% { opacity: 0.4; transform: translateY(-6px); }
          100% { opacity: 0; transform: translateY(-12px); }
        }
        @keyframes aaryx-zzz {
          0% { opacity: 0; transform: translateY(0px); }
          50% { opacity: 1; transform: translateY(-5px); }
          100% { opacity: 0; transform: translateY(-10px); }
        }
        @keyframes aaryx-pulse-red {
          0%, 100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.4); }
          50% { box-shadow: 0 0 0 8px rgba(239,68,68,0); }
        }
      `}</style>
    </div>
  );
}
