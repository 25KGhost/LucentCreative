// cursor.js
function initCustomCursor() {
    // Only enable on devices with fine pointer (desktop)
    if (!window.matchMedia('(pointer: fine)').matches) {
        document.body.style.cursor = 'auto';
        return;
    }

    // Create cursor elements if they don't exist
    if (!document.querySelector('.custom-cursor')) {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);
    }

    const cursor = document.querySelector('.custom-cursor');
    let isHovering = false;
    let isActive = false;

    // Set initial state
    cursor.style.position = 'fixed';
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    cursor.style.borderRadius = '50%';
    cursor.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = '9999';
    cursor.style.transform = 'translate(-50%, -50%)';
    cursor.style.mixBlendMode = 'difference';
    cursor.style.transition = 'transform 0.1s, width 0.2s, height 0.2s';
    cursor.style.willChange = 'transform';
    document.body.style.cursor = 'none';

    // Elements that should trigger hover state
    const hoverElements = [
        'a', 'button', 'input', 'textarea', 
        '[role="button"]', '[data-cursor-hover]',
        '.cta-button', '.project', '.menu-toggle'
    ];

    // Update cursor position
    function updateCursorPosition(e) {
        const { clientX: x, clientY: y } = e;
        cursor.style.left = `${x}px`;
        cursor.style.top = `${y}px`;
    }

    // Handle hover states
    function handleHoverState() {
        if (isActive) return;
        
        if (isHovering) {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        } else {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        }
    }

    // Handle click state
    function handleClickState() {
        isActive = true;
        cursor.style.width = '15px';
        cursor.style.height = '15px';
        cursor.style.backgroundColor = 'rgba(255, 255, 255, 1)';
        
        setTimeout(() => {
            isActive = false;
            handleHoverState();
        }, 100);
    }

    // Event listeners
    document.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('mousedown', handleClickState);
    document.addEventListener('mouseup', () => isActive = false);

    // Set up hover events for all interactive elements
    document.querySelectorAll(hoverElements.join(',')).forEach(el => {
        el.addEventListener('mouseenter', () => {
            isHovering = true;
            handleHoverState();
        });
        el.addEventListener('mouseleave', () => {
            isHovering = false;
            handleHoverState();
        });
    });

    // Handle iframes - hide cursor when over iframes
    document.querySelectorAll('iframe').forEach(iframe => {
        iframe.addEventListener('mouseenter', () => {
            cursor.style.opacity = '0';
        });
        iframe.addEventListener('mouseleave', () => {
            cursor.style.opacity = '1';
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initCustomCursor);

// Re-initialize when new content is added (like in SPAs)
if (typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver(() => {
        initCustomCursor();
    });
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}
