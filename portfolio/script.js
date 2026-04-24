/* ============================================
   PORTFÓLIO PESSOAL — JAVASCRIPT PRINCIPAL
   Funcionalidades: navbar, menu mobile, animações
   ============================================ */

/* ---- NAVBAR: adiciona classe "scrolled" ao rolar ---- */
const navbar = document.querySelector('.navbar');

if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* ---- MENU MOBILE: abre/fecha ao clicar no hambúrguer ---- */
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');

    // Anima as três linhas do ícone hambúrguer
    const spans = navToggle.querySelectorAll('span');
    navLinks.classList.contains('open')
      ? openMenu(spans)
      : closeMenu(spans);
  });

  // Fecha menu ao clicar em um link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      closeMenu(navToggle.querySelectorAll('span'));
    });
  });

  // Fecha menu ao clicar fora
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      navLinks.classList.remove('open');
      closeMenu(navToggle.querySelectorAll('span'));
    }
  });
}

function openMenu(spans) {
  spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
  spans[1].style.opacity   = '0';
  spans[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';
}

function closeMenu(spans) {
  spans[0].style.transform = '';
  spans[1].style.opacity   = '';
  spans[2].style.transform = '';
}

/* ---- LINK ATIVO NA NAVBAR ---- */
(function markActiveLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

/* ---- ANIMAÇÕES DE SCROLL (Intersection Observer) ---- */
(function initFadeIn() {
  const targets = document.querySelectorAll('.fade-in');
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // anima só uma vez
        }
      });
    },
    { threshold: 0.12 }
  );

  targets.forEach(el => observer.observe(el));
})();

/* ---- FORMULÁRIO DE CONTATO (apenas front-end, sem envio real) ---- */
(function initContactForm() {
  const form    = document.querySelector('.contact-form form');
  const success = document.querySelector('.form-success');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault(); // impede envio real

    // Exibe mensagem de sucesso
    form.style.display  = 'none';
    if (success) {
      success.style.display = 'block';
    }

    // Reseta após 4 segundos (opcional)
    setTimeout(() => {
      form.reset();
      form.style.display    = '';
      if (success) success.style.display = 'none';
    }, 4000);
  });
})();

/* ---- EFEITO DE DIGITAÇÃO no hero (opcional) ---- */
(function initTyping() {
  const el = document.querySelector('[data-typing]');
  if (!el) return;

  const words  = el.dataset.typing.split('|');
  let wIdx     = 0;
  let cIdx     = 0;
  let deleting = false;

  function type() {
    const word    = words[wIdx];
    const current = deleting
      ? word.substring(0, cIdx - 1)
      : word.substring(0, cIdx + 1);

    el.textContent = current;
    cIdx = deleting ? cIdx - 1 : cIdx + 1;

    let delay = deleting ? 60 : 100;

    if (!deleting && current === word) {
      delay    = 2000; // pausa no fim da palavra
      deleting = true;
    } else if (deleting && current === '') {
      deleting = false;
      wIdx     = (wIdx + 1) % words.length;
      delay    = 400;
    }

    setTimeout(type, delay);
  }

  type();
})();
