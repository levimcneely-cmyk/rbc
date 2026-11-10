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
  if (name === 'cup') loadData();
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
   Data — one feed from the Google Sheet (via Apps Script).
   Paints instantly from the last saved copy, then refreshes.
   ============================================================ */
const DATA_CACHE_KEY = 'rbcRetreatData2027v1';
let loading = null;

function loadData(){
  if (loading) return loading;

  let cached = null;
  try { cached = JSON.parse(localStorage.getItem(DATA_CACHE_KEY)); } catch (err) { cached = null; }
  if (cached && cached.ok) renderAll(cached, { fromCache: true });

  if (!apiConfigured()){
    renderAll(null, { notConfigured: true });
    return Promise.resolve();
  }

  loading = fetch(API_URL, { cache: 'no-store' })
    .then(res => res.json())
    .then(data => {
      if (!data || !data.ok) throw new Error((data && data.error) || 'Bad response');
      renderAll(data, { fromCache: false });
      try { localStorage.setItem(DATA_CACHE_KEY, JSON.stringify(data)); } catch (err) { /* fine */ }
    })
    .catch(() => {
      if (!cached) renderAll(null, { failed: true });
      else document.getElementById('cupStatus').textContent = "Couldn't refresh just now — showing the last saved standings.";
    })
    .finally(() => { loading = null; });
  return loading;
}

function renderAll(data, opts){
  if (!data){
    const msg = opts.notConfigured
      ? 'Schedule coming soon.'
      : "Couldn't load right now — try again in a minute.";
    agendaListEl.innerHTML = `<p class="empty-note">${msg}</p>`;
    document.getElementById('cupStatus').textContent = opts.notConfigured ? 'Standings coming soon.' : msg;
    return;
  }
  renderHeader(data.settings || {});
  renderAgenda(data.agenda || []);
  renderCup(data, opts);
  renderCupFormLink(data.settings || {});
}

/* ============================================================
   Home: header + agenda
   ============================================================ */
function renderHeader(s){
  const year = s.year || '';
  document.getElementById('retreatTitle').textContent = `RBC Staff Retreat ${year}`.trim();
  document.getElementById('retreatDates').textContent = s.dates || '';
  document.getElementById('retreatLocation').textContent = s.location || '';
  document.getElementById('retreatMetaDot').hidden = !(s.dates && s.location);
  document.title = `RBC Staff Retreat ${year}`.trim();
}

const dayTabsEl = document.getElementById('dayTabs');
const agendaListEl = document.getElementById('agendaList');
let agendaData = {};
let agendaDayOrder = [];
let activeAgendaDay = null;

function renderAgendaDay(day){
  activeAgendaDay = day;
  agendaListEl.innerHTML = (agendaData[day] || []).map(item => `
    <div class="timeline__item">
      <div class="timeline__time">${esc(item.time)}</div>
      <div class="timeline__title">${esc(item.title)}</div>
    </div>
  `).join('');
}

function renderAgenda(rows){
  const data = {}, order = [];
  rows.forEach(r => {
    if (!r.day) return;
    if (!data[r.day]){ data[r.day] = []; order.push(r.day); }
    data[r.day].push({
      time: r.start && r.end ? `${r.start} – ${r.end}` : (r.start || ''),
      title: r.activity || ''
    });
  });
  agendaData = data;
  agendaDayOrder = order;

  if (!order.length){
    dayTabsEl.innerHTML = '';
    agendaListEl.innerHTML = '<p class="empty-note">Schedule coming soon.</p>';
    return;
  }
  const day = order.includes(activeAgendaDay) ? activeAgendaDay : order[0];
  dayTabsEl.innerHTML = order.map(d =>
    `<button data-day="${esc(d)}" class="${d === day ? 'active' : ''}">${esc(d)}</button>`
  ).join('');
  dayTabsEl.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      dayTabsEl.querySelectorAll('button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderAgendaDay(btn.dataset.day);
    });
  });
  renderAgendaDay(day);
}

/* ============================================================
   Redeemer Cup
   ============================================================ */
function renderCupFormLink(s){
  const el = document.getElementById('cupFormLink');
  if (!s.formUrl || !s.formLabel){ el.innerHTML = ''; return; }
  const opens = s.formOpensAt ? new Date(s.formOpensAt) : null;
  const unlocked = !opens || Number.isNaN(opens.getTime()) || Date.now() >= opens.getTime();
  if (unlocked){
    el.innerHTML = `<a class="form-link form-link--open" href="${esc(s.formUrl)}" target="_blank" rel="noopener">${esc(s.formLabel)}</a>`;
  } else {
    const opensText = opens.toLocaleString('en-US', {
      weekday: 'long', hour: 'numeric', minute: '2-digit', timeZone: 'America/New_York'
    });
    el.innerHTML = `<span class="form-link form-link--locked">${esc(s.formLabel)} — opens ${esc(opensText)}</span>`;
  }
}

function bindAccordions(container){
  container.querySelectorAll('.event-card__head').forEach(btn => {
    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      document.getElementById('event-body-' + btn.dataset.i).classList.toggle('open');
    });
  });
}

function renderCup(data, { fromCache } = {}){
  const statusEl = document.getElementById('cupStatus');
  const boardEl = document.getElementById('overallBoard');
  const eventsEl = document.getElementById('eventsList');
  const rosterEl = document.getElementById('rosterList');
  const historyEl = document.getElementById('historyList');
  const tiebreakEl = document.getElementById('tiebreakNote');

  const table = pointsTable(data.settings);
  const teams = data.teams || [];
  const results = data.results || [];
  const anyScored = results.some(r => r.placement !== '');
  const ranked = anyScored ? computeStandings(teams, results, table) : [];

  statusEl.textContent = anyScored
    ? (fromCache ? 'Showing the last saved standings…' : 'Standings update live as events are scored.')
    : 'No results yet — check back once events are scored.';

  boardEl.innerHTML = ranked.map((r, i) => `
    <div class="cup-row cup-row--${i + 1}">
      <div class="cup-rank">${i + 1}</div>
      <span class="cup-team">${esc(r.team)}</span>
      <div class="cup-points">${r.pts} pts</div>
    </div>
  `).join('');

  const note = tiebreakText(ranked);
  tiebreakEl.textContent = note;
  tiebreakEl.hidden = !note;

  const events = eventsFrom(results);
  eventsEl.innerHTML = events.length
    ? events.map((ev, i) => {
        const scored = ev.rows.filter(r => r.placement !== '').sort((a, b) => Number(a.placement) - Number(b.placement));
        const rows = scored.map(r => `
          <div class="event-row">
            <span class="event-row__team">${esc(r.team)}</span>
            <span class="event-row__place">${ordinal(r.placement)}</span>
            <span class="event-row__pts">${pointsForPlace(r.placement, table)} pts</span>
          </div>`).join('');
        return `
          <div class="event-card">
            <button class="event-card__head" aria-expanded="false" data-i="${i}">
              <span class="event-card__title">${esc(ev.name)}</span>
              <span class="event-card__icon">+</span>
            </button>
            <div class="event-card__body" id="event-body-${i}">
              ${rows || '<p class="empty-note">No results posted yet.</p>'}
            </div>
          </div>`;
      }).join('')
    : '<p class="empty-note">No events posted yet.</p>';
  bindAccordions(eventsEl);

  if (!teams.length){
    rosterEl.innerHTML = '<p class="empty-note">No teams posted yet.</p>';
  } else {
    const hiddenNote = data.teamsHidden ? 'Teams revealed at the retreat!' : 'Roster coming soon';
    rosterEl.innerHTML = teams.map((t, i) => `
      <div class="event-card">
        <button class="event-card__head" aria-expanded="false" data-i="roster-${i}">
          <span class="event-card__title">${esc(t.team)}</span>
          <span class="event-card__icon">+</span>
        </button>
        <div class="event-card__body roster-grid" id="event-body-roster-${i}">
          ${t.members.map(m => `<span>${esc(m)}</span>`).join('') || `<span>${hiddenNote}</span>`}
        </div>
      </div>`).join('');
    bindAccordions(rosterEl);
  }

  const history = (data.history || []).slice().sort((a, b) => Number(b.year) - Number(a.year));
  historyEl.innerHTML = history.length
    ? history.map(r => {
        const imgUrl = driveImageUrl(r.url);
        const img = imgUrl
          ? `<img class="history-card__img" src="${imgUrl}" alt="${esc(r.year)} Redeemer Cup winners" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('p'),{className:'empty-note',textContent:'Photo couldn\\'t be loaded.'}))">`
          : '<p class="empty-note">No photo linked for this year.</p>';
        return `
          <div class="history-card">
            <div class="history-card__year">${esc(r.year)}</div>
            ${img}
            ${r.winners ? `<div class="history-card__caption">${esc(r.winners)}</div>` : ''}
          </div>`;
      }).join('')
    : '<p class="empty-note">No past winners posted yet.</p>';
}

/* ============================================================
   Speakers, packing list, worship
   ============================================================ */
document.getElementById('speakersList').innerHTML = SPEAKERS.map(s => `
  <p class="speakers__line"><span class="speakers__role">${s.role}</span> ${s.name}</p>
`).join('');

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
   Init
   ============================================================ */
loadData();
routeFromHash();
