'use strict';

/* ─────────────────────────────────────────────────────────────────
   Chamber home page – OpenWeatherMap current + 3-day forecast
   Member spotlight (random gold | silver selection)
   ───────────────────────────────────────────────────────────────── */

// ── Live weather data helpers ─────────────────────────────────
const DEG_SYMBOL = '\u00B0';

function wmoDesc(code) {
  const n = Number(code);
  if ([0].includes(n))  return 'Clear sky';
  if ([1,2,3].includes(n)) return n === 1 ? 'Mainly clear' : n === 2 ? 'Partly cloudy' : 'Overcast';
  if ([45,48].includes(n))  return 'Foggy';
  if ([51,53,55].includes(n)) return 'Light drizzle';
  if ([61,63,65].includes(n)) return n === 61 ? 'Slight rain' : n === 63 ? 'Moderate rain' : 'Heavy rain';
  if ([71,73,75].includes(n)) return n === 71 ? 'Slight snow' : n === 73 ? 'Moderate snow' : 'Heavy snow';
  if ([80,81,82].includes(n)) return 'Rain showers';
  if ([95,96,99].includes(n)) return 'Thunderstorm';
  return 'Unknown';
}

function dayName(ts) {
  return new Date(ts * 1000).toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric'
  });
}

/* ── OpenWeatherMap ─────────────────────────────────────────────
   API key stored in localStorage so each student can set their own
   without hard-coding it in a shared repo.
   Set it once in DevTools console:
     localStorage.setItem('OWM_KEY', 'your-key-here')
   Or replace OWM_KEY below directly.
   ───────────────────────────────────────────────────────────────── */
const OWM_KEY = (() => {
  try { return localStorage.getItem('OWM_KEY') || ''; }
  catch { return ''; }
})();

const OWM_BASE  = 'https://api.openweathermap.org/data/2.5';
const OWM_CITY  = 'Timbuktu,Mali';   // matching the chamber footer address

function owmUrl(path) {
  return `${OWM_BASE}${path}&appid=${OWM_KEY}&units=imperial`;
}

// ── Weather section ────────────────────────────────────────────
async function initWeather() {
  const loading  = document.getElementById('weather-loading');
  const content  = document.getElementById('weather-content');
  const msg      = document.getElementById('weather-msg');

  // Show loading state
  if (loading) loading.style.display = 'block';

  try {
    const base = owmUrl('/weather') + `&q=${encodeURIComponent(OWM_CITY)}`;
    const res  = await fetch(base);

    if (!res.ok) {
      if (res.status === 401) throw new Error('Invalid API key');
      throw new Error(`HTTP ${res.status}`);
    }
    const data = await res.json();

    // current conditions
    document.getElementById('current-temp').textContent =
      Math.round(data.main.temp);
    document.getElementById('weather-desc').textContent =
      wmoDesc(data.weather[0].id);

    // 3-day forecast (5-day/3-hour forecast endpoint; pull one entry per day)
    const owmFor3 = owmUrl('/forecast')
      + `&q=${encodeURIComponent(OWM_CITY)}`
      + '&cnt=40';

    const fRes = await fetch(owmFor3);
    if (!fRes.ok) throw new Error(`Forecast HTTP ${fRes.status}`);
    const forecast   = await fRes.json();
    const list       = forecast.list;
    const forecasts  = [];

    // Collect one reading per calendar day around 3 PM local time
    for (const entry of list) {
      const hour = new Date(entry.dt * 1000).getHours();
      if (hour < 15 || hour > 18) continue;   // afternoon window
      const dayKey = Math.floor(entry.dt / 86400);
      if (forecasts[dayKey]) continue;
      forecasts[dayKey] = entry;
      if (forecasts.length >= 3) break;
    }

    const ul = document.getElementById('forecast-list');
    ul.innerHTML = '';

    forecasts.slice(0, 3).forEach(day => {
      const li = document.createElement('li');
      li.className = 'forecast-item';
      li.innerHTML = `<span class="f-day">${dayName(day.dt)}</span>`
                   + `<span class="f-desc">${wmoDesc(day.weather[0].id)}</span>`
                   + `<span class="f-temp">${Math.round(day.main.temp_max)}${DEG_SYMBOL}\u2009/\u2009${Math.round(day.main.temp_min)}${DEG_SYMBOL}</span>`;
      ul.appendChild(li);
    });

    // Show content
    if (loading) loading.style.display = 'none';
    content.hidden = false;

  } catch (err) {
    console.warn('[home.js] weather unavailable:', err.message);
    if (loading) loading.style.display = 'none';
    msg.hidden = false;
  }
}

// ── Company Spotlight ─────────────────────────────────────────
async function initSpotlight() {
  const target = document.getElementById('spotlight-list');

  try {
    const res      = await fetch('../data/members.json');
    const json     = await res.json();
    const members  = json.members || [];

    // gold=3, silver=2
    const pool = members.filter(
      m => m.membershipLevel === 2 || m.membershipLevel === 3
    );

    if (!pool.length) {
      target.innerHTML = '<p>No featured members available at this time.</p>';
      return;
    }

    // pick 3 random members
    const picked = [...pool]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    target.innerHTML = picked
      .map(m => {
        const levelLabel = m.membershipLevel === 3 ? 'Gold Member' : 'Silver Member';
        const levelClass = m.membershipLevel === 3 ? 'spotlight-level--gold' : 'spotlight-level--silver';
        return `
          <article class="spotlight-item">
            <h3 class="spotlight-name">${m.name}</h3>
            <p class="spotlight-level ${levelClass}">${levelLabel}</p>
            <p class="spotlight-category">${m.category}</p>
            <p class="spotlight-address">${m.address}</p>
            <p class="spotlight-phone">${m.phone}</p>
            <a href="${m.website}" class="spotlight-link" rel="noopener noreferrer" target="_blank">Visit website &rarr;</a>
          </article>`;
      })
      .join('');

  } catch (err) {
    console.warn('[home.js] spotlight unavailable:', err);
    target.innerHTML = '<p>Unable to load spotlight members at this time.</p>';
  }
}

// ── Footer dates ───────────────────────────────────────────────
function initFooterDates() {
  const el = document.getElementById('modified');
  if (el) el.textContent = 'Last Modified: ' + document.lastModified;
}

// ── Events "last updated" stamp ────────────────────────────────
function initEventsStamp() {
  const el = document.getElementById('evt-updated');
  if (el) {
    // use data-mtime attribute set by the server, or file mtime
    el.textContent = 'Last updated: ' +
      new Date(document.lastModified).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric'
      });
  }
}

// ── Mobile nav toggle (same pattern as directory.js) ───────────
function initNav() {
  const toggle = document.querySelector('.nav-toggle');
  const nav    = document.getElementById('main-navigation');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ── Bootstrap ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initWeather();
  initSpotlight();
  initFooterDates();
  initEventsStamp();

  /* Tip for students:
     Set your OpenWeatherMap key in the DevTools console once:
       localStorage.setItem('OWM_KEY', 'your-key-here')
     Then hard-code it above in the OWM_KEY constant for submission. */
});
