// ============================================================
// DUO SERVICE J&N SAS — script principal
// Sin dependencias externas: funciona con solo abrir index.html
// ============================================================
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Menú móvil ---------- */
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.getElementById('menu');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const abierto = menu.classList.toggle('abierto');
      toggle.classList.toggle('abierto', abierto);
      toggle.setAttribute('aria-expanded', abierto ? 'true' : 'false');
    });

    // Cierra el menú al tocar un enlace (útil en móvil)
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('abierto');
        toggle.classList.remove('abierto');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Sombra del header al hacer scroll ---------- */
  const header = document.querySelector('.header');
  const alternarSombra = () => {
    if (!header) return;
    header.classList.toggle('con-sombra', window.scrollY > 10);
  };
  alternarSombra();
  window.addEventListener('scroll', alternarSombra, { passive: true });

  /* ---------- Resaltar enlace activo del menú según sección visible ---------- */
  const secciones = document.querySelectorAll('main section[id], section[id]');
  const enlacesMenu = document.querySelectorAll('.menu a[href^="#"]');

  if ('IntersectionObserver' in window && secciones.length && enlacesMenu.length) {
    const observerMenu = new IntersectionObserver((entradas) => {
      entradas.forEach((entrada) => {
        const id = entrada.target.getAttribute('id');
        const enlace = document.querySelector(`.menu a[href="#${id}"]`);
        if (!enlace) return;
        if (entrada.isIntersecting) {
          enlacesMenu.forEach(a => a.classList.remove('activo'));
          enlace.classList.add('activo');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    secciones.forEach(seccion => observerMenu.observe(seccion));
  }

  /* ---------- Animación "reveal" al hacer scroll ---------- */
  const elementosReveal = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && elementosReveal.length) {
    const observerReveal = new IntersectionObserver((entradas, obs) => {
      entradas.forEach((entrada, indice) => {
        if (entrada.isIntersecting) {
          // Pequeño desfase para que las tarjetas de una misma fila
          // aparezcan en cascada en lugar de todas a la vez
          const retraso = Number(entrada.target.dataset.retraso || 0);
          setTimeout(() => entrada.target.classList.add('in-view'), retraso);
          obs.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.15 });

    elementosReveal.forEach(el => observerReveal.observe(el));
  } else {
    // Sin soporte de IntersectionObserver: mostrar todo directamente
    elementosReveal.forEach(el => el.classList.add('in-view'));
  }

  /* ---------- Año automático en el footer ---------- */
  const anio = document.getElementById('anio-actual');
  if (anio) anio.textContent = new Date().getFullYear();

});
