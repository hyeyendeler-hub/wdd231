import { initAdventures, setupModalListeners, setupFilterListeners, initStats } from './adventures.mjs';
import { loadFromStorage, saveToStorage } from './utils.mjs';

// Mobile navigation toggle
function initNav() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('main-navigation');
  
  if (!toggle || !nav) return;
  
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });
  
  // Close nav when clicking links
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Set last modified date
function setLastModified() {
  const el = document.getElementById('modified');
  if (el) {
    el.textContent = `Last Modified: ${new Date(document.lastModified).toLocaleDateString()}`;
  }
}

// Initialize theme preference from localStorage
function initTheme() {
  const theme = loadFromStorage('theme', 'light');
  document.body.setAttribute('data-theme', theme);
}

// Footer video link
function setVideoLink() {
  const videoLink = document.getElementById('video-link');
  if (videoLink) {
    videoLink.href = 'https://youtu.be/your-video-here'; // Replace with actual video URL
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  setLastModified();
  initTheme();
  setVideoLink();
  
  // Update stats on all pages
  const statsElements = document.querySelectorAll('#avg-rating, #total-adventures');
  if (statsElements.length > 0) {
    initStats();
  }
  
  // Initialize adventures on the adventures page
  const adventuresContainer = document.querySelector('#adventures-container');
  if (adventuresContainer) {
    initAdventures();
    setupModalListeners();
    setupFilterListeners();
  }
});