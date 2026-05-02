import React from "react";

const sizeMap = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-16 h-16",
  xl: "w-24 h-24",
};

const glowSizeMap = {
  sm: "w-12 h-12 -inset-1",
  md: "w-14 h-14 -inset-1.5",
  lg: "w-24 h-24 -inset-4",
  xl: "w-36 h-36 -inset-6",
};

export default function AaryxOrb({ size = "md", state = "idle", className = "" }) {
  const isThinking = state === "thinking";
  const isSearching = state === "searching";
  const isStreaming = state === "streaming";

  const glowClass = isThinking
    ? "bg-purple-500/30"
    : isSearching
    ? "bg-blue-500/25"
    : isStreaming
    ? "bg-teal-500/25"
    : "bg-teal-500/15";

  const ringPulseColor = isSearching ? "bg-blue-500/30" : "bg-purple-500/30";
  const ringPulseColorDelayed = isSearching ? "bg-blue-500/20" : "bg-purple-500/20";

  const coreClass = isThinking
    ? "bg-gradient-to-tr from-violet-600 via-purple-500 to-fuchsia-500 shadow-purple-500/40"
    : isSearching
    ? "bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 shadow-blue-500/40"
    : isStreaming
    ? "bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-400 shadow-teal-500/40"
    : "bg-gradient-to-tr from-teal-500 via-indigo-500 to-purple-600 shadow-indigo-500/30";

  const coreAnimation = isThinking
    ? "orb-think 2s ease-in-out infinite"
    : isSearching
    ? "orb-breathe 1.5s ease-in-out infinite"
    : "orb-breathe 3s ease-in-out infinite";

  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      {/* Outer glow */}
      <div className={`absolute rounded-full blur-xl transition-all duration-700 ${glowSizeMap[size]} ${glowClass}`} />

      {/* Pulse rings (thinking/searching) */}
      {(isThinking || isSearching) && (
        <>
          <div
            className={`absolute rounded-full ${sizeMap[size]} ${ringPulseColor}`}
            style={{ animation: "orb-pulse-ring 2s ease-out infinite" }}
          />
          <div
            className={`absolute rounded-full ${sizeMap[size]} ${ringPulseColorDelayed}`}
            style={{ animation: "orb-pulse-ring 2s ease-out infinite 0.6s" }}
          />
        </>
      )}

      {/* Core orb */}
      <div
        className={`relative rounded-full z-10 shadow-lg transition-all duration-500 ${sizeMap[size]} ${coreClass}`}
        style={{ animation: coreAnimation }}
      >
        {/* Inner highlight */}
        <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white/25 to-transparent" />

        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`rounded-full bg-white/80 transition-all duration-500 ${
              size === "xl" ? "w-3 h-3" : size === "lg" ? "w-2.5 h-2.5" : "w-1.5 h-1.5"
            } ${isStreaming ? "bg-white" : ""}`}
          />
        </div>

        {/* Radar sweep for search */}
        {isSearching && (
          <div
            className="absolute inset-0 rounded-full overflow-hidden"
            style={{ animation: "radar-sweep 1.5s linear infinite" }}
          >
            <div className="absolute top-0 left-1/2 w-1/2 h-1/2 bg-gradient-to-br from-white/20 to-transparent origin-bottom-left" />
          </div>
        )}
      </div>
    </div>
  );
}
