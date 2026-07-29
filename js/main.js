// Espera a que TODO el HTML esté cargado antes de ejecutar el código (evita errores por buscar elementos que aún no existen)
document.addEventListener('DOMContentLoaded', () => {

  // Busca el botón hamburguesa en el HTML
  const navToggle = document.querySelector('.nav__toggle');
  // Busca la lista de links del menú
  const navMenu = document.querySelector('.nav__menu');

  // Verificación de seguridad: solo ejecuta el código si AMBOS elementos existen en la página
  if (navToggle && navMenu) {

    // Cuando el usuario hace click en el botón hamburguesa...
    navToggle.addEventListener('click', () => {
      // toggle() agrega la clase si no existe, o la quita si ya existe. Devuelve true/false según quedó
      const isOpen = navMenu.classList.toggle('is-open');
      // Lo mismo para el botón, así se anima la transformación a "X"
      navToggle.classList.toggle('is-active');
      // Actualiza el atributo de accesibilidad para lectores de pantalla (indica si el menú está abierto o cerrado)
      navToggle.setAttribute('aria-expanded', isOpen);
      // Cambia el texto que leerá un lector de pantalla, según el estado actual
      navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
    });

    // Selecciona TODOS los links del menú (Inicio, Nosotros, etc.) y recorre cada uno
    document.querySelectorAll('.nav__link').forEach(link => {
      // Cuando el usuario toca cualquier link del menú...
      link.addEventListener('click', () => {
        // Cierra el menú automáticamente (útil en móvil, para no tener que cerrarlo manualmente después de navegar)
        navMenu.classList.remove('is-open');
        navToggle.classList.remove('is-active');
        navToggle.setAttribute('aria-expanded', false);
      });
    });
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
});