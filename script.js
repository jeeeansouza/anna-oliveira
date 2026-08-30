const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach((el) => revealObserver.observe(el));
  }
}

// Odontologia / Estética toggle — drives services shown AND the WhatsApp target
const toggle = document.getElementById('toggle');
const toggleThumb = document.getElementById('toggleThumb');
const options = document.querySelectorAll('.toggle-option');
const panels = { odonto: document.getElementById('panel-odonto'), estetica: document.getElementById('panel-estetica') };
const servicesTitle = document.getElementById('servicesTitle');
const heroCta = document.getElementById('heroCta');
const heroCtaLabel = document.getElementById('heroCtaLabel');
const navCta = document.getElementById('navCta');
const stickyWa = document.getElementById('stickyWa');

const titles = {
  odonto: 'Odontologia completa, num só espaço.',
  estetica: 'Estética facial e corporal, com quem entende de sorriso.'
};
const ctaLabels = { odonto: 'Falar sobre Odontologia', estetica: 'Falar sobre Estética Facial' };

function moveThumb(target) {
  if (!toggle) return;
  toggleThumb.style.width = target.offsetWidth + 'px';
  toggleThumb.style.transform = `translateX(${target.offsetLeft - 5}px)`;
}

function setActive(panelKey, optionEl) {
  options.forEach((o) => o.classList.toggle('is-active', o === optionEl));
  Object.entries(panels).forEach(([key, el]) => el.classList.toggle('is-active', key === panelKey));
  servicesTitle.textContent = titles[panelKey];

  const wa = optionEl.dataset.wa;
  const text = optionEl.dataset.waText;
  const url = `https://wa.me/${wa}?text=${text}`;
  heroCta.href = url;
  heroCtaLabel.textContent = ctaLabels[panelKey];
  navCta.href = url;
  stickyWa.href = url;

  moveThumb(optionEl);
}

if (toggle) {
  options.forEach((opt) => {
    opt.addEventListener('click', () => setActive(opt.dataset.panel, opt));
  });
  window.addEventListener('resize', () => {
    const activeOpt = document.querySelector('.toggle-option.is-active');
    if (activeOpt) moveThumb(activeOpt);
  });
  // initialize thumb position after layout
  window.requestAnimationFrame(() => {
    const activeOpt = document.querySelector('.toggle-option.is-active');
    if (activeOpt) moveThumb(activeOpt);
  });
}
