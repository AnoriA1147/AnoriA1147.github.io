/* lang-toggle.js
   1) Wait until the navbar (and its #lang-toggle button) is injected
   2) Then show/hide all [data-lang] text based on localStorage('lang')
   3) Wire up a delegated click handler for the toggle button
*/

(() => {
  // 1. Read saved preference or default to "en"
  let currentLang = localStorage.getItem('lang');
  if (currentLang !== 'es' && currentLang !== 'en') {
    currentLang = 'en';
    localStorage.setItem('lang', 'en');
  }

  // 2. Function that actually reveals [data-lang] elements
  function applyLanguage(lang) {
    // Accessibility: update <html lang="...">
    document.documentElement.setAttribute('lang', lang);

    // Show only the matching language nodes
    document.querySelectorAll('[data-lang]').forEach(el => {
      if (el.getAttribute('data-lang') === lang) {
        el.style.display = 'block';
      } else {
        el.style.display = 'none';
      }
    });
  }

  // 3. Delegated click handler: look for clicks on #lang-toggle
  function handleClick(e) {
    if (!e.target || e.target.id !== 'lang-toggle') return;
    // flip lang
    currentLang = currentLang === 'en' ? 'es' : 'en';
    localStorage.setItem('lang', currentLang);
    applyLanguage(currentLang);
  }

  // 4. Called once BOTH DOMContentLoaded and navReady have fired
  function init() {
    // Unsubscribe so we don’t re‐init twice
    document.removeEventListener('navReady', init);
    // Reveal any existing [data-lang] (including in the newly injected navbar)
    applyLanguage(currentLang);
    // Add one click listener at document level (delegation)
    document.addEventListener('click', handleClick, false);
  }

  // 5. Wait for the DOM to finish parsing first
  document.addEventListener('DOMContentLoaded', () => {
    // If the nav placeholder already has children (i.e. cached), just init
    const navSlot = document.getElementById('navbar-placeholder');
    if (navSlot && navSlot.children.length) {
      init();
    } else {
      // Otherwise, wait for navReady (or a 3s timeout fallback)
      document.addEventListener('navReady', init, false);
      setTimeout(init, 3000);
    }
  });
})();
