# Redeemer Staff Retreat App

A mobile-first guide for the staff retreat: agenda, packing list, worship
lyrics, and a live Redeemer Cup scoreboard. Plain HTML/CSS/JS — no build
step, so it hosts directly on GitHub Pages.

## 1. Put it on GitHub Pages

1. Create a new GitHub repo (e.g. `redeemer-retreat`) and upload these files,
   keeping the folder structure (`index.html`, `css/style.css`, `js/data.js`,
   `js/app.js`).
2. In the repo: **Settings → Pages → Source** → select the `main` branch,
   root folder → Save.
3. GitHub gives you a URL like `https://yourname.github.io/redeemer-retreat/`.
   Text that link to your staff — that's the whole app.

## 2. Edit the content (`js/data.js`)

Open `js/data.js` — everything you'll want to change for a different
retreat lives there:
- `RETREAT.dates` — the header subtitle
- `AGENDA` — one array per day
- `PACKING` — attire / extras lists and the weather note
- `WORSHIP_SONGS` — replace the placeholder with real titles + lyrics
  (use `\n` for line breaks)

## 3. Connect the Redeemer Cup to Google Sheets

Make one Google Sheet with two tabs:

**Tab "Teams"** — one row per person
| team      | member       |
|-----------|--------------|
| Team Blue | Jane Smith   |
| Team Blue | Mark Jones   |
| Team Red  | Alex Brown   |

**Tab "Results"** — one row per team per event, filled in as each event finishes
| event   | team      | placement |
|---------|-----------|-----------|
| Event 1 | Team Blue | 1         |
| Event 1 | Team Red  | 2         |
| Event 2 | Team Red  | 1         |

Placement is just the finish order (1st, 2nd, 3rd...) — the app converts
that into points automatically using the scale in `CONFIG.pointsByPlace`
in `js/data.js` (defaults to 10/8/6/4/2, adjust to taste).

**Publish each tab as CSV:**
1. In Google Sheets: **File → Share → Publish to web**.
2. Under "Link", choose the specific sheet tab (not "Entire Document"),
   and set the format to **Comma-separated values (.csv)**.
3. Click **Publish**, copy the URL it gives you.
4. Repeat for the other tab.
5. Paste the two URLs into `CONFIG.teamsCsvUrl` and `CONFIG.resultsCsvUrl`
   at the bottom of `js/data.js`.

Once both links are in place, the Redeemer Cup page updates itself —
just edit the Sheet as events wrap up and the app picks up the new
standings on next load (no redeploy needed).

## 4. Colors & fonts

Right now the theme is a placeholder palette (pine green / parchment /
brass gold) and Fraunces + Inter, since I didn't have Redeemer's exact
brand hex codes or logo file. To match the real brand: open
`css/style.css` and update the values at the very top under `:root`
(`--pine`, `--paper`, `--moss`, `--gold`, etc.) and swap the Google
Fonts link in `index.html` if the church uses different typefaces.

## 5. Testing before you push

Double-click `index.html` to preview locally in Safari — everything
works except the Redeemer Cup sheet fetch, which needs to be served
over http(s) (works fine once it's live on GitHub Pages).
