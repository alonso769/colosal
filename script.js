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
        else if (visibleClonedIndex === 0) {
            carouselTrack.style.transition = 'none';
            carouselTrack.style.transform = `translateX(-${(carouselSlides.length - 2) * slideWidth}px)`; // Jump to the real last slide
            currentIndex = carouselSlides.length - 3; // Adjust to the last original slide's index
            updateDots(currentIndex);
        }
        
        setTimeout(() => {
            carouselTrack.style.transition = 'transform 0.5s ease-in-out';
        }, 50);
    });
}

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

async function setupEventDetailsPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('id'); // Obtener el ID del evento de la URL

    if (!eventId) {
        console.error('ID de evento no proporcionado en la URL.');
        document.querySelector('.event-details-content .container').innerHTML = '<h2 style="text-align:center; color:var(--color-off-white);">ID de evento no encontrado.</h2>';
        return;
    }

    let selectedEvent = null;
    try {
        const response = await fetch(`http://localhost:3000/api/events/${eventId}`);
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Evento no encontrado.');
            }
            throw new Error(`Error HTTP: ${response.status}`);
        }
        selectedEvent = await response.json();
    } catch (error) {
        console.error('Error al cargar los detalles del evento:', error);
        document.querySelector('.event-details-content .container').innerHTML = `<h2 style="text-align:center; color:var(--color-off-white);">Error al cargar el evento: ${error.message}</h2>`;
        return;
    }

    if (!selectedEvent) {
        console.error('Evento no encontrado para el ID:', eventId);
        document.querySelector('.event-details-content .container').innerHTML = '<h2 style="text-align:center; color:var(--color-off-white);">Evento no encontrado.</h2>';
        return;
    }

    // Rellenar el contenido de la página con los datos del evento
    document.title = `Detalles del Evento - ${selectedEvent.title}`;
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
    if (mapElement && selectedEvent.mapCoords && selectedEvent.mapCoords.length === 2) {
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
            viewMapLink.href = `https://www.google.com/maps/search/?api=1&query=${selectedEvent.mapCoords[0]},${selectedEvent.mapCoords[1]}`;
        }
    } else if (mapElement) {
        mapElement.innerHTML = '<p>Coordenadas de mapa no disponibles para este evento.</p>';
        mapElement.style.display = 'flex'; // Asegura que el mensaje sea visible
        mapElement.style.justifyContent = 'center';
        mapElement.style.alignItems = 'center';
        mapElement.style.minHeight = '200px';
    }
}

// Nueva función para renderizar eventos en la página principal (menu.html o index.html)
async function renderEventsOnMenuPage() {
    const upcomingEventsList = document.querySelector('.upcoming-events-list');
    const featuredEventsGrid = document.querySelector('.events-grid');

    if (!upcomingEventsList && !featuredEventsGrid) {
        return; // No estamos en la página que necesita renderizar eventos
    }

    // Limpiar contenido inicial (Loading...)
    if (upcomingEventsList) upcomingEventsList.innerHTML = '<p style="text-align:center; color:var(--color-off-white);">Cargando conciertos...</p>';
    if (featuredEventsGrid) featuredEventsGrid.innerHTML = '<p style="text-align:center; color:var(--color-off-white);">Cargando eventos destacados...</p>';

    let allEvents = [];
    try {
        const response = await fetch('http://localhost:3000/api/events');
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        allEvents = await response.json();
        
        if (allEvents.length === 0) {
            if (upcomingEventsList) upcomingEventsList.innerHTML = '<p style="text-align:center; color:var(--color-off-white);">No hay conciertos disponibles en este momento.</p>';
            if (featuredEventsGrid) featuredEventsGrid.innerHTML = '<p style="text-align:center; color:var(--color-off-white);">No hay eventos destacados disponibles en este momento.</p>';
            return;
        }

    } catch (error) {
        console.error('Error al cargar los eventos:', error);
        if (upcomingEventsList) upcomingEventsList.innerHTML = `<p style="text-align:center; color:var(--color-off-white);">Error al cargar conciertos: ${error.message}</p>`;
        if (featuredEventsGrid) featuredEventsGrid.innerHTML = `<p style="text-align:center; color:var(--color-off-white);">Error al cargar eventos destacados: ${error.message}</p>`;
        return;
    }

    // Filtrar eventos de banda para la sección "Próximos Conciertos de la Banda"
    // Asumimos que los eventos de banda tienen un ID que empieza con 'band-event'
    const bandEvents = allEvents.filter(event => event.id.startsWith('band-event'));
    if (upcomingEventsList) {
        upcomingEventsList.innerHTML = ''; // Limpiar el mensaje de carga
        if (bandEvents.length > 0) {
            bandEvents.forEach(event => {
                const eventCard = createUpcomingEventCard(event);
                upcomingEventsList.appendChild(eventCard);
            });
        } else {
            upcomingEventsList.innerHTML = '<p style="text-align:center; color:var(--color-off-white);">No hay conciertos de banda próximos.</p>';
        }
    }

    // Filtrar eventos destacados para la sección "Eventos Destacados"
    // Asumimos que los eventos destacados tienen un ID que empieza con 'featured-event' o 'bar-crawl-lima'
    const featuredEvents = allEvents.filter(event => 
        event.id.startsWith('featured-event') || event.id === 'bar-crawl-lima'
    );
    if (featuredEventsGrid) {
        featuredEventsGrid.innerHTML = ''; // Limpiar el mensaje de carga
        if (featuredEvents.length > 0) {
            featuredEvents.forEach(event => {
                const eventCard = createFeaturedEventCard(event);
                featuredEventsGrid.appendChild(eventCard);
            });
        } else {
            featuredEventsGrid.innerHTML = '<p style="text-align:center; color:var(--color-off-white);">No hay eventos destacados disponibles.</p>';
        }
    }
    
    // Re-observar elementos para animaciones después de renderizar
    document.querySelectorAll('.event-card, .upcoming-event-card').forEach(el => {
        observer.observe(el);
    });
}

function createUpcomingEventCard(event) {
    const card = document.createElement('div');
    card.classList.add('upcoming-event-card');
    card.innerHTML = `
        <img src="${event.image}" alt="${event.title}">
        <p class="event-date">${event.dateTime.split(' - ')[0]} - ${event.city.split(',')[0].toUpperCase()}</p>
        <p class="event-location">${event.address}</p>
        <a href="event_details.html?id=${event.id}" class="btn btn-primary btn-sm view-concert-btn" data-event-id="${event.id}">Ver Concierto</a>
    `;
    return card;
}

function createFeaturedEventCard(event) {
    const card = document.createElement('div');
    card.classList.add('event-card');

    const dateParts = event.dateTime.split(' ')[0]; // "DD"
    const monthPart = event.dateTime.split(' ')[1].replace('.', ''); // "MES."

    card.innerHTML = `
        <div class="event-image" style="background-image: url('${event.image}');">
            <div class="event-date">
                <span class="day">${dateParts}</span>
                <span class="month">${monthPart}</span>
            </div>
        </div>
        <div class="event-content">
            <h3 class="event-title">${event.title}</h3>
            <p class="event-location">${event.address}, ${event.city.split(',')[0]}</p>
            <p class="event-description">${event.description.substring(0, 80)}...</p>
            <div class="event-footer">
                <span class="event-price">Desde S/ ${event.tickets[0] ? event.tickets[0].price.toFixed(2) : 'N/A'}</span>
                <a href="event_details.html?id=${event.id}" class="btn btn-primary btn-sm" data-event-id="${event.id}">Obtener Entradas</a>
            </div>
        </div>
    `;
    return card;
}


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
// NOTA: Estos selectores se aplicarán después de que los eventos sean renderizados dinámicamente
// document.querySelectorAll('.event-card, .upcoming-event-card').forEach(el => {
//     observer.observe(el);
// });

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
    console.log('Colosal cargado exitosamente!'); // Cambiado a Colosal
    
    // Check if on index.html or event_details.html
    if (document.querySelector('.hero-carousel-section')) {
        // Logic for index.html (or menu.html if it's the main landing)
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
        renderEventsOnMenuPage(); // Llama a esta función para cargar los eventos en menu.html/index.html
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