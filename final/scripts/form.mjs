// Form submission handler for contact page
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('inquiry-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const params = new URLSearchParams();
      for (const [key, value] of formData) {
        params.append(key, value);
      }
      window.location.href = `form-action.html?${params.toString()}`;
    });
  }
});