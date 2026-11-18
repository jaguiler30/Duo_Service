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

/* ============================================================
   Tarjetas de servicio: "Ver más / Ver menos" + foto completa
   ============================================================ */
(function () {
  var tarjetas = document.querySelectorAll('.tarjeta-servicio');
  if (!tarjetas.length) return;

  tarjetas.forEach(function (t, i) {
    var cuerpo = t.querySelector('.tarjeta-servicio__body');
    var p = cuerpo.querySelector('p');
    var cta = cuerpo.querySelector('.btn-consultar');
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'tarjeta-servicio__mas';
    btn.textContent = 'Ver más';
    btn.setAttribute('aria-expanded', 'false');
    cuerpo.insertBefore(btn, cta);

    btn.addEventListener('click', function () {
      var abierta = t.classList.toggle('abierta');
      btn.textContent = abierta ? 'Ver menos' : 'Ver más';
      btn.setAttribute('aria-expanded', abierta ? 'true' : 'false');
    });

    t._medir = function () {
      if (t.classList.contains('abierta')) return;
      var hayLista = !!cuerpo.querySelector('.tarjeta-servicio__lista');
      var recortado = p.scrollHeight > p.clientHeight + 1;
      btn.classList.toggle('sin-mas', !(hayLista || recortado));
    };

    // Foto completa
    var media = t.querySelector('.tarjeta-servicio__media');
    media.setAttribute('tabindex', '0');
    media.setAttribute('role', 'button');
    media.setAttribute('aria-label', 'Ver foto completa: ' + cuerpo.querySelector('h3').textContent);
    media.addEventListener('click', function () { abrirVisor(media.querySelector('img')); });
    media.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); abrirVisor(media.querySelector('img')); }
    });
  });

  function medirTodas() { tarjetas.forEach(function (t) { t._medir(); }); }
  medirTodas();
  window.addEventListener('resize', medirTodas);
  window.addEventListener('load', medirTodas);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(medirTodas);

  // Visor
  var visor = document.createElement('div');
  visor.className = 'lightbox';
  visor.setAttribute('role', 'dialog');
  visor.setAttribute('aria-modal', 'true');
  visor.setAttribute('aria-label', 'Foto del servicio');
  visor.innerHTML = '<button type="button" class="lightbox__cerrar" aria-label="Cerrar">&times;</button><img alt="">';
  document.body.appendChild(visor);
  var visorImg = visor.querySelector('img');
  var cerrar = visor.querySelector('.lightbox__cerrar');

  function abrirVisor(img) {
    visorImg.src = img.currentSrc || img.src;
    visorImg.alt = img.alt;
    visor.classList.add('abierto');
    document.body.style.overflow = 'hidden';
    cerrar.focus();
  }
  function cerrarVisor() {
    visor.classList.remove('abierto');
    document.body.style.overflow = '';
  }
  visor.addEventListener('click', cerrarVisor);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') cerrarVisor(); });
})();
