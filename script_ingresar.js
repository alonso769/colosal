// Espera a que el DOM esté completamente cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', () => {
    let slideIndex = 0; // Índice de la imagen actual en el carrusel
    const slides = document.querySelector('.carousel-slide'); // El contenedor de todas las imágenes
    const images = document.querySelectorAll('.carousel-slide img'); // Todas las imágenes individuales
    const totalImages = images.length; // Número total de imágenes

    // Asegúrate de que haya imágenes para el carrusel antes de intentar manipularlas
    if (totalImages === 0) {
        console.warn("No se encontraron imágenes para el carrusel. Asegúrate de que las rutas sean correctas y las imágenes existan.");
        return; // Salir si no hay imágenes para evitar errores
    }

    // Establece el ancho inicial del contenedor de slides para que quepan todas las imágenes en una fila
    // Por ejemplo, si hay 4 imágenes, el ancho será 400% (4 * 100%)
    slides.style.width = `${totalImages * 100}%`;

    // Función para mostrar la imagen actual del carrusel
    function showSlides() {
        // Calcula la cantidad de desplazamiento necesaria.
        // Cada imagen ocupa un porcentaje del ancho total del 'carousel-slide' (100% / totalImages).
        // Multiplicamos esto por el índice actual para mover el slide.
        slides.style.transform = `translateX(${-slideIndex * (100 / totalImages)}%)`;
    }

    // Función para avanzar a la siguiente imagen
    function nextSlide() {
        // Incrementa el índice, y usa el operador módulo (%) para volver a 0 si se llega al final
        slideIndex = (slideIndex + 1) % totalImages;
        showSlides(); // Muestra la nueva imagen
    }

    // Configura un intervalo para cambiar automáticamente la imagen cada 5 segundos (5000 milisegundos)
    setInterval(nextSlide, 5000);

    // Llama a showSlides una vez al inicio para asegurar que la primera imagen se muestre correctamente
    showSlides();
});