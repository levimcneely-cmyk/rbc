# Redeemer Staff Retreat App

A mobile-first guide for the staff retreat: agenda, packing list, worship
lyrics, and a live Redeemer Cup scoreboard. Plain HTML/CSS/JS — no build
step, so it hosts directly on GitHub Pages.

## 1. Put it on GitHub Pages

1. Create a new GitHub repo (e.g. `rbc`) and upload these files to the
   root — `index.html`, `style.css`, `data.js`, `app.js` all sit
   side-by-side, no subfolders.
2. In the repo: **Settings → Pages → Source** → select the `main` branch,
   root folder → Save.
3. GitHub gives you a URL like `https://yourname.github.io/redeemer-retreat/`.
   Text that link to your staff — that's the whole app.

## 2. Edit the content (`data.js`)

Open `data.js` — everything you'll want to change for a different
retreat lives there:
- `RETREAT.dates` / `RETREAT.location` — the header subtitle
- `PACKING` — attire / extras lists and the weather note
- `SPEAKERS` — teaching/worship credit lines shown under the agenda
- `WORSHIP_SONGS` — replace the placeholder with real titles + lyrics
  (use `\n` for line breaks)

The agenda itself is no longer edited here — it's fully driven by the
Agenda tab of the Google Sheet (see below), so you can reorder/retime
things without touching code.

## 3. Connect the app to Google Sheets

One Google Sheet with four tabs powers the whole app:

**Tab "Agenda"** — the full weekend schedule
| day of week | date      | time start | time end | activity              |
|-------------|-----------|------------|----------|------------------------|
| Thursday    | 9/10/2026 | 5:00 PM    | 6:00 PM  | Arrival                |
| Thursday    | 9/10/2026 | 8:30 PM    | 10:00 PM | First Event / Hang     |
| Saturday    | 9/12/2026 | 10:30 AM   |          | Leave                  |

Rows are grouped into day tabs in the order days first appear, and
each row's own order within a day is preserved. Leave "time end" blank
for a single-moment item like "Leave." Times display exactly as typed
(format the column as time in Sheets — e.g. "5:00 PM" — and that's
what shows in the app).

**Tab "Teams"** — one row per person
| team      | member       |
|-----------|--------------|
| Team Blue | Jane Smith   |
| Team Blue | Mark Jones   |
| Team Red  | Alex Brown   |

**Tab "Scoring"** — one row per team per event, filled in as each event finishes
| team      | event         | score | placement |
|-----------|---------------|-------|-----------|
| Team Blue | Murder Mystery| 10    | 1         |
| Team Red  | Murder Mystery| 8     | 2         |

"Score" is whatever the raw result was (points, time, whatever fits the
event) — it's just for your own reference, the app doesn't read it.
"Placement" is the finish order the app actually uses, and you control
tie handling directly here: if two teams tie for 3rd, give them both
placement 3 (so they both earn 3rd-place points) and give the next team
placement 4 — don't skip a number, since nobody should end up losing
points to a tie further up. Whatever text is in the "event" column
becomes that event's display name everywhere in the app, agenda
included — rename it here and it updates everywhere.

**Overall row + final tiebreak:** add one extra row per team with event
= `Overall` and placement = each team's average placement across the
real events. The app ignores these rows for scoring (so they don't show
up as a 5th event card or add extra points) — they're not even required
for it to work, since the app calculates each team's average placement
itself from the real event rows. If two teams end up tied on total
points, whichever has the better (lower) average placement is ranked
higher automatically.

**Tab "History"** — past winners, one row per year
| year | winners | url                                |
|------|---------|-------------------------------------|
| 2024 |         | a Google Drive share link to a photo |
| 2025 |         | a Google Drive share link to a photo |

Drive links need "Anyone with the link can view" sharing turned on.

**Publish each tab as CSV:**
1. In Google Sheets: **File → Share → Publish to web**.
2. Under "Link", choose the specific sheet tab (not "Entire Document"),
   and set the format to **Comma-separated values (.csv)**.
3. Click **Publish**, copy the URL it gives you.
4. Repeat for each of the four tabs.
5. Paste the four URLs into `CONFIG.agendaCsvUrl`, `CONFIG.teamsCsvUrl`,
   `CONFIG.resultsCsvUrl`, and `CONFIG.historyCsvUrl` at the bottom of
   `data.js`.

Once all four links are in place, the whole app updates itself — just
edit the Sheet and the app picks up changes automatically (it re-checks
the Agenda tab on every page load, and the Redeemer Cup tabs every time
someone opens that page — no redeploy needed either way).

## 4. Colors & fonts

Right now the theme is matched from a screenshot of redeemerbible.church:
a dark slate-teal, black, and white, paired with Poppins (headings) +
Inter (body text) — a close approximation, not exact brand hex codes.
To fine-tune it: open `style.css` and update the values at the very top
under `:root` (`--pine`, `--teal`, `--paper`, `--moss`, `--gold`, etc.)
and swap the Google Fonts link in `index.html` if needed.

## 5. Testing before you push

Double-click `index.html` to preview locally in Safari — everything
works except the Redeemer Cup sheet fetch, which needs to be served
over http(s) (works fine once it's live on GitHub Pages).
