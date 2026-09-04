(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;

  document.querySelectorAll('.topic-visual,.gain-visual,.experiment-visual').forEach((panel) => {
    panel.addEventListener('pointermove', (event) => {
      const rect = panel.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      panel.style.setProperty('--mx', `${(x - 0.5) * 10}deg`);
      panel.style.setProperty('--my', `${(y - 0.5) * -10}deg`);
    });
    panel.addEventListener('pointerleave', () => {
      panel.style.setProperty('--mx', '0deg');
      panel.style.setProperty('--my', '0deg');
    });
  });

  const headings = [...document.querySelectorAll('.topic-prose h2')];
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('topic-visible');
    });
  }, { threshold: 0.12 });

  headings.forEach((heading) => observer.observe(heading));
})();
