const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

function setTheme(theme) {
  try {
    localStorage.setItem('theme', theme);
  } catch (e) {
    console.warn('Failed to save theme preference:', e);
  }
  body.style.transition = 'none';
  body.setAttribute('data-theme', theme);
  void body.offsetWidth;
  body.style.transition = '';
  updateThemeIcon(theme);
}

function updateThemeIcon(theme) {
  const icon = theme === 'dark' ? 'moon' : 'sun';
  themeToggle.innerHTML = `<i class="fas fa-${icon}" aria-hidden="true"></i>`;
  themeToggle.setAttribute('aria-label', `${icon} icon`);
}

document.addEventListener('DOMContentLoaded', function() {
  const savedTheme = localStorage.getItem('theme') || 
                    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  setTheme(savedTheme);

  themeToggle.addEventListener('click', () => {
    const newTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
});