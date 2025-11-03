// ==============================================
// DRIVRA - Main JavaScript
// ==============================================

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: 'ease-in-out'
});

// ==============================================
// LANGUAGE TOGGLE FUNCTIONALITY
// ==============================================
class LanguageManager {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'en';
        this.init();
    }

    init() {
        // Set initial language
        this.setLanguage(this.currentLang);
        
        // Add event listener to language toggle button
        const languageToggle = document.getElementById('languageToggle');
        if (languageToggle) {
            languageToggle.addEventListener('click', () => this.toggleLanguage());
        }
    }

    toggleLanguage() {
        this.currentLang = this.currentLang === 'en' ? 'ne' : 'en';
        this.setLanguage(this.currentLang);
        localStorage.setItem('language', this.currentLang);
    }

    setLanguage(lang) {
        document.documentElement.lang = lang;
        
        // Update all elements with data-en and data-ne attributes
        const elements = document.querySelectorAll('[data-en][data-ne]');
        elements.forEach(element => {
            const text = element.getAttribute(`data-${lang}`);
            if (text) {
                element.textContent = text;
            }
        });

        // Update language toggle button appearance
        const languageToggle = document.getElementById('languageToggle');
        if (languageToggle) {
            if (lang === 'ne') {
                languageToggle.querySelector('.lang-en').style.opacity = '0.5';
                languageToggle.querySelector('.lang-ne').style.opacity = '1';
            } else {
                languageToggle.querySelector('.lang-en').style.opacity = '1';
                languageToggle.querySelector('.lang-ne').style.opacity = '0.5';
            }
        }
    }
}

// Initialize Language Manager
const languageManager = new LanguageManager();

// ==============================================
// NAVIGATION FUNCTIONALITY
// ==============================================
class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('navMenu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        // Sticky navbar on scroll
        window.addEventListener('scroll', () => this.handleScroll());
        
        // Mobile menu toggle
        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Close mobile menu when clicking nav links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    this.closeMobileMenu();
                }
            });
        });

        // Smooth scroll for anchor links
        this.navLinks.forEach(link => {
            if (link.getAttribute('href').startsWith('#')) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        this.smoothScrollTo(targetElement);
                    }
                });
            }
        });

        // Update active nav link on scroll
        window.addEventListener('scroll', () => this.updateActiveNavLink());
    }

    handleScroll() {
        if (window.scrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }

    toggleMobileMenu() {
        this.navMenu.classList.toggle('active');
        this.hamburger.classList.toggle('active');
        
        // Animate hamburger bars
        const bars = this.hamburger.querySelectorAll('.bar');
        if (this.hamburger.classList.contains('active')) {
            bars[0].style.transform = 'rotate(45deg) translateY(10px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(-45deg) translateY(-10px)';
        } else {
            bars[0].style.transform = '';
            bars[1].style.opacity = '';
            bars[2].style.transform = '';
        }
    }

    closeMobileMenu() {
        this.navMenu.classList.remove('active');
        this.hamburger.classList.remove('active');
        
        const bars = this.hamburger.querySelectorAll('.bar');
        bars[0].style.transform = '';
        bars[1].style.opacity = '';
        bars[2].style.transform = '';
    }

    smoothScrollTo(target) {
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition - 80; // Account for navbar height
        const duration = 1000;
        let start = null;

        const animation = (currentTime) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = this.easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        };

        requestAnimationFrame(animation);
    }

    easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.pageYOffset + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// Initialize Navigation
const navigation = new Navigation();

// ==============================================
// SCROLL INDICATOR FUNCTIONALITY
// ==============================================
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            navigation.smoothScrollTo(aboutSection);
        }
    });

    // Hide scroll indicator on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.pointerEvents = 'auto';
        }
    });
}

// ==============================================
// FORM HANDLING (if using custom forms instead of Google Forms)
// ==============================================
class FormHandler {
    constructor(formSelector) {
        this.form = document.querySelector(formSelector);
        if (this.form) {
            this.init();
        }
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    handleSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);

        // Validate form
        if (this.validateForm(data)) {
            // Show success message
            this.showMessage('success', 'Form submitted successfully!');
            
            // Reset form
            this.form.reset();
            
            // Here you would typically send data to a server
            console.log('Form data:', data);
        }
    }

    validateForm(data) {
        // Basic validation
        for (let key in data) {
            if (!data[key] && this.form.querySelector(`[name="${key}"]`).hasAttribute('required')) {
                this.showMessage('error', `Please fill in the ${key} field.`);
                return false;
            }
        }
        
        // Email validation
        if (data.email && !this.isValidEmail(data.email)) {
            this.showMessage('error', 'Please enter a valid email address.');
            return false;
        }

        return true;
    }

    isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    showMessage(type, message) {
        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message form-message-${type}`;
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            padding: 1rem;
            margin: 1rem 0;
            border-radius: 8px;
            text-align: center;
            font-weight: 500;
            animation: slideDown 0.3s ease;
            background: ${type === 'success' ? '#D1FAE5' : '#FEE2E2'};
            color: ${type === 'success' ? '#065F46' : '#991B1B'};
        `;

        // Insert message
        this.form.insertAdjacentElement('beforebegin', messageDiv);

        // Remove message after 5 seconds
        setTimeout(() => {
            messageDiv.style.animation = 'slideUp 0.3s ease';
            setTimeout(() => messageDiv.remove(), 300);
        }, 5000);
    }
}

// Initialize form handler (uncomment if using custom forms)
// const formHandler = new FormHandler('#contact-form');

// ==============================================
// PARALLAX EFFECT FOR HERO SECTION
// ==============================================
class ParallaxEffect {
    constructor() {
        this.shapes = document.querySelectorAll('.shape');
        this.init();
    }

    init() {
        if (this.shapes.length > 0) {
            window.addEventListener('scroll', () => this.handleScroll());
        }
    }

    handleScroll() {
        const scrolled = window.pageYOffset;
        this.shapes.forEach((shape, index) => {
            const speed = 0.1 + (index * 0.05);
            const yPos = -(scrolled * speed);
            shape.style.transform = `translateY(${yPos}px)`;
        });
    }
}

// Initialize parallax effect
const parallaxEffect = new ParallaxEffect();

// ==============================================
// COUNTER ANIMATION (for statistics)
// ==============================================
class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('[data-count]');
        this.init();
    }

    init() {
        if (this.counters.length > 0) {
            const observer = new IntersectionObserver(
                (entries) => this.handleIntersection(entries),
                { threshold: 0.5 }
            );

            this.counters.forEach(counter => observer.observe(counter));
        }
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                this.animateCounter(entry.target);
                entry.target.classList.add('counted');
            }
        });
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        updateCounter();
    }
}

// Initialize counter animation
const counterAnimation = new CounterAnimation();

// ==============================================
// LAZY LOADING IMAGES
// ==============================================
class LazyLoader {
    constructor() {
        this.images = document.querySelectorAll('img[data-src]');
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(
                (entries) => this.handleIntersection(entries)
            );

            this.images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for browsers that don't support IntersectionObserver
            this.images.forEach(img => this.loadImage(img));
        }
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.loadImage(entry.target);
            }
        });
    }

    loadImage(img) {
        const src = img.getAttribute('data-src');
        if (!src) return;
        
        img.src = src;
        img.removeAttribute('data-src');
        img.classList.add('loaded');
    }
}

// Initialize lazy loader
const lazyLoader = new LazyLoader();

// ==============================================
// TESTIMONIAL CAROUSEL (optional enhancement)
// ==============================================
class TestimonialCarousel {
    constructor(selector) {
        this.container = document.querySelector(selector);
        if (this.container) {
            this.cards = this.container.querySelectorAll('.testimonial-card');
            this.currentIndex = 0;
            this.init();
        }
    }

    init() {
        // This is a placeholder for carousel functionality
        // You can implement auto-rotation, navigation buttons, etc.
        if (this.cards.length > 3) {
            this.setupCarousel();
        }
    }

    setupCarousel() {
        // Add carousel controls and functionality here
        // For now, the grid layout handles display
    }
}

// Initialize testimonial carousel (optional)
// const testimonialCarousel = new TestimonialCarousel('.testimonials-grid');

// ==============================================
// GOOGLE MAPS INTEGRATION HELPER
// ==============================================
class MapHelper {
    constructor() {
        this.mapContainers = document.querySelectorAll('.map-container');
        this.init();
    }

    init() {
        // Add loading state to map containers
        this.mapContainers.forEach(container => {
            const iframe = container.querySelector('iframe');
            if (iframe) {
                iframe.addEventListener('load', () => {
                    container.classList.add('loaded');
                });
            }
        });
    }
}

// Initialize map helper
const mapHelper = new MapHelper();

// ==============================================
// PERFORMANCE OPTIMIZATION
// ==============================================
// Debounce function for scroll events
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for resize events
function throttle(func, limit = 100) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ==============================================
// ACCESSIBILITY ENHANCEMENTS
// ==============================================
class AccessibilityManager {
    constructor() {
        this.init();
    }

    init() {
        // Add keyboard navigation support
        this.addKeyboardSupport();
        
        // Add focus visible styles
        this.addFocusStyles();
        
        // Skip to main content link
        this.addSkipLink();
    }

    addKeyboardSupport() {
        // Allow escape key to close mobile menu
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const navMenu = document.getElementById('navMenu');
                if (navMenu && navMenu.classList.contains('active')) {
                    navigation.closeMobileMenu();
                }
            }
        });
    }

    addFocusStyles() {
        // Add visible focus indicators for keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-nav');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-nav');
        });
    }

    addSkipLink() {
        // Create skip to main content link for screen readers
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 0;
            background: var(--primary-green);
            color: white;
            padding: 8px;
            text-decoration: none;
            z-index: 10000;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '0';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });

        document.body.insertAdjacentElement('afterbegin', skipLink);
    }
}

// Initialize accessibility manager
const accessibilityManager = new AccessibilityManager();

// ==============================================
// PAGE LOAD ANIMATION
// ==============================================
window.addEventListener('load', () => {
    // Add loaded class to body
    document.body.classList.add('loaded');
    
    // Reinitialize AOS after page load
    AOS.refresh();
    
    console.log('🚀 Drivra website loaded successfully!');
});

// ==============================================
// CONSOLE MESSAGE
// ==============================================
console.log('%c🚗 Welcome to Drivra!', 'font-size: 20px; font-weight: bold; color: #10B981;');
console.log('%cBuilt with motion and innovation in mind.', 'font-size: 14px; color: #6B7280;');

// ==============================================
// EXPORT FOR MODULE USAGE (if needed)
// ==============================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        LanguageManager,
        Navigation,
        FormHandler,
        ParallaxEffect,
        CounterAnimation,
        LazyLoader,
        MapHelper,
        AccessibilityManager
    };
}
