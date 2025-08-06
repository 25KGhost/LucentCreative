// Three.js Interactive Scene
class InteractiveScene {
    constructor() {
        this.interactiveContainer = document.getElementById('interactiveCanvas');
        this.mouse = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
        
        this.initInteractiveScene();
        this.initEventListeners();
        this.animate();
    }

    initInteractiveScene() {
        // Interactive scene
        this.intScene = new THREE.Scene();
        this.intCamera = new THREE.PerspectiveCamera(75, this.interactiveContainer.clientWidth / this.interactiveContainer.clientHeight, 0.1, 1000);
        this.intRenderer = new THREE.WebGLRenderer({ 
            canvas: this.interactiveContainer, 
            alpha: true, 
            antialias: true 
        });
        
        this.intRenderer.setSize(this.interactiveContainer.clientWidth, this.interactiveContainer.clientHeight);
        this.intRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.intCamera.position.z = 3;

        // Create interactive elements
        this.createInteractiveElements();
    }

    createInteractiveElements() {
        // Create geometric shapes that respond to mouse
        const geometries = [
            new THREE.BoxGeometry(0.5, 0.5, 0.5),
            new THREE.SphereGeometry(0.3, 16, 16),
            new THREE.ConeGeometry(0.3, 0.6, 8),
            new THREE.OctahedronGeometry(0.4)
        ];

        this.interactiveObjects = [];

        geometries.forEach((geometry, index) => {
            const material = new THREE.MeshBasicMaterial({
                color: 0xd4af37,
                wireframe: true,
                transparent: true,
                opacity: 0.4
            });

            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.x = (index - 1.5) * 1.2;
            mesh.position.y = 0;
            mesh.userData = { originalY: 0, index: index };
            
            this.interactiveObjects.push(mesh);
            this.intScene.add(mesh);
        });
    }

    initEventListeners() {
        window.addEventListener('resize', () => this.onWindowResize());
        this.interactiveContainer.addEventListener('mousemove', (e) => this.onMouseMove(e));
        this.interactiveContainer.addEventListener('mouseleave', () => this.onMouseLeave());
    }

    onMouseMove(event) {
        const rect = this.interactiveContainer.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        // Update raycaster
        this.raycaster.setFromCamera(this.mouse, this.intCamera);
        const intersects = this.raycaster.intersectObjects(this.interactiveObjects);

        // Reset all objects
        this.interactiveObjects.forEach(obj => {
            gsap.to(obj.position, {
                y: obj.userData.originalY,
                duration: 0.3,
                ease: "power2.out"
            });
            gsap.to(obj.material, {
                opacity: 0.4,
                duration: 0.3
            });
        });

        // Highlight intersected objects
        if (intersects.length > 0) {
            const obj = intersects[0].object;
            gsap.to(obj.position, {
                y: obj.userData.originalY + 0.3,
                duration: 0.3,
                ease: "power2.out"
            });
            gsap.to(obj.material, {
                opacity: 0.8,
                duration: 0.3
            });
        }
    }

    onMouseLeave() {
        this.interactiveObjects.forEach(obj => {
            gsap.to(obj.position, {
                y: obj.userData.originalY,
                duration: 0.5,
                ease: "power2.out"
            });
            gsap.to(obj.material, {
                opacity: 0.4,
                duration: 0.5
            });
        });
    }

    onWindowResize() {
        // Interactive scene resize
        const width = this.interactiveContainer.clientWidth;
        const height = this.interactiveContainer.clientHeight;
        this.intCamera.aspect = width / height;
        this.intCamera.updateProjectionMatrix();
        this.intRenderer.setSize(width, height);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Animate interactive objects
        this.interactiveObjects.forEach((obj, index) => {
            obj.rotation.x += 0.01;
            obj.rotation.y += 0.01 * (index + 1);
        });

        // Render scene
        this.intRenderer.render(this.intScene, this.intCamera);
    }
}

// GSAP Animations
function initAnimations() {
    // Header animation
    gsap.to('.section-header', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.vision-section',
            start: 'top 70%',
            toggleActions: 'play none none none'
        }
    });

    // Vision items animation
    gsap.to('.vision-item', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.vision-grid',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });

    // Process steps animation
    gsap.to('.process-step', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.process-flow',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });

    // Canvas reveal
    gsap.fromTo('.vision-canvas-container', 
        {
            opacity: 0,
            scale: 0.8
        },
        {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.vision-canvas-container',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        }
    );
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const interactiveScene = new InteractiveScene();
    initAnimations();
});