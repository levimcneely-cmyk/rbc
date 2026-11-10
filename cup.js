/* ============================================================
   Redeemer Cup scoring — shared by the public site and /admin
   so both always show identical standings.
   ============================================================ */
function esc(s){
  return String(s == null ? '' : s).replace(/[&<>"']/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

function apiConfigured(){
  return typeof API_URL === 'string' && API_URL.startsWith('https://');
}

function pointsTable(settings){
  const t = String((settings && settings.pointsByPlace) || '5,3,2,1,0')
    .split(',').map(s => Number(s.trim())).filter(n => !Number.isNaN(n));
  return t.length ? t : [5, 3, 2, 1, 0];
}

function pointsForPlace(place, table){
  const idx = Number(place) - 1;
  if (place === '' || place == null || Number.isNaN(idx) || idx < 0) return 0;
  return idx < table.length ? table[idx] : table[table.length - 1];
}

// Converts a Google Drive "share" link into a URL that renders in an <img>.
function driveImageUrl(shareUrl){
  const match = (shareUrl || '').match(/\/d\/([a-zA-Z0-9_-]+)/) ||
                (shareUrl || '').match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (!match) return null;
  return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
}

function ordinal(n){
  const num = Number(n);
  if (Number.isNaN(num)) return String(n);
  const rem100 = num % 100;
  if (rem100 >= 11 && rem100 <= 13) return num + 'th';
  switch (num % 10){
    case 1: return num + 'st';
    case 2: return num + 'nd';
    case 3: return num + 'rd';
    default: return num + 'th';
  }
}

function computeStandings(teams, results, table){
  const teamNames = teams.map(t => t.team);
  const totals = {}, places = {}, firsts = {};
  teamNames.forEach(t => { totals[t] = 0; places[t] = []; firsts[t] = 0; });

  results.forEach(r => {
    if (!(r.team in totals)){ totals[r.team] = 0; places[r.team] = []; firsts[r.team] = 0; }
    const n = Number(r.placement);
    if (r.placement === '' || Number.isNaN(n)) return;
    totals[r.team] += pointsForPlace(n, table);
    places[r.team].push(n);
    if (n === 1) firsts[r.team]++;
  });

  const avg = t => places[t].length ? places[t].reduce((a, b) => a + b, 0) / places[t].length : Infinity;
  const ranked = Object.keys(totals)
    .map(team => ({ team, pts: totals[team], avg: avg(team), firsts: firsts[team] }))
    .sort((a, b) => (b.pts - a.pts) || (a.avg - b.avg) || (b.firsts - a.firsts) || a.team.localeCompare(b.team));
  return ranked;
}

function eventsFrom(results){
  const order = [], byEvent = {};
  results.forEach(r => {
    if (!byEvent[r.event]){ byEvent[r.event] = []; order.push(r.event); }
    byEvent[r.event].push(r);
  });
  return order.map(name => ({ name, rows: byEvent[name] }));
}

function tiebreakText(ranked){
  if (ranked.length < 2 || ranked[0].pts === 0 || ranked[1].pts !== ranked[0].pts) return '';
  const a = ranked[0], b = ranked[1];
  const fmt = n => (n === Infinity ? '—' : n.toFixed(1));
  if (a.avg !== b.avg){
    return `${a.team} and ${b.team} tied at ${a.pts} pts — ${a.team} wins the tiebreaker with the better average placement (${fmt(a.avg)} vs ${fmt(b.avg)}).`;
  }
  if (a.firsts !== b.firsts){
    return `${a.team} and ${b.team} tied at ${a.pts} pts with the same average placement — ${a.team} wins the tiebreaker with more 1st-place finishes (${a.firsts} vs ${b.firsts}).`;
  }
  return `${a.team} and ${b.team} are dead even at ${a.pts} pts — same average placement and same number of wins.`;
}

