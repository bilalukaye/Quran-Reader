// Copies the site files to dist/ and fills in the site address for link previews (WhatsApp, iMessage, etc.).
import { cpSync, rmSync, readFileSync, writeFileSync } from "node:fs";
const host = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL || "";
const site = host ? "https://" + host.replace(/^https?:\/\//, "").replace(/\/$/, "") : "";
rmSync("dist", { recursive: true, force: true });
for (const p of ["index.html", "sw.js", "manifest.webmanifest", "og.jpg", "icons", "data", "fonts"]) cpSync(p, "dist/" + p, { recursive: true });
let html = readFileSync("dist/index.html", "utf8");
html = html.replaceAll("__SITE__", site).replace("ai:__AI__", "ai:" + (process.env.ANTHROPIC_API_KEY ? "true" : "false"));
writeFileSync("dist/index.html", html);
console.log("Built dist/ for", site || "(no production URL; link previews will use relative paths)");
