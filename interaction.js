/* MINHAZ interaction layer. No analytics, tracking, form handling, schema, or navigation changes. */
(() => {
  const root = document.documentElement;
  const body = document.body;
  if (!body || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  if (coarse) return;

  let raf = 0;
  let x = window.innerWidth * .5;
  let y = window.innerHeight * .5;
  let targetX = x;
  let targetY = y;

  const render = () => {
    x += (targetX - x) * .14;
    y += (targetY - y) * .14;
    root.style.setProperty('--pointer-x', `${x}px`);
    root.style.setProperty('--pointer-y', `${y}px`);
    raf = Math.abs(targetX - x) + Math.abs(targetY - y) > .2 ? requestAnimationFrame(render) : 0;
  };

  window.addEventListener('pointermove', (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
    body.classList.add('pointer-ready');
    if (!raf) raf = requestAnimationFrame(render);
  }, {passive:true});

  document.addEventListener('pointerover', (event) => {
    const interactive = event.target.closest('a,button,summary,.cards article,.service-grid article,.topic-card,.article-card,.profile-card,.contact-form,.faq-item,.steps>div');
    body.classList.toggle('pointer-hover', !!interactive);
  }, {passive:true});

  const tiltTargets = document.querySelectorAll('.cards article,.service-grid article,.topic-card,.article-card,.profile-card,.contact-form,.faq-item,.steps>div');
  tiltTargets.forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      if (event.pointerType === 'touch') return;
      const rect = card.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - .5;
      const py = (event.clientY - rect.top) / rect.height - .5;
      card.style.setProperty('--rx', `${(-py * 2.4).toFixed(2)}deg`);
      card.style.setProperty('--ry', `${(px * 2.4).toFixed(2)}deg`);
      card.style.transform = `translateY(-5px) perspective(800px) rotateX(var(--rx)) rotateY(var(--ry))`;
    }, {passive:true});
    card.addEventListener('pointerleave', () => {
      card.style.removeProperty('--rx');
      card.style.removeProperty('--ry');
      card.style.removeProperty('transform');
    }, {passive:true});
  });
})();
