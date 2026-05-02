import { Readable } from "stream";

export default async function handler(req, res) {
  const { message, checkpoint_id } = req.query;

  if (!message) {
    return res.status(400).json({ error: "Missing message parameter" });
  }

  // Allow cross-origin and SSE headers
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive",
  });

  const backendUrl = process.env.AARYX_BACKEND_URL || "http://127.0.0.1:8000";
  let url = `${backendUrl}/portfolio_chat_stream/${encodeURIComponent(message)}`;
  if (checkpoint_id) {
    url += `?checkpoint_id=${encodeURIComponent(checkpoint_id)}`;
  }

  try {
    const backendRes = await fetch(url);

    if (!backendRes.ok) {
      res.write(`data: ${JSON.stringify({ type: "content", content: "Service currently unavailable. Try again in a moment." })}\n\n`);
      res.end();
      return;
    }

    const reader = backendRes.body.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: readerDone } = await reader.read();
      done = readerDone;

      const chunk = decoder.decode(value);
      res.write(chunk);
    }
  } catch (err) {
    console.error("Aaryx Next.js Proxy Error:", err);
    res.write(`data: ${JSON.stringify({ type: "content", content: "Connection error: Could not reach Aaryx backend." })}\n\n`);
  } finally {
    res.end();
  }
}
