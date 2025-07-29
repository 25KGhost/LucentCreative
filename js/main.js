// Menu Animation
function initMenuAnimation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const menuText = document.querySelector('.menu-text');
    const hamburger = document.querySelector('.hamburger');

    if (!menuToggle || !navLinks || !menuText || !hamburger) return;

    menuToggle.addEventListener('click', () => {
        const isOpening = !navLinks.classList.contains('visible');

        if (isOpening) {
            navLinks.classList.add('visible');
            menuText.textContent = 'Close';
            hamburger.classList.add('active');
        } else {
            navLinks.classList.remove('visible');
            menuText.textContent = 'Menu';
            hamburger.classList.remove('active');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('visible');
            menuText.textContent = 'Menu';
            hamburger.classList.remove('active');
        });
    });
}

// Navbar scroll behavior
function initNavScroll() {
    const navbar = document.querySelector('.main-nav');
    const floatingSocials = document.querySelector('.floating-socials');
    const navSocials = document.querySelector('.nav-socials');

    if (!navbar || !floatingSocials || !navSocials) return;

    let lastScroll = 0;
    const scrollThreshold = 100;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > scrollThreshold) {
            navbar.classList.add('shrink');
            floatingSocials.classList.add('visible');
            navSocials.style.opacity = '0';
            navSocials.style.pointerEvents = 'none';
            navbar.style.background = 'rgba(10, 10, 18, 0.1)';
        } else {
            navbar.classList.remove('shrink');
            floatingSocials.classList.remove('visible');
            navbar.style.background = 'transparent';
            navSocials.style.opacity = '1';
            navSocials.style.pointerEvents = 'all';
        }

        if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
            navbar.classList.add('hidden');
        } else if (currentScroll < lastScroll || currentScroll <= scrollThreshold) {
            navbar.classList.remove('hidden');
        }

        lastScroll = currentScroll;
    });
}

// Floating social icons
function initFloatingSocials() {
    const floatingSocials = document.querySelector('.floating-socials');
    if (!floatingSocials) return;

    let timeout;
    window.addEventListener('scroll', () => {
        clearTimeout(timeout);

        if (window.pageYOffset > 300) {
            floatingSocials.classList.add('visible');
        } else {
            floatingSocials.classList.remove('visible');
        }

        timeout = setTimeout(() => {
            if (window.pageYOffset > 300) {
                floatingSocials.classList.add('visible');
            } else {
                floatingSocials.classList.remove('visible');
            }
        }, 150);
    });
}

// Custom cursor
function initCustomCursor() {
    const defaultCursor = document.querySelector('.default-cursor');
    const hoverCursor = document.querySelector('.hover-cursor');
    const clickCursor = document.querySelector('.click-cursor');
    
    if (!defaultCursor || !hoverCursor || !clickCursor) return;

    let isHovering = false;

    if (window.matchMedia('(pointer: fine)').matches) {
        document.body.classList.add('custom-cursor-active');
        defaultCursor.style.display = 'block';

        document.addEventListener('mousemove', (e) => {
            [defaultCursor, hoverCursor, clickCursor].forEach(cursor => {
                gsap.to(cursor, {
                    x: e.clientX,
                    y: e.clientY,
                    duration: 0.1,
                    ease: 'power2.out'
                });
            });
        });

        const hoverElements = document.querySelectorAll('a, button, .project, .cta-button');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                isHovering = true;
                defaultCursor.style.display = 'none';
                hoverCursor.style.display = 'block';
            });

            el.addEventListener('mouseleave', () => {
                isHovering = false;
                hoverCursor.style.display = 'none';
                clickCursor.style.display = 'none';
                defaultCursor.style.display = 'block';
            });
        });

        document.addEventListener('mousedown', () => {
            if (isHovering) {
                hoverCursor.style.display = 'none';
                clickCursor.style.display = 'block';
            }
        });

        document.addEventListener('mouseup', () => {
            if (isHovering) {
                clickCursor.style.display = 'none';
                hoverCursor.style.display = 'block';
            }
        });
    } else {
        [defaultCursor, hoverCursor, clickCursor].forEach(cursor => {
            cursor.style.display = 'none';
        });
    }
}

// Calendly Integration with robust error handling
function initCalendly() {
    // First check if Calendly is already loaded
    if (typeof Calendly !== 'undefined') {
        setupCalendlyButtons();
        return;
    }

    // Load the script if not already loaded
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    
    script.onload = function() {
        // Sometimes Calendly needs a moment after script load
        setTimeout(setupCalendlyButtons, 500);
    };
    
    script.onerror = function() {
        console.error('Failed to load Calendly script');
        resetCalendlyButtons();
    };
    
    document.body.appendChild(script);
}

function setupCalendlyButtons() {
    try {
        const buttons = document.querySelectorAll('.calendly-button, [href="#calendly"], .cta-button[href*="calendly"]');
        if (!buttons.length) return;
        
        buttons.forEach(button => {
            // Store original text if not already stored
            if (!button.dataset.originalText) {
                button.dataset.originalText = button.querySelector('span')?.textContent || button.textContent;
            }
            button.addEventListener('click', handleCalendlyClick);
            button.style.pointerEvents = 'auto';
        });
        
        // Initialize badge widget if needed
        try {
            Calendly.initBadgeWidget({
                url: 'https://calendly.com/lucentcreative-eu/30min',
                text: 'Book a consultation',
                color: '#d4af37',
                textColor: '#ffffff',
                branding: false
            });
        } catch (e) {
            console.error('Calendly badge widget error:', e);
        }
    } catch (e) {
        console.error('Calendly initialization error:', e);
        resetCalendlyButtons();
    }
}

function handleCalendlyClick(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const button = e.currentTarget;
    const originalText = button.dataset.originalText || 
                         button.querySelector('span')?.textContent || 
                         button.textContent;
    
    // Show loading state
    if (button.querySelector('span')) {
        button.querySelector('span').textContent = 'Loading...';
    } else {
        button.textContent = 'Loading...';
    }
    button.style.pointerEvents = 'none';
    
    // Fallback timeout
    const failSafe = setTimeout(() => {
        resetButton(button, originalText);
        // Fallback to new tab if Calendly not loaded
        if (typeof Calendly === 'undefined') {
            window.open('https://calendly.com/lucentcreative-eu/30min', '_blank');
        }
    }, 3000);
    
    try {
        if (typeof Calendly !== 'undefined') {
            Calendly.initPopupWidget({
                url: 'https://calendly.com/lucentcreative-eu/30min',
                text: 'Schedule a Consultation',
                color: '#d4af37',
                textColor: '#ffffff',
                branding: false,
                primaryColor: 'd4af37',
                hideEventTypeDetails: false,
                hideGdprBanner: true,
                onModalClose: () => {
                    clearTimeout(failSafe);
                    resetButton(button, originalText);
                }
            });
        } else {
            window.open('https://calendly.com/lucentcreative-eu/30min', '_blank');
            clearTimeout(failSafe);
            resetButton(button, originalText);
        }
    } catch (e) {
        console.error('Calendly popup error:', e);
        window.open('https://calendly.com/lucentcreative-eu/30min', '_blank');
        clearTimeout(failSafe);
        resetButton(button, originalText);
    }
}

function resetButton(button, originalText) {
    if (button.querySelector('span')) {
        button.querySelector('span').textContent = originalText;
    } else {
        button.textContent = originalText;
    }
    button.style.pointerEvents = 'auto';
}

function resetCalendlyButtons() {
    const buttons = document.querySelectorAll('.calendly-button, [href="#calendly"], .cta-button[href*="calendly"]');
    buttons.forEach(button => {
        const originalText = button.dataset.originalText || 'Schedule a Consultation';
        resetButton(button, originalText);
    });
}

// Initialize everything once DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initMenuAnimation();
    initNavScroll();
    initFloatingSocials();
    initCustomCursor();
    
    // Initialize Calendly with retries
    initCalendly();
    
    // Fallback retry
    setTimeout(() => {
        if (typeof Calendly === 'undefined') {
            console.log('Retrying Calendly initialization...');
            initCalendly();
        }
    }, 2000);
});

// Listen for Calendly ready event
window.addEventListener('calendly.ready', function() {
    console.log('Calendly ready event received');
    setupCalendlyButtons();
});