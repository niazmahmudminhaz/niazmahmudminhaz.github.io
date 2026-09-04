(() => {
  const nav = document.querySelector('.nav-links');
  if (!nav) return;

  const groups = [
    {
      title: 'Core SEO',
      items: [
        ['SEO Consultation', '/services/seo-consultation/'],
        ['SEO Audits', '/services/seo-audits/'],
        ['Technical SEO', '/services/technical-seo/'],
        ['On-Page SEO', '/services/on-page-seo/'],
        ['Local SEO', '/services/local-seo/'],
        ['Off-Page SEO', '/services/off-page-seo/'],
        ['Backlink Analysis', '/services/backlink-analysis/'],
        ['All SEO Services →', '/services/']
      ]
    },
    {
      title: 'AI Search',
      items: [
        ['AI Search SEO', '/services/ai-search-seo/'],
        ['AEO', '/services/aeo/'],
        ['GEO', '/services/geo/'],
        ['GBO', '/services/gbo/']
      ]
    },
    {
      title: 'Ecommerce & Platforms',
      items: [
        ['Ecommerce SEO', '/services/ecommerce-seo/'],
        ['Shopify SEO', '/services/shopify-seo/'],
        ['WooCommerce SEO', '/services/woocommerce-seo/'],
        ['WordPress SEO', '/services/wordpress-seo/'],
        ['Webflow SEO', '/services/webflow-seo/'],
        ['Wix SEO', '/services/wix-seo/'],
        ['Squarespace SEO', '/services/squarespace-seo/']
      ]
    },
    {
      title: 'Geographic & Authority',
      items: [
        ['Hyperlocal SEO', '/services/hyperlocal-seo/'],
        ['International SEO', '/services/international-seo/'],
        ['Personal Authority SEO', '/services/personal-authority-seo/'],
        ['White-Hat SEO', '/services/white-hat-seo/']
      ]
    }
  ];

  const existing = nav.querySelector('.service-silo');
  const flatServiceLink = nav.querySelector(':scope > a[href="/services/"]');
  if (existing) existing.remove();
  if (flatServiceLink) flatServiceLink.remove();

  const silo = document.createElement('div');
  silo.className = 'service-silo';
  silo.innerHTML = `
    <button class="silo-trigger" type="button" aria-expanded="false" aria-haspopup="true">
      SEO Services <span class="silo-arrow">▾</span>
    </button>
    <div class="silo-panel" role="menu">
      ${groups.map(group => `
        <div class="silo-group">
          <p class="silo-title">${group.title}</p>
          ${group.items.map(([label, href]) => `<a href="${href}" role="menuitem">${label}</a>`).join('')}
        </div>
      `).join('')}
    </div>`;

  const about = nav.querySelector(':scope > a[href="/about/"]');
  nav.insertBefore(silo, about || nav.firstChild);

  const trigger = silo.querySelector('.silo-trigger');
  const close = () => {
    silo.classList.remove('open');
    trigger?.setAttribute('aria-expanded', 'false');
  };

  trigger?.addEventListener('click', (event) => {
    event.stopPropagation();
    const open = silo.classList.toggle('open');
    trigger.setAttribute('aria-expanded', String(open));
  });

  silo.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      close();
      nav.classList.remove('open');
    });
  });

  document.addEventListener('click', (event) => {
    if (!silo.contains(event.target)) close();
  });
})();
