// Espera a que TODO el HTML esté cargado antes de ejecutar el código (evita errores por buscar elementos que aún no existen)
document.addEventListener('DOMContentLoaded', () => {

const navToggle = document.querySelector('.nav__toggle');
const navMenu = document.querySelector('.nav__menu');
const navOverlay = document.querySelector('.nav__overlay');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.classList.toggle('is-active');
    if (navOverlay) navOverlay.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', isOpen);
    navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
  });

  document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      navToggle.classList.remove('is-active');
      if (navOverlay) navOverlay.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', false);
    });
  });

  if (navOverlay) {
    navOverlay.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      navToggle.classList.remove('is-active');
      navOverlay.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', false);
    });
  }
}
  // Busca el formulario en el HTML usando su id
const formularioContacto = document.getElementById('formulario-contacto');

// Verificación de seguridad: solo ejecuta el código si el formulario existe en esta página (evita errores en las otras páginas que no tienen este formulario)
if (formularioContacto) {

  // Escucha el evento "submit", que se dispara cuando el usuario da clic en el botón de enviar
  formularioContacto.addEventListener('submit', (evento) => {
    // Evita el comportamiento por defecto del formulario (que normalmente recargaría la página o intentaría enviar a un servidor)
    evento.preventDefault();

    // Obtiene el valor que el usuario escribió/seleccionó en cada campo, usando su id
    const nombre = document.getElementById('nombre').value;
    const tipoEvento = document.getElementById('tipo-evento').value;
    const servicio = document.getElementById('servicio').value;
    const fecha = document.getElementById('fecha').value;
    const invitados = document.getElementById('invitados').value;
    const mensaje = document.getElementById('mensaje').value;

    let texto = `Hola, soy ${nombre}. Me interesa cotizar una barra para mi evento.\n\n`;
    texto += `Tipo de evento: ${tipoEvento}\n`;
    texto += `Barra de interés: ${servicio}\n`;
    texto += `Fecha: ${fecha}\n`;
    texto += `Número de invitados: ${invitados}`;
    // El mensaje adicional es opcional, solo se agrega si el usuario escribió algo
    if (mensaje) {
      texto += `\n\nMensaje adicional: ${mensaje}`;
    }

    // encodeURIComponent convierte espacios, saltos de línea y acentos en el formato que necesita una URL (%20, %0A, etc.)
    const textoCodificado = encodeURIComponent(texto);
    // Tu número de WhatsApp, mismo que usamos en el resto del sitio
    const numeroWhatsApp = '525519778386';
    // Arma la URL completa de WhatsApp con el mensaje ya codificado
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${textoCodificado}`;

    // Abre esa URL en una pestaña nueva, llevando al usuario directo a WhatsApp con el mensaje ya escrito
    window.open(urlWhatsApp, '_blank');
  });
}
const galeriaItems = document.querySelectorAll('.galeria__item img');
const lightbox = document.getElementById('lightbox');
const lightboxImagen = document.getElementById('lightbox-imagen');
const lightboxCerrar = document.getElementById('lightbox-cerrar');
const lightboxAnterior = document.getElementById('lightbox-anterior');
const lightboxSiguiente = document.getElementById('lightbox-siguiente');

if (lightbox && galeriaItems.length > 0) {
  let indiceActual = 0;

  function abrirLightbox(indice) {
    indiceActual = indice;
    lightboxImagen.src = galeriaItems[indice].src;
    lightboxImagen.alt = galeriaItems[indice].alt;
    lightbox.classList.add('is-open');
  }

  function cerrarLightbox() {
    lightbox.classList.remove('is-open');
  }

  function mostrarSiguiente() {
    indiceActual = (indiceActual + 1) % galeriaItems.length;
    lightboxImagen.src = galeriaItems[indiceActual].src;
    lightboxImagen.alt = galeriaItems[indiceActual].alt;
  }

  function mostrarAnterior() {
    indiceActual = (indiceActual - 1 + galeriaItems.length) % galeriaItems.length;
    lightboxImagen.src = galeriaItems[indiceActual].src;
    lightboxImagen.alt = galeriaItems[indiceActual].alt;
  }

  galeriaItems.forEach((img, indice) => {
    img.addEventListener('click', () => abrirLightbox(indice));
  });

  lightboxCerrar.addEventListener('click', cerrarLightbox);
  lightboxSiguiente.addEventListener('click', mostrarSiguiente);
  lightboxAnterior.addEventListener('click', mostrarAnterior);

  lightbox.addEventListener('click', (evento) => {
    if (evento.target === lightbox) {
      cerrarLightbox();
    }
  });

  document.addEventListener('keydown', (evento) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (evento.key === 'Escape') cerrarLightbox();
    if (evento.key === 'ArrowRight') mostrarSiguiente();
    if (evento.key === 'ArrowLeft') mostrarAnterior();
  });
}
const elementosReveal = document.querySelectorAll('.reveal');

if (elementosReveal.length > 0) {
  const observadorReveal = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('is-visible');
        observadorReveal.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.15 });

  elementosReveal.forEach((elemento) => observadorReveal.observe(elemento));
}

const iconosDistintivo = document.querySelectorAll('.distintivo__icono');

if (iconosDistintivo.length > 0) {
  const observadorIconos = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      entrada.target.classList.toggle('is-activo', entrada.isIntersecting);
    });
  }, { threshold: 0.5 });

  iconosDistintivo.forEach((icono) => observadorIconos.observe(icono));
}

const barraProgreso = document.getElementById('progreso-scroll');

if (barraProgreso) {
  window.addEventListener('scroll', () => {
    const alturaTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollActual = document.documentElement.scrollTop;
    const porcentaje = (scrollActual / alturaTotal) * 100;
    barraProgreso.style.width = porcentaje + '%';
  });
}

const headerNav = document.querySelector('.header');
let ultimoScroll = 0;
let tickingHeader = false;

if (headerNav) {
  window.addEventListener('scroll', () => {
    if (!tickingHeader) {
      window.requestAnimationFrame(() => {
        const scrollActual = window.scrollY;
        const diferencia = scrollActual - ultimoScroll;

        if (scrollActual > 150 && diferencia > 5) {
          headerNav.classList.add('header--oculto');
        } else if (diferencia < -5 || scrollActual <= 150) {
          headerNav.classList.remove('header--oculto');
        }

        ultimoScroll = scrollActual;
        tickingHeader = false;
      });

      tickingHeader = true;
    }
  });
}

function activarContador(idCampo, idContador, limite) {
  const campo = document.getElementById(idCampo);
  const contador = document.getElementById(idContador);

  if (campo && contador) {
    campo.addEventListener('input', () => {
      contador.textContent = `${campo.value.length}/${limite}`;
    });
  }
}

activarContador('nombre', 'contador-nombre', 30);
activarContador('mensaje', 'contador-mensaje', 200);

const campoNombre = document.getElementById('nombre');

if (campoNombre) {
  campoNombre.addEventListener('input', () => {
    campoNombre.value = campoNombre.value.replace(/[^a-zA-ZÀ-ÿñÑ\s]/g, '');
  });
}

const campoInvitados = document.getElementById('invitados');

if (campoInvitados) {
  campoInvitados.addEventListener('input', () => {
    campoInvitados.value = campoInvitados.value.replace(/[^0-9]/g, '');
  });
}
});