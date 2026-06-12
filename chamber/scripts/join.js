'use strict';

const THEME_TOGGLE = document.querySelector('.theme-toggle');

/* ─────────────────────────────────────────────────────────────────
   Chamber Join Page – Form timestamp, modal interactions, nav toggle
   ───────────────────────────────────────────────────────────────── */

// ── Theme toggle ───────────────────────────────────────────────
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

// ── Set timestamp when page loads ──────────────────────────────
function setFormTimestamp() {
  const now = new Date();
  const timestamp = now.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
  document.getElementById('timestamp').value = timestamp;
}

// ── Modal functionality ────────────────────────────────────────
function initializeModals() {
  const cardLinks = document.querySelectorAll('.card-link');
  const modals = document.querySelectorAll('.modal');
  
  // Open modal when card link is clicked
  cardLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = link.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.showModal();
      }
    });
  });

  // Close modal when X button is clicked
  modals.forEach(modal => {
    const closeBtn = modal.querySelector('.modal-close');
    const closeCloseBtn = modal.querySelector('.modal-close-btn');
    
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.close();
      });
    }
    
    if (closeCloseBtn) {
      closeCloseBtn.addEventListener('click', () => {
        modal.close();
      });
    }
  });

  // Close modal when clicking outside the modal content
  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.close();
      }
    });
  });
}

// ── Navigation toggle ────────────────────────────────────────────
function initializeNavigation() {
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.getElementById('main-navigation');
  
  if (!navToggle || !mainNav) return;
  
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.contains('open');
    mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', !isOpen);
  });

  // Close menu when a link is clicked
  const navLinks = mainNav.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ── Update modified date in footer ────────────────────────────
function updateModifiedDate() {
   const author = document.getElementById('author');
   const modifiedElement = document.getElementById('modified');
   if (author) author.textContent = `© ${new Date().getFullYear()} Hyeyendele Rashidi`;
   if (modifiedElement) modifiedElement.textContent = `Last Modified: ${document.lastModified}`;
}

// ── Initialize all functions on page load ──────────────────────
document.addEventListener('DOMContentLoaded', () => {
   initTheme();
   setFormTimestamp();
   initializeModals();
   initializeNavigation();
   updateModifiedDate();
});
