/* ============================================================
   EDIT ME
   This is the one file you'll touch most. Update the agenda,
   packing list, and worship songs here. The Redeemer Cup pulls
   live from your Google Sheet (see CONFIG below + the README).
   ============================================================ */

const RETREAT = {
  dates: "September 10–12, 2026",
  location: "Country Lake Christian Retreat"
};

/* The full weekend schedule now lives entirely in the Agenda tab of the
   Google Sheet (day, date, start/end time, activity) — see agendaCsvUrl
   in CONFIG below. Nothing to edit here for schedule changes anymore. */

const SPEAKERS = [
  { role: "Teaching", name: "Norm Millar" },
  { role: "Worship", name: "Nick & Jill Tynan" }
];

const PACKING = {
  weather: "Forecast as of today: low 72° / high 90°, sunny — but pack a raincoat just in case!",
  attire: [
    "Casual, comfy clothes",
    "Clothes that could get wet (for a competition)",
    "Clothes to hike / workout in, if you want to",
    "Clothes for a bonfire",
    "Tennis shoes for activities",
    "Raincoat, just in case"
  ],
  extras: [
    "Bible, notebook, pen",
    "Your own pillow (optional)",
    "A cozy blanket",
    "Games you might want to play",
    "Chargers",
    "Allergy medicine"
  ]
};

/* Add the real setlist here — one object per song.
   Use \n for line breaks within a verse/chorus.
   Until this is filled in, the Worship page just shows
   "Setlist coming soon" instead of a placeholder song. */
const WORSHIP_SONGS = [];

/* ============================================================
   CONFIG — Redeemer Cup data source
   Publish two tabs of your Google Sheet to the web as CSV
   (File > Share > Publish to web > pick the tab > CSV),
   then paste each resulting URL below. See README.md for the
   exact column headers each tab needs.
   ============================================================ */
const CONFIG = {
  teamsCsvUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTEr3OYy-lPwKzA-VEfJkTJf-3s6HMEaC57gGQGnIhdT6RS9c8Xr0z2Dz8lW1tSBWuf7i0M7HcoiedI/pub?output=csv",
  resultsCsvUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTEr3OYy-lPwKzA-VEfJkTJf-3s6HMEaC57gGQGnIhdT6RS9c8Xr0z2Dz8lW1tSBWuf7i0M7HcoiedI/pub?gid=1672636483&single=true&output=csv",
  historyCsvUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTEr3OYy-lPwKzA-VEfJkTJf-3s6HMEaC57gGQGnIhdT6RS9c8Xr0z2Dz8lW1tSBWuf7i0M7HcoiedI/pub?gid=880893577&single=true&output=csv",
  agendaCsvUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTEr3OYy-lPwKzA-VEfJkTJf-3s6HMEaC57gGQGnIhdT6RS9c8Xr0z2Dz8lW1tSBWuf7i0M7HcoiedI/pub?gid=1157631561&single=true&output=csv",

  // Points awarded for each finishing place, by index (1st, 2nd, 3rd...).
  // Any place beyond this list earns the last value.
  pointsByPlace: [5, 3, 2, 1, 0]
};
