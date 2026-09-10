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
   "Setlist coming soon" instead of a placeholder song.

   NOTE: the "lyrics" field below is a placeholder — Claude can't
   reproduce copyrighted song lyrics, so each entry currently just
   shows the verse/chorus order. Paste the real lyrics in over that
   placeholder text (keep the \n line breaks) once you have them. */
const WORSHIP_SONGS = [
  {
    title: "10,000 Reasons",
    lyrics: "Bless the Lord O my soul \nO my soul\nWorship his holy name\nSing like never before\nO my soul\nI'll worship your holy name\n\nThe sun comes up\nIt's a new day dawning\nIt's time to sing your song again\nWhatever may pass and whatever lies before me\nLet me be singing when the evening comes\n\nBless the Lord O my soul \nO my soul\nWorship his holy name\nSing like never before\nO my soul\nI'll worship your holy name"
  },
  {
    title: "A Thousand Hallelujahs",
    lyrics: "Order: Verse 1, Chorus, Verse 2, Chorus, Bridge 1a, Bridge 1b, Chorus\n\n[Paste lyrics here]"
  },
  {
    title: "O Praise the Name (Anástasis)",
    lyrics: "Order: Verse 1, Verse 2, Chorus 1, Verse 3, Chorus 2, Verse 4, Chorus 3, Ending\n\n[Paste lyrics here]"
  },
  {
    title: "'Tis So Sweet to Trust in Jesus",
    lyrics: "Order: Verse 1, Chorus, Chorus\n\n[Paste lyrics here]"
  },
  {
    title: "His Glory and My Good",
    lyrics: "Order: Verse 1, Verse 2, Chorus 1, Verse 3, Chorus 1, Verse 4, Chorus 2, Chorus 3\n\n[Paste lyrics here]"
  },
  {
    title: "King of Kings",
    lyrics: "Order: Chorus, Verse 1, Chorus, Verse 2, Verse 3, Verse 4, Chorus, Tag\n\n[Paste lyrics here]"
  },
  {
    title: "All Sufficient Merit",
    lyrics: "Order not finalized yet.\n\n[Paste lyrics here]"
  },
  {
    title: "The Blood",
    lyrics: "Order not finalized yet.\n\n[Paste lyrics here]"
  },
  {
    title: "He Who Is to Come",
    lyrics: "Order not finalized yet.\n\n[Paste lyrics here]"
  },
  {
    title: "Christ Be Magnified",
    lyrics: "Order not finalized yet.\n\n[Paste lyrics here]"
  },
  {
    title: "Abide",
    lyrics: "Order not finalized yet.\n\n[Paste lyrics here]"
  },
  {
    title: "Bless God",
    lyrics: "Order not finalized yet.\n\n[Paste lyrics here]"
  },
  {
    title: "In Christ Alone",
    lyrics: "Order not finalized yet.\n\n[Paste lyrics here]"
  },
  {
    title: "Holy Forever",
    lyrics: "Order not finalized yet.\n\n[Paste lyrics here]"
  }
];

/* ============================================================
   CONFIG — Redeemer Cup data source
   Publish two tabs of your Google Sheet to the web as CSV
   (File > Share > Publish to web > pick the tab > CSV),
   then paste each resulting URL below. See README.md for the
   exact column headers each tab needs.
   ============================================================ */
const CONFIG = {
  teamsCsvUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTEr3OYy-lPwKzA-VEfJkTJf-3s6HMEaC57gGQGnIhdT6RS9c8Xr0z2Dz8lW1tSBWuf7i0M7HcoiedI/pub?gid=0&single=true&output=csv",
  resultsCsvUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTEr3OYy-lPwKzA-VEfJkTJf-3s6HMEaC57gGQGnIhdT6RS9c8Xr0z2Dz8lW1tSBWuf7i0M7HcoiedI/pub?gid=1528073315&single=true&output=csv",
  historyCsvUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTEr3OYy-lPwKzA-VEfJkTJf-3s6HMEaC57gGQGnIhdT6RS9c8Xr0z2Dz8lW1tSBWuf7i0M7HcoiedI/pub?gid=880893577&single=true&output=csv",
  agendaCsvUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTEr3OYy-lPwKzA-VEfJkTJf-3s6HMEaC57gGQGnIhdT6RS9c8Xr0z2Dz8lW1tSBWuf7i0M7HcoiedI/pub?gid=1157631561&single=true&output=csv",

  // Points awarded for each finishing place, by index (1st, 2nd, 3rd...).
  // Any place beyond this list earns the last value.
  pointsByPlace: [5, 3, 2, 1, 0]
};
