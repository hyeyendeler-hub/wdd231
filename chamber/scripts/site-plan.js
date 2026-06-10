document.addEventListener('DOMContentLoaded', () => {
  const modified = document.getElementById('modified');
  if (modified) {
    modified.textContent = 'Last Modified: ' + document.lastModified;
  }
});
