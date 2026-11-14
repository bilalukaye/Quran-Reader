# Yours Quran Reader

A Quran reader for phones: IndoPak and Madani script on ruled mushaf-style pages you
swipe like a book, English and Urdu meanings, word-by-word help, recitation by six qaris,
ribbon bookmarks, a khatam planner, daily goals, Friday Al-Kahf reminders, and offline
reading after the first visit.

## Updating an existing Vercel site (GitHub)
1. Open your repository on github.com and click **Add file → Upload files**.
2. Drag in everything inside this folder (files and folders) and click **Commit changes**.
   Files with the same names are replaced; new folders are added.
3. Vercel rebuilds automatically. Check **Deployments** until it says **Ready**.

## New deployment
Import the repository at vercel.com (Add New → Project). No settings need changing;
`vercel.json` runs `node build.mjs` and publishes `dist/`.

## Optional
- `ANTHROPIC_API_KEY` enables the optional AI explanation in the daily story
  (off by default in the app; it is not tafsir).

## Sources
IndoPak text and font: DigitalKhatt IndoPak (Amine Anane), QUL / Tarteel.
Madani text: The Noble Qur'an Encyclopedia (quranenc.com).
English: Saheeh International. Urdu: Fateh Muhammad Jalandhari (public domain).
Transliteration: Tanzil. Word-by-word data and word audio: Quran.com.
Page, juz, ruku, hizb and sajdah data: quran-meta (Hafs). Recitation: EveryAyah.com.
