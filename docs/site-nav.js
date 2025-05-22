class SiteNav extends HTMLElement {
  constructor() {
    super();
    // Shadow DOM keeps the nav’s styles from leaking out (or being overridden).
    const shadow = this.attachShadow({ mode: 'open' });
    const template = document.getElementById('site-nav-template');
    shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    // Optional: auto-mark the current page link
    const links = this.shadowRoot.querySelectorAll('a[href]');
    links.forEach(link => {
      if (link.getAttribute('href') === window.location.pathname) {
        link.setAttribute('aria-current', 'page');
      }
    });
  }
}

customElements.define('site-nav', SiteNav);