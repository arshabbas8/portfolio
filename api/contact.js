// Vercel serverless function: receives the contact form and emails it to Arsh via Resend.
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const hits = new Map(); // simple per-instance rate limit

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const ip = String(req.headers["x-forwarded-for"] || "unknown").split(",")[0].trim();
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  if (recent.length >= 3) return res.status(429).json({ error: "Too many messages. Please try again later." });

  const { name = "", email = "", message = "" } = req.body || {};
  const n = String(name).trim(), e = String(email).trim(), m = String(message).trim();
  if (!n || n.length > 100 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) || e.length > 200 || !m || m.length > 3000) {
    return res.status(400).json({ error: "Please check your name, email and message." });
  }
  if (!process.env.RESEND_API_KEY) return res.status(500).json({ error: "Email service is not configured." });

  recent.push(now);
  hits.set(ip, recent);

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: "Bearer " + process.env.RESEND_API_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "Portfolio <onboarding@resend.dev>",
        to: [process.env.CONTACT_TO || "arshabbas.edu@gmail.com"],
        reply_to: e,
        subject: "Portfolio message from " + n.replace(/[\r\n]+/g, " "),
        html: `<p><b>${esc(n)}</b> (${esc(e)}) wrote:</p><p>${esc(m).replace(/\n/g, "<br>")}</p>`,
      }),
    });
    if (!r.ok) return res.status(502).json({ error: "Could not send the message." });
    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(502).json({ error: "Could not send the message." });
  }
};
