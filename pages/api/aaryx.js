const HARSHAL_KNOWLEDGE_BASE = `
You are Aaryx, Harshal Sawatkar's autonomous AI portfolio copilot on harshal.stealthgrowth.in.
Speak concisely, technically, and confidently like a sharp systems engineer. Keep answers under 140 words unless asked for deep dive.

=== HARSHAL SAWATKAR PROFILE ===
- Role: Full-Stack AI Engineer — Agentic Workflows, MCP, RAG & Real-Time Distributed Systems
- Location: Pune, India (IST — Full EU & US-East overlap). Open to Pune In-Office & Global/India Remote roles.
- Experience: 2+ years shipping production multi-agent systems, MCP integrations, and real-time distributed platforms.
- Contact: harshalsawatkar24@gmail.com | +91 7030041309 | github.com/harshalsawatkar | linkedin.com/in/harshal-sawatkar | Resume: /Harshal_Sawatkar_Resume.pdf

=== VERIFIED FLAGSHIP SYSTEMS ===
1. DataGlow (SCAIDR Engine — dataglow.ai):
   - 3-Layer Hybrid LangGraph StateGraph in Python (FastAPI).
   - Layer 1: Deterministic Python MetricEngine (Shannon entropy <1.0 synthetic leakage detection, IQR outliers, completeness, PII regex) running in <30ms with 0 LLM tokens (cuts routine token spend >60%).
   - Layer 2: 5 parallel Pydantic-validated domain agents (Quality, Governance, Fairness, Schema, Business Mapping).
   - Layer 3: CDO Consensus Judge with +-2.5 mathematical score clamping, asymmetric RAG readiness guards, per-fix Do-No-Harm rollback on Parquet checkpoints, and HITL SQL approval interrupts.
   - Model Context Protocol (MCP): Built MCPDataConnector over HTTP/SSE with OpenTelemetry (@observe) tracing for dynamic catalog discovery, bounded sampling, and Databricks Delta Lake jobs + Meridian PSI/KS-test drift tracking.

2. StockGenius AI (stockgenius.ai):
   - Binary Protobuf WebSocket tick-streaming gateway (Upstox MarketDataFeed.proto) with global reference-counted subscription pooling (Map<ticker, Set<clientId>>) & cached tick replay, cutting broker rate-limit overhead by 85%.
   - Ask Genius Financial Copilot: Re-architected from slow sequential tool loops into Classify -> 8-Thread Parallel Fan-Out -> Single Synthesis pipeline; hardened across a 100-prompt live stress test (87% pass rate across Upstox, Zerodha, Fyers) with React Error Boundaries and immutable SSE reducers.
   - Concurrency-safe paper trading engine with per-user distributed order locks (acquireOrderLock), dynamic slippage simulation, statutory Indian fees (STT, SEBI, GST), and penny-stock (<Rs 10) safeguards.

3. ACE (Life OS — ace.stealthgrowth.in | github.com/harshalsawatkar/ace-):
   - Conversational neural voice companion using Azure Neural Voice over HTTP chunked streaming with an in-memory phrase cache (<20ms replay) and custom phonetic speech sanitizer (stripping Markdown/emojis, expanding $50k -> fifty thousand dollars, 100kg -> one hundred kilograms).
   - Embedded SQLite VectorMemoryStore using Gemini embeddings (gemini-embedding-001) with zero-downtime deterministic offline fallback vectorizer and closed-loop agentic tool calling.

4. Deskhand & Ghost Agent:
   - Deskhand: Sandboxed Playwright computer-use agent host with DOM/vision loops, strict domain allowlist, hard 150-call disk budget cap, OS emergency kill switch (Ctrl+Shift+K), and native iOS SwiftUI FaceID 1-tap HITL approvals.
   - Ghost Agent: Cyclic LangGraph outbound sales state machine with Playwright DOM extraction & HITL approval checkpoints, cutting manual SDR qualification time by 70%.

5. Enterprise Multi-Branch CRM (Reborn Clinics) & B2B ERP (Zizbey):
   - Reborn CRM: Next.js, Node.js, PostgreSQL, Redis Pub/Sub & WebSockets scaling to 10,000+ monthly leads across 8 branches and 50+ concurrent staff (lead triage cut from 2-3 mins to sub-second; 40% less lead leakage via idempotent Meta/Google/WhatsApp webhooks at 99.9% uptime).
   - Zizbey (Contract): Multi-tenant B2B ERP backend and 2 React Native apps in Node.js, Go, and PostgreSQL with real-time WebSocket sync and zero-downtime Docker CI/CD.
`;

function buildLocalFallbackAnswer(query) {
  const q = (query || "").toLowerCase();
  if (q.includes("dataglow") || q.includes("mcp") || q.includes("langgraph") || q.includes("rag")) {
    return "In **DataGlow (dataglow.ai)**, Harshal architected a **3-Layer Hybrid LangGraph StateGraph**:\n\n- **Layer 1 (<30ms, 0 tokens):** Deterministic Python `MetricEngine` computing Shannon entropy, IQR outliers, completeness, and PII regex — cutting routine LLM token spend by **>60%**.\n- **Layer 2:** 5 parallel Pydantic-validated domain agents.\n- **Layer 3:** CDO Consensus Judge enforcing **±2.5 mathematical score clamping** and per-fix **Do-No-Harm rollback gates** on Parquet checkpoints.\n- **MCP Integration:** Built `MCPDataConnector` over HTTP/SSE with OpenTelemetry tracing to inspect schemas, sample tables, and trigger Databricks Delta Lake jobs.";
  }
  if (q.includes("stockgenius") || q.includes("websocket") || q.includes("fintech") || q.includes("trading")) {
    return "In **StockGenius AI (stockgenius.ai)**, Harshal built:\n\n1. **Binary Protobuf WebSocket Gateway:** Reference-counted subscription pooling (`Map<ticker, Set<clientId>>`) + cached tick replay, cutting upstream Upstox broker rate limits by **85%**.\n2. **Ask Genius Copilot:** Re-architected into a **Classify → 8-Thread Parallel Fan-Out → Single Synthesis** pipeline, achieving an **87% pass rate** across a 100-prompt live stress test with Upstox, Zerodha, and Fyers.\n3. **Concurrency-Safe Paper Trading:** Per-user distributed order locks (`acquireOrderLock`), dynamic slippage, statutory fee friction, and penny-stock safeguards.";
  }
  if (q.includes("voice") || q.includes("ace") || q.includes("audio") || q.includes("tts")) {
    return "**ACE (ace.stealthgrowth.in)** is Harshal's neural voice & vector memory companion:\n\n- **Chunked Neural Voice:** Streams Azure Neural TTS over `Transfer-Encoding: chunked` with a **<20ms in-memory phrase cache** and custom phonetic sanitizer (expanding `$50k` → *fifty thousand dollars*, `100kg` → *one hundred kilograms*).\n- **Vector Memory:** Embedded SQLite `VectorMemoryStore` using `gemini-embedding-001` with a deterministic L2 hashing fallback vectorizer for 100% offline resilience.";
  }
  if (q.includes("contact") || q.includes("hire") || q.includes("email") || q.includes("resume") || q.includes("phone")) {
    return "You can reach Harshal directly:\n\n- **Email:** `harshalsawatkar24@gmail.com`\n- **Phone / WhatsApp:** `+91 7030041309`\n- **Location:** Pune, India (Open to **Pune In-Office** & **Global/India Remote** with full EU & US-East overlap)\n- **ATS Resume:** [Download PDF](/Harshal_Sawatkar_Resume.pdf)\n- **GitHub:** `github.com/harshalsawatkar`";
  }
  return "Harshal Sawatkar is a **Full-Stack AI & Distributed Systems Engineer** (2+ yrs) based in **Pune, India** (open to Pune In-Office & Global Remote).\n\n**Top Production Highlights:**\n- **DataGlow (dataglow.ai):** 3-Layer LangGraph StateGraph + MCP HTTP/SSE connectors + <30ms Shannon entropy gate (**>60% LLM token cut**).\n- **StockGenius AI (stockgenius.ai):** Sub-50ms binary Protobuf WebSocket pooling (**85% broker rate-limit cut**) + Classify → Parallel Fan-Out AI copilot.\n- **ACE (ace.stealthgrowth.in):** Chunked Azure Neural Voice (<20ms cache) + Gemini SQLite Vector Memory.\n- **Deskhand & Reborn CRM:** Sandboxed Playwright agent with iOS FaceID HITL gates, and a Next.js/Redis CRM handling **10,000+ monthly leads**.\n\nAsk me about any specific system, stack, or how to hire Harshal!";
}

export default async function handler(req, res) {
  const { message } = req.query;

  if (!message) {
    return res.status(400).json({ error: "Missing message parameter" });
  }

  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive",
  });

  const sendEvent = (obj) => {
    res.write(`data: ${JSON.stringify(obj)}\n\n`);
  };

  const geminiKey = process.env.GEMINI_API_KEY;

  if (geminiKey) {
    const models = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-2.0-flash-lite"];
    for (const model of models) {
      try {
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(geminiKey)}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [
                    {
                      text: `${HARSHAL_KNOWLEDGE_BASE}\n\nVisitor Question: ${message}`,
                    },
                  ],
                },
              ],
              generationConfig: { temperature: 0.35, maxOutputTokens: 450 },
            }),
          }
        );

        if (geminiRes.ok) {
          const data = await geminiRes.json();
          const answer =
            data?.candidates?.[0]?.content?.parts?.[0]?.text ||
            buildLocalFallbackAnswer(message);
          sendEvent({ type: "content", content: answer });
          sendEvent({ type: "end" });
          res.end();
          return;
        }
      } catch (e) {
        // Fall through to next model or deterministic fallback
      }
    }
  }

  // Zero-downtime built-in architectural responder (works 24/7 even with 0 external servers)
  const fallbackText = buildLocalFallbackAnswer(message);
  sendEvent({ type: "content", content: fallbackText });
  sendEvent({ type: "end" });
  res.end();
}
