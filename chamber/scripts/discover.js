'use strict';

const CARDS_CONTAINER = document.getElementById('cards-container');
const VISIT_MESSAGE   = document.getElementById('visit-message');
const NAV_TOGGLE      = document.querySelector('.nav-toggle');
const MAIN_NAV        = document.getElementById('main-navigation');
const THEME_TOGGLE    = document.querySelector('.theme-toggle');

const LAYOUT_MAP = {
  mobile: ['m1','m2','m3','m4','m5','m6','m7','m8'],
  tablet: ['t1','t2','t3','t4','t5','t6','t7','t8'],
  desktop:['d1','d2','d3','d4','d5','d6','d7','d8']
};

let DISCOVER_DATA = { spots: [] };

function buildCard(spot) {
  const card = document.createElement('article');
  card.className = 'discover-card';

  const img = document.createElement('img');
  img.src = `images/${spot.image}`;
  img.alt = spot.name;
  img.loading = 'lazy';
  img.width = 800;
  img.height = 600;

  const body = document.createElement('div');
  body.className = 'card-body';
  body.innerHTML = `
    <h2>${spot.name}</h2>
    <p class="spot-address">${spot.address}</p>
    <p>${spot.description}</p>
    <button class="learn-more-btn" data-name="${spot.name}">Learn More</button>
  `;

  card.append(img, body);
  return card;
}

function setLayout(layout) {
  CARDS_CONTAINER.dataset.layout = layout;
  Array.from(CARDS_CONTAINER.children).forEach((card, i) => {
    if (!LAYOUT_MAP[layout][i]) return;
    card.style.gridArea = LAYOUT_MAP[layout][i];
  });
}

function initLayoutObserver() {
  const mq720  = window.matchMedia('(min-width: 720px)');
  const mq1000 = window.matchMedia('(min-width: 1000px)');
  const apply = () => {
    if (mq1000.matches)      setLayout('desktop');
    else if (mq720.matches) setLayout('tablet');
    else                    setLayout('mobile');
  };
  apply();
  mq720.addEventListener('change', apply);
  mq1000.addEventListener('change', apply);
}

async function initDiscover() {
  try {
    const res = await fetch('data/discover.json');
    if (!res.ok) throw new Error(`discover.json failed: ${res.status}`);
    DISCOVER_DATA = await res.json();
  } catch (err) {
    VISIT_MESSAGE.innerHTML = '<p class="error-message">Unable to load discoveries at this time.</p>';
    console.error(err);
    return;
  }

  CARDS_CONTAINER.innerHTML = '';
  DISCOVER_DATA.spots.forEach(spot => {
    CARDS_CONTAINER.appendChild(buildCard(spot));
  });

  CARDS_CONTAINER.addEventListener('click', (e) => {
    if (e.target.classList.contains('learn-more-btn')) {
      alert(`Learn more about ${e.target.dataset.name}!`);
    }
  });

  initLayoutObserver();
}

function initVisitMessage() {
  const now = Date.now();
  let message = '';
  try {
    const last = localStorage.getItem('discoverLastVisit');
    if (!last) {
      message = 'Welcome! Let us know if you have been here before.';
    } else {
      const days = Math.floor((now - Number(last)) / 86400000);
      if (days === 0)      message = 'Back so soon! Awesome to see you again.';
      else if (days === 1) message = 'You last visited 1 day ago.';
      else                 message = `You last visited ${days} days ago.`;
    }
  } catch {
    message = 'Welcome! Let us know if you have been here before.';
  }
  try { localStorage.setItem('discoverLastVisit', String(now)); } catch {}
  VISIT_MESSAGE.textContent = message;
}

function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  if (THEME_TOGGLE) {
    THEME_TOGGLE.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? '' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next || 'light');
    });
  }
}

function initNav() {
  if (!NAV_TOGGLE || !MAIN_NAV) return;
  NAV_TOGGLE.addEventListener('click', () => {
    const expanded = NAV_TOGGLE.getAttribute('aria-expanded') === 'true';
    NAV_TOGGLE.setAttribute('aria-expanded', String(!expanded));
    MAIN_NAV.classList.toggle('open');
  });
  MAIN_NAV.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      MAIN_NAV.classList.remove('open');
      NAV_TOGGLE.setAttribute('aria-expanded', 'false');
    });
  });
}

function updateFooter() {
  const author = document.getElementById('author');
  const modified = document.getElementById('modified');
  if (author) author.textContent = `© ${new Date().getFullYear()} Hyeyendele Rashidi`;
  if (modified) modified.textContent = `Last Modified: ${document.lastModified}`;
}

document.addEventListener('DOMContentLoaded', () => {
   initNav();
   initTheme();
   initVisitMessage();
   initDiscover();
   updateFooter();
});
