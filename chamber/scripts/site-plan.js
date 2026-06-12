'use strict';

const NAV_TOGGLE = document.querySelector('.nav-toggle');
const MAIN_NAV = document.getElementById('main-navigation');
const THEME_TOGGLE = document.querySelector('.theme-toggle');

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

function updateFooter() {
  const author = document.getElementById('author');
  const modified = document.getElementById('modified');
  if (author) author.textContent = `© ${new Date().getFullYear()} Hyeyendele Rashidi`;
  if (modified) modified.textContent = `Last Modified: ${document.lastModified}`;
}

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initTheme();
  updateFooter();
});
