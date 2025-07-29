// Hero Section Animations
function initHeroAnimation() {
    // Logo fade in
    gsap.from('.logo', {
        opacity: 0,
        y: -20,
        duration: 1,
        ease: 'power3.out'
    });
    
    // Navigation links stagger
    gsap.from('.nav-links a', {
        opacity: 0,
        y: -20,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.5,
        ease: 'power3.out'
    });
    
    // Hero title animation
    const heroTitleLines = gsap.utils.toArray('.hero-title .line');
    
    heroTitleLines.forEach((line, i) => {
        const chars = line.textContent.split('');
        line.textContent = '';
        
        chars.forEach(char => {
            const charSpan = document.createElement('span');
            charSpan.textContent = char;
            charSpan.style.display = 'inline-block';
            charSpan.style.opacity = '0';
            charSpan.style.transform = 'translateY(100%)';
            line.appendChild(charSpan);
        });
        
        const charSpans = line.querySelectorAll('span');
        
        gsap.to(charSpans, {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.03,
            delay: 0.8 + (i * 0.2),
            ease: 'power3.out'
        });
    });
    
    // Hero subtitle animation
    gsap.from('.hero-subtitle', {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 1.8,
        ease: 'power3.out'
    });
    
    // Scroll hint animation
    gsap.from('.scroll-hint', {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 2.2,
        ease: 'power3.out'
    });
    
    // Background parallax
    gsap.to('.hero-bg', {
        y: '20%',
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });
}

// About Section Animations
// About Section Animations
function initAboutAnimation() {
  // Section entrance
  gsap.from('.about-section .section-subtitle', {
    opacity: 0,
    y: 20,
    duration: 1,
    delay: 0.3,
    ease: "power3.out"
  });

  // Item stagger animation
  gsap.to('.about-item', {
    opacity: 1,
    y: 0,
    duration: 1,
    stagger: 0.15,
    scrollTrigger: {
      trigger: '.about-section',
      start: 'top 80%',
      toggleActions: 'play none none none'
    },
    ease: "power3.out"
  });

  // Create dynamic stars
  document.querySelectorAll('.about-item').forEach(item => {
    const stars = item.querySelector('.item-stars');
    
    for (let i = 0; i < 8; i++) {
      const star = document.createElement('div');
      star.style.position = 'absolute';
      star.style.width = `${Math.random() * 0.4 + 0.2}px`;
      star.style.height = star.style.width;
      star.style.backgroundColor = 'white';
      star.style.borderRadius = '50%';
      star.style.opacity = '0';
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.transition = `all ${Math.random() * 2 + 1}s ease`;
      
      stars.appendChild(star);
      
      // Random star twinkle
      setInterval(() => {
        gsap.to(star, {
          opacity: Math.random() * 0.5 + 0.1,
          scale: Math.random() * 0.5 + 0.8,
          duration: Math.random() * 3 + 1,
          ease: "power1.inOut"
        });
      }, Math.random() * 3000 + 2000);
    }
    
    // Hover animations
    item.addEventListener('mouseenter', () => {
      gsap.to(item.querySelectorAll('.item-stars div'), {
        opacity: 0.4,
        scale: 1,
        duration: 0.8,
        stagger: 0.05,
        ease: "power2.out"
      });
    });
    
    item.addEventListener('mouseleave', () => {
      gsap.to(item.querySelectorAll('.item-stars div'), {
        opacity: 0,
        scale: 0.5,
        duration: 0.8,
        stagger: 0.02,
        ease: "power2.in"
      });
    });
  });
}

// Initialize about animations
document.addEventListener('DOMContentLoaded', initAboutAnimation);