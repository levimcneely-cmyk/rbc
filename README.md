# RBC Staff Retreat App

Mobile-first guide for the Redeemer Bible Church staff retreat: agenda,
packing list, worship lyrics, and a live Redeemer Cup scoreboard.
Plain HTML/CSS/JS on GitHub Pages at www.rbcstaffretreat.com.

- **rbcstaffretreat.com** — what staff see. Read-only.
- **rbcstaffretreat.com/admin** — not linked anywhere. Passcode-protected
  page for entering scores, teams and retreat settings from your phone.

## Files

| File | What it is |
|---|---|
| `index.html`, `app.js`, `style.css`, `logo.png` | Public site |
| `cup.js` | Redeemer Cup scoring (shared by the site and admin) |
| `data.js` | `API_URL`, speakers, packing list, worship songs |
| `admin/index.html` | Admin page |
| `CNAME` | Custom domain — leave alone |

`Code.gs` (the backend) lives **only** in the Google Sheet under
Extensions → Apps Script. Never commit it here — the repo is public.

## Where things get edited

| What | Where |
|---|---|
| Event results | /admin → Scores |
| Teams and members | /admin → Teams |
| Year, dates, location, points, roster reveal time, form link | /admin → Settings |
| Agenda | Google Sheet → **Agenda** tab (Day, Date, Start, End, Activity — Day fills itself in from the Date if left blank) |
| Past winners | Google Sheet → **History** tab (Year, Winners, URL to a Google Drive photo shared "anyone with the link") |
| Speakers, packing list, worship songs | `data.js` |

## Scoring

Points by place default to 5 / 3 / 2 / 1 / 0 (changeable in Settings).
Ties in total points are broken by better average placement, then by
most 1st-place finishes. The note under the standings only appears when
1st place was decided by a tiebreaker.

## Passcode

The passcode is checked by Apps Script, so it never appears in this repo.
After 10 wrong tries the admin locks for 15 minutes. To change it, edit
the value in `changePasscode()` in Apps Script and run that function once.

## Starting a new year

1. Add the finished year's winner + photo link to the **History** tab.
2. In /admin: delete last year's events, update teams, then Settings
   (year, dates, location).
3. Clear the **Agenda** tab rows and enter the new schedule.
4. Update speakers / packing / songs in `data.js`.
