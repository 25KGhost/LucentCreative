function initMenuAnimation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuLinks = document.querySelectorAll('.mobile-menu a');
    
    // Set initial state
    menuLinks.forEach((link) => {
        link.style.opacity = '0';
        link.style.transform = 'translateX(20px)';
    });

    // Toggle menu
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
        
        // Animate links when opening
        if (mobileMenu.classList.contains('active')) {
            gsap.to(menuLinks, {
                opacity: 1,
                x: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: 'power3.out'
            });
        } else {
            // Reset animation when closing
            gsap.to(menuLinks, {
                opacity: 0,
                x: 20,
                duration: 0.3,
                stagger: 0.05,
                ease: 'power3.in'
            });
        }
    });
    
    // Close menu when clicking a link
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            gsap.to(menuLinks, {
                opacity: 0,
                x: 20,
                duration: 0.3,
                stagger: 0.05,
                ease: 'power3.in',
                onComplete: () => {
                    mobileMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                }
            });
        });
    });
}