// Joinnus Clone JavaScript

// --- Global Event Data ---
// Define tus eventos aquí. Cada objeto debe tener un ID único
// y todos los detalles que quieres mostrar en la página de detalles.
const eventsData = [
    {
        id: 'band-event-1',
        title: 'Concierto Exclusivo: Banda de Rock Peruana',
        image: 'images/band-event-1.jpg',
        dateTime: '28 JUL. 2025 - 09:00 PM',
        address: 'Barranco Arena',
        city: 'Lima, PE',
        fullAddress: 'Av. Bolognesi 123, Barranco',
        description: `Prepárate para una noche inolvidable con la banda de rock peruana más aclamada del momento. Disfruta de sus grandes éxitos y nuevas canciones en un ambiente vibrante. Un espectáculo lleno de energía y pasión por la música.`,
        additionalInfo: `Las puertas abren a las 8:00 PM. Se recomienda llegar temprano. Consumo de alcohol solo para mayores de 18 años con DNI. No se permite el ingreso con bebidas ni alimentos.`,
        tickets: [
            { name: 'Entrada General', price: 90.00 },
            { name: 'Entrada VIP (Acceso backstage)', price: 150.00 }
        ],
        organizer: 'ROCK & ROLL PRODUCCIONES',
        mapCoords: [-12.1490, -77.0250] // Coordenadas de Barranco Arena (ejemplo)
    },
    {
        id: 'band-event-2',
        title: 'Festival Andino de Rock',
        image: 'images/band-event-2.jpg',
        dateTime: '15 AGO. 2025 - 07:00 PM',
        address: 'Teatro Municipal',
        city: 'Cusco, PE',
        fullAddress: 'Calle Mesón de la Estrella 149, Cusco',
        description: `Un festival que fusiona el rock con sonidos andinos, presentando a bandas emergentes y consolidadas de la región. Una experiencia cultural y musical única en el corazón del Cusco.`,
        additionalInfo: `Evento apto para todas las edades. Menores de 12 años deben ingresar con un adulto. Prohibido el ingreso de alimentos y bebidas.`,
        tickets: [
            { name: 'Zona Platea', price: 70.00 },
            { name: 'Zona Balcón', price: 50.00 }
        ],
        organizer: 'CUSCO CULTURAL EVENTS',
        mapCoords: [-13.5167, -71.9778] // Coordenadas de Teatro Municipal Cusco (ejemplo)
    },
    {
        id: 'band-event-3',
        title: 'Rock bajo el Misti',
        image: 'images/band-event-3.jpg',
        dateTime: '03 SEP. 2025 - 08:30 PM',
        address: 'Jardín de la Cerveza',
        city: 'Arequipa, PE',
        fullAddress: 'Av. Ejército s/n, Arequipa',
        description: `Las mejores bandas de rock de Arequipa se unen para una noche épica bajo el majestuoso volcán Misti. Cerveza, música y mucha energía.`,
        additionalInfo: `Se requiere DNI para el ingreso. Prohibido el ingreso de botellas de vidrio. Zonas de comida y bebida disponibles.`,
        tickets: [
            { name: 'General', price: 60.00 },
            { name: 'Preferencial', price: 100.00 }
        ],
        organizer: 'AREQUIPA CONCIERTOS',
        mapCoords: [-16.3989, -71.5369] // Coordenadas del Jardín de la Cerveza (ejemplo)
    },
    {
        id: 'band-event-4',
        title: 'Trujillo Metal Fest',
        image: 'images/band-event-4.jpg',
        dateTime: '20 SEP. 2025 - 07:00 PM',
        address: 'Coliseo Gran Chimú',
        city: 'Trujillo, PE',
        fullAddress: 'Av. Gerónimo de la Torre s/n, Trujillo',
        description: `Un festival dedicado al metal en Trujillo. Bandas nacionales e internacionales se darán cita para una descarga de potencia sonora.`,
        additionalInfo: `No se permite el ingreso de objetos punzocortantes. Se verificará la edad al ingreso.`,
        tickets: [
            { name: 'Campo', price: 85.00 },
            { name: 'Gradería', price: 65.00 }
        ],
        organizer: 'METALHEAD PRODUCCIONES',
        mapCoords: [-8.1065, -79.0305] // Coordenadas del Coliseo Gran Chimú (ejemplo)
    },
    {
        id: 'band-event-5',
        title: 'Noche de Punk en Chiclayo',
        image: 'images/band-event-5.jpg',
        dateTime: '05 OCT. 2025 - 08:00 PM',
        address: 'Estadio Elías Aguirre',
        city: 'Chiclayo, PE',
        fullAddress: 'Av. Sáenz Peña 700, Chiclayo',
        description: `Celebra el espíritu punk con bandas icónicas de la escena local y nacional. Una noche de rebeldía y buena música en Chiclayo.`,
        additionalInfo: `Se recomienda el uso de calzado cómodo. Edad mínima 18 años.`,
        tickets: [
            { name: 'General', price: 50.00 },
            { name: 'Palco (vista preferencial)', price: 90.00 }
        ],
        organizer: 'PUNK ROCK COLLECTIVE',
        mapCoords: [-6.7725, -79.8454] // Coordenadas del Estadio Elías Aguirre (ejemplo)
    },
    {
        id: 'featured-event-1',
        title: 'Festival de Verano Rock',
        image: 'images/featured-event-1.jpg',
        dateTime: '15 DIC. 2025 - 06:00 PM',
        address: 'Parque de la Exposición',
        city: 'Lima, PE',
        fullAddress: 'Av. 28 de Julio, Lima',
        description: `Una noche inolvidable con las mejores bandas de rock locales. Disfruta de un ambiente al aire libre con excelente música y gastronomía.`,
        additionalInfo: `Evento familiar. Niños menores de 10 años no pagan. Se prohíbe el ingreso de mascotas.`,
        tickets: [
            { name: 'Entrada General', price: 45.00 },
            { name: 'Pack Familiar (4 personas)', price: 150.00 }
        ],
        organizer: 'FESTIVALES DE VERANO',
        mapCoords: [-12.0621, -77.0371] // Coordenadas del Parque de la Exposición (ejemplo)
    },
    {
        id: 'featured-event-2',
        title: 'Conferencia de Innovación Musical',
        image: 'images/featured-event-2.jpg',
        dateTime: '22 ENE. 2026 - 09:00 AM',
        address: 'Centro de Convenciones de Lima',
        city: 'Lima, PE',
        fullAddress: 'Av. de la Cultura 220, San Borja',
        description: `Explora las últimas tendencias y tecnologías en la industria musical. Charlas, talleres y networking con expertos del sector.`,
        additionalInfo: `Incluye coffee break y certificado de participación.`,
        tickets: [
            { name: 'Acceso General (1 día)', price: 120.00 },
            { name: 'Pase Completo (3 días)', price: 300.00 }
        ],
        organizer: 'MUSIC TECH SUMMIT',
        mapCoords: [-12.0917, -76.9930] // Coordenadas del Centro de Convenciones de Lima (ejemplo)
    },
    {
        id: 'featured-event-3',
        title: 'Noche de Jazz & Blues',
        image: 'images/featured-event-3.jpg',
        dateTime: '28 FEB. 2026 - 08:00 PM',
        address: 'Gran Teatro Nacional',
        city: 'Lima, PE',
        fullAddress: 'Av. Javier Prado Este 2225, San Borja',
        description: `Disfruta de una velada elegante con los clásicos del jazz y blues interpretados por artistas de talla nacional e internacional.`,
        additionalInfo: `Código de vestimenta formal. Consumo de bebidas disponible en el lobby.`,
        tickets: [
            { name: 'Zona Preferencial', price: 70.00 },
            { name: 'Zona VIP', price: 100.00 },
            { name: 'Palco (4 personas)', price: 250.00 }
        ],
        organizer: 'JAZZ BLUES SHOWS',
        mapCoords: [-12.0945, -76.9932] // Coordenadas del Gran Teatro Nacional (ejemplo)
    },
    {
        id: 'featured-event-4',
        title: 'Batalla de Bandas Emergentes',
        image: 'images/featured-event-4.jpg',
        dateTime: '05 MAR. 2026 - 07:30 PM',
        address: 'Sargento Pimienta',
        city: 'Barranco, PE',
        fullAddress: 'Av. Bolognesi 757, Barranco',
        description: `Descubre nuevos talentos y apoya la escena musical local en esta emocionante batalla de bandas. ¡Tú eliges al ganador!`,
        additionalInfo: `Solo mayores de 18 años. ID obligatoria.`,
        tickets: [
            { name: 'Entrada General', price: 25.00 },
            { name: 'Entrada con Bebida', price: 40.00 }
        ],
        organizer: 'TALENTOS OCULTOS',
        mapCoords: [-12.1480, -77.0255] // Coordenadas de Sargento Pimienta (ejemplo)
    },
    // El evento "BAR CRAWL LIMA" que me pasaste como imagen
    {
        id: 'bar-crawl-lima',
        title: 'BAR CRAWL LIMA: TOUR DE BARES POR BARRANCO',
        image: 'images/bar-crawl-lima.jpg', // Asegúrate de tener esta imagen en tu carpeta 'images'
        dateTime: '14, 15 y 16 de Julio - 08:30 PM',
        address: 'Puerta Principal de la Iglesia del Parque Municipal de Barranco',
        city: 'Lima, PE',
        fullAddress: 'Frente a la Parroquia La Santísima Cruz, Parque Municipal de Barranco',
        description: `¿Deseas experimentar la mejor fiesta de Lima mientras conoces gente nueva de Perú u otras partes del mundo? Ahora Bar Crawl Lima abre en Barranco, luego de más de 10 años en las noches miraflorinas y con salidas cada semana. Descubriremos el distrito más bohemio de Lima llevándote a los mejores lugares de fiesta. Te llevaremos a los 3 bares donde recibirás 1 shot de bienvenida, así como los mejores precios en bebidas y terminar la salida bailando hasta no más dar. También podrás conocer personas de todas partes del mundo y hacerte sentir como en casa con diferentes juegos y dinámicas a lo largo de la noche.`,
        additionalInfo: `Nuestro recorrido inicia a las 8:30 PM. Nos encontramos en la puerta de la Iglesia en el Parque Municipal de Barranco, donde nos pueden reconocer por los paraguas amarillos con el logo de Bar Crawl Lima. Esperaremos unos 15 minutos a las personas que demoraron o asisten al recorrido al momento. Cada salida de tour tiene una duración aproximada de 1 hora. En el primero, la idea es conocernos entre todos los asistentes y generar un buen vínculo. En el segundo comenzamos los juegos y nos iremos preparando para el tercer bar, que suele tener música bailable. Aproximadamente a la medianoche ingresaremos al último lugar, en la que pueden permanecer hasta la hora ustedes deseen. Cabe mencionar que se ofrece 1 shot gratis por bar, así como descuentos especiales exclusivos para el grupo de Bar Crawl Lima para que así solo te preocupes en pasarla muy bien. El código de vestimenta es: No sandalias, no shorts, no buzos, no ropa de baño ni ropa deportiva, ya que los lugares podrían reservarse su derecho de admisión por ello. Atención: por un itinerario a seguir con el fin del éxito del recorrido y por respeto a los demás clientes ya que algunos bares tienen aforo. Es obligatorio presentar el DNI físico para el ingreso a los bares y para el consumo de alcohol. La edad mínima es de 18 años.`,
        tickets: [
            { name: 'BAR CRAWL LIMA TICKETS', price: 80.00 },
            { name: 'BAR CRAWL LIMA TICKETS - Gratidays', price: 54.00 }
        ],
        organizer: 'JOINNUS SAC', // O el organizador real si es diferente
        mapCoords: [-12.1466, -77.0229] // Coordenadas del Parque Municipal de Barranco
    }
];

// --- General DOM Elements (used across pages) ---
// Estos elementos solo existen en index.html, así que los seleccionamos condicionalmente
const carouselTrack = document.querySelector('.carousel-track');
let carouselSlides = carouselTrack ? Array.from(document.querySelectorAll('.carousel-slide')) : [];
const nextButton = document.querySelector('.carousel-button.next');
const prevButton = document.querySelector('.carousel-button.prev');
const dotsContainer = document.querySelector('.carousel-dots');

let slideWidth;
let currentIndex = 0;
let autoSlideInterval;
const AUTO_SLIDE_DELAY = 3000;

// --- Carousel Functions (primarily for index.html hero carousel) ---
function setupCarousel() {
    if (carouselSlides.length > 0) {
        slideWidth = carouselSlides[0].getBoundingClientRect().width;
        // Adjust initial position to show the first real slide (after the cloned last one)
        carouselTrack.style.transform = `translateX(-${slideWidth}px)`;
    }
}

function cloneSlides() {
    // Only clone if they haven't been cloned already and we have slides
    if (carouselTrack && carouselSlides.length > 0 && carouselTrack.children.length === carouselSlides.length) { 
        const firstSlide = carouselSlides[0].cloneNode(true);
        const lastSlide = carouselSlides[carouselSlides.length - 1].cloneNode(true);

        firstSlide.classList.add('cloned-first');
        lastSlide.classList.add('cloned-last');

        carouselTrack.appendChild(firstSlide);
        carouselTrack.insertBefore(lastSlide, carouselSlides[0]);
        
        // Re-get all slides including clones
        carouselSlides = Array.from(document.querySelectorAll('.carousel-slide'));

        // Reset transition to instantly jump to the correct starting position
        carouselTrack.style.transition = 'none';
        carouselTrack.style.transform = `translateX(-${slideWidth}px)`;
        
        // Re-enable transition after a small delay
        setTimeout(() => {
            carouselTrack.style.transition = 'transform 0.5s ease-in-out';
        }, 50);
    }
}

function moveToSlide(targetIndex) {
    if (carouselTrack) {
        // The +1 accounts for the cloned last slide at the beginning
        carouselTrack.style.transform = `translateX(-${(targetIndex + 1) * slideWidth}px)`;
        updateDots(targetIndex);
        currentIndex = targetIndex;
    }
}

function updateDots(targetIndex) {
    if (dotsContainer && dotsContainer.children.length > 0) {
        Array.from(dotsContainer.children).forEach(dot => dot.classList.remove('active'));
        if (dotsContainer.children[targetIndex]) {
            dotsContainer.children[targetIndex].classList.add('active');
        }
    }
}

function createDots() {
    // Create dots only for the original slides, not the clones
    if (dotsContainer && carouselSlides.length > 2) { // More than 2 because of the 2 cloned slides
        dotsContainer.innerHTML = '';
        // Loop through original slides (total slides - 2 cloned)
        for (let i = 0; i < carouselSlides.length - 2; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.dataset.index = i;
            dot.addEventListener('click', () => {
                moveToSlide(i);
                stopAutoSlide(); // Stop and restart on manual dot click
                startAutoSlide();
            });
            dotsContainer.appendChild(dot);
        }
        updateDots(currentIndex); // Set initial active dot
    }
}

function slideNext() {
    let newIndex = currentIndex + 1;
    // Check if we are at the last real slide
    if (newIndex >= carouselSlides.length - 2) {
        newIndex = 0; // Wrap around to the first real slide
    }
    moveToSlide(newIndex);
}

function slidePrev() {
    let newIndex = currentIndex - 1;
    // Check if we are at the first real slide
    if (newIndex < 0) {
        newIndex = carouselSlides.length - 3; // Wrap around to the last real slide (before cloned one)
    }
    moveToSlide(newIndex);
}

function startAutoSlide() {
    stopAutoSlide(); // Clear any existing interval to prevent multiple intervals
    autoSlideInterval = setInterval(() => {
        slideNext();
    }, AUTO_SLIDE_DELAY); 
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Event listeners for carousel navigation buttons
if (nextButton) {
    nextButton.addEventListener('click', () => {
        slideNext();
        stopAutoSlide(); // Stop auto-slide on manual navigation
        startAutoSlide(); // Restart auto-slide after manual interaction
    });
}

if (prevButton) {
    prevButton.addEventListener('click', () => {
        slidePrev();
        stopAutoSlide(); // Stop auto-slide on manual navigation
        startAutoSlide(); // Restart auto-slide after manual interaction
    });
}

if (carouselTrack) {
    carouselTrack.addEventListener('transitionend', () => {
        const currentTransform = getComputedStyle(carouselTrack).transform;
        const matrix = new DOMMatrixReadOnly(currentTransform);
        const currentX = matrix.m41;
        const visibleClonedIndex = Math.round(Math.abs(currentX) / slideWidth);

        // If we are on the cloned first slide (which is visually the original last slide)
        if (visibleClonedIndex === carouselSlides.length - 1) { // Index of the cloned first slide (at the end)
            carouselTrack.style.transition = 'none';
            carouselTrack.style.transform = `translateX(-${slideWidth}px)`; // Jump to the real first slide
            currentIndex = 0;
            updateDots(currentIndex);
        } 
        // If we are on the cloned last slide (which is visually the original first slide)
        else if (visibleClonedIndex === 0) { // Index of the cloned last slide (at the beginning)
            carouselTrack.style.transition = 'none';
            carouselTrack.style.transform = `translateX(-${(carouselSlides.length - 2) * slideWidth}px)`; // Jump to the real last slide
            currentIndex = carouselSlides.length - 3; // Adjust to the last original slide's index
            updateDots(currentIndex);
        }
        
        // Re-enable transition after a very small delay to allow the jump to render
        setTimeout(() => {
            carouselTrack.style.transition = 'transform 0.5s ease-in-out';
        }, 50);
    });
}

// --- New Gallery Carousel Logic ---
// This assumes a separate gallery carousel with its own buttons/track
let galleryCarouselTrack = document.querySelector('.gallery-carousel-track');
let galleryCarouselSlides = galleryCarouselTrack ? Array.from(document.querySelectorAll('.gallery-carousel-slide')) : [];
let galleryCurrentIndex = 0;
let gallerySlideWidth;

function setupGalleryCarousel() {
    if (galleryCarouselSlides.length > 0) {
        gallerySlideWidth = galleryCarouselSlides[0].getBoundingClientRect().width;
        galleryCarouselTrack.style.transform = `translateX(-${galleryCurrentIndex * gallerySlideWidth}px)`;
    }
}

function moveGalleryToSlide(targetIndex) {
    if (galleryCarouselTrack) {
        galleryCarouselTrack.style.transform = `translateX(-${targetIndex * gallerySlideWidth}px)`;
        galleryCurrentIndex = targetIndex;
    }
}

function slideGalleryNext() {
    let newIndex = galleryCurrentIndex + 1;
    if (newIndex >= galleryCarouselSlides.length) {
        newIndex = 0;
    }
    moveGalleryToSlide(newIndex);
}

function slideGalleryPrev() {
    let newIndex = galleryCurrentIndex - 1;
    if (newIndex < 0) {
        newIndex = galleryCarouselSlides.length - 1;
    }
    moveGalleryToSlide(newIndex);
}

// Add event listeners for gallery carousel buttons
const galleryNextButton = document.querySelector('.gallery-carousel-button.next');
const galleryPrevButton = document.querySelector('.gallery-carousel-button.prev');

if (galleryNextButton) {
    galleryNextButton.addEventListener('click', slideGalleryNext);
}
if (galleryPrevButton) {
    galleryPrevButton.addEventListener('click', slideGalleryPrev);
}


// --- Event Details Page Specific Logic ---
let currentMap = null; // Variable para almacenar la instancia del mapa

function setupEventDetailsPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('id'); // Obtener el ID del evento de la URL

    const selectedEvent = eventsData.find(event => event.id === eventId);

    if (!selectedEvent) {
        console.error('Evento no encontrado para el ID:', eventId);
        // Podrías redirigir a una página de error o mostrar un mensaje
        document.querySelector('.event-details-content .container').innerHTML = '<h2 style="text-align:center; color:var(--color-off-white);">Evento no encontrado.</h2>';
        return;
    }

    // Rellenar el contenido de la página con los datos del evento
    document.title = `Detalles del Evento - ${selectedEvent.title}`;
    // Si tienes un elemento con ID 'event-detail-title' para el título principal de la página de detalles
    const pageTitleElement = document.getElementById('event-detail-title');
    if (pageTitleElement) {
        pageTitleElement.textContent = `Detalles del Evento - ${selectedEvent.title}`;
    }
    
    document.getElementById('event-banner-image').style.backgroundImage = `url(${selectedEvent.image})`;
    document.getElementById('event-detail-name').textContent = selectedEvent.title;
    document.getElementById('event-detail-date-time').textContent = selectedEvent.dateTime;
    document.getElementById('event-detail-address').textContent = selectedEvent.address;
    document.getElementById('event-detail-description').innerHTML = `<p>${selectedEvent.description.replace(/\n/g, '</p><p>')}</p>`;
    document.getElementById('event-detail-additional-info').innerHTML = `<p>${selectedEvent.additionalInfo.replace(/\n/g, '</p><p>')}</p>`;
    document.getElementById('organizer-name').textContent = selectedEvent.organizer;
    document.getElementById('event-detail-city').textContent = selectedEvent.city;
    document.getElementById('event-detail-full-address').textContent = selectedEvent.fullAddress;

    // Generar los tipos de tickets dinámicamente
    const ticketTypesContainer = document.getElementById('ticket-types-container');
    ticketTypesContainer.innerHTML = ''; // Limpiar cualquier contenido previo

    selectedEvent.tickets.forEach((ticket, index) => {
        const ticketDiv = document.createElement('div');
        ticketDiv.classList.add('ticket-type');
        ticketDiv.innerHTML = `
            <span class="ticket-name">${ticket.name}</span>
            <span class="ticket-price">S/ ${ticket.price.toFixed(2)}</span>
            <div class="quantity-selector">
                <button class="quantity-btn minus-btn" data-type="ticket-${index}">-</button>
                <input type="number" value="0" min="0" class="ticket-quantity" id="ticket-quantity-ticket-${index}" data-price="${ticket.price}">
                <button class="quantity-btn plus-btn" data-type="ticket-${index}">+</button>
            </div>
        `;
        ticketTypesContainer.appendChild(ticketDiv);
    });

    const totalPriceSpan = document.getElementById('total-price');
    const purchaseBtn = document.querySelector('.purchase-btn');
    const discountToggle = document.querySelector('.discount-toggle');
    const discountInputArea = document.querySelector('.discount-input-area');
    const privacyConsent = document.getElementById('privacy-consent');
    const ageConsent = document.getElementById('age-consent');
    const viewMapLink = document.getElementById('view-map-link');

    let total = 0;

    function calculateTotal() {
        total = 0;
        document.querySelectorAll('.ticket-quantity').forEach(input => {
            const price = parseFloat(input.dataset.price);
            const quantity = parseInt(input.value);
            if (!isNaN(price) && !isNaN(quantity) && quantity > 0) {
                total += price * quantity;
            }
        });
        totalPriceSpan.textContent = `S/ ${total.toFixed(2)}`;
    }

    // Re-attach event listeners for newly created quantity selectors
    document.querySelectorAll('.quantity-selector').forEach(selector => {
        const minusBtn = selector.querySelector('.minus-btn');
        const plusBtn = selector.querySelector('.plus-btn');
        const quantityInput = selector.querySelector('.ticket-quantity');

        minusBtn.addEventListener('click', () => {
            let currentValue = parseInt(quantityInput.value);
            if (currentValue > 0) {
                quantityInput.value = currentValue - 1;
                calculateTotal();
            }
        });

        plusBtn.addEventListener('click', () => {
            let currentValue = parseInt(quantityInput.value);
            quantityInput.value = currentValue + 1;
            calculateTotal();
        });

        quantityInput.addEventListener('change', () => {
            let value = parseInt(quantityInput.value);
            if (isNaN(value) || value < 0) {
                quantityInput.value = 0;
            }
            calculateTotal();
        });
    });

    if (purchaseBtn) {
        purchaseBtn.addEventListener('click', () => {
            if (total === 0) {
                alert('Por favor, selecciona al menos una entrada para comprar.');
                return;
            }
            if (!privacyConsent || !privacyConsent.checked) {
                alert('Debes aceptar la política de privacidad para continuar.');
                return;
            }
            if (!ageConsent || !ageConsent.checked) {
                alert('Debes confirmar que eres mayor de 18 años para comprar entradas.');
                return;
            }
            alert(`Compra simulada por un total de: S/ ${total.toFixed(2)}\n¡Gracias por tu compra!`);
        });
    }

    if (discountToggle) {
        discountToggle.addEventListener('click', () => {
            if (discountInputArea.style.display === 'flex') {
                discountInputArea.style.display = 'none';
            } else {
                discountInputArea.style.display = 'flex';
            }
            const arrowIcon = discountToggle.querySelector('.arrow-icon');
            if (arrowIcon) {
                arrowIcon.classList.toggle('rotated');
            }
        });
    }

    // Initial calculation
    calculateTotal();
    
    // Initialize map if it exists
    const mapElement = document.getElementById('map');
    if (mapElement && selectedEvent.mapCoords) {
        // Destruir mapa existente si lo hay para evitar duplicados al recargar dinámicamente
        if (currentMap) {
            currentMap.remove();
        }
        currentMap = L.map('map').setView(selectedEvent.mapCoords, 16);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(currentMap);

        L.marker(selectedEvent.mapCoords).addTo(currentMap)
            .bindPopup(selectedEvent.address)
            .openPopup();
        
        // Actualizar enlace de Google Maps
        if (viewMapLink) {
            // Asegúrate de que esta URL sea correcta. Usualmente es https://www.google.com/maps/search/?api=1&query=LAT,LONG
            viewMapLink.href = `https://www.google.com/maps/search/?api=1&query=${selectedEvent.mapCoords[0]},${selectedEvent.mapCoords[1]}`;
        }
    }
}


// --- General Interactions (apply to both pages) ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        const nav = document.querySelector('.nav');
        const authButtons = document.querySelector('.auth-buttons');
        // Only attempt to close if mobile menu is open
        if (nav && nav.classList.contains('mobile-nav-open')) {
            nav.classList.remove('mobile-nav-open');
            if (authButtons) {
                authButtons.classList.remove('mobile-nav-open');
            }
            // Update mobile menu button icon
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            if (mobileMenuBtn) {
                mobileMenuBtn.innerHTML = '☰';
                mobileMenuBtn.setAttribute('aria-label', 'Abrir menú móvil');
            }
        }
    });
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

// Observe only elements relevant to the current page if needed
document.querySelectorAll('.event-card, .upcoming-event-card').forEach(el => {
    observer.observe(el);
});

// For the new gallery elements
document.querySelectorAll('.gallery-carousel-slide, .collage-item').forEach(el => {
    observer.observe(el);
});


function createMobileMenu() {
    const nav = document.querySelector('.nav');
    const navWrapper = document.querySelector('.nav-wrapper');
    const authButtons = document.querySelector('.auth-buttons');
    
    let mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (!mobileMenuBtn && navWrapper) { // Only create if navWrapper exists and button doesn't
        mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '☰';
        mobileMenuBtn.setAttribute('aria-label', 'Abrir menú móvil');
        navWrapper.appendChild(mobileMenuBtn);
    }
    
    if (mobileMenuBtn && nav && authButtons) { // Ensure all elements exist before adding listener
        mobileMenuBtn.addEventListener('click', () => {
            nav.classList.toggle('mobile-nav-open');
            authButtons.classList.toggle('mobile-nav-open');
            if (nav.classList.contains('mobile-nav-open')) {
                mobileMenuBtn.innerHTML = '✕';
                mobileMenuBtn.setAttribute('aria-label', 'Cerrar menú móvil');
            } else {
                mobileMenuBtn.innerHTML = '☰';
                mobileMenuBtn.setAttribute('aria-label', 'Abrir menú móvil');
            }
        });
    } else {
        console.warn("Mobile menu elements not found (nav, auth-buttons, or mobile-menu-btn). Mobile menu functionality might not work.");
    }
    
    function checkScreenSize() {
        if (nav && authButtons && mobileMenuBtn) { // Ensure elements exist
            if (window.innerWidth > 768) { // Desktop view
                nav.classList.remove('mobile-nav-open');
                authButtons.classList.remove('mobile-nav-open');
                mobileMenuBtn.innerHTML = '☰'; // Reset icon in case it was '✕'
                mobileMenuBtn.setAttribute('aria-label', 'Abrir menú móvil');
            }
            // For smaller screens, the toggle handles the state
        }
    }
    
    window.addEventListener('resize', checkScreenSize);
    checkScreenSize(); // Initial check on load
}

console.log(`
🎉 ¡Bienvenido al clon de Joinnus!
🚀 Esta es una plataforma de descubrimiento de eventos de música.
💻 Construida con HTML, CSS y JavaScript.
📱 Diseño totalmente responsive.
✨ Características interactivas incluidas.

Características:
- Carrusel de imágenes (hero y galería).
- Sección de próximos conciertos de la banda.
- Página de detalles de evento con compra simulada.
- Mapa interactivo de ubicación.
- Diseño responsive.
- Animaciones suaves.
- Navegación amigable para móviles.
- Galería de imágenes con collage.
`);


// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    console.log('Joinnus Clone cargado exitosamente!');
    
    // Check if on index.html or event_details.html
    if (document.querySelector('.hero-carousel-section')) {
        // Logic for index.html
        if (carouselTrack && carouselSlides.length > 0) {
            setupCarousel();
            cloneSlides(); // Call cloneSlides after setupCarousel to get initial width
            createDots();
            updateDots(currentIndex); // Ensure the first dot is active on load
            startAutoSlide();
        } else {
             console.warn("Hero carousel elements not found. Hero carousel functionality will not work.");
        }

        if (galleryCarouselTrack && galleryCarouselSlides.length > 0) {
            setupGalleryCarousel();
        } else {
            console.warn("Gallery carousel elements not found. Gallery carousel functionality might not work.");
        }
    } else if (document.querySelector('.event-details-content')) {
        // Logic for event_details.html
        setupEventDetailsPage();
    }

    createMobileMenu();
    
    // Add a slight delay for body class to ensure CSS transitions apply smoothly
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

window.addEventListener('resize', () => {
    // Recalculate slide width and adjust transform on resize for hero carousel
    if (document.querySelector('.hero-carousel-section') && carouselTrack && carouselSlides.length > 0) {
        slideWidth = carouselSlides[0].getBoundingClientRect().width;
        carouselTrack.style.transition = 'none'; // Temporarily disable transition
        carouselTrack.style.transform = `translateX(-${(currentIndex + 1) * slideWidth}px)`;
        // Re-enable transition after a very small delay
        setTimeout(() => {
            carouselTrack.style.transition = 'transform 0.5s ease-in-out';
        }, 50);
    }
    // Recalculate slide width and adjust transform on resize for gallery carousel
    if (document.querySelector('.gallery-carousel-container') && galleryCarouselTrack && galleryCarouselSlides.length > 0) {
        setupGalleryCarousel(); // This already handles resize logic for gallery
    }
});