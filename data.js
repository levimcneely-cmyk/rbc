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
    lyrics: "Praise the Father, praise the Son\nPraise the Spirit, three in one\nGod of glory, Majesty\nPraise forever to the King of Kings\n\nIn the darkness we were waiting\nWithout hope, without light\n'Til from Heaven You came running\nThere was mercy in Your eyes\nTo fulfill the law and prophets\nTo a virgin came the word\nFrom a throne of endless glory\nTo a cradle in the dirt\n\nPraise the Father, praise the Son\nPraise the Spirit, three in one\nGod of glory, Majesty\nPraise forever to the King of Kings\n\nTo reveal the kingdom coming\nAnd to reconcile the lost\nTo redeem the whole creation\nYou did not despise the cross\nFor even in your suffering\nYou saw to the other side\nKnowing this was our salvation\nJesus for our sake you died\n\nAnd the morning that You rose\nAll of Heaven held its breath\n'Til that stone was moved for good\nFor the Lamb had conquered death\nAnd the dead rose from their tombs\nAnd the angels stood in awe\nFor the souls of all who'd come\nTo the Father are restored\n\nAnd the church of Christ was born\nThen the Spirit lit the flame\nNow this gospel truth of old\nShall not kneel, shall not faint\nBy His blood and in His name\nIn His freedom I am free\nFor the love of Jesus Christ\nWho has resurrected me\n\nPraise the Father, praise the Son\nPraise the Spirit, three in one\nGod of glory, Majesty\nPraise forever to the King of Kings\n\nPraise forever to the King of Kings\n"
  },
  {
    title: "All Sufficient Merit",
    lyrics: "All sufficient merit shining like the sun\nA fortune I inherit by no work I have done\nMy righteousness I forfeit at my Savior's cross\nWhere all sufficient merit did what I could not\n\nIn love He condescended eternal now in time\nA life without a blemish The Maker made to die\nThe law could never save us our lawlessness had won\nUntil the pure and spotless Lamb had finally come\n\nIt is done it is finished\nNo more debt I owe\nPaid in full\nAll sufficient merit now my own\n\nI lay down my garments any empty boasts\nGood works all corrupted by the sinful host\nDressed in my Lord Jesus a crimson robe made white\nNo more fear of judgement His righteousness is mine\n\nIt is done it is finished\nNo more debt I owe\nPaid in full\nAll sufficient merit now my own\n\nIt is done it is finished\nNo more debt I owe\nPaid in full\nAll sufficient merit now my own\nIt's now my own\n\nAll sufficient merit firm in life and death\nThe joy of my salvation shall be my final breath\nWhen I stand accepted before the throne of God\nI'll gaze upon my Jesus and thank Him for the cross\nYes I'll thank You for the cross\n\nIt is done it is finished\nNo more debt I owe\nPaid in full\nAll sufficient merit now my own\n\nIt is done it is finished\nNo more debt I owe\nPaid in full\nAll sufficient merit now my own\nMerit now my own\nMerit now my own\n"
  },
  {
    title: "The Blood",
    lyrics: "Everything changed\nIt's getting harder to recognize\nThe person I was\nBefore I encountered Christ\nI don't walk like I used to\nI don't talk like I used to\nI've been washed from the inside\nI've been washed from the inside out\nHallelujah, hallelujah\nI know it was the blood\nCould've only been the blood\nHallelujah, hallelujah\nI know it was the blood\nCould've only been the blood\nI cannot explain\nBut nothing's more real than this\nIn the presence of God\nOh, what my heart experienced\nWhen my shame hit the wayside\nAnd my sin met the Most High\nI was washed from the inside\nI was washed from the inside out\nHallelujah, hallelujah\nI know it was the blood\nCould've only been the blood\nHallelujah, hallelujah\nI know it was the blood\nCould've only been the blood\nCould've only been Your blood\nOh, so let it wash over\nLet it wash over me, yeah, yeah\nIt's never been about performance\nPerfection or striving for acceptance\nLet me tell you\nIt's only by the blood\nIt's never been about deserving or earning\nIt's a gift that's freely given\nLet me tell you\nIt's only by the blood\nDoes anybody wanna be holy, righteous\nPurified and spotless?\nLet me tell you\nIt's only by the blood\nDoes anybody want to be forgiven\nJustified, really living?\nLet me tell you\nIt's only by the blood\nHallelujah, hallelujah\nI know it was the blood\nCould've only been the blood\nHallelujah, hallelujah\nI know it was the blood\nCould've only been the blood\What can I say?\nThank You is not enough\nJesus, Your grace\nYour mercy poured out for us\nI will love You forever\nHere on Earth into Heaven\nI've been washed from the inside\nI've been washed from the inside out\nI've been washed from the inside out\nHow precious, how generous\nYour blood poured out for us\nHow precious, how generous\nWe remember\nYou paid it in full\nYou paid it in blood\nYou paid it for us, Jesus\n"
  },
  {
    title: "He Who Is to Come",
    lyrics: "There is a day coming\nWhen the old will pass away\nEvery wrong will be made right\nNo darkness, no night\nThe son will light the way\n\nThere is a king coming\nThe one who conquer death and grave\nNo more pain and no more sorrow\nThis hope for tomorrow\nIs our hope for the day\nHe who was, he who is\nHe who was, he who is\nHe who is to come\nChrist the son of man\nRiding on the cloud with a crown upon his head\nEvery eye will see him\nWith the nail scars in his hands\nHallelujah, Hallelujah\n\nThere's only One worthy\nOf all glory and all praise\nAll wealth and honor\nSpeak wisdom and power\nTo the Lamb that was slain,\n\nHe who is to come\nChrist the Son of man\nRiding on the clouds with a crown upon his head\nEvery eye will see Him\nWith the nail scars in His hands\nHallelujah, hallelujah\nHallelujah, hallelujah\nHallelujah, hallelujah, hallelujah\n\nHe's surely coming\nOh, can you feel it too?\nAll this tension growing stronger\nIt's just a sign He's getting close\nHe's already on the move\nHallelujah\nYeah, the story has been written\nWe all know how it ends\nMy future has an anchor\nMy eyes are on the savior\nOh, He's coming back again\nHe's coming back again\n\nHe who is to come\nChrist the Son of man\nRiding on the clouds with a crown upon His head\nOh, every eye will see Him\nWith the nail scars in His hands\nHallelujah
Hallelujah\n\nHe who is to come\nChrist the Son of man\nRiding on the clouds with a crown upon His head\nOh, every eye will see him\nWith the nail scars in His hands\nHallelujah, hallelujah\nHallelujah, hallelujah\nHallelujah, hallelujah\nOh, we wait, oh, we pray\nWe're waiting on You\nWith our eyes on the horizon\nWe are hungry, we are thirsty\nWould You come?\n\nWe pray, we pray\nCome, Lord Jesus, come\n"
  },
  {
    title: "Christ Be Magnified",
    lyrics: "Were creation suddenly articulate\nWith a thousand tongues to lift one cry\nThen from North to South and East to West\nWe'd hear Christ be magnified\n\nWere the whole Earth echoing His eminence\nHis name would burst from sea and sky\nFrom rivers to the mountain tops\nWe'd hear Christ be magnified\n\nOh! Christ be magnified\nLet His praise arise\nChrist be magnified in me\nOh! Christ be magnified\nFrom the altar of my life\nChrist be magnified in me\n\nWhen every creature finds its inmost melody\nAnd every human heart its native cry\nOh then in one enraptured hymn of praise\nWe'll sing Christ be magnified\nOh, be lifted high, Jesus\n\nOh! Christ be magnified\nLet His praise arise\nChrist be magnified in me\nOh! Christ be magnified\nFrom the altar of my life\nChrist be magnified in me\n\nI won't bow to idols, I'll stand strong and worship You\nAnd if it puts me in the fire, I'll rejoice 'cause You're there too\nI won't be formed by feelings, I hold fast to what is true\nIf the cross brings transformation then I'll be crucified with You\n'Cause death is just the doorway into resurrection life\nAnd if I join You in Your suffering, then I'll join You when You rise\nAnd when You return in glory with all the angels and the saints\nMy heart will still be singing, my song will be the same\n\nOh! Christ be magnified\nLet His praise arise\nChrist be magnified in me\nOh! Christ be magnified\nFrom the altar of my life\nChrist be magnified in me\n"
  },
  {
    title: "Abide",
    lyrics: "I depend on You\nI depend on You\nI depend on You\n\nFor my waking breath\nFor my daily bread\nI depend on You\nI depend on You\n\nFor the sun to rise\nFor my sleep at night\nLord, I depend on You, yes, I do\nI depend on You\n\nYou're the Way, the Truth, and the Life\nYou're the well that never runs dry\nI'm the branch and You are the vine\nDraw me close and teach me to abide\n\nWhere the Spirit leads\nAs I'm following\nI depend on You \nYes, I depend on You\n\nFor the victories\nStill in front of me\nOh, I depend on You\nYes, I depend on You\nYou're the Way, the Truth, and the Life\nYou're the well that never runs dry\nI'm the branch and You are the vine\nDraw me close and teach me to abide\nBe my strength, my song in the night\nBe my all, my treasure, my prize\nI am Yours, forever You're mine\nDraw me close and teach me to abide\n\n\When I pass through death\nAs I enter rest\nI depend on You\nJesus, I depend on You\nOh, I depend on You\nYes, I depend on You\nOh, I depend on You\nOh, I depend on You\n\nFor eternal life\nTo be raised with Christ\nOh, I depend on You\nYes, I depend on You\nYou're the Way, the Truth, and the Life\nYou're the well that never runs dry\nI'm the branch and You are the vine\nDraw me close and teach me to abide\n\nBe my strength, my song in the night\nBe my all, my treasure, my prize\nI am Yours, forever You're mine\nDraw me close and teach me to abide\nI depend on You\nI depend on You\nI depend on You\nI depend on You\n"
  },
  {
    title: "Bless God",
    lyrics: "Blessed are those who run to Him\nWho place their hope and confidence in Jesus\nHe won't forsake them\nBlessed are those who seek His face\nWho bend their knee and fix their gaze on Jesus\nThey won't be shaken\n\nCome on and praise the Lord with me\nSing if you love His name\nCome on and lift your voice with me\nHe's worthy of all our praise\nBlessed are those who walk with Him\nWhose hearts are set on pilgrimage with Jesus\nThey'll see His glory\nBlessed are those who die to live\nWhose joy it is to give it all for Jesus\nAnd for Him only\nOh Jesus, all for Your glory\n\nCome on and praise the Lord with me\nSing if you love His name\nCome on and lift your voice with me\nHe's worthy of all our praise\nCome on and bring your offering\nSing if you've known His grace\nCome on and lift up your holy hands\nHe's worthy of all our praise\nBless God in the sanctuary\nBless God in the fields of plenty\nBless God in the darkest valley\nEvery chance I get I'll bless Your name\nBless God when my hands are empty\nBless God with a praise that costs me\nBless God when nobody's watching\nEvery chance I get I'll bless Your name\nBless God when the weapon's forming\nBless God when the walls are falling\nBless God 'cause He goes before me\nEvery chance I get I'll bless Your name\nBless God for He holds the victory\nBless God for He's always with me\nBless God for He's always worthy\nEvery chance I get I'll bless Your name\nEvery chance I get I'll bless Your name\nEvery chance I get\nCome on and praise the Lord with me\nSing if you love His name\nCome on and lift your voice with me\nHe's worthy of all our praise\nCome on and bring your offering\nSing if you've known His grace\nCome on and lift up your holy hands\nHe's worthy of all our praise\nYes, He's worthy of all our praise\n"
  },
  {
    title: "In Christ Alone",
    lyrics: "In Christ alone, my hope is found\nHe is my light, my strength, my song\nThis Cornerstone, this solid ground\nFirm through the fiercest drought and storm\n\nWhat heights of love, what depths of peace\nWhen fears are stilled, when strivings cease\nMy Comforter, my All in All\nHere in the love of Christ I stand\n\nIn Christ alone, who took on flesh\nFullness of God in helpless babe\nThis gift of love and righteousness\nScorned by the ones He came to save\n\n'Til on that cross as Jesus died\nThe wrath of God was satisfied\nFor every sin on Him was laid\nHere in the death of Christ I live\n\nThere in the ground His body lay\nLight of the world by darkness slain\nThen bursting forth in glorious day\nUp from the grave, He rose again\n\nAnd as He stands in victory\nSin's curse has lost its grip on me\nFor I am His and He is mine\nBought with the precious blood of Christ\n\nNo guilt in life, no fear in death\nThis is the power of Christ in me\nFrom life's first cry to final breath\nJesus commands my destiny\n\nNo power of hell, no scheme of man\nCan ever pluck me from His hand\n'Til He returns or calls me home\n"
  },
  {
    title: "Holy Forever",
    lyrics: "A thousand generations falling down in worship\nTo sing the song of ages to the Lamb\nAnd all who've gone before us and all who will believe\nWill sing the song of ages to the Lamb\n\nYour name is the highest\nYour name is the greatest\nYour name stands above them all\nAll thrones and dominions\nAll powers and positions\nYour name stands above them all\n\nAnd the angels cry holy\nAll creation cries holy\nYou are lifted high, holy\nHoly forever\n\nIf you've been forgiven and if you've been redeemed\nSing the song forever to the Lamb\nIf you walk in freedom and if you bear His name\nSing the song forever to the Lamb\nWe'll sing the song forever and amen\n\nAnd the angels cry holy\nAll creation cries holy\nYou are lifted high, holy\nHoly forever\nHear Your people sing holy\nTo the King of kings, holy\nYou will always be holy\nHoly forever\n\nYour name is the highest\nYour name is the greatest\nYour name stands above them all\nAll thrones and dominions\nAll powers and positions\nYour name stands above them all\nJesus\n\nYour name is the highest\nYour name is the greatest\nYour name stands above them all\nAll thrones and dominions\nAll powers and positions\nYour name stands above them all\nAnd the angels cry holy\nAll creation cries holy\nYou are lifted high, holy\nHoly forever\nHear Your people sing holy\nTo the King of kings, holy\nYou will always be holy\nHoly forever\nYou will always be holy\nHoly forever\n"
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
