// Vercel serverless function: writes the short English + Urdu explanation
// for the "Ayah of the day" story and PDF. Needs ANTHROPIC_API_KEY in Vercel.
const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-5-5";

function buildPrompt({ s, a, surah, arabic, translation }) {
  return `You are helping a Muslim reader understand one ayah of the Quran. Ayah ${s}:${a} (Surah ${surah}).
Arabic: ${arabic}
Translation (Saheeh International): ${translation}

Write a short explanation in 3 or 4 scenes for a one-minute story video, based on well-known mainstream tafsir (such as Ibn Kathir, al-Tabari, al-Sa'di). Scenes: (1) context or the story behind it, including the prophet or people involved if any, (2) what it means, (3) a practical lesson for today, optionally (4) a closing reflection. Each scene at most 45 words, simple English, respectful, no rulings or fatwas, no invented hadith; if the context is not well known, say so plainly instead of guessing. Also give each scene in natural, simple Urdu as a Pakistani scholar would write it (Urdu script, not transliteration; use اللہ, نبی ﷺ and respectful phrasing), with the same meaning as the English. Respond with JSON only: {"scenes":[{"title":"...","text":"...","title_ur":"...","text_ur":"..."}]}`;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Use POST" });
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return res.status(503).json({ error: "ANTHROPIC_API_KEY is not set" });

  const b = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  const s = Number(b.s), a = Number(b.a);
  const ok = Number.isInteger(s) && s >= 1 && s <= 114 && Number.isInteger(a) && a >= 1 && a <= 286
    && typeof b.arabic === "string" && b.arabic.length <= 2500
    && typeof b.translation === "string" && b.translation.length <= 3000
    && typeof b.surah === "string" && b.surah.length <= 40;
  if (!ok) return res.status(400).json({ error: "Invalid ayah" });

  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({ model: MODEL, max_tokens: 2000, messages: [{ role: "user", content: buildPrompt({ s, a, surah: b.surah, arabic: b.arabic, translation: b.translation }) }] }),
    });
    if (!r.ok) return res.status(502).json({ error: "AI request failed", status: r.status });
    const data = await r.json();
    const text = (data.content || []).filter(c => c.type === "text").map(c => c.text).join("");
    const json = JSON.parse(text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1));
    if (!Array.isArray(json.scenes)) throw new Error("No scenes");
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json({ scenes: json.scenes.slice(0, 4) });
  } catch (e) {
    return res.status(502).json({ error: "Could not read the AI reply" });
  }
}
