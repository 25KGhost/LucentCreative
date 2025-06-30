document.addEventListener('DOMContentLoaded', function() {
    // 1. First make sure loader is visible
    const loader = document.getElementById('luxuryLoader');
    if (loader) loader.style.display = 'flex';
    
    // 2. Handle window load event
    window.addEventListener('load', function() {
        // Hide loader with smooth transition
        if (loader) {
            loader.classList.add('hidden');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 800);
        }
        
        // Initialize all other functionality
        initMagneticEffects();
        initScrollAnimations();
        initHeaderEffects();
        initEmailJS();
    });

    // Initialize EmailJS
    function initEmailJS() {
        emailjs.init("CM554ofw-8yRHsN0m");
        
        // Handle form submissions
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                if (form.id === 'project-form' || form.classList.contains('cta-form')) {
                    e.preventDefault();
                    emailjs.sendForm('service_gfxheps', 'template_k1dkfm9', form)
                        .then(() => {
                            alert('Thank you! Your message has been sent.');
                            form.reset();
                        })
                        .catch(error => {
                            console.error('EmailJS Error:', error);
                            alert('Failed to send message. Please try again later.');
                        });
                }
            });
        });
    }

    // Magnetic Effects - Updated with slower, subtler movement
    function initMagneticEffects() {
        document.querySelectorAll('.magnetic:not(.services-page .plan)').forEach(el => {
            const strength = parseFloat(el.dataset.magnetic) || 0.2;
            
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = (e.clientX - rect.left - rect.width/2) * strength;
                const y = (e.clientY - rect.top - rect.height/2) * strength;
                
                el.style.transform = `translate(${x}px, ${y}px)`;
                el.style.transition = 'transform 1.2s cubic-bezier(0.19, 1, 0.32, 1)';
            });
            
            el.addEventListener('mouseleave', () => {
                el.style.transform = 'translate(0, 0)';
                el.style.transition = 'transform 1.8s cubic-bezier(0.19, 1, 0.32, 1)';
            });
        });
    }

    // Scroll Animations
    function initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.fade-in-up').forEach(el => {
            const delay = el.dataset.delay || 0;
            el.style.transitionDelay = `${delay}s`;
            observer.observe(el);
        });
    }

    // Header Effects
    function initHeaderEffects() {
        const header = document.getElementById('mainHeader');
        if (!header) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        
        // Initialize as transparent
        header.classList.remove('scrolled');
    }
});

// Fallback in case DOMContentLoaded doesn't fire
window.addEventListener('load', function() {
    const loader = document.getElementById('luxuryLoader');
    if (loader) {
        loader.classList.add('hidden');
        setTimeout(() => loader.style.display = 'none', 800);
    }
});

// Initialize EmailJS for any page that might need it
if (typeof emailjs !== 'undefined') {
    emailjs.init("CM554ofw-8yRHsN0m");
}

// Refresh to top functionality
window.addEventListener('beforeunload', function() {
    window.scrollTo(0, 0);
});