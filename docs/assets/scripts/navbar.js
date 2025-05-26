/*no voy a mentir, copié y pegué todo este script de ChatGPT.*/

/* --- nav.js  ------------------------------------------------------------
   1) inject navbar.html exactly as before
   2) then call highlightActiveLink() to add class="active"
------------------------------------------------------------------------- */

async function injectNavbar() {
  const host = document.getElementById('navbar-placeholder');
  host.innerHTML = await (await fetch('/assets/partials/navbar.html')).text();
  highlightActiveLink(host);
}

/* ------------ NEW: ignore ".html" everywhere -------------------------- */
function highlightActiveLink(navRoot) {
  const current = normalisePath(location.pathname);

  navRoot.querySelectorAll('a').forEach(a => {
    const linkPath = normalisePath(new URL(a.getAttribute('href'), location.origin).pathname);
    if (linkPath === current) a.classList.add('active');
  });
}

/* Strip .html, index.html, trailing slash, query, hash, leading slash */
function normalisePath(path) {
  return path
    .replace(/\/index\.html?$/, '/')   // “/index.html” → “/”
    .replace(/\.html?$/, '')           // “about.html”  → “about”
    .replace(/\/$/, '')                // “/about/”     → “/about”
    .toLowerCase()                     // optional: case-insensitive match
    .replace(/^\/+/, '');              // drop leading “/”, so “/about” → “about”
}

document.addEventListener('DOMContentLoaded', injectNavbar);

/*
async function injectNavbar() {
  // 1. Download navbar.html
  const resp = await fetch('/navbar.html');
  const markup = await resp.text();

  // 2. Place it into the page
  const host = document.getElementById('nav-placeholder');
  host.innerHTML = markup;            // scripts inside markup wouldn't run

  // 3. Highlight the current link
  const file = location.pathname.split('/').pop() || 'index.html';

  host.querySelectorAll('a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === file || (href === 'index.html' && file === '')) {
      a.classList.add('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', injectNavbar);
*/