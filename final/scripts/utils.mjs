export function formatPrice(price) {
  return price.startsWith('$') ? price : `$${price}`;
}

export function calculateAverageRating(items, key = 'rating') {
  if (!items.length) return 0;
  const sum = items.reduce((acc, item) => acc + (item[key] || 0), 0);
  return (sum / items.length).toFixed(1);
}

export function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function loadFromStorage(key, defaultValue = null) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
}