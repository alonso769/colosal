// COLOSAL/script_ingresar.js

// Espera a que el DOM esté completamente cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', () => {

    // --- Lógica de Música de Fondo (mantener sin cambios) ---
    const backgroundMusic = document.getElementById('backgroundMusic');
    const toggleMuteButtonBottom = document.getElementById('toggleMuteButton-bottom');

    function iniciarMusica() {
        if (!backgroundMusic) {
            console.warn("Elemento de audio 'backgroundMusic' no encontrado.");
            return;
        }
        backgroundMusic.muted = false;
        backgroundMusic.volume = 1;

        backgroundMusic.play().then(() => {
            console.log("🎵 Música reproduciéndose automáticamente.");
        }).catch((e) => {
            console.warn("🚫 El navegador bloqueó la reproducción automática:", e);
            const reintentarReproduccion = () => {
                backgroundMusic.play().then(() => {
                    console.log("🎵 Reproducción iniciada después de interacción.");
                    document.removeEventListener("click", reintentarReproduccion);
                    document.removeEventListener("keydown", reintentarReproduccion);
                }).catch(err => {
                    console.warn("⚠️ Aún no se puede reproducir:", err);
                });
            };
            document.addEventListener("click", reintentarReproduccion);
            document.addEventListener("keydown", reintentarReproduccion);
        });
    }

    if (backgroundMusic) {
        iniciarMusica();
    }

    function updateMuteButton() {
        if (toggleMuteButtonBottom && backgroundMusic) {
            if (backgroundMusic.muted) {
                toggleMuteButtonBottom.innerHTML = '<i class="fas fa-volume-mute"></i>';
                toggleMuteButtonBottom.title = 'Activar Sonido';
            } else {
                toggleMuteButtonBottom.innerHTML = '<i class="fas fa-volume-up"></i>';
                toggleMuteButtonBottom.title = 'Desactivar Sonido';
            }
        }
    }

    updateMuteButton();

    if (toggleMuteButtonBottom && backgroundMusic) {
        toggleMuteButtonBottom.addEventListener('click', function() {
            backgroundMusic.muted = !backgroundMusic.muted;
            updateMuteButton();
            if (!backgroundMusic.muted) {
                backgroundMusic.play().catch(e => {
                    console.log("Play on unmute prevented:", e);
                });
            }
        });
    }
    // --- Fin Lógica de Música de Fondo ---


    // --- Lógica del Carrusel (mantener sin cambios) ---
    let slideIndex = 0;
    const slides = document.querySelector('.carousel-slide');
    const images = document.querySelectorAll('.carousel-slide img');
    const totalImages = images.length;

    if (totalImages === 0) {
        console.warn("No se encontraron imágenes para el carrusel.");
    } else {
        slides.style.width = `${totalImages * 100}%`;
        function showSlides() {
            slides.style.transform = `translateX(${-slideIndex * (100 / totalImages)}%)`;
        }
        function nextSlide() {
            slideIndex = (slideIndex + 1) % totalImages;
            showSlides();
        }
        setInterval(nextSlide, 5000);
        showSlides();
    }
    // --- Fin Lógica del Carrusel ---


    // --- Lógica de Autenticación (Registro e Inicio de Sesión con tu Backend) ---

    // Referencias a elementos comunes (para ambos formularios y la funcionalidad de mostrar/ocultar contraseña)
    // Nota: Si ambos HTMLs usan 'togglePassword', asegúrate de que el ID del input al que apunta sea correcto para cada página.
    // En tu HTML, tienes 'togglePassword' para ambos, esto podría causar problemas si el elemento no se encuentra en la página actual.
    // Idealmente, deberías tener IDs únicos para cada "ojo" si estás usando el mismo script para ambos HTMLs.
    // Por ahora, lo mantenemos como está, asumiendo que solo se inicializa en la página correcta.
    const togglePassword = document.getElementById("togglePassword");
    // const passwordInput = document.getElementById("password"); // Este ID no está en tu registrar.html
    const registerPasswordInputForToggle = document.getElementById("registerPassword"); // El input de password para registro
    const loginPasswordInputForToggle = document.getElementById("loginPassword");     // El input de password para login

    // Función para alternar visibilidad de contraseña
    function setupPasswordToggle(inputElement, toggleElement) {
        if (inputElement && toggleElement) {
            toggleElement.addEventListener('click', function() {
                const type = inputElement.getAttribute('type') === 'password' ? 'text' : 'password';
                inputElement.setAttribute('type', type);
                this.classList.toggle('fa-eye');
                this.classList.toggle('fa-eye-slash');
            });
        }
    }

    // Aplica el toggle para ambos posibles inputs de contraseña (registro e inicio de sesión)
    // Asegúrate de que el ID 'togglePassword' exista en el HTML correspondiente.
    setupPasswordToggle(registerPasswordInputForToggle, togglePassword); // Para registrar.html
    setupPasswordToggle(loginPasswordInputForToggle, togglePassword);    // Para ingresar.html


    // --- Formulario de REGISTRO (en registrar.html) ---
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        // Inputs específicos para registro
        const registerEmailInput = document.getElementById('registerEmail');
        const registerPasswordInput = document.getElementById('registerPassword');
        // Mensajes de error específicos para el formulario de registro
        const registerEmailError = document.getElementById('userError'); // Error de email vacío/formato
        const registerPasswordError = document.getElementById('passError'); // Error de contraseña vacía
        const registerErrorMessage = document.getElementById('userNotFound'); // Mensaje general de error/email duplicado

        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = registerEmailInput.value.trim();
            const password = registerPasswordInput.value.trim();

            // Limpiar mensajes de error previos
            if (registerEmailError) registerEmailError.style.display = "none";
            if (registerPasswordError) registerPasswordError.style.display = "none";
            if (registerErrorMessage) {
                registerErrorMessage.style.display = "none";
                registerErrorMessage.classList.remove('success-message'); // Limpiar clase de éxito
                registerErrorMessage.classList.add('error-message');     // Asegurar clase de error
            }

            // Validaciones básicas antes de enviar
            if (email === "") {
                if (registerEmailError) {
                    registerEmailError.textContent = "El correo electrónico es obligatorio.";
                    registerEmailError.style.display = "block";
                }
                return;
            }
            if (password === "") {
                if (registerPasswordError) {
                    registerPasswordError.textContent = "La contraseña es obligatoria.";
                    registerPasswordError.style.display = "block";
                }
                return;
            }
            if (password.length < 6) {
                if (registerPasswordError) { // Reutilizamos el de contraseña, o puedes añadir uno nuevo
                    registerPasswordError.textContent = "La contraseña debe tener al menos 6 caracteres.";
                    registerPasswordError.style.display = "block";
                }
                return;
            }

            try {
                const response = await fetch('/api/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    // Si se registra correctamente, mostrar mensaje de éxito y redirigir
                    if (registerErrorMessage) {
                        registerErrorMessage.textContent = data.message || 'Usuario registrado exitosamente.';
                        registerErrorMessage.classList.remove('error-message');
                        registerErrorMessage.classList.add('success-message');
                        registerErrorMessage.style.display = "block";
                    }
                    if (data.token) {
                        localStorage.setItem('jwtToken', data.token);
                    }
                    // Redirigir al menú después de un registro exitoso
                    window.location.href = 'menu.html';
                } else {
                    // Mostrar mensaje de error del backend
                    if (registerErrorMessage) {
                        if (data.message.includes('email ya está registrado')) {
                            registerErrorMessage.textContent = "Este email ya está registrado.";
                        } else if (data.message.includes('contraseña debe tener al menos 6 caracteres')) {
                            registerErrorMessage.textContent = data.message;
                        } else {
                            registerErrorMessage.textContent = `Error de registro: ${data.message}`;
                        }
                        registerErrorMessage.classList.remove('success-message');
                        registerErrorMessage.classList.add('error-message');
                        registerErrorMessage.style.display = "block";
                    } else {
                        console.error('Error de registro:', data.message);
                        // Fallback para alerta si no se encuentra el elemento de mensaje
                        // alert(`Error de registro: ${data.message}`);
                    }
                }
            } catch (error) {
                console.error('Error de red o servidor al registrar:', error);
                if (registerErrorMessage) {
                    registerErrorMessage.textContent = 'Ocurrió un error al intentar registrarte. Inténtalo de nuevo más tarde.';
                    registerErrorMessage.classList.remove('success-message');
                    registerErrorMessage.classList.add('error-message');
                    registerErrorMessage.style.display = "block";
                } else {
                    // Fallback para alerta si no se encuentra el elemento de mensaje
                    // alert('Ocurrió un error al intentar registrarte. Inténtalo de nuevo más tarde.');
                }
            }
        });
    }


    // --- Formulario de INICIO DE SESIÓN (en ingresar.html) ---
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        // Inputs específicos para login
        const loginEmailInput = document.getElementById('loginEmail');
        const loginPasswordInput = document.getElementById('loginPassword');
        // Mensajes de error específicos para el formulario de login
        const loginEmailError = document.getElementById('userError'); // Error de email vacío/formato
        const loginPasswordError = document.getElementById('passError'); // Error de contraseña vacía
        const loginErrorMessage = document.getElementById('userNotFound'); // Mensaje general de error/credenciales inválidas

        loginForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const email = loginEmailInput.value.trim();
            const password = loginPasswordInput.value.trim();

            // Limpiar mensajes de error previos
            if (loginEmailError) loginEmailError.style.display = "none";
            if (loginPasswordError) loginPasswordError.style.display = "none";
            if (loginErrorMessage) {
                loginErrorMessage.style.display = "none";
                loginErrorMessage.classList.remove('success-message'); // Limpiar clase de éxito
                loginErrorMessage.classList.add('error-message');     // Asegurar clase de error
            }

            // Validaciones básicas antes de enviar
            if (email === "") {
                if (loginEmailError) {
                    loginEmailError.textContent = "El correo electrónico es obligatorio.";
                    loginEmailError.style.display = "block";
                }
                return;
            }
            if (password === "") {
                if (loginPasswordError) {
                    loginPasswordError.textContent = "La contraseña es obligatoria.";
                    loginPasswordError.style.display = "block";
                }
                return;
            }

            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    // Si el login es exitoso, guardar token y redirigir
                    if (loginErrorMessage) { // Usamos este ID para mensajes de éxito también, si se desea
                        loginErrorMessage.textContent = data.message || 'Inicio de sesión exitoso.';
                        loginErrorMessage.classList.remove('error-message');
                        loginErrorMessage.classList.add('success-message');
                        loginErrorMessage.style.display = "block";
                    }
                    localStorage.setItem('jwtToken', data.token); // Guarda el token
                    window.location.href = "menu.html"; // Redirige a menu.html
                } else {
                    // Mostrar mensaje de error del backend
                    if (loginErrorMessage) {
                        if (data.message.includes('Credenciales inválidas')) {
                            loginErrorMessage.textContent = 'Correo o contraseña incorrectos.'; // Mensaje genérico
                        } else {
                            loginErrorMessage.textContent = `Error de inicio de sesión: ${data.message}`;
                        }
                        loginErrorMessage.classList.remove('success-message');
                        loginErrorMessage.classList.add('error-message');
                        loginErrorMessage.style.display = "block";
                    } else {
                        console.error('Error de inicio de sesión:', data.message);
                        // Fallback para alerta si no se encuentra el elemento de mensaje
                        // alert(`Error de inicio de sesión: ${data.message}`);
                    }
                }
            } catch (error) {
                console.error("Error de red o servidor al iniciar sesión:", error);
                if (loginErrorMessage) {
                    loginErrorMessage.textContent = 'Ocurrió un error al intentar iniciar sesión. Inténtalo de nuevo más tarde.';
                    loginErrorMessage.classList.remove('success-message');
                    loginErrorMessage.classList.add('error-message');
                    loginErrorMessage.style.display = "block";
                } else {
                    // Fallback para alerta si no se encuentra el elemento de mensaje
                    // alert("Ocurrió un error al intentar iniciar sesión. Inténtalo de nuevo más tarde.");
                }
            }
        });

        // Lógica de "Olvidaste tu contraseña?" (AHORA SOLO MANEJO UI, NO FUNCIONALIDAD DE ENVÍO DE CORREO)
        const forgotPasswordLink = document.querySelector(".forgot-password-link");
        const resetPasswordContainer = document.getElementById("resetPasswordContainer");
        const backToLoginButton = document.getElementById("backToLogin");

        if (forgotPasswordLink) {
            forgotPasswordLink.addEventListener('click', function(event) {
                event.preventDefault();
                // Oculta el formulario de login, muestra el de restablecer
                if (loginForm) loginForm.style.display = "none";
                if (resetPasswordContainer) resetPasswordContainer.style.display = "block";
                // Limpiar mensajes de error/éxito previos en el contenedor de restablecimiento
                const resetPasswordMessage = document.getElementById("resetPasswordMessage");
                const resetPasswordError = document.getElementById("resetPasswordError");
                if (resetPasswordMessage) resetPasswordMessage.style.display = "none";
                if (resetPasswordError) resetPasswordError.style.display = "none";
            });
        }

        if (backToLoginButton) {
            backToLoginButton.addEventListener('click', function() {
                // Oculta el de restablecer, muestra el de login
                if (resetPasswordContainer) resetPasswordContainer.style.display = "none";
                if (loginForm) loginForm.style.display = "block";
                // Limpiar campo de email al volver
                const resetPasswordEmailInput = document.getElementById("resetPasswordEmail");
                if (resetPasswordEmailInput) resetPasswordEmailInput.value = "";
            });
        }

        // ELIMINAR COMPLETAMENTE LA LÓGICA DE ENVÍO DE CORREO DE RESTABLECIMIENTO DE FIREBASE
        // (ya que no tienes un backend configurado para esto aún)
        const sendResetPasswordButton = document.getElementById("sendResetPassword");
        if (sendResetPasswordButton) {
            sendResetPasswordButton.addEventListener('click', function() {
                // Esto es solo un placeholder, necesitarías implementar esto en tu backend
                // con un servicio de envío de correos real.
                // alert('La funcionalidad de restablecimiento de contraseña no está implementada aún en el backend. Por favor, contacta al soporte.');
                const resetPasswordError = document.getElementById("resetPasswordError");
                const resetPasswordEmailInput = document.getElementById("resetPasswordEmail");

                if (!resetPasswordEmailInput || resetPasswordEmailInput.value.trim() === "") {
                    if (resetPasswordError) {
                        resetPasswordError.textContent = "Por favor, introduce tu correo electrónico.";
                        resetPasswordError.style.display = "block";
                    }
                    return;
                }

                if (resetPasswordError) {
                    resetPasswordError.textContent = "La funcionalidad de restablecimiento de contraseña no está disponible.";
                    resetPasswordError.style.display = "block";
                }
                const resetPasswordMessage = document.getElementById("resetPasswordMessage");
                 if (resetPasswordMessage) {
                    resetPasswordMessage.textContent = "Un enlace de restablecimiento (ficticio) ha sido enviado a tu correo.";
                    resetPasswordMessage.style.display = "block";
                 }
            });
        }
    } // Fin if (loginForm)

    // Opcional: Lógica para mostrar/ocultar botones de auth según el token
    // Esto generalmente iría en tu script principal (ej. menu.js o app.js) si los botones
    // están en el header/footer que se comparte en varias páginas.
    // Si estos botones (loginBtn, registerBtn, profileBtn) solo están en ingresar.html/registrar.html,
    // puedes mantener esta lógica aquí. Asegúrate de que los IDs existan.
    const token = localStorage.getItem('jwtToken');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const profileBtn = document.getElementById('profileBtn');

    if (loginBtn && registerBtn && profileBtn) {
        if (token) {
            loginBtn.style.display = 'none';
            registerBtn.style.display = 'none';
            profileBtn.style.display = 'block';
        } else {
            loginBtn.style.display = 'block';
            registerBtn.style.display = 'block';
            profileBtn.style.display = 'none';
        }
    } else {
        console.warn("Algunos elementos de autenticación (loginBtn, registerBtn, profileBtn) no se encontraron. Asegúrate de que sus IDs sean correctos en tu HTML, o si están en otras páginas, mueve esta lógica al script principal de esas páginas.");
    }
    // --- Fin Lógica de Autenticación ---
});