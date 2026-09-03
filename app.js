/* ============================================================
   Navigation
   ============================================================ */
const menuBtn = document.getElementById('menuBtn');
const navSheet = document.getElementById('navSheet');
const scrim = document.getElementById('scrim');
const views = {
  home: document.getElementById('view-home'),
  worship: document.getElementById('view-worship'),
  cup: document.getElementById('view-cup')
};
const navLinks = navSheet.querySelectorAll('a[data-view]');

function openMenu(){
  navSheet.classList.add('open');
  scrim.classList.add('open');
  menuBtn.setAttribute('aria-expanded', 'true');
  navSheet.setAttribute('aria-hidden', 'false');
}
function closeMenu(){
  navSheet.classList.remove('open');
  scrim.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', 'false');
  navSheet.setAttribute('aria-hidden', 'true');
}
menuBtn.addEventListener('click', () => {
  navSheet.classList.contains('open') ? closeMenu() : openMenu();
});
scrim.addEventListener('click', closeMenu);

function showView(name){
  Object.keys(views).forEach(key => {
    views[key].hidden = key !== name;
  });
  navLinks.forEach(a => a.classList.toggle('active', a.dataset.view === name));
  closeMenu();
  if (name === 'cup') loadCup();
}

navLinks.forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    showView(a.dataset.view);
    history.replaceState(null, '', '#' + a.dataset.view);
  });
});

function routeFromHash(){
  const hash = (location.hash || '#home').replace('#', '');
  showView(views[hash] ? hash : 'home');
}
window.addEventListener('hashchange', routeFromHash);

/* ============================================================
   Home: dates, agenda, packing list
   ============================================================ */
document.getElementById('retreatDates').textContent = RETREAT.dates;
document.getElementById('retreatLocation').textContent = RETREAT.location;

const dayTabsEl = document.getElementById('dayTabs');
const agendaListEl = document.getElementById('agendaList');
const dayNames = Object.keys(AGENDA);

function renderAgenda(day){
  agendaListEl.innerHTML = AGENDA[day].map(item => `
    <div class="timeline__item">
      <div class="timeline__time">${item.time}</div>
      <div class="timeline__title">${item.title}</div>
      ${item.note ? `<div class="timeline__note">${item.note}</div>` : ''}
    </div>
  `).join('');
}

dayTabsEl.innerHTML = dayNames.map((day, i) =>
  `<button data-day="${day}" class="${i === 0 ? 'active' : ''}">${day}</button>`
).join('');

dayTabsEl.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', () => {
    dayTabsEl.querySelectorAll('button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderAgenda(btn.dataset.day);
  });
});
renderAgenda(dayNames[0]);

const packingToggle = document.getElementById('packingToggle');
const packingBody = document.getElementById('packingBody');
packingBody.innerHTML = `
  <h4>Attire — casual / comfy</h4>
  <ul>${PACKING.attire.map(i => `<li>${i}</li>`).join('')}</ul>
  <h4>Extras</h4>
  <ul>${PACKING.extras.map(i => `<li>${i}</li>`).join('')}</ul>
  ${PACKING.weather ? `<div class="weather-note">${PACKING.weather}</div>` : ''}
`;
packingToggle.addEventListener('click', () => {
  const open = packingToggle.getAttribute('aria-expanded') === 'true';
  packingToggle.setAttribute('aria-expanded', String(!open));
  packingBody.hidden = open;
});

/* ============================================================
   Worship
   ============================================================ */
const worshipListEl = document.getElementById('worshipList');
worshipListEl.innerHTML = WORSHIP_SONGS.length
  ? WORSHIP_SONGS.map((song, i) => `
    <div class="song">
      <button class="song__head" aria-expanded="false" data-i="${i}">
        <span class="song__title">${song.title}</span>
        <span class="song__icon">+</span>
      </button>
      <div class="song__lyrics" id="lyrics-${i}" hidden>${song.lyrics}</div>
    </div>
  `).join('')
  : '<p class="empty-note">Setlist coming soon.</p>';

worshipListEl.querySelectorAll('.song__head').forEach(btn => {
  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!open));
    document.getElementById('lyrics-' + btn.dataset.i).hidden = open;
  });
});

/* ============================================================
   Redeemer Cup — pulls from Google Sheets (published as CSV)
   ============================================================ */

function parseCsv(text){
  const rows = [];
  let row = [], field = '', inQuotes = false;
  for (let i = 0; i < text.length; i++){
    const c = text[i], next = text[i + 1];
    if (inQuotes){
      if (c === '"' && next === '"'){ field += '"'; i++; }
      else if (c === '"'){ inQuotes = false; }
      else { field += c; }
    } else {
      if (c === '"'){ inQuotes = true; }
      else if (c === ','){ row.push(field); field = ''; }
      else if (c === '\n'){ row.push(field); rows.push(row); row = []; field = ''; }
      else if (c === '\r'){ /* skip */ }
      else { field += c; }
    }
  }
  if (field.length || row.length){ row.push(field); rows.push(row); }
  const header = (rows.shift() || []).map(h => h.trim().toLowerCase());
  return rows
    .filter(r => r.some(v => v.trim() !== ''))
    .map(r => Object.fromEntries(header.map((h, idx) => [h, (r[idx] || '').trim()])));
}

async function fetchCsv(url){
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('Sheet fetch failed: ' + res.status);
  return parseCsv(await res.text());
}

function pointsForPlace(place){
  const idx = Number(place) - 1;
  const table = CONFIG.pointsByPlace;
  if (idx < 0 || Number.isNaN(idx)) return 0;
  return idx < table.length ? table[idx] : table[table.length - 1];
}

// Converts a Google Drive "share" link into a URL that actually renders
// as an image in an <img> tag (the sharing link itself is an HTML page).
function driveImageUrl(shareUrl){
  const match = (shareUrl || '').match(/\/d\/([a-zA-Z0-9_-]+)/) ||
                (shareUrl || '').match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (!match) return null;
  return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
}

const CUP_CACHE_KEY = 'redeemerCupCacheV1';

function renderCup(teamsRows, resultsRows, historyRows, { fromCache } = {}){
  const statusEl = document.getElementById('cupStatus');
  const boardEl = document.getElementById('overallBoard');
  const eventsEl = document.getElementById('eventsList');
  const rosterEl = document.getElementById('rosterList');
  const historyEl = document.getElementById('historyList');

  // Roster: team -> [members]
  const roster = {};
  teamsRows.forEach(r => {
    const team = r.team || r['team name'];
    if (!team) return;
    roster[team] = roster[team] || [];
    if (r.member) roster[team].push(r.member);
  });

  // Results: event -> team -> placement
  const byEvent = {};
  const totals = {};
  resultsRows.forEach(r => {
    const event = r.event, team = r.team, place = r.placement || r.place;
    if (!event || !team) return;
    byEvent[event] = byEvent[event] || {};
    byEvent[event][team] = place;
    const pts = pointsForPlace(place);
    totals[team] = (totals[team] || 0) + pts;
    if (!(team in roster)) roster[team] = [];
  });

  const ranked = Object.entries(totals).sort((a, b) => b[1] - a[1]);

  statusEl.textContent = ranked.length
    ? (fromCache ? 'Showing the last saved standings…' : 'Standings update automatically from the team sheet.')
    : 'No results yet — check back once events are scored.';

  boardEl.innerHTML = ranked.map(([team, pts], i) => `
    <div class="cup-row cup-row--${i + 1}">
      <div class="cup-rank">${i + 1}</div>
      <button class="cup-team" data-team="${team}" style="background:none;border:none;text-align:left;padding:0;font:inherit;color:inherit;cursor:pointer;">${team}</button>
      <div class="cup-points">${pts} pts</div>
    </div>
    <div class="cup-roster" id="roster-${i}">${(roster[team] || []).join(', ') || 'Roster coming soon'}</div>
  `).join('');

  boardEl.querySelectorAll('.cup-team').forEach((btn, i) => {
    btn.addEventListener('click', () => {
      document.getElementById('roster-' + i).classList.toggle('open');
    });
  });

  // Event names come straight from whatever's typed in the sheet's
  // "Event" column — in the order they first appear, so "Event 1" shows
  // before "Event 2" as long as that's the order rows were entered.
  const eventNames = [];
  resultsRows.forEach(r => {
    if (r.event && !eventNames.includes(r.event)) eventNames.push(r.event);
  });

  eventsEl.innerHTML = eventNames.length
    ? eventNames.map((name, i) => {
        const placements = byEvent[name] || {};
        const rows = Object.entries(placements)
          .sort((a, b) => Number(a[1]) - Number(b[1]))
          .map(([team, place]) => `<div class="event-row"><span>${team}</span><span>${place}</span></div>`)
          .join('');
        return `
          <div class="event-card">
            <button class="event-card__head" aria-expanded="false" data-i="${i}">
              <span class="event-card__title">${name}</span>
              <span class="event-card__icon">+</span>
            </button>
            <div class="event-card__body" id="event-body-${i}">
              ${rows || '<p class="empty-note">No results posted yet.</p>'}
            </div>
          </div>
        `;
      }).join('')
    : '<p class="empty-note">No events posted yet.</p>';

  eventsEl.querySelectorAll('.event-card__head').forEach(btn => {
    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      document.getElementById('event-body-' + btn.dataset.i).classList.toggle('open');
    });
  });

  const teamNames = Object.keys(roster).sort();
  if (!teamNames.length){
    rosterEl.innerHTML = '<p class="empty-note">No teams posted yet.</p>';
  } else {
    rosterEl.innerHTML = teamNames.map((team, i) => `
      <div class="event-card">
        <button class="event-card__head" aria-expanded="false" data-i="roster-${i}">
          <span class="event-card__title">${team}</span>
          <span class="event-card__icon">+</span>
        </button>
        <div class="event-card__body roster-grid" id="event-body-roster-${i}">
          ${(roster[team] || []).map(m => `<span>${m}</span>`).join('') || '<span>Roster coming soon</span>'}
        </div>
      </div>
    `).join('');

    rosterEl.querySelectorAll('.event-card__head').forEach(btn => {
      btn.addEventListener('click', () => {
        const open = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!open));
        document.getElementById('event-body-' + btn.dataset.i).classList.toggle('open');
      });
    });
  }

  const historyItems = historyRows
    .filter(r => r.year)
    .sort((a, b) => Number(b.year) - Number(a.year));

  if (!historyItems.length){
    historyEl.innerHTML = '<p class="empty-note">No past winners posted yet.</p>';
  } else {
    historyEl.innerHTML = historyItems.map(r => {
      const imgUrl = driveImageUrl(r.url);
      const img = imgUrl
        ? `<img class="history-card__img" src="${imgUrl}" alt="${r.year} Redeemer Cup winners" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('p'),{className:'empty-note',textContent:'Photo couldn\\'t be loaded.'}))">`
        : `<p class="empty-note">No photo linked for this year.</p>`;
      return `
        <div class="history-card">
          <div class="history-card__year">${r.year}</div>
          ${img}
          ${r.winners ? `<div class="history-card__caption">${r.winners}</div>` : ''}
        </div>
      `;
    }).join('');
  }
}

async function loadCup(){
  const statusEl = document.getElementById('cupStatus');
  const boardEl = document.getElementById('overallBoard');
  const eventsEl = document.getElementById('eventsList');
  const rosterEl = document.getElementById('rosterList');
  const historyEl = document.getElementById('historyList');

  const notConfigured =
    !CONFIG.teamsCsvUrl.startsWith('http') || !CONFIG.resultsCsvUrl.startsWith('http');

  if (notConfigured){
    statusEl.textContent = '';
    boardEl.innerHTML = '';
    eventsEl.innerHTML = `<p class="empty-note">Connect your Google Sheet to see standings here —
      add the two published CSV links in js/data.js (see README.md).</p>`;
    rosterEl.innerHTML = '';
    historyEl.innerHTML = '';
    return;
  }

  // Paint instantly from last-known data (if any) while we fetch fresh data
  // in the background — makes repeat visits feel immediate even though
  // Google's published-CSV endpoint itself can be slow.
  let cached = null;
  try { cached = JSON.parse(localStorage.getItem(CUP_CACHE_KEY)); } catch (err) { cached = null; }

  if (cached){
    renderCup(cached.teamsRows, cached.resultsRows, cached.historyRows, { fromCache: true });
  } else {
    statusEl.textContent = 'Loading standings…';
    boardEl.innerHTML = '<p class="empty-note">Loading…</p>';
    eventsEl.innerHTML = '<p class="empty-note">Loading…</p>';
    rosterEl.innerHTML = '<p class="empty-note">Loading…</p>';
    historyEl.innerHTML = '<p class="empty-note">Loading…</p>';
  }

  try {
    const [teamsRows, resultsRows, historyRows] = await Promise.all([
      fetchCsv(CONFIG.teamsCsvUrl),
      fetchCsv(CONFIG.resultsCsvUrl),
      CONFIG.historyCsvUrl && CONFIG.historyCsvUrl.startsWith('http')
        ? fetchCsv(CONFIG.historyCsvUrl).catch(() => [])
        : Promise.resolve([])
    ]);

    renderCup(teamsRows, resultsRows, historyRows, { fromCache: false });

    try {
      localStorage.setItem(CUP_CACHE_KEY, JSON.stringify({ teamsRows, resultsRows, historyRows }));
    } catch (err) { /* storage full or unavailable — fine, just skip caching */ }

  } catch (err){
    if (!cached){
      statusEl.textContent = "Couldn't load the sheet right now — double-check the published CSV links in js/data.js.";
      boardEl.innerHTML = '';
      eventsEl.innerHTML = '';
      rosterEl.innerHTML = '';
      historyEl.innerHTML = '';
    } else {
      statusEl.textContent = "Couldn't refresh just now — showing the last saved standings.";
    }
  }
}

/* ============================================================
   Init
   ============================================================ */
routeFromHash();
