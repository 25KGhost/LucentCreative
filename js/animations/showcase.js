function initShowcaseAnimation() {
    const blocks = gsap.utils.toArray('.creative-block');
    
    // Set initial state
    gsap.set('.block-image img', {
        scale: 1.1
    });
    
    // Scroll animations
    blocks.forEach((block, index) => {
        gsap.from(block, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: block,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            ease: 'power3.out',
            delay: index * 0.1
        });
        
        // Image tilt effect
        const imageContainer = block.querySelector('.block-image');
        const image = block.querySelector('.block-image img');
        
        if (imageContainer && image) {
            block.addEventListener('mousemove', (e) => {
                const rect = imageContainer.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const moveX = (x - centerX) / 20; // Reduced sensitivity for more elegance
                const moveY = (y - centerY) / 20;
                
                // 3D tilt effect
                gsap.to(imageContainer, {
                    rotationY: moveX * 0.5,
                    rotationX: -moveY * 0.5,
                    transformPerspective: 1000,
                    transformOrigin: "center center",
                    duration: 1.5,
                    ease: 'power2.out'
                });
                
                // Subtle image movement
                gsap.to(image, {
                    x: moveX * 2,
                    y: moveY * 2,
                    duration: 1.5,
                    ease: 'power2.out'
                });
            });
            
            block.addEventListener('mouseleave', () => {
                // Reset to original position
                gsap.to(imageContainer, {
                    rotationY: 0,
                    rotationX: 0,
                    duration: 1.5,
                    ease: 'elastic.out(1, 0.5)'
                });
                
                gsap.to(image, {
                    x: 0,
                    y: 0,
                    duration: 1.5,
                    ease: 'elastic.out(1, 0.5)'
                });
            });
        }
    });
    
    // Image reveal animation on scroll
    gsap.utils.toArray('.image-mask').forEach((mask, i) => {
        gsap.from(mask, {
            clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
            duration: 1.5,
            scrollTrigger: {
                trigger: mask,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            ease: 'power3.out',
            delay: i * 0.2
        });
    });
}

// Initialize showcase animation
document.addEventListener('DOMContentLoaded', initShowcaseAnimation);
