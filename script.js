/* ============================================================
   NICOLAS FIGUEROA · PORTAFOLIO PROFESIONAL
   script.js — Interactividad y animaciones
   ============================================================ */

'use strict';

// ============================================================
// 1. LOADER — ocultar al cargar la página
// ============================================================
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  // Pequeño retraso para que la animación de la barra se vea completa
  setTimeout(() => {
    loader.classList.add('hidden');
    // Disparar animaciones de la sección hero
    triggerHeroAnimations();
  }, 1800);
});

// ============================================================
// 2. CURSOR PERSONALIZADO
// ============================================================
const cursorDot  = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('cursor-ring');

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

// Seguir posición del mouse
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left  = mouseX + 'px';
  cursorDot.style.top   = mouseY + 'px';
});

// Animar el anillo con suavidad (lerp)
function animateCursor() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Efecto hover en elementos interactivos
const hoverTargets = document.querySelectorAll('a, button, .project-card, .skill-cat-card, .stat-card, .timeline-card, .contact-link-item');
hoverTargets.forEach(el => {
  el.addEventListener('mouseenter', () => cursorRing.classList.add('hovered'));
  el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovered'));
});

// ============================================================
// 3. NAVBAR — scroll effect + active link
// ============================================================
const navbar  = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a, .nav-mobile a');

window.addEventListener('scroll', () => {
  // Efecto scroll
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Link activo según sección visible
  highlightNavLink();

  // Botón volver arriba
  toggleBackToTop();
});

function highlightNavLink() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';

  sections.forEach(section => {
    const sTop = section.offsetTop - 120;
    if (window.scrollY >= sTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

// ============================================================
// 4. HAMBURGER MENU (mobile)
// ============================================================
const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('navMobile');

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
  navMobile.classList.toggle('open', isOpen);
  navMobile.setAttribute('aria-hidden', !isOpen);
});

// Cerrar al hacer click en un enlace
document.querySelectorAll('.nav-mobile a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
    navMobile.classList.remove('open');
    navMobile.setAttribute('aria-hidden', true);
  });
});

// ============================================================
// 5. MODO OSCURO / CLARO
// ============================================================
const themeToggle = document.getElementById('themeToggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

// Cargar preferencia guardada
const savedTheme = localStorage.getItem('nf-theme');
if (savedTheme) {
  applyTheme(savedTheme);
} else {
  applyTheme(prefersDark.matches ? 'dark' : 'light');
}

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('nf-theme', next);
});

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const icon = themeToggle.querySelector('i');
  icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
}

// ============================================================
// 6. CANVAS HERO — partículas animadas
// ============================================================
const canvas = document.getElementById('hero-canvas');
const ctx    = canvas.getContext('2d');

let particles = [];
let animFrame;

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Clase partícula
class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.radius = Math.random() * 1.5 + 0.5;
    this.alpha = Math.random() * 0.5 + 0.1;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > canvas.width)  this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 229, 255, ${this.alpha})`;
    ctx.fill();
  }
}

// Crear partículas
const particleCount = Math.min(80, Math.floor(window.innerWidth / 16));
for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle());
}

// Dibujar líneas entre partículas cercanas
function drawConnections() {
  const maxDist = 120;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < maxDist) {
        const opacity = (1 - dist / maxDist) * 0.12;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(0, 229, 255, ${opacity})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

function animateCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  drawConnections();
  animFrame = requestAnimationFrame(animateCanvas);
}

animateCanvas();

// ============================================================
// 7. TYPEWRITER EFFECT — hero role
// ============================================================
const roles = [
  'Estudiante de Ingeniería de Software',
  'Analista de Datos',
  'Automatizador de Procesos',
  'Desarrollador Backend',
  'Entusiasta de IA',
  'Builder de soluciones'
];

const typewriterEl = document.getElementById('typewriter');
let roleIndex = 0;
let charIndex  = 0;
let deleting   = false;
let typingDelay = 110;

function type() {
  const current = roles[roleIndex];

  if (!deleting) {
    typewriterEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      deleting = true;
      typingDelay = 80;
      setTimeout(type, 1800); // pausa antes de borrar
      return;
    }
  } else {
    typewriterEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingDelay = 110;
    }
  }

  setTimeout(type, deleting ? 55 : typingDelay);
}

// Iniciar typewriter después del loader
setTimeout(type, 2200);

// ============================================================
// 8. SCROLL REVEAL — animaciones de entrada
// ============================================================
const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target); // solo animar una vez
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -60px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// Animaciones del hero (se disparan después del loader)
function triggerHeroAnimations() {
  const heroReveal = document.querySelectorAll('#hero .reveal-up');
  heroReveal.forEach((el, i) => {
    setTimeout(() => el.classList.add('revealed'), i * 120);
  });
}

// ============================================================
// 9. SKILL BARS — animación al entrar en viewport
// ============================================================
const barFills = document.querySelectorAll('.bar-fill');

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // La animación de ancho se activa con la clase animated (CSS transición)
      entry.target.classList.add('animated');
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

barFills.forEach(bar => barObserver.observe(bar));

// ============================================================
// 10. BACK TO TOP
// ============================================================
const backToTopBtn = document.getElementById('backToTop');

function toggleBackToTop() {
  if (window.scrollY > 400) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
}

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================================================
// 11. SMOOTH SCROLL para nav links
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80; // altura del navbar
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ============================================================
// 12. FORMULARIO DE CONTACTO — validación y feedback
// ============================================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = document.getElementById('contactName').value.trim();
    const email   = document.getElementById('contactEmail').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    // Validación básica
    if (!name || !email || !message) {
      showFormFeedback('Por favor completa todos los campos obligatorios.', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showFormFeedback('Por favor ingresa un correo electrónico válido.', 'error');
      return;
    }

    // Simular envío (en producción, conectar con un servicio como Formspree o EmailJS)
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';

    // Simulación de delay de envío pa que se vea chebre
    setTimeout(() => {
      showFormFeedback('¡Mensaje enviado con éxito! Te responderé pronto. 🚀', 'success');
      contactForm.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Enviar mensaje';
    }, 1600);
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFormFeedback(message, type) {
  // Remover feedback anterior
  const existing = contactForm.querySelector('.form-feedback');
  if (existing) existing.remove();

  const feedback = document.createElement('p');
  feedback.className = `form-feedback form-feedback--${type}`;
  feedback.style.cssText = `
    padding: 0.75rem 1rem;
    border-radius: 8px;
    font-size: 0.875rem;
    background: ${type === 'success' ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)'};
    border: 1px solid ${type === 'success' ? 'rgba(34,197,94,0.35)' : 'rgba(239,68,68,0.35)'};
    color: ${type === 'success' ? '#22c55e' : '#ef4444'};
  `;
  feedback.textContent = message;
  contactForm.appendChild(feedback);

  // Auto-remover después de 5 segundos
  setTimeout(() => {
    if (feedback.parentNode) feedback.remove();
  }, 5000);
}

// ============================================================
// 13. AÑO ACTUAL EN EL FOOTER
// ============================================================
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ============================================================
// 14. CONTADOR ANIMADO EN STATS
// ============================================================
const statNums = document.querySelectorAll('.stat-num');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const text = el.textContent;
      const numMatch = text.match(/\d+/);
      if (!numMatch) return;

      const target = parseInt(numMatch[0]);
      const suffix = text.replace(/\d+/, '');
      let current = 0;
      const increment = target / 30;

      const interval = setInterval(() => {
        current = Math.min(current + increment, target);
        el.textContent = Math.floor(current) + suffix;
        if (current >= target) clearInterval(interval);
      }, 35);

      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(num => counterObserver.observe(num));

// ============================================================
// 15. NAVBAR — actualizar hoverTargets dinámicamente
//     (para elementos añadidos después del DOMContentLoaded)
// ============================================================
function updateHoverTargets() {
  const all = document.querySelectorAll('a, button, .project-card, .skill-cat-card, .stat-card, .timeline-card, .contact-link-item, .competency');
  all.forEach(el => {
    el.removeEventListener('mouseenter', onEnterHover);
    el.removeEventListener('mouseleave', onLeaveHover);
    el.addEventListener('mouseenter', onEnterHover);
    el.addEventListener('mouseleave', onLeaveHover);
  });
}

function onEnterHover() { cursorRing.classList.add('hovered'); }
function onLeaveHover() { cursorRing.classList.remove('hovered'); }

updateHoverTargets();

// ============================================================
// 16. PARALLAX SUTIL en HERO (mouse move)
// ============================================================
const heroContent = document.querySelector('.hero-content');

document.addEventListener('mousemove', (e) => {
  if (!heroContent) return;
  const xRatio = (e.clientX / window.innerWidth - 0.5) * 10;
  const yRatio = (e.clientY / window.innerHeight - 0.5) * 6;
  heroContent.style.transform = `translate(${xRatio * 0.4}px, ${yRatio * 0.4}px)`;
});
