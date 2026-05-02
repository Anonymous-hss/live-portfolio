import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/router";
import AaryxOrb from "./AaryxOrb";
import AaryxTemplates from "./AaryxTemplates";
import { AaryxResponseRenderer } from "./AaryxResponseRenderer";
import AaryxAvatar from "./AaryxAvatar";

const PAGE_GREETINGS = {
  "/": "Home",
  "/about": "About",
  "/projects": "Projects",
  "/qualities": "Qualities",
  "/testimonials": "Testimonials",
  "/contact": "Contact",
};

const RANDOM_DIALOGUES = {
  "/": [
    "Hey! I'm Aaryx. I know everything.",
    "Still scrolling? Just ask me directly.",
    "Looking for a dev? You found one.",
    "13+ shipped products. Want the highlights?",
    "He built me. Imagine what he'll build for you.",
    "AI, Go, React, Node - pick your weapon.",
    "I dare you to quiz me on Harshal.",
    "His CRM handles 10k+ leads/month. Casually.",
    "Need the resume? Just say the word.",
    "Full-stack, AI, mobile - he ships it all.",
  ],
  "/about": [
    "Already reading the bio? Smart move.",
    "There's more to him than what's on this page.",
    "Got a question the bio doesn't answer?",
    "I know the stories behind the stats.",
  ],
  "/projects": [
    "Want the real story behind any project?",
    "Ask me for GitHub links or live demos!",
    "13 projects. Each one shipped to production.",
    "Pick any project. I'll break it down.",
  ],
  "/contact": [
    "Fastest way? Just ask me for his email.",
    "I can give you his phone number too.",
    "Skip the form. I'm faster than SMTP.",
  ],
  "/qualities": [
    "Want proof for any of these claims?",
    "Each quality has live evidence. Ask me!",
    "Don't just read. Let me prove it.",
  ],
};

function getDialoguesForPath(pathname) {
  return RANDOM_DIALOGUES[pathname] || RANDOM_DIALOGUES["/"];
}
function formatTimer(ms) {
  return (ms / 1000).toFixed(1) + "s";
}

export default function AaryxWidget() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [orbState, setOrbState] = useState("idle");
  const [showTemplates, setShowTemplates] = useState(true);
  const [showTooltip, setShowTooltip] = useState(true);
  const [dialogueText, setDialogueText] = useState("");
  const dialogueIdxRef = useRef(0);

  // Set initial dialogue text on mount
  useEffect(() => {
    const lines = getDialoguesForPath(router.pathname);
    setDialogueText(lines[0]);
  }, [router.pathname]);

  // Rotate dialogues every 4 seconds, page-aware
  useEffect(() => {
    const interval = setInterval(() => {
      const lines = getDialoguesForPath(router.pathname);
      dialogueIdxRef.current = (dialogueIdxRef.current + 1) % lines.length;
      setShowTooltip(false);
      setTimeout(() => {
        setDialogueText(lines[dialogueIdxRef.current]);
        setShowTooltip(true);
      }, 300);
    }, 4000);
    return () => clearInterval(interval);
  }, [router.pathname]);

  // Streaming / timing state
  const [isStreaming, setIsStreaming] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [elapsedMs, setElapsedMs] = useState(0);
  const [answerTime, setAnswerTime] = useState(null);

  const abortRef = useRef(null);
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Load from local storage or generate welcome message
  useEffect(() => {
    try {
      const saved = localStorage.getItem("aaryx_chat_history");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.length > 0) {
          setMessages(parsed);
          return;
        }
      }
    } catch (e) {
      console.error("Failed to load chat history:", e);
    }

    setMessages([{
      id: "welcome", role: "assistant",
      content: `I'm **Aaryx**. I know everything about Harshal — his work, his projects, what makes him different. Ask me anything, or I'll just tell you what you need to know.`,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }]);
  }, []);

  // Save to local storage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      try {
        const validMessages = messages.filter((m) => !m.isError && m.content.trim() !== "");
        localStorage.setItem("aaryx_chat_history", JSON.stringify(validMessages));
      } catch (e) {
        console.error("Failed to save chat history:", e);
      }
    }
  }, [messages]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, statusText]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 200);
  }, [isOpen]);

  // Keyboard: Escape to close
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape" && isOpen) setIsOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen]);

  // Elapsed timer
  const startTimer = useCallback(() => {
    startTimeRef.current = Date.now();
    setElapsedMs(0);
    timerRef.current = setInterval(() => {
      setElapsedMs(Date.now() - startTimeRef.current);
    }, 100);
  }, []);

  const stopTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  }, []);

  const handleStopGenerating = useCallback(() => {
    if (abortRef.current) abortRef.current.abort();
    stopTimer();
    setIsStreaming(false);
    setOrbState("idle");
    setStatusText("");
  }, [stopTimer]);

  const handleCopy = useCallback((text) => {
    navigator.clipboard.writeText(text).catch(() => {});
  }, []);

  const handleRetry = useCallback((msgContent) => {
    // Remove the failed assistant message then re-send
    setMessages((prev) => {
      const lastAssistantIdx = prev.findLastIndex((m) => m.role === "assistant");
      if (lastAssistantIdx > 0) return prev.slice(0, lastAssistantIdx);
      return prev;
    });
    sendMessage(msgContent);
  }, []);

  const handleSelectTemplate = (msg) => {
    setShowTemplates(false);
    sendMessage(msg);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isStreaming) return;
    setShowTemplates(false);
    sendMessage(inputMessage);
  };

  const sendMessage = async (textToSend) => {
    if (!textToSend.trim() || isStreaming) return;
    setInputMessage("");
    setIsStreaming(true);
    setOrbState("thinking");
    setStatusText("Thinking");
    setAnswerTime(null);
    startTimer();

    const controller = new AbortController();
    abortRef.current = controller;

    const userMsg = {
      id: Date.now().toString(), role: "user", content: textToSend,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const assistantMsgId = (Date.now() + 1).toString();

    setMessages((prev) => [...prev, userMsg]);

    try {
      // Direct call to Render backend (bypasses Vercel Serverless Function 10s timeout limit)
      const baseUrl = process.env.NEXT_PUBLIC_AARYX_BACKEND_URL || "https://aaryx-backend.onrender.com";
      const fetchUrl = `${baseUrl}/portfolio_chat_stream/${encodeURIComponent(textToSend)}`;
      
      const res = await fetch(fetchUrl, {
        signal: controller.signal,
      });

      if (!res.ok) {
        console.error(`Aaryx API error: ${res.status} ${res.statusText}`);
        throw new Error("API_ERROR");
      }

      // Only add assistant bubble once we know the connection is good
      setMessages((prev) => [...prev, {
        id: assistantMsgId, role: "assistant", content: "",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }]);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let hasContent = false;

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (!value) continue;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n\n");

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const dataStr = line.replace("data: ", "").trim();
          if (!dataStr || dataStr === "[DONE]") continue;

          try {
            const data = JSON.parse(dataStr);

            if (data.type === "content" && data.content) {
              if (!hasContent) {
                setOrbState("streaming");
                setStatusText("Streaming response");
                hasContent = true;
              }
              setMessages((prev) =>
                prev.map((m) => m.id === assistantMsgId
                  ? { ...m, content: m.content + data.content } : m
                )
              );
            } else if (data.type === "search_start") {
              setOrbState("searching");
              setStatusText("Searching knowledge base");
            } else if (data.type === "search_results") {
              setOrbState("streaming");
              setStatusText("Processing results");
            } else if (data.type === "end") {
              done = true;
            }
          } catch (parseErr) {
            console.error("Aaryx SSE parse error:", parseErr);
          }
        }
      }

      // Success — record answer time
      const totalTime = Date.now() - startTimeRef.current;
      setAnswerTime(totalTime);

    } catch (err) {
      if (err.name === "AbortError") {
        console.log("Aaryx: User cancelled generation.");
        return;
      }
      console.error("Aaryx connection error:", err);

      const isRateLimit = err.message?.includes("429") || err.message?.includes("rate");
      const errorContent = isRateLimit
        ? "I'm temporarily rate-limited. Please wait a moment and try again."
        : "I couldn't connect right now. Please check that my backend is running, or try again shortly.";

      setMessages((prev) => {
        // If we already added an empty assistant msg, update it. Otherwise add one.
        const hasEmpty = prev.find((m) => m.id === assistantMsgId);
        if (hasEmpty) {
          return prev.map((m) => m.id === assistantMsgId ? { ...m, content: errorContent, isError: true, retryContent: textToSend } : m);
        }
        return [...prev, { id: assistantMsgId, role: "assistant", content: errorContent, isError: true, retryContent: textToSend,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }];
      });
    } finally {
      stopTimer();
      setIsStreaming(false);
      setOrbState("idle");
      setStatusText("");
      abortRef.current = null;
    }
  };

  // Panel size classes
  const panelClasses = isMaximized
    ? "fixed inset-4 sm:inset-6 w-auto h-auto max-w-none rounded-2xl z-[60]"
    : "w-[380px] max-w-[calc(100vw-32px)] h-[520px] max-h-[calc(100vh-120px)] mb-4 rounded-2xl";

  return (
    <>
      {/* Backdrop overlay when maximized */}
      {isOpen && isMaximized && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[55]" onClick={() => setIsMaximized(false)} />
      )}

      <div className={`fixed ${isMaximized ? "inset-0 z-[60] flex items-center justify-center p-4" : "bottom-6 left-6 z-50"} select-none flex flex-col items-start`}>
        {/* ── Chat Panel ───────────────────────── */}
        {isOpen && (
          <div className={`flex flex-col bg-black/80 backdrop-blur-xl border border-white/10 overflow-hidden shadow-2xl shadow-purple-500/10 ${panelClasses}`}
            style={{ animation: "fade-in-up 0.25s ease-out" }}>

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-white/[0.03] border-b border-white/10 shrink-0">
              <div className="flex items-center gap-2.5">
                <AaryxAvatar size={36} mood={
                  orbState === "searching" ? "thinking" :
                  orbState === "thinking" ? "thinking" :
                  orbState === "streaming" ? "answering" : "idle"
                } />
                <div>
                  <h4 className="text-sm font-bold text-white tracking-wider">AARYX</h4>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      orbState === "searching" ? "bg-blue-400" :
                      orbState === "thinking" ? "bg-purple-400" :
                      orbState === "streaming" ? "bg-emerald-400" : "bg-teal-400"
                    } animate-pulse`} />
                    <span className="text-[10px] uppercase font-semibold text-white/50 tracking-wider truncate">
                      {isStreaming
                        ? `${statusText} · ${formatTimer(elapsedMs)}`
                        : answerTime
                        ? `Answered in ${formatTimer(answerTime)}`
                        : "Online · Ready"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Window controls */}
              <div className="flex items-center gap-1">
                {/* Templates toggle */}
                <button onClick={() => setShowTemplates((p) => !p)} title="Toggle templates"
                  className="p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-white transition-all cursor-pointer outline-none">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                </button>
                {/* Maximize / Restore */}
                <button onClick={() => setIsMaximized((p) => !p)} title={isMaximized ? "Restore" : "Maximize"}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-white transition-all cursor-pointer outline-none">
                  {isMaximized ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                    </svg>
                  )}
                </button>
                {/* Close */}
                <button onClick={() => { setIsOpen(false); setIsMaximized(false); }} title="Close (Esc)"
                  className="p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-white transition-all cursor-pointer outline-none">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 px-4 py-3 overflow-y-auto flex flex-col gap-3">
              {messages.map((m, idx) => (
                <div key={m.id || idx}
                  className={`flex gap-2 max-w-[88%] group ${m.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}>
                  {m.role === "assistant" && (
                    <div className="mt-1 shrink-0">
                      <AaryxAvatar size={28} mood={
                        m.isError ? "error" :
                        m.id === messages[messages.length - 1]?.id && isStreaming
                          ? (orbState === "searching" ? "thinking" : orbState === "thinking" ? "thinking" : "answering")
                          : m.content ? "excited" : "idle"
                      } />
                    </div>
                  )}
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <div className={`relative p-3 rounded-2xl text-xs leading-relaxed break-words border ${
                      m.isError
                        ? "bg-red-500/10 border-red-500/20 text-red-300"
                        : m.role === "user"
                        ? "bg-gradient-to-tr from-purple-600 to-indigo-600 border-white/10 text-white rounded-br-sm"
                        : "bg-white/[0.04] border-white/[0.06] text-white/90 rounded-bl-sm"
                    }`}>
                      {m.role === "assistant" ? <AaryxResponseRenderer content={m.content} /> : <p className="leading-relaxed whitespace-pre-wrap">{m.content}</p>}

                      {/* Copy + Retry buttons */}
                      {m.role === "assistant" && m.content && !isStreaming && (
                        <div className="flex items-center gap-1 mt-2 pt-1.5 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => handleCopy(m.content)} title="Copy"
                            className="p-1 rounded hover:bg-white/10 text-white/30 hover:text-white/70 transition-all cursor-pointer outline-none">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </button>
                          {m.isError && m.retryContent && (
                            <button onClick={() => handleRetry(m.retryContent)} title="Retry"
                              className="p-1 rounded hover:bg-white/10 text-white/30 hover:text-white/70 transition-all cursor-pointer outline-none">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                              </svg>
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] text-white/25 px-1 select-none">{m.time}</span>
                  </div>
                </div>
              ))}

              {/* Templates */}
              {showTemplates && !isStreaming && (
                <AaryxTemplates onSelectTemplate={handleSelectTemplate} />
              )}

              {/* Skeleton loading animation */}
              {isStreaming && !messages.find((m) => m.role === "assistant" && m.content && m.id !== "welcome" && m.id === messages[messages.length - 1]?.id && m.content.length > 0) && (
                <div className="flex gap-2 mr-auto max-w-[88%]">
                  <div className="mt-1 shrink-0">
                    <AaryxAvatar size={28} mood={
                      orbState === "searching" ? "thinking" :
                      orbState === "thinking" ? "thinking" :
                      elapsedMs > 15000 ? "worried" : "thinking"
                    } />
                  </div>
                  <div className="flex flex-col gap-2 p-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.06] rounded-bl-sm w-64">
                    {/* Skeleton status line */}
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 animate-pulse ${
                        orbState === "searching" ? "bg-blue-400" :
                        orbState === "thinking" ? "bg-purple-400" : "bg-teal-400"
                      }`} />
                      <span className="text-[10px] uppercase font-semibold tracking-wider text-white/40">
                        {statusText || "Thinking"}{elapsedMs > 0 ? ` · ${formatTimer(elapsedMs)}` : ""}
                      </span>
                    </div>
                    {/* Shimmer bars */}
                    <div className="space-y-2">
                      <div className="h-2.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
                        <div className="h-full w-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                      </div>
                      <div className="h-2.5 w-4/5 rounded-full bg-white/[0.06] overflow-hidden">
                        <div className="h-full w-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" style={{ animationDelay: "0.15s" }} />
                      </div>
                      <div className="h-2.5 w-3/5 rounded-full bg-white/[0.06] overflow-hidden">
                        <div className="h-full w-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" style={{ animationDelay: "0.3s" }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Stop generating bar */}
            {isStreaming && (
              <div className="px-4 py-2 border-t border-white/5 shrink-0 flex justify-center">
                <button onClick={handleStopGenerating}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white/60 hover:text-white transition-all cursor-pointer outline-none">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" rx="2" /></svg>
                  Stop generating
                </button>
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="px-4 py-3 bg-white/[0.02] border-t border-white/10 shrink-0 flex items-center gap-2">
              <input ref={inputRef} type="text" value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about Harshal's work..."
                disabled={isStreaming}
                className="flex-1 h-10 px-3.5 bg-white/5 hover:bg-white/[0.07] border border-white/5 hover:border-white/10 focus:border-purple-500/40 rounded-xl text-xs text-white placeholder-white/35 focus:outline-none transition-all disabled:opacity-50" />
              <button type="submit" disabled={isStreaming || !inputMessage.trim()}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 border border-white/10 hover:brightness-110 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed outline-none cursor-pointer shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 12L3 21l18-9L3 3l3 9zm0 0h8" />
                </svg>
              </button>
            </form>
          </div>
        )}

        {/* ── Animated Avatar Trigger ───────────────── */}
        {!isOpen && (
          <div className="relative">
            {/* Rotating dialogue bubble */}
            {showTooltip && (
              <div
                className="absolute bottom-[100px] left-0 bg-[#1a1a1a] border border-purple-600 rounded-xl px-3.5 py-2 text-white text-[13px] whitespace-nowrap shadow-[0_4px_20px_rgba(124,58,237,0.3)] animate-fade-in z-50"
                key={dialogueText}
              >
                {dialogueText}
                {/* Speech bubble tail */}
                <div className="absolute -bottom-1.5 left-6 w-3 h-3 bg-[#1a1a1a] border-r border-b border-purple-600 transform rotate-45" />
              </div>
            )}

            {/* Clickable avatar */}
            <button
              onClick={() => setIsOpen(true)}
              className="cursor-pointer outline-none border-none bg-transparent hover:scale-105 active:scale-95 transition-transform"
            >
              <AaryxAvatar size={90} mood="waving" />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
