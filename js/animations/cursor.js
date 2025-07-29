// Custom Cursor Animation
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    
    // Only enable custom cursor on desktop
    if (window.matchMedia('(pointer: fine)').matches) {
        document.body.style.cursor = 'none';
        
        // Follow mouse movement
        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        // Hover effects
        const hoverElements = document.querySelectorAll('a, button, .project');
        
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('active');
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('active');
            });
        });
    } else {
        // Hide custom cursor on touch devices
        cursor.style.display = 'none';
    }
}