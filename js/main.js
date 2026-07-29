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
});