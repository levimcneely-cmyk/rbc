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
    lyrics: "Bless the Lord O my soul \nO my soul\nWorship his holy name\nSing like never before\nO my soul\nI'll worship your holy name\n\nThe sun comes up\nIt's a new day dawning\nIt's time to sing your song again\nWhatever may pass and whatever lies before me\nLet me be singing when the evening comes\n\nBless the Lord O my soul \nO my soul\nWorship his holy name\nSing like never before\nO my soul\nI'll worship your holy name\n"
  },
  {
    title: "A Thousand Hallelujahs",
    lyrics: "Who else would rocks cry out to worship? \nWhose glory taught the stars to shine?\nPerhaps creation longs to have the words to sing\nBut this joy is mine\n\nWith a thousand hallelujahs\nWe magnify Your name\nYou alone deserve the glory\nThe honor and the praise\nLord Jesus\nThis song is forever Yours\nA thousand hallelujahs\nAnd a thousand more\n\nWho else would die for our redemption?\nWhose resurrection means I'll rise?\nThere isn't time enough to sing of all You've done\nBut I have eternity to try\n\nWith a thousand hallelujahs\nWe magnify Your name\nYou alone deserve the glory\nThe honor and the praise\nLord Jesus\nThis song is forever Yours\nA thousand hallelujahs\nAnd a thousand more\n\nPraise to the Lord\nTo the lamb\nTo the King of Heaven\nPraise for He rose\nNow He reigns\nWe will sing forever\n\nPraise to the Lord\nTo the lamb\nTo the King of Heaven\nPraise for He rose\nNow He reigns\nWe will sing forever\n\nWith a thousand hallelujahs\nWe magnify Your name\nYou alone deserve the glory\nThe honor and the praise\nLord Jesus\nThis song is forever Yours\nA thousand hallelujahs\nAnd a thousand more\n"
  },
  {
    title: "O Praise the Name (Anástasis)",
    lyrics: "I cast my mind to Calvary\nWhere Jesus bled and died for me\nI see His wounds, His hands, His feet\nMy Saviour on that cursed tree\n\nHis body bound and drenched in tears\nThey laid Him down in Joseph's tomb\nThe entrance sealed by heavy stone\nMessiah still and all alone\n\nO praise the Name of the Lord our God\nO praise His Name forevermore\nFor endless days we will sing Your praise\nOh Lord oh Lord our God\n\nThen on the third at break of dawn\nThe Son of heaven rose again\nO trampled death where is your sting\nThe angels roar for Christ the King\nO trampled death where is your sting\nThe angels roar for Christ the King\n\nO praise the Name of the Lord our God\nO praise His Name forevermore\nFor endless days we will sing Your praise\nOh Lord oh Lord our God\n\nHe shall return in robes of white\nThe blazing sun shall pierce the night\nAnd I will rise among the saints\nMy gaze transfixed on Jesus' face\n\nO praise the Name of the Lord our God\nO praise His Name forevermore\nFor endless days we will sing Your praise\nOh Lord oh Lord our God\n\nO praise the Name of the Lord our God\nO praise His Name forevermore\nFor endless days we will sing Your praise\nOh Lord oh Lord our God\nOh Lord oh Lord our God\n"
  },
  {
    title: "'Tis So Sweet to Trust in Jesus",
    lyrics: "'Tis so sweet to trust in Jesus,\n\Just to take Him at His Word;\nJust to rest upon His promise,\nJust to know, Thus saith the Lord!\n\nJesus, Jesus, how I trust Him!\nHow I've proved Him o'er and o'er;\nJesus, Jesus, precious Jesus!\nOh, for grace to trust Him more!\n"
  },
  {
    title: "His Glory and My Good",
    lyrics: "I have seen my Father's glory\nRevealed in Jesus Christ\nAnd the more that I behold Him\nThe more He satisfies\nWhen I gaze upon His beauty\nWhen I see Him as I should\nThen my eyes are lifted upward\nFor His glory and my good\n\nThere is hope in every trial\nFor I can trust the Lord\nHe will turn my heart towards Him\nAnd help me bear the thorn\nSo in faith I follow Jesus\nOn the road not understood\nFor I know that He is working\nFor His glory and my good\n\nTo our God be the glory\nTo our God be praise\nHe alone, the name above all names\nI will boast ever only in the Lord my God\nFor I know His glory is my good\n\nSee the open arms of Jesus\nUpon the cross that day\nWhat they understood as weakness\nDeserves my every praise\nFor the charge that was against me\nIt was nailed into the wood\nYes I know that He has saved me\nFor His glory and my good\n\nTo our God be the glory\nTo our God be praise\nHe alone, the name above all names\nI will boast ever only in the Lord my God\nFor I know His glory is my good\n\nWould I gladly be made nothing\nThat Christ would be made more\nWould I seek the only kingdom\nThat far outweighs them all\nI will stand before my Father\nWhere the faithful saints have stood\nAnd with joy my heart shall praise Him\nFor His glory and my good\nAnd with joy my heart shall praise Him\nFor His glory and my good\n\nTo our God be the glory\nTo our God be praise\nHe alone, the name above all names\nI will boast ever only in the Lord my God\nFor I know His glory is my good\n"
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
