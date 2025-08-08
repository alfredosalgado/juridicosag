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
    
    // Toggle del menú móvil
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
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