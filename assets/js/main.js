// Funcionalidad principal del sitio web
document.addEventListener('DOMContentLoaded', function() {
    
    // Elementos del DOM
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');
    const heroScroll = document.querySelector('.hero-scroll');
    const membershipForm = document.getElementById('membership-form');
    const contactForm = document.querySelector('.contact-form');
    const scrollProgress = document.getElementById('scroll-progress');
    const scrollUpBtn = document.getElementById('scroll-up-btn');
    const themeToggle = document.getElementById('theme-toggle');
    
    // Theme Toggle Functionality
    if (themeToggle) {
        // Cargar tema guardado o usar modo oscuro como predeterminado
        const savedTheme = localStorage.getItem('theme');
        
        // Si no hay tema guardado, usar modo oscuro por defecto
        // Si hay tema guardado, usar ese tema
        if (!savedTheme || savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
        }
        
        // Event listener para el botón de cambio de tema
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            
            // Guardar preferencia en localStorage
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            
            // Opcional: Tracking del evento (si tienes analytics)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'theme_toggle', {
                    'theme': isDark ? 'dark' : 'light'
                });
            }
            
            // Animación del botón
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
        
        // Escuchar cambios en la preferencia del sistema
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
            if (!localStorage.getItem('theme')) {
                if (e.matches) {
                    document.body.classList.add('dark-theme');
                } else {
                    document.body.classList.remove('dark-theme');
                }
            }
        });
    }

    // Toggle del menú móvil
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }

    // CV Modal Functions
    window.openCVModal = function() {
        const modal = document.getElementById('cvModal');
        const pdfViewer = document.getElementById('pdfViewer');
        
        if (modal && pdfViewer) {
            // Set PDF source
            pdfViewer.src = 'assets/files/CV-CARLOS-PONTIGO.pdf';
            
            // Show modal
            modal.classList.add('show');
            modal.setAttribute('aria-hidden', 'false');
            
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
            
            // Focus trap
            modal.focus();
            
            // Optional: Analytics tracking
            if (typeof gtag !== 'undefined') {
                gtag('event', 'cv_view', {
                    'cv_owner': 'Carlos Pontigo'
                });
            }
        }
    };

    window.closeCVModal = function() {
        const modal = document.getElementById('cvModal');
        const pdfViewer = document.getElementById('pdfViewer');
        
        if (modal && pdfViewer) {
            // Hide modal
            modal.classList.remove('show');
            modal.setAttribute('aria-hidden', 'true');
            
            // Clear PDF source to stop loading
            pdfViewer.src = '';
            
            // Restore body scroll
            document.body.style.overflow = '';
        }
    };

    // Close modal when clicking outside
    document.addEventListener('click', function(e) {
        const modal = document.getElementById('cvModal');
        if (modal && e.target === modal) {
            closeCVModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.getElementById('cvModal');
            if (modal && modal.classList.contains('show')) {
                closeCVModal();
            }
            const certificateModal = document.getElementById('certificateModal');
            if (certificateModal && certificateModal.classList.contains('show')) {
                closeCertificateModal();
            }
            const directoryDocumentModal = document.getElementById('directorioDocModal');
            if (directoryDocumentModal && directoryDocumentModal.classList.contains('show')) {
                closeDirectorioDocModal();
            }
            const hackDocumentModal = document.getElementById('hackDocModal');
            if (hackDocumentModal && hackDocumentModal.classList.contains('show')) {
                closeHackDocModal();
            }
        }
    });

    // Certificate Modal Functions
    window.openCertificateModal = function() {
        const modal = document.getElementById('certificateModal');
        
        if (modal) {
            // Show modal
            modal.style.display = 'flex';
            modal.classList.add('show');
            modal.setAttribute('aria-hidden', 'false');
            
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeCertificateModal = function() {
        const modal = document.getElementById('certificateModal');
        
        if (modal) {
            // Hide modal
            modal.classList.remove('show');
            modal.setAttribute('aria-hidden', 'true');
            
            // Restore body scroll
            document.body.style.overflow = '';
            
            // Hide modal after animation
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    };

    // Certificate button event listener
    const certificateBtn = document.getElementById('certificateBtn');
    if (certificateBtn) {
        certificateBtn.addEventListener('click', openCertificateModal);
    }

    // Close certificate modal when clicking outside
    document.addEventListener('click', function(e) {
        const modal = document.getElementById('certificateModal');
        if (modal && e.target === modal) {
            closeCertificateModal();
        }
    });

    // Directory Document Modal Functions
    window.openDirectorioDocModal = function() {
        const modal = document.getElementById('directorioDocModal');
        
        if (modal) {
            // Show modal
            modal.style.display = 'flex';
            modal.classList.add('show');
            modal.setAttribute('aria-hidden', 'false');
            
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeDirectorioDocModal = function() {
        const modal = document.getElementById('directorioDocModal');
        
        if (modal) {
            // Hide modal
            modal.classList.remove('show');
            modal.setAttribute('aria-hidden', 'true');
            
            // Restore body scroll
            document.body.style.overflow = '';
            
            // Hide modal after animation
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    };

    // Directory document button event listener
    const directoryDocumentBtn = document.getElementById('directorioDocBtn');
    if (directoryDocumentBtn) {
        directoryDocumentBtn.addEventListener('click', openDirectorioDocModal);
    }

    // Close directory document modal when clicking outside
    document.addEventListener('click', function(e) {
        const modal = document.getElementById('directorioDocModal');
        if (modal && e.target === modal) {
            closeDirectorioDocModal();
        }
    });

    // Hack Document Modal Functions
    window.openHackDocModal = function() {
        const modal = document.getElementById('hackDocModal');
        
        if (modal) {
            // Show modal
            modal.style.display = 'flex';
            modal.setAttribute('aria-hidden', 'false');
            
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
            
            // Add show class for animation
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
        }
    };

    window.closeHackDocModal = function() {
        const modal = document.getElementById('hackDocModal');
        
        if (modal) {
            // Hide modal
            modal.classList.remove('show');
            modal.setAttribute('aria-hidden', 'true');
            
            // Restore body scroll
            document.body.style.overflow = '';
            
            // Hide modal after animation
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    };

    // Hack document button event listener
    const hackDocumentBtn = document.getElementById('hackDocBtn');
    if (hackDocumentBtn) {
        hackDocumentBtn.addEventListener('click', openHackDocModal);
    }

    // Close hack document modal when clicking outside
    document.addEventListener('click', function(e) {
        const modal = document.getElementById('hackDocModal');
        if (modal && e.target === modal) {
            closeHackDocModal();
        }
    });

    // Visit Counter Functionality - Backend PHP
    function initVisitCounter() {
        const counterElement = document.getElementById('visitCounter');
        if (!counterElement) return;

        // Clave para verificar si ya se contó en esta sesión
        const SESSION_COUNTED_KEY = 'agtjach_session_counted';
        
        // Verificar si ya se contó en esta sesión
        const sessionCounted = sessionStorage.getItem(SESSION_COUNTED_KEY);
        
        // Primero obtener el contador actual
        fetchCurrentCount()
            .then(count => {
                animateCounter(counterElement, count);
                
                // Si no se ha contado en esta sesión, incrementar
                if (!sessionCounted) {
                    incrementCounter()
                        .then(newCount => {
                            if (newCount > count) {
                                animateCounter(counterElement, newCount);
                            }
                            // Marcar como contado en esta sesión
                            sessionStorage.setItem(SESSION_COUNTED_KEY, 'true');
                        })
                        .catch(error => {
                            console.log('Counter increment failed:', error);
                        });
                }
            })
            .catch(error => {
                console.log('Counter fetch failed:', error);
                // Fallback: mostrar número base
                counterElement.textContent = '8536';
            });
        
        // Actualizar contador periódicamente (cada 2-5 minutos)
        setInterval(() => {
            fetchCurrentCount()
                .then(count => {
                    const currentDisplayed = parseInt(counterElement.textContent.replace(/,/g, '')) || 0;
                    if (count > currentDisplayed) {
                        animateCounter(counterElement, count);
                    }
                })
                .catch(error => {
                    console.log('Periodic counter update failed:', error);
                });
        }, Math.random() * 180000 + 120000); // Entre 2-5 minutos
    }
    
    // Función para obtener el contador actual del servidor
    async function fetchCurrentCount() {
        try {
            const response = await fetch('counter.php', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.success) {
                return data.count;
            } else {
                throw new Error(data.message || 'Failed to fetch counter');
            }
        } catch (error) {
            console.error('Error fetching counter:', error);
            throw error;
        }
    }
    
    // Función para incrementar el contador en el servidor
    async function incrementCounter() {
        try {
            const response = await fetch('counter.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'increment',
                    timestamp: new Date().toISOString()
                })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.success) {
                return data.count;
            } else {
                throw new Error(data.message || 'Failed to increment counter');
            }
        } catch (error) {
            console.error('Error incrementing counter:', error);
            throw error;
        }
    }
    
    function animateCounter(element, targetValue) {
        const currentValue = parseInt(element.textContent) || 0;
        const increment = targetValue > currentValue ? 1 : -1;
        const duration = 1000; // 1 segundo
        const steps = Math.abs(targetValue - currentValue);
        const stepDuration = steps > 0 ? duration / steps : 0;
        
        if (steps === 0) return;
        
        let current = currentValue;
        const timer = setInterval(() => {
            current += increment;
            element.textContent = current.toLocaleString();
            
            // Efecto visual
            element.style.transform = 'scale(1.1)';
            element.style.color = 'var(--accent-color)';
            
            setTimeout(() => {
                element.style.transform = 'scale(1)';
                element.style.color = '';
            }, 150);
            
            if (current === targetValue) {
                clearInterval(timer);
            }
        }, stepDuration);
    }
    
    // Inicializar contador cuando el DOM esté listo
    initVisitCounter();
    
    // Cerrar menú al hacer click en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Cerrar menú al hacer click fuera de él
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
    
    // Scroll suave para el botón de scroll del hero
    if (heroScroll) {
        heroScroll.addEventListener('click', function() {
            const welcomeSection = document.querySelector('.welcome');
            if (welcomeSection) {
                welcomeSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // Cambiar estilo del header al hacer scroll y actualizar progreso
    let lastScrollTop = 0;
    window.addEventListener('scroll', throttle(function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        
        // Actualizar indicador de progreso
        if (scrollProgress) {
            const scrollPercent = (scrollTop / documentHeight) * 100;
            scrollProgress.style.width = scrollPercent + '%';
        }
        
        // Mostrar/ocultar botón de scroll up
        if (scrollUpBtn) {
            if (scrollTop > 300) {
                scrollUpBtn.classList.add('visible');
            } else {
                scrollUpBtn.classList.remove('visible');
            }
        }
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Ocultar/mostrar header en scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    }, 16));
    
    // Funcionalidad del botón scroll up
    if (scrollUpBtn) {
        scrollUpBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Tracking del evento
            trackEvent('Button', 'Click', 'Scroll Up');
        });
    }
    
    // Animaciones al hacer scroll (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar elementos para animaciones
    const animatedElements = document.querySelectorAll('.section-title, .service-card, .news-card, .benefit-item');
    animatedElements.forEach(el => observer.observe(el));
    
    // Validación y envío del formulario de membresía
    if (membershipForm) {
        membershipForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            // Validación básica
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#dc3545';
                    field.addEventListener('input', function() {
                        this.style.borderColor = '';
                    }, { once: true });
                }
            });
            
            if (!isValid) {
                showNotification('Por favor, complete todos los campos requeridos.', 'error');
                return;
            }
            
            // Validar RUT chileno
            const rutField = this.querySelector('input[placeholder="RUT"]');
            if (rutField && !validateRUT(rutField.value)) {
                rutField.style.borderColor = '#dc3545';
                showNotification('Por favor, ingrese un RUT válido.', 'error');
                return;
            }
            
            // Validar email
            const emailField = this.querySelector('input[type="email"]');
            if (emailField && !validateEmail(emailField.value)) {
                emailField.style.borderColor = '#dc3545';
                showNotification('Por favor, ingrese un email válido.', 'error');
                return;
            }
            
            // Simular envío
            submitBtn.textContent = 'ENVIANDO...';
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');
                
                showNotification('¡Solicitud enviada exitosamente! Nos contactaremos contigo pronto.', 'success');
                this.reset();
            }, 2000);
        });
    }
    
    // Validación y envío del formulario de contacto
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Validación básica
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#dc3545';
                    field.addEventListener('input', function() {
                        this.style.borderColor = '';
                    }, { once: true });
                }
            });
            
            if (!isValid) {
                showNotification('Por favor, complete todos los campos.', 'error');
                return;
            }
            
            // Simular envío
            submitBtn.textContent = 'ENVIANDO...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                showNotification('¡Mensaje enviado exitosamente!', 'success');
                this.reset();
            }, 1500);
        });
    }
    
    // Navegación activa
    const sections = document.querySelectorAll('section[id]');
    const navLinksArray = Array.from(navLinks);
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksArray.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Lazy loading para imágenes
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Smooth scroll para todos los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Parallax effect para el hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Contador animado (si se necesita en el futuro)
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            element.textContent = Math.floor(start);
            
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    }
    
    // Manejo de errores globales
    window.addEventListener('error', function(e) {
        console.error('Error en la aplicación:', e.error);
    });
    
    // Preloader (opcional)
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 300);
        }
    });
});

// Funciones auxiliares

// Validar RUT chileno
function validateRUT(rut) {
    if (!rut) return false;
    
    // Limpiar RUT
    rut = rut.replace(/\./g, '').replace('-', '').toUpperCase();
    
    if (rut.length < 8 || rut.length > 9) return false;
    
    const body = rut.slice(0, -1);
    const dv = rut.slice(-1);
    
    if (!/^\d+$/.test(body)) return false;
    
    // Calcular dígito verificador
    let sum = 0;
    let multiplier = 2;
    
    for (let i = body.length - 1; i >= 0; i--) {
        sum += parseInt(body[i]) * multiplier;
        multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }
    
    const remainder = sum % 11;
    const calculatedDV = remainder === 0 ? '0' : remainder === 1 ? 'K' : (11 - remainder).toString();
    
    return dv === calculatedDV;
}

// Validar email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Mostrar notificaciones
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Estilos inline para la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
        word-wrap: break-word;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 15px;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Función para cerrar notificación
    const closeNotification = () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    };
    
    // Cerrar al hacer click en X
    notification.querySelector('.notification-close').addEventListener('click', closeNotification);
    
    // Auto-cerrar después de 5 segundos
    setTimeout(closeNotification, 5000);
}

// Formatear RUT mientras se escribe
function formatRUT(input) {
    let value = input.value.replace(/\./g, '').replace('-', '');
    
    if (value.length > 1) {
        const body = value.slice(0, -1);
        const dv = value.slice(-1);
        
        // Agregar puntos cada 3 dígitos
        const formattedBody = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        
        input.value = `${formattedBody}-${dv}`;
    }
}

// Aplicar formato de RUT a campos correspondientes
document.addEventListener('DOMContentLoaded', function() {
    const rutInputs = document.querySelectorAll('input[placeholder="RUT"]');
    rutInputs.forEach(input => {
        input.addEventListener('input', function() {
            formatRUT(this);
        });
    });
});

// Utilidades adicionales

// Debounce function para optimizar eventos
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Throttle function para scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Detectar dispositivo móvil
function isMobile() {
    return window.innerWidth <= 768;
}

// Detectar soporte para touch
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

// Aplicar optimizaciones para dispositivos móviles
if (isMobile()) {
    document.body.classList.add('mobile-device');
}

if (isTouchDevice()) {
    document.body.classList.add('touch-device');
}

// Manejo de orientación en dispositivos móviles
window.addEventListener('orientationchange', function() {
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 100);
});

// Prevenir zoom en inputs en iOS
if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.style.fontSize = '16px';
    });
}

// Analytics y tracking (placeholder para futuras implementaciones)
function trackEvent(category, action, label) {
    // Implementar tracking aquí (Google Analytics, etc.)
    console.log('Event tracked:', { category, action, label });
}

// Tracking de formularios
document.addEventListener('submit', function(e) {
    const form = e.target;
    if (form.id === 'membership-form') {
        trackEvent('Form', 'Submit', 'Membership');
    } else if (form.classList.contains('contact-form')) {
        trackEvent('Form', 'Submit', 'Contact');
    }
});

// Service Worker registration (para PWA en el futuro)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}