function initContactAnimations() {
    // Form input animations
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const label = group.querySelector('label');
        const line = group.querySelector('.focus-line');
        
        input.addEventListener('focus', () => {
            gsap.to(label, {
                y: -20,
                fontSize: '0.8rem',
                color: 'var(--color-primary)',
                duration: 0.3,
                ease: 'power2.out'
            });
            
            gsap.to(line, {
                width: '100%',
                duration: 0.5,
                ease: 'power2.out'
            });
            
            gsap.to(input, {
                borderBottomColor: 'rgba(212, 175, 55, 0.5)',
                duration: 0.3
            });
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                gsap.to(label, {
                    y: 0,
                    fontSize: '1rem',
                    color: 'rgba(255, 255, 255, 0.6)',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
            
            gsap.to(line, {
                width: '0%',
                duration: 0.3,
                ease: 'power2.out'
            });
            
            gsap.to(input, {
                borderBottomColor: 'rgba(255, 255, 255, 0.1)',
                duration: 0.3
            });
        });
        
        // Animate label if input has value on load
        if (input.value) {
            gsap.set(label, {
                y: -20,
                fontSize: '0.8rem',
                color: 'var(--color-primary)'
            });
        }
    });
    
    // Contact option hover animations
    const contactOptions = document.querySelectorAll('.contact-option');
    
    contactOptions.forEach(option => {
        option.addEventListener('mouseenter', () => {
            gsap.to(option, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        option.addEventListener('mouseleave', () => {
            gsap.to(option, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
    
    // Submit button animation
    const submitButton = document.querySelector('.submit-button');
    
    if (submitButton) {
        submitButton.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Check if form is valid
            const form = submitButton.closest('form');
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }
            
            // Button press animation
            gsap.to(submitButton, {
                scale: 0.95,
                duration: 0.2,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut'
            });
            
            // Simulate form submission
            setTimeout(() => {
                const tl = gsap.timeline();
                
                tl.to(submitButton, {
                    backgroundColor: 'var(--color-light)',
                    color: 'var(--color-dark)',
                    duration: 0.3
                })
                .to(submitButton, {
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--color-dark)',
                    duration: 0.3,
                    delay: 1
                });
                
                submitButton.querySelector('span').textContent = 'Message Sent!';
                
                setTimeout(() => {
                    submitButton.querySelector('span').textContent = 'Send Message';
                    form.reset();
                    
                    // Reset labels
                    formGroups.forEach(group => {
                        const input = group.querySelector('input, textarea');
                        const label = group.querySelector('label');
                        
                        if (!input.value) {
                            gsap.to(label, {
                                y: 0,
                                fontSize: '1rem',
                                color: 'rgba(255, 255, 255, 0.6)',
                                duration: 0.3,
                                ease: 'power2.out'
                            });
                        }
                    });
                }, 2000);
            }, 1000);
        });
    }
}

// Initialize contact animations
document.addEventListener('DOMContentLoaded', initContactAnimations);