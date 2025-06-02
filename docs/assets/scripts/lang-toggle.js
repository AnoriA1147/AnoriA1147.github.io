/*no voy a mentir, eso también yo copié y pegué totalmente de ChatGPT.*/

document.addEventListener('DOMContentLoaded', () => {
  // 1. Determine current language
  let currentLang = localStorage.getItem('lang');
  if (currentLang !== 'es' && currentLang !== 'en') {
    currentLang = 'en';
    localStorage.setItem('lang', 'en');
  }

  // 2. Function to reveal only the chosen language
  function applyLanguage(lang) {
    // Update <html lang="..."> for accessibility
    document.documentElement.setAttribute('lang', lang);

    // Show/hide every [data-lang] element
    document.querySelectorAll('[data-lang]').forEach(el => {
      if (el.getAttribute('data-lang') === lang) {
        el.style.display = 'block'; // or 'inline' depending on your layout
      } else {
        el.style.display = 'none';
      }
    });
    // When showing a particular lang, also swap alt attributes:
    document.querySelectorAll('img[data-lang]').forEach(img => {
      if (img.getAttribute('data-lang') === lang) {
        img.setAttribute('alt', img.getAttribute('data-alt-' + lang));
        img.style.display = 'block'; // or 'inline' depending on your layout
      } else {
        img.style.display = 'none';
      }
    });
  }

  // Initial reveal
  applyLanguage(currentLang);

  // 3. Hook up the toggle button
  const toggleBtn = document.getElementById('lang-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      // Flip between 'en' and 'es'
      currentLang = currentLang === 'en' ? 'es' : 'en';
      localStorage.setItem('lang', currentLang);
      applyLanguage(currentLang);
    });
  }
});
