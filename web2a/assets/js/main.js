/*===== MAIN JAVASCRIPT =====*/

/*===== MENU SHOW/HIDE =====*/
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

// Menu show
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    });
}

// Menu hide
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
        document.body.style.overflow = 'auto'; // Restore scrolling
    });
}

// Close menu when clicking on nav links
const navLinks = document.querySelectorAll('.nav__link');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
        document.body.style.overflow = 'auto';
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('show-menu') && 
        !navMenu.contains(e.target) && 
        !navToggle.contains(e.target)) {
        navMenu.classList.remove('show-menu');
        document.body.style.overflow = 'auto';
    }
});

/*===== REMOVE MENU MOBILE =====*/
function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
    document.body.style.overflow = 'auto';
}

/*===== SCROLL SECTIONS ACTIVE LINK =====*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');
        const navLink = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            if (navLink) {
                navLink.classList.add('active-link');
            }
        } else {
            if (navLink) {
                navLink.classList.remove('active-link');
            }
        }
    });
}

window.addEventListener('scroll', scrollActive);

/*===== CHANGE BACKGROUND HEADER =====*/
function scrollHeader() {
    const nav = document.getElementById('header');
    // When the scroll is greater than 80 viewport height, add the scroll-header class
    if (this.scrollY >= 80) {
        nav.classList.add('scroll-header');
    } else {
        nav.classList.remove('scroll-header');
    }
}

window.addEventListener('scroll', scrollHeader);

/*===== SHOW SCROLL TOP =====*/
function scrollTop() {
    const scrollTop = document.getElementById('scroll-top');
    // When the scroll is higher than 560 viewport height, add the show-scroll class
    if (this.scrollY >= 560) {
        scrollTop.classList.add('show');
    } else {
        scrollTop.classList.remove('show');
    }
}

window.addEventListener('scroll', scrollTop);

/*===== SMOOTH SCROLLING =====*/
const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

smoothScrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
    reset: false
});

// Check if ScrollReveal is available
if (typeof ScrollReveal !== 'undefined') {
    sr.reveal('.hero__title, .hero__subtitle', { delay: 400 });
    sr.reveal('.hero__cta', { delay: 600 });
    sr.reveal('.section__title', { distance: '30px' });
    sr.reveal('.section__description', { delay: 100 });
    sr.reveal('.welcome__description', { delay: 200 });
    sr.reveal('.news__card', { interval: 200 });
    sr.reveal('.about__text', { origin: 'left' });
    sr.reveal('.about__image', { origin: 'right', delay: 400 });
    sr.reveal('.member__card', { interval: 100 });
    sr.reveal('.benefits__item', { interval: 100 });
    sr.reveal('.form', { delay: 300 });
    sr.reveal('.resource__card', { interval: 150 });
    sr.reveal('.contact__item', { interval: 100 });
    sr.reveal('.news-full__card', { interval: 200 });
}

/*===== FORM HANDLING =====*/

// Membership form handling
const membershipForm = document.getElementById('membership-form');
if (membershipForm) {
    membershipForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data.name || !data.email || !data.phone) {
            showNotification('Por favor, complete todos los campos obligatorios.', 'error');
            return;
        }
        
        if (!isValidEmail(data.email)) {
            showNotification('Por favor, ingrese un email válido.', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Solicitud enviada correctamente. Nos contactaremos pronto.', 'success');
        this.reset();
        
        // In a real application, you would send the data to a server
        console.log('Membership form data:', data);
    });
}

// Contact form handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data.name || !data.email || !data.message) {
            showNotification('Por favor, complete todos los campos obligatorios.', 'error');
            return;
        }
        
        if (!isValidEmail(data.email)) {
            showNotification('Por favor, ingrese un email válido.', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Mensaje enviado correctamente. Responderemos pronto.', 'success');
        this.reset();
        
        // In a real application, you would send the data to a server
        console.log('Contact form data:', data);
    });
}

/*===== UTILITY FUNCTIONS =====*/

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <span class="notification__message">${message}</span>
            <button class="notification__close" onclick="this.parentElement.parentElement.remove()">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </div>
    `;
    
    // Add notification styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                max-width: 400px;
                padding: 1rem;
                border-radius: 0.5rem;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                animation: slideInRight 0.3s ease-out;
            }
            
            .notification--success {
                background-color: #d4edda;
                color: #155724;
                border: 1px solid #c3e6cb;
            }
            
            .notification--error {
                background-color: #f8d7da;
                color: #721c24;
                border: 1px solid #f5c6cb;
            }
            
            .notification--info {
                background-color: #d1ecf1;
                color: #0c5460;
                border: 1px solid #bee5eb;
            }
            
            .notification__content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 1rem;
            }
            
            .notification__message {
                flex: 1;
                font-weight: 500;
            }
            
            .notification__close {
                background: none;
                border: none;
                cursor: pointer;
                padding: 0.25rem;
                border-radius: 0.25rem;
                transition: background-color 0.2s ease;
            }
            
            .notification__close:hover {
                background-color: rgba(0, 0, 0, 0.1);
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

/*===== FILE INPUT HANDLING =====*/
const fileInputs = document.querySelectorAll('input[type="file"]');

fileInputs.forEach(input => {
    input.addEventListener('change', function() {
        const fileName = this.files[0]?.name || 'Ningún archivo seleccionado';
        const fileText = this.parentElement.querySelector('.form__file-text');
        if (fileText) {
            fileText.textContent = fileName;
        }
    });
});

/*===== LAZY LOADING FOR IMAGES =====*/
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
        }
    });
});

if ('IntersectionObserver' in window) {
    images.forEach(img => imageObserver.observe(img));
} else {
    // Fallback for older browsers
    images.forEach(img => {
        img.src = img.dataset.src;
        img.classList.remove('lazy');
    });
}

/*===== SEARCH FUNCTIONALITY =====*/
function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    if (!searchInput || !searchResults) return;
    
    let searchTimeout;
    
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        const query = this.value.trim();
        
        if (query.length < 2) {
            searchResults.innerHTML = '';
            searchResults.style.display = 'none';
            return;
        }
        
        searchTimeout = setTimeout(() => {
            performSearch(query);
        }, 300);
    });
    
    // Close search results when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
}

function performSearch(query) {
    // This is a simple client-side search
    // In a real application, you would make an API call to search the backend
    
    const searchableContent = [
        { title: 'Inicio', url: '#home', content: 'Asociación de Abogados de Chile' },
        { title: 'Nosotros', url: '#about', content: 'Nuestra historia y propósito' },
        { title: 'Directorio', url: '#directory', content: 'Miembros actuales de la asociación' },
        { title: 'Membresía', url: '#membership', content: 'Únete a nuestra asociación' },
        { title: 'Recursos', url: '#resources', content: 'Documentos y herramientas legales' },
        { title: 'Contacto', url: '#contact', content: 'Información de contacto' }
    ];
    
    const results = searchableContent.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.content.toLowerCase().includes(query.toLowerCase())
    );
    
    displaySearchResults(results, query);
}

function displaySearchResults(results, query) {
    const searchResults = document.getElementById('search-results');
    
    if (results.length === 0) {
        searchResults.innerHTML = `
            <div class="search-result">
                <p>No se encontraron resultados para "${query}"</p>
            </div>
        `;
    } else {
        searchResults.innerHTML = results.map(result => `
            <div class="search-result">
                <a href="${result.url}" class="search-result__link">
                    <h4 class="search-result__title">${result.title}</h4>
                    <p class="search-result__content">${result.content}</p>
                </a>
            </div>
        `).join('');
    }
    
    searchResults.style.display = 'block';
}

/*===== ACCESSIBILITY ENHANCEMENTS =====*/

// Keyboard navigation for mobile menu
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        if (navMenu.classList.contains('show-menu')) {
            navMenu.classList.remove('show-menu');
            document.body.style.overflow = 'auto';
            document.getElementById('nav-toggle').focus();
        }
    }
});

// Focus management for forms
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach((input, index) => {
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && input.type !== 'textarea') {
                e.preventDefault();
                const nextInput = inputs[index + 1];
                if (nextInput) {
                    nextInput.focus();
                } else {
                    const submitButton = form.querySelector('button[type="submit"]');
                    if (submitButton) {
                        submitButton.focus();
                    }
                }
            }
        });
    });
});

/*===== PERFORMANCE OPTIMIZATIONS =====*/

// Throttle scroll events
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

// Apply throttling to scroll events
window.removeEventListener('scroll', scrollActive);
window.removeEventListener('scroll', scrollHeader);
window.removeEventListener('scroll', scrollTop);

window.addEventListener('scroll', throttle(scrollActive, 100));
window.addEventListener('scroll', throttle(scrollHeader, 100));
window.addEventListener('scroll', throttle(scrollTop, 100));

/*===== INITIALIZATION =====*/
document.addEventListener('DOMContentLoaded', function() {
    // Initialize search functionality
    initializeSearch();
    
    // Set initial active link
    scrollActive();
    
    // Add loading class removal
    document.body.classList.add('loaded');
    
    console.log('Asociación de Abogados de Chile - Website loaded successfully');
});

/*===== ERROR HANDLING =====*/
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // In production, you might want to send this to an error tracking service
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    e.preventDefault();
});

/*===== EXPORT FOR TESTING =====*/
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        isValidEmail,
        showNotification,
        performSearch,
        throttle
    };
}