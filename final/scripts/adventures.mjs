import { formatPrice, saveToStorage, loadFromStorage } from './utils.mjs';

const adventuresContainer = document.querySelector('#adventures-container');
const categoryFilter = document.querySelector('#category-filter');
const sortSelect = document.querySelector('#sort-select');
const modal = document.querySelector('#adventure-modal');
const modalContent = document.querySelector('#modal-content');
const modalClose = document.querySelector('#modal-close');

let allAdventures = [];
let displayedAdventures = [];

export async function initAdventures() {
  try {
    const response = await fetch('data/adventures.json');
    if (!response.ok) throw new Error('Failed to load adventures');
    const data = await response.json();
    allAdventures = data.adventures;
    
    // Save to localStorage for offline access
    saveToStorage('adventuresData', allAdventures);
    
    // Check for user preferences
    const preferredCategory = loadFromStorage('preferredCategory', 'all');
    if (categoryFilter) categoryFilter.value = preferredCategory;
    
    renderAdventures(allAdventures);
    updateStats();
  } catch (error) {
    console.warn('Error loading adventures:', error);
    // Try to load from localStorage as fallback
    const cached = loadFromStorage('adventuresData');
    if (cached) {
      allAdventures = cached;
      renderAdventures(allAdventures);
    } else {
      adventuresContainer.innerHTML = '<p>Unable to load adventures at this time.</p>';
    }
  }
}

function renderAdventures(adventures) {
  displayedAdventures = adventures;
  
  adventuresContainer.innerHTML = adventures.map(adventure => `
    <article class="card adventure-card" data-id="${adventure.id}">
      <div class="card-image-placeholder">${getCategoryIcon(adventure.category)}</div>
      <h3>${adventure.name}</h3>
      <p class="adventure-category">${adventure.category}</p>
      <p>${adventure.description.substring(0, 100)}...</p>
      <p class="price">${formatPrice(adventure.price)}</p>
      <p>Rating: ${adventure.rating} ⭐</p>
      <button class="details-btn" data-id="${adventure.id}">More Details</button>
    </article>
  `).join('');

  // Add event listeners to detail buttons
  document.querySelectorAll('.details-btn').forEach(btn => {
    btn.addEventListener('click', () => showModal(btn.dataset.id));
  });
}

function getCategoryIcon(category) {
  const icons = {
    'Water Sports': '🌊',
    'Adventure': '🪂',
    'Land Tour': '🚙',
    'Relaxation': '🧘',
    'Culture': '🏺',
    'Wellness': '🧘‍♀️',
    'Premium': '✈️'
  };
  return `<div style="font-size: 3rem; text-align: center; padding: 1rem;">${icons[category] || '🎯'}</div>`;
}

function showModal(id) {
  const adventure = allAdventures.find(a => a.id == id);
  if (!adventure) return;
  
  modalContent.innerHTML = `
    <h2>${adventure.name}</h2>
    <p><strong>Category:</strong> ${adventure.category}</p>
    <p><strong>Description:</strong> ${adventure.description}</p>
    <p><strong>Price:</strong> ${formatPrice(adventure.price)}</p>
    <p><strong>Duration:</strong> ${adventure.duration}</p>
    <p><strong>Rating:</strong> ${adventure.rating} ⭐</p>
    <p><strong>Location:</strong> ${adventure.location}</p>
  `;
  
  // Use showModal() for proper dialog element support
  if (typeof modal.showModal === 'function') {
    modal.showModal();
  } else {
    modal.setAttribute('open', '');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal() {
  if (modal) {
    if (typeof modal.close === 'function') {
      modal.close();
    } else {
      modal.removeAttribute('open');
      document.body.style.overflow = '';
    }
  }
}

export function setupModalListeners() {
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
}

export function setupFilterListeners() {
  if (categoryFilter) {
    categoryFilter.addEventListener('change', () => {
      const category = categoryFilter.value;
      saveToStorage('preferredCategory', category);
      
      if (category === 'all') {
        renderAdventures(allAdventures);
      } else {
        const filtered = allAdventures.filter(a => a.category === category);
        renderAdventures(filtered);
      }
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      const sortBy = sortSelect.value;
      let sorted = [...displayedAdventures];
      
      switch (sortBy) {
        case 'price-low':
          sorted.sort((a, b) => parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1)));
          break;
        case 'price-high':
          sorted.sort((a, b) => parseFloat(b.price.slice(1)) - parseFloat(a.price.slice(1)));
          break;
        case 'rating':
          sorted.sort((a, b) => b.rating - a.rating);
          break;
        default:
          sorted = [...allAdventures];
      }
      renderAdventures(sorted);
    });
  }
}

function updateStats() {
  const avgRating = document.querySelector('#avg-rating');
  const totalAdventures = document.querySelector('#total-adventures');
  
  if (avgRating) {
    const avg = allAdventures.reduce((sum, a) => sum + a.rating, 0) / allAdventures.length;
    avgRating.textContent = avg.toFixed(1);
  }
  
  if (totalAdventures) {
    totalAdventures.textContent = allAdventures.length;
  }
}

export async function initStats() {
  try {
    const response = await fetch('data/adventures.json');
    if (!response.ok) throw new Error('Failed to load adventures');
    const data = await response.json();
    const adventures = data.adventures;
    
    const avgRating = document.querySelector('#avg-rating');
    const totalAdventures = document.querySelector('#total-adventures');
    
    if (avgRating) {
      const avg = adventures.reduce((sum, a) => sum + a.rating, 0) / adventures.length;
      avgRating.textContent = avg.toFixed(1);
    }
    
    if (totalAdventures) {
      totalAdventures.textContent = adventures.length;
    }
  } catch (error) {
    console.warn('Error loading stats:', error);
  }
}