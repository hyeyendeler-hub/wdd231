'use strict';

/* ─────────────────────────────────────────────────────────────────
   Chamber Thank You Page – Display submitted form data
   ───────────────────────────────────────────────────────────────── */

function displayFormData() {
  // Get URL parameters
  const params = new URLSearchParams(window.location.search);

  // Extract form data
  const firstName = params.get('firstName') || 'Not provided';
  const lastName = params.get('lastName') || 'Not provided';
  const email = params.get('email') || 'Not provided';
  const phone = params.get('phone') || 'Not provided';
  const businessName = params.get('businessName') || 'Not provided';
  const timestamp = params.get('timestamp') || 'Not provided';

  // Display data in the page
  document.getElementById('displayFirstName').textContent = firstName;
  document.getElementById('displayLastName').textContent = lastName;
  document.getElementById('displayEmail').textContent = email;
  document.getElementById('displayPhone').textContent = phone;
  document.getElementById('displayBusinessName').textContent = businessName;
  document.getElementById('displayTimestamp').textContent = timestamp;
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
  const modifiedElement = document.getElementById('modified');
  if (modifiedElement) {
    const lastModified = new Date(document.lastModified);
    modifiedElement.textContent = `Last modified: ${lastModified.toLocaleDateString('en-US')}`;
  }
}

// ── Initialize all functions on page load ──────────────────────
document.addEventListener('DOMContentLoaded', () => {
  displayFormData();
  initializeNavigation();
  updateModifiedDate();
});
