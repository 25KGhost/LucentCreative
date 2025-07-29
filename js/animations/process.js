// Process Section Animations
function initProcessAnimation() {
    const timelineItems = gsap.utils.toArray('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        gsap.from(item, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                end: 'top 50%',
                scrub: 1,
                toggleActions: 'play none none none'
            }
        });
        
        // Number glow effect
        const number = item.querySelector('.timeline-number');
        
        ScrollTrigger.create({
            trigger: item,
            start: 'top 70%',
            end: 'top 20%',
            onEnter: () => {
                gsap.to(number, {
                    scale: 1.2,
                    color: '#fff',
                    duration: 0.5,
                    ease: 'power2.out'
                });
            },
            onLeaveBack: () => {
                gsap.to(number, {
                    scale: 1,
                    color: 'var(--color-primary)',
                    duration: 0.5,
                    ease: 'power2.out'
                });
            }
        });
    });
    
    // Line draw animation
    const dividerLine = document.querySelector('.divider-line');
    
    gsap.from(dividerLine, {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 2,
        scrollTrigger: {
            trigger: '.section-divider',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        ease: 'power3.out'
    });
}