function initProjectAnimations() {
    const projects = gsap.utils.toArray('.project-card');
    const container = document.querySelector('.projects-container');
    
    // Set up the initial animation for each project
    projects.forEach((project, i) => {
        const image = project.querySelector('.project-image');
        const info = project.querySelector('.project-info');
        const bg = project.querySelector('.project-bg');
        
        // Initial state
        gsap.set(project, { 
            perspective: 1000,
            opacity: 0,
            y: 50
        });
        
        gsap.set(image, { 
            transformOrigin: "center center",
            scale: 1.05
        });
        
        gsap.set(info, { 
            opacity: 0,
            y: 20
        });
        
        // Scroll animation
        gsap.to(project, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: project,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            ease: 'power2.out',
            delay: i * 0.1
        });
        
        // Hover animation
        project.addEventListener('mouseenter', () => {
            gsap.to(image, {
                scale: 1.1,
                duration: 0.6,
                ease: 'power2.out'
            });
            
            gsap.to(bg, {
                opacity: 0.8,
                duration: 0.8,
                ease: 'power2.out'
            });
            
            gsap.to(info, {
                opacity: 1,
                y: 0,
                duration: 0.4,
                delay: 0.2,
                ease: 'power2.out'
            });
            
            // Light glow effect
            gsap.to(project, {
                boxShadow: '0 20px 40px rgba(212, 175, 55, 0.2)',
                duration: 0.6
            });
        });
        
        project.addEventListener('mouseleave', () => {
            gsap.to(image, {
                scale: 1.05,
                duration: 0.8,
                ease: 'elastic.out(1, 0.5)'
            });
            
            gsap.to(bg, {
                opacity: 1,
                duration: 0.6,
                ease: 'power2.out'
            });
            
            gsap.to(info, {
                opacity: 0,
                y: 20,
                duration: 0.3,
                ease: 'power2.in'
            });
            
            // Remove glow
            gsap.to(project, {
                boxShadow: '0 0 0 rgba(212, 175, 55, 0)',
                duration: 0.4
            });
        });
    });
    
    // Container parallax effect
    gsap.to(container, {
        y: (i, target) => -ScrollTrigger.maxScroll(window) * 0.05,
        ease: "none",
        scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });
}

// Initialize project animations
document.addEventListener('DOMContentLoaded', initProjectAnimations);
initProjectsPage();
    initScrollTransition();
    });
