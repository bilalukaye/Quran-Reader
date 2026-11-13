# Quran Reader

Quran reader with IndoPak and Madani script, English and Urdu meaning, bookmarks,
khatam plans, daily goals, reminders, an ayah-of-the-day story, and PDF export.
It installs on phones as an app and works offline after the first visit.

## Deploy on Vercel

### Option A: from the browser (no coding)
1. Create a new repository on github.com and upload every file and folder in this zip.
2. On vercel.com choose **Add New → Project**, pick the repository, and click **Deploy**.
   Leave the framework preset as **Other**; no build command is needed.
3. Optional, for the AI explanation in the daily story and PDF:
   **Project → Settings → Environment Variables**, add `ANTHROPIC_API_KEY`
   with a key from console.anthropic.com, then **Deployments → Redeploy**.

### Option B: from a terminal
    npx vercel            # first deploy, answer the setup questions
    npx vercel env add ANTHROPIC_API_KEY
    npx vercel --prod

## Files
- `index.html` – the whole app, including the Quran text and fonts
- `api/explain.js` – server function for the English + Urdu explanation
- `sw.js`, `manifest.webmanifest`, `icons/` – install-to-home-screen and offline support
- `vercel.json` – caching rules

## Notes
- Without `ANTHROPIC_API_KEY` everything works except the AI explanation;
  the story and PDF then show the ayah, pronunciation and meaning only.
- API use is billed to your Anthropic account. Each explanation is saved on the
  reader's device, so an ayah is only requested once per device.
- Optional: set `ANTHROPIC_MODEL` to choose a different Claude model.
- Bookmarks, goals and plans are saved in each reader's browser.

## Credits
IndoPak text and font: DigitalKhatt IndoPak by Amine Anane, QUL / Tarteel Inc.
Madani text: quranenc.com. English: Saheeh International.
Urdu: Fateh Muhammad Jalandhari.
