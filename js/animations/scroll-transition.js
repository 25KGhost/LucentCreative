// scroll-transition.js
function initScrollTransition() {
    const navbar = document.querySelector('.main-nav');
    
    if (!navbar) return;

    // Set CSS variable for navbar height
    const navbarHeight = navbar.offsetHeight;
    document.documentElement.style.setProperty('--navbar-height', `${navbarHeight}px`);

    // Existing scroll direction detection remains unchanged
    let lastScrollY = window.scrollY;
    let isScrollingDown = false;
    let isTransitioning = false;
    
    function handleScroll() {
        const currentScrollY = window.scrollY;
        const scrollDelta = currentScrollY - lastScrollY;
        
        if (Math.abs(scrollDelta) > 5 && !isTransitioning) {
            isScrollingDown = scrollDelta > 0;
            
            if (isScrollingDown && currentScrollY > navbarHeight) {
                hideNav();
            } else if (!isScrollingDown || currentScrollY <= navbarHeight) {
                showNav();
            }
        }
        
        lastScrollY = currentScrollY;
    }
    
    function hideNav() {
        isTransitioning = true;
        gsap.to(navbar, {
            y: -navbarHeight,
            opacity: 0.7,
            duration: 0.4,
            ease: "power3.out",
            onComplete: () => isTransitioning = false
        });
    }
    
    function showNav() {
        isTransitioning = true;
        gsap.to(navbar, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power3.out",
            onComplete: () => isTransitioning = false
        });
    }
    
    // Optimized scroll handler with debounce
    let isTicking = false;
    window.addEventListener('scroll', () => {
        if (!isTicking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                isTicking = false;
            });
            isTicking = true;
        }
    }, { passive: true });
    
    // Handle initial state
    if (window.scrollY > navbarHeight) {
        gsap.set(navbar, { 
            y: -navbarHeight,
            opacity: 0.7
        });
    }
}

document.addEventListener('DOMContentLoaded', initScrollTransition);