// Projects Gallery Animation
function initGalleryAnimation() {
    const items = gsap.utils.toArray('.gallery-item');
    
    items.forEach((item, index) => {
        const thumbnail = item.querySelector('.project-thumbnail img');
        const description = item.querySelector('.project-description');
        
        // Scroll animation
        gsap.from([thumbnail, description], {
            opacity: 0,
            y: 50,
            duration: 0.8,
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            ease: 'power2.out',
            delay: index * 0.1
        });
        
        // Hover animation
        if (thumbnail) {
            item.addEventListener('mouseenter', () => {
                gsap.to(thumbnail, {
                    scale: 1.05,
                    duration: 0.6,
                    ease: 'power2.out'
                });
                
                gsap.to(description, {
                    backgroundColor: 'rgba(10, 10, 18, 0.9)',
                    borderColor: 'rgba(212, 175, 55, 0.3)',
                    duration: 0.4
                });
            });
            
            item.addEventListener('mouseleave', () => {
                gsap.to(thumbnail, {
                    scale: 1,
                    duration: 0.8,
                    ease: 'elastic.out(1, 0.5)'
                });
                
                gsap.to(description, {
                    backgroundColor: 'rgba(10, 10, 18, 0.8)',
                    borderColor: 'rgba(212, 175, 55, 0.1)',
                    duration: 0.4
                });
            });
        }
    });
}
