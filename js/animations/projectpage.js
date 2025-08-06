// In projectpage.js - Updated implementation
function initProjectsPage() {
  // Initialize GSAP and ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);
  
  // Store references to all project items
  const projectItems = document.querySelectorAll('.project-grid-item');
  const filterButtons = document.querySelectorAll('.filter-button');
  
  // Enhanced filter function
  function filterProjects(category) {
    projectItems.forEach(item => {
      const itemCategory = item.dataset.category;
      const shouldShow = category === 'all' || itemCategory === category;
      
      // Use GSAP for smooth transitions
      if (shouldShow) {
        gsap.to(item, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.inOut",
          display: 'flex',
          pointerEvents: 'all'
        });
      } else {
        gsap.to(item, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power3.inOut",
          pointerEvents: 'none',
          onComplete: function() {
            item.style.display = 'none';
          }
        });
      }
    });

    // Update active button
    filterButtons.forEach(btn => {
      btn.classList.remove('active');
      gsap.to(btn, {
        scale: 1,
        duration: 0.3
      });
    });

    const activeBtn = document.querySelector(`.filter-button[data-category="${category}"]`);
    if (activeBtn) {
      activeBtn.classList.add('active');
      gsap.fromTo(activeBtn, 
        { scale: 1.1 },
        { 
          scale: 1,
          duration: 0.6,
          ease: "elastic.out(1, 0.5)"
        }
      );
    }
  }

  // Set up filter button click handlers
  filterButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const category = e.currentTarget.dataset.category;
      filterProjects(category);
      
      // Scroll to top of projects section
      document.querySelector('.projects-grid-section').scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Initialize with 'all' filter
  filterProjects('all');

  // Header animation with pinning
  const headerTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".projects-header",
      start: "top top",
      end: "+=300",
      scrub: 1,
      pin: true
    }
  });
  
  headerTl.from(".hero-title", {
    y: 80,
    opacity: 0,
    duration: 1,
    ease: "power4.out"
  }).from(".hero-subtitle", {
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
  }, "-=0.5");

  // Grid entry animation
  gsap.from(".project-card", {
    y: 80,
    opacity: 0,
    stagger: 0.15,
    duration: 1,
    ease: "power4.out",
    scrollTrigger: {
      trigger: ".projects-grid-container",
      start: "top 85%",
      toggleActions: "play none none none"
    }
  });

  // Magnetic hover effect
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(project => {
    project.addEventListener('mousemove', (e) => {
      const rect = project.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const moveX = (x - centerX) / 20;
      const moveY = (y - centerY) / 20;
      
      gsap.to(project, {
        x: moveX,
        y: moveY,
        rotateX: -moveY * 0.5,
        rotateY: moveX * 0.5,
        transformPerspective: 1000,
        duration: 1.5,
        ease: "power2.out"
      });
    });
    
    project.addEventListener('mouseleave', () => {
      gsap.to(project, {
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.5)"
      });
    });
  });

  // Testimonial animations
  gsap.from(".testimonial-card", {
    y: 50,
    opacity: 1,
    stagger: 0.2,
    duration: 1,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: ".testimonials-section",
      start: "top 80%",
      toggleActions: "play none none none"
    }
  });
}

function initTestimonials() {
    const testimonials = gsap.utils.toArray('.testimonial-card');
    
    testimonials.forEach((card) => {
        // Set initial state
        gsap.set(card, {
            opacity: 1,
            y: 20
        });

        // Create a ScrollTrigger for each card
        ScrollTrigger.create({
            trigger: card,
            start: "top 80%",
            onEnter: () => {
                gsap.to(card, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "back.out(1.2)"
                });
            },
            onEnterBack: () => {
                gsap.to(card, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "back.out(1.2)"
                });
            },
            // Remove the once: true to make it trigger every time
            markers: false // Set to true if you want to debug
        });
    });
}

function initTextStagger() {
    gsap.utils.toArray('.stagger-text').forEach(text => {
        const chars = text.textContent.split('');
        text.textContent = '';
        
        chars.forEach(char => {
            const charSpan = document.createElement('span');
            charSpan.style.display = 'inline-block';
            charSpan.style.opacity = '0.8';
            charSpan.style.transform = 'translateY(10px)';
            charSpan.textContent = char;
            text.appendChild(charSpan);
            
            gsap.to(charSpan, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                delay: Math.random() * 0.4,
                ease: 'back.out(1.2)'
            });
        });
    });
}

// Call this in DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    initProjectsPage();
    initTestimonials();
    initTextStagger();
});
