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

const AGENDA = {
  Thursday: [
    { time: "5:00 – 6:00", title: "Arrival" },
    { time: "6:00 – 6:05", title: "Welcome" },
    { time: "6:05 – 7:00", title: "Dinner" },
    { time: "7:00 – 8:30", title: "Worship / Teaching" },
    { time: "8:30 – 10:00", title: "Event 1 / Hang" }
  ],
  Friday: [
    { time: "8:00 – 9:00", title: "Breakfast" },
    { time: "9:00 – 10:30", title: "Worship / Teaching" },
    { time: "10:45 – 11:45", title: "Event 2" },
    { time: "12:00 – 1:00", title: "Lunch" },
    { time: "1:30 – 2:30", title: "Event 3" },
    { time: "2:30 – 6:30", title: "Relax — Lake / Hike / Sports" },
    { time: "6:30 – 7:30", title: "Dinner" },
    { time: "7:30 – 10:00", title: "Event 4 / Bonfire" }
  ],
  Saturday: [
    { time: "8:00 – 9:00", title: "Breakfast / Award Ceremony" },
    { time: "9:00 – 10:15", title: "Worship / Teaching" },
    { time: "10:30", title: "Leave" }
  ]
};

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

/* Placeholder songs — replace with the real setlist.
   Use \n for line breaks within a verse/chorus. */
const WORSHIP_SONGS = [
  {
    title: "Song Title Goes Here",
    lyrics: "Verse 1\nLyrics will go here once you send them over.\n\nChorus\nSame idea — just replace this text in js/data.js."
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
  teamsCsvUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTEr3OYy-lPwKzA-VEfJkTJf-3s6HMEaC57gGQGnIhdT6RS9c8Xr0z2Dz8lW1tSBWuf7i0M7HcoiedI/pub?output=csv",
  resultsCsvUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTEr3OYy-lPwKzA-VEfJkTJf-3s6HMEaC57gGQGnIhdT6RS9c8Xr0z2Dz8lW1tSBWuf7i0M7HcoiedI/pub?gid=1672636483&single=true&output=csv",

  // Points awarded for each finishing place, by index (1st, 2nd, 3rd...).
  // Any place beyond this list earns the last value.
  pointsByPlace: [5, 3, 2, 1, 0],

  eventNames: ["Event 1", "Event 2", "Event 3", "Event 4"]
};
