// Hero Section Animations
function initHeroAnimation() {
    // Logo fade in with enhanced easing
    gsap.from('.logo', {
        opacity: 0,
        y: -20,
        duration: 1,
        ease: 'power3.out',
        immediateRender: false
    });
    
    // Navigation links stagger with better timing
    gsap.from('.nav-links a', {
        opacity: 0,
        y: -20,
        duration: 0.8,
        stagger: {
            amount: 0.5,
            from: 'random'
        },
        delay: 0.5,
        ease: 'back.out(1.7)',
        immediateRender: false
    });
    
    // Hero title animation - modified to show immediately
    const heroTitleLines = gsap.utils.toArray('.hero-title .line');
    
    heroTitleLines.forEach((line, i) => {
        const chars = line.textContent.split('');
        line.textContent = '';
        
        chars.forEach(char => {
            const charSpan = document.createElement('span');
            charSpan.textContent = char;
            charSpan.style.display = 'inline-block';
            charSpan.style.willChange = 'transform, opacity';
            line.appendChild(charSpan);
        });
        
        const charSpans = line.querySelectorAll('span');
        
        // Updated animation starting from visible state
        gsap.from(charSpans, {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: {
                each: 0.03,
                from: 'start'
            },
            delay: 0.2 + (i * 0.1),
            ease: 'power3.out',
            immediateRender: true
        });
    });
    
    // Hero subtitle animation with smoother entrance
    gsap.from('.hero-subtitle', {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 1.8,
        ease: 'power3.out',
        immediateRender: false
    });
    
    // Scroll hint animation with subtle pulse
    gsap.from('.scroll-hint', {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 2.2,
        ease: 'power3.out',
        immediateRender: false
    }).then(() => {
        gsap.to('.scroll-hint', {
            y: 10,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    });
    
    // Background parallax with smoother scrubbing
    gsap.to('.hero-bg', {
        y: '20%',
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
            markers: false
        },
        ease: 'none'
    });
}

// About Section Animations
function initAboutAnimation() {
    // Section entrance with better timing
    gsap.from('.about-section .section-subtitle', {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
        immediateRender: false
    });

    // Item stagger animation with smoother entrance
    gsap.to('.about-item', {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: {
            amount: 0.6,
            from: 'center'
        },
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 80%',
            toggleActions: 'play none none none',
            markers: false
        },
        ease: "back.out(1.2)",
        immediateRender: false
    });

    // Enhanced dynamic stars with better performance
    document.querySelectorAll('.about-item').forEach(item => {
        const stars = item.querySelector('.item-stars');
        const starCount = 8;
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'twinkle-star';
            star.style.position = 'absolute';
            star.style.width = `${Math.random() * 0.4 + 0.2}px`;
            star.style.height = star.style.width;
            star.style.backgroundColor = 'white';
            star.style.borderRadius = '50%';
            star.style.opacity = '0';
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.willChange = 'transform, opacity';
            star.style.transform = 'scale(0.5)';
            
            stars.appendChild(star);
            
            // Optimized random star twinkle with GSAP
            const twinkleTL = gsap.timeline({ repeat: -1, repeatDelay: Math.random() * 3 });
            twinkleTL.to(star, {
                opacity: Math.random() * 0.5 + 0.1,
                scale: Math.random() * 0.5 + 0.8,
                duration: Math.random() * 3 + 1,
                ease: "sine.inOut"
            }).to(star, {
                opacity: 0,
                scale: 0.5,
                duration: Math.random() * 3 + 1,
                ease: "sine.inOut"
            });
        }
        
        // Smoother hover animations
        item.addEventListener('mouseenter', () => {
            gsap.killTweensOf(item.querySelectorAll('.twinkle-star'));
            gsap.to(item.querySelectorAll('.twinkle-star'), {
                opacity: 0.4,
                scale: 1,
                duration: 0.8,
                stagger: {
                    amount: 0.4,
                    from: 'random'
                },
                ease: "elastic.out(1, 0.5)"
            });
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.killTweensOf(item.querySelectorAll('.twinkle-star'));
            gsap.to(item.querySelectorAll('.twinkle-star'), {
                opacity: 0,
                scale: 0.5,
                duration: 0.8,
                stagger: 0.02,
                ease: "power2.in"
            });
        });
    });
}

function initFeaturedProjectAnimation() {
    // Project section entrance with better easing
    gsap.from('.featured-project', {
        opacity: 0,
        y: 80,
        duration: 1,
        scrollTrigger: {
            trigger: '.work-section',
            start: 'top 80%',
            toggleActions: 'play none none none',
            markers: false
        },
        ease: 'back.out(1.2)',
        immediateRender: false
    });

    // Smoother image parallax effect
    gsap.to('.project-image', {
        y: '10%',
        scrollTrigger: {
            trigger: '.project-visual',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5
        },
        ease: 'none'
    });

    // Enhanced magnetic hover effect
    const projectVisual = document.querySelector('.project-visual');
    if (projectVisual) {
        const imageWrapper = document.querySelector('.project-image-wrapper');
        if (imageWrapper) imageWrapper.style.willChange = 'transform';
        
        projectVisual.addEventListener('mousemove', (e) => {
            const rect = projectVisual.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const moveX = (x - centerX) / 20;
            const moveY = (y - centerY) / 20;
            
            gsap.to('.project-image-wrapper', {
                x: moveX,
                y: moveY,
                rotateX: -moveY * 0.5,
                rotateY: moveX * 0.5,
                transformPerspective: 1000,
                duration: 1.5,
                ease: "power2.out"
            });
        });
        
        projectVisual.addEventListener('mouseleave', () => {
            gsap.to('.project-image-wrapper', {
                x: 0,
                y: 0,
                rotateX: 0,
                rotateY: 0,
                duration: 1.2,
                ease: "elastic.out(1, 0.5)"
            });
        });
    }
}

// Optimized DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    initHeroAnimation();
    initFeaturedProjectAnimation();
    initAboutAnimation();
});
