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
    
    if (!navbar || !floatingSocials) return;

    let lastScroll = window.pageYOffset;
    const scrollThreshold = 100;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Show/hide navbar based on scroll direction
        if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
            navbar.classList.add('hide-nav');
        } else {
            navbar.classList.remove('hide-nav');
        }
        
        // Shrink effect
        if (currentScroll > scrollThreshold) {
            navbar.classList.add('shrink');
            floatingSocials.classList.add('visible');
        } else {
            navbar.classList.remove('shrink');
            floatingSocials.classList.remove('visible');
        }
        
        lastScroll = currentScroll;
    });
}

// Update menu links for projects.html
if (window.location.pathname.includes('projects.html')) {
    document.querySelector('.nav-links').innerHTML = '<a href="index.html">Home</a>';
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

// Smooth scroll behavior
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Ambient audio initialization
function initAmbientAudio() {
    const audio = document.getElementById('ambient-audio');
    if (!audio) return;
    
    // Enable audio after first interaction
    const enableAudio = () => {
        audio.volume = 0.3;
        audio.play().catch(e => console.log("Audio play prevented:", e));
        document.body.removeEventListener('click', enableAudio);
        document.body.removeEventListener('touchstart', enableAudio);
    };
    
    document.body.addEventListener('click', enableAudio, { once: true });
    document.body.addEventListener('touchstart', enableAudio, { once: true });
}

// Initialize everything once DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initMenuAnimation();
    initNavScroll();
    initFloatingSocials();
    initCustomCursor();
    initSmoothScroll();
    initAmbientAudio();
    initVisionSection();
});
