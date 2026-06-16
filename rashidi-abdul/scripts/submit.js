document.addEventListener('DOMContentLoaded', () => {
  const formTabs = document.querySelectorAll('.form-tab');
  const fileInput = document.getElementById('file');
  const posterInput = document.getElementById('poster');
  const fileTypeLabel = document.getElementById('fileTypeLabel');
  const contentForm = document.getElementById('contentSubmitForm');
  
  let currentType = 'movie';
  
  formTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      formTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentType = tab.dataset.tab;
      
      if (currentType === 'movie' || currentType === 'series') {
        fileTypeLabel.textContent = 'MP4/Video';
        fileInput.accept = '.mp4,.mov,.avi,.mkv';
      } else {
        fileTypeLabel.textContent = 'MP3/Audio';
        fileInput.accept = '.mp3,.wav,.flac';
      }
    });
  });
  
  fileInput?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = document.getElementById('filePreview');
      const sizeMB = (file.size / 1024 / 1024).toFixed(2);
      if (file.size > 50 * 1024 * 1024) {
        preview.innerHTML = `<p style="color:var(--danger); margin-top:0.5rem;">⚠ File too large (${sizeMB} MB). Maximum allowed: 50MB for demo</p>`;
      } else {
        preview.innerHTML = `<p style="color:var(--success); margin-top:0.5rem;">✓ ${file.name} selected (${sizeMB} MB)</p>`;
      }
    }
  });
  
  posterInput?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const preview = document.getElementById('posterPreview');
        preview.innerHTML = `<img src="${event.target.result}" alt="Poster preview">`;
      };
      reader.readAsDataURL(file);
    }
  });
  
  contentForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you! Your submission will be reviewed and published within 24-48 hours.');
    contentForm.reset();
    document.getElementById('filePreview').innerHTML = '';
    document.getElementById('posterPreview').innerHTML = '';
  });
  
  const themeToggle = document.querySelector('.theme-toggle');
  themeToggle?.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    document.documentElement.setAttribute('data-theme', currentTheme === 'dark' ? '' : 'dark');
    localStorage.setItem('theme', document.documentElement.getAttribute('data-theme'));
  });
  
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }
});