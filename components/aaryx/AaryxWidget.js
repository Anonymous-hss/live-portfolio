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
    "15+ shipped products. Want the highlights?",
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
    "15 projects. Each one shipped to production.",
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

function InlineContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !msg) return;
    setSubmitting(true);
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          access_key: "6e54b5a7-1417-45b3-8094-7c0d6590d5de",
          name,
          email,
          subject: "Aaryx Chat Widget Message",
          message: msg,
        }),
      });
      setSent(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div className="p-2 border border-green-500/20 bg-green-500/5 rounded-xl text-green-300 text-[11px] mt-1 select-none animate-fade-in">
        ✨ Message sent successfully! Harshal will reach out to you shortly.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-2 bg-white/[0.03] border border-white/5 p-3 rounded-xl">
      <p className="text-[10px] text-white/50 uppercase tracking-wider font-semibold mb-1">
        📬 Leave a Message directly
      </p>
      <input
        type="text"
        placeholder="Your name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white text-[11px] focus:outline-none focus:border-purple-500/40"
      />
      <input
        type="email"
        placeholder="Your email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white text-[11px] focus:outline-none focus:border-purple-500/40"
      />
      <textarea
        placeholder="Your message..."
        required
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        rows={2}
        className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white text-[11px] focus:outline-none focus:border-purple-500/40 resize-none"
      />
      <button
        type="submit"
        disabled={submitting}
        className="w-full py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-semibold text-[11px] tracking-wide transition-all active:scale-[0.98] outline-none border-none cursor-pointer"
      >
        {submitting ? "Sending..." : "Submit Message"}
      </button>
    </form>
  );
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
  const messagesContainerRef = useRef(null);
  const [showScrollDown, setShowScrollDown] = useState(false);

  const handleScroll = () => {
    if (!messagesContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 100;
    setShowScrollDown(!isAtBottom);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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

  // Focus input and scroll down instantly on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
      }, 200);
    }
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

  const handleClearChat = useCallback(() => {
    localStorage.removeItem("aaryx_chat_history");
    setMessages([{
      id: "welcome", role: "assistant",
      content: `I'm **Aaryx**. I know everything about Harshal — his work, his projects, what makes him different. Ask me anything, or I'll just tell you what you need to know.`,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }]);
    setShowTemplates(true);
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

    // Intercept contact intent
    const lower = textToSend.toLowerCase();
    const isContactIntent = lower.includes("leave a message") || lower.includes("drop a message") || lower.includes("contact");

    if (isContactIntent) {
      const userMsg = {
        id: Date.now().toString(), role: "user", content: textToSend,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, userMsg, {
        id: (Date.now() + 1).toString(), role: "assistant", content: "You can leave a message directly here using the form below, and I'll notify Harshal right away!", showContactForm: true,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      }]);
      setIsStreaming(false);
      setOrbState("idle");
      setStatusText("");
      return;
    }

    // Silent notification for first visitor message
    if (messages.filter(m => m.role === "user").length === 0) {
      try {
        fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify({
            access_key: "6e54b5a7-1417-45b3-8094-7c0d6590d5de",
            name: "Aaryx Visitor Notification",
            email: "visitor@aaryx.assistant",
            subject: "Aaryx Chat Started",
            message: `New Aaryx interaction: "${textToSend}"`
          })
        }).catch(() => {});
      } catch (e) {}
    }

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
      console.log("[Aaryx Debug] Sending request to:", fetchUrl);
      
      const res = await fetch(fetchUrl, {
        signal: controller.signal,
      });

      console.log("[Aaryx Debug] Received response. Status:", res.status, "Ok:", res.ok);

      if (!res.ok) {
        const errText = await res.text().catch(() => "Unable to read error text");
        console.error(`[Aaryx Debug] API error: ${res.status} ${res.statusText}. Body: ${errText}`);
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
      let sseBuffer = "";

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (!value) continue;

        sseBuffer += decoder.decode(value, { stream: true });
        const lines = sseBuffer.split("\n\n");
        sseBuffer = lines.pop() || "";

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
      console.log("[Aaryx Debug] Stream completed successfully in", totalTime, "ms");

    } catch (err) {
      if (err.name === "AbortError") {
        console.log("[Aaryx Debug] User cancelled generation.");
        return;
      }
      console.error("[Aaryx Debug] Connection error:", err);

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
                {/* Clear Chat */}
                <button onClick={handleClearChat} title="Clear chat"
                  className="p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-white transition-all cursor-pointer outline-none">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
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
            <div className="flex-1 px-4 py-3 overflow-y-auto flex flex-col gap-3 relative" ref={messagesContainerRef} onScroll={handleScroll}>
              {showScrollDown && (
                <button onClick={scrollToBottom} type="button"
                  className="absolute bottom-4 right-6 p-2 rounded-full bg-purple-600 hover:bg-purple-500 border border-white/20 text-white shadow-lg transition-all cursor-pointer outline-none z-30 animate-bounce flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                  </svg>
                </button>
              )}
              {messages.map((m, idx) => (
                m.role === "assistant" && !m.content && isStreaming ? null :
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
                      {m.role === "assistant" && m.showContactForm && <InlineContactForm />}

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
