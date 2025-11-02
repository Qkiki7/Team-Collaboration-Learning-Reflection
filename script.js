// Sketchnote Website Interactive Effects

document.addEventListener('DOMContentLoaded', function() {
    
    // Intersection Observer for stage animations
    const stages = document.querySelectorAll('.stage');
    
    const observerOptions = {
        root: null,
        rootMargin: '-150px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    stages.forEach(stage => {
        observer.observe(stage);
    });

    // Mouse sparkle effect
    const canvas = document.querySelector('.canvas');
    canvas.addEventListener('mousemove', function(e) {
        // Create random colored sparkles
        const colors = ['#FF69B4', '#FFB6C1', '#FFA5A5', '#87CEEB', '#B8A9E8', '#A8E6CF'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        const spark = document.createElement('div');
        spark.className = 'mouse-spark';
        spark.style.left = e.pageX + 'px';
        spark.style.top = e.pageY + 'px';
        spark.style.background = `radial-gradient(circle, ${color}, transparent)`;
        
        document.body.appendChild(spark);
        
        setTimeout(() => {
            spark.style.transition = 'all 1s ease-out';
            spark.style.opacity = '0';
            spark.style.transform = 'scale(2)';
            setTimeout(() => spark.remove(), 1000);
        }, 50);
    });

    // Add floating animation to bubbles
    const bubbles = document.querySelectorAll('.bubble');
    bubbles.forEach((bubble, index) => {
        bubble.style.animation = `float ${3 + Math.random() * 2}s ease-in-out infinite`;
        bubble.style.animationDelay = `${index * 0.2}s`;
    });

    // Add random rotation to text blocks
    const sketchTexts = document.querySelectorAll('.sketch-text');
    sketchTexts.forEach(text => {
        const randomRotation = (Math.random() - 0.5) * 0.5;
        text.style.transform = `rotate(${randomRotation}deg)`;
    });

    // Sequential reveal animation for ending
    window.addEventListener('scroll', function() {
        const ending = document.querySelector('.ending-frame');
        const rect = ending.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
            ending.style.animation = 'fadeInUp 2s ease-out forwards';
        }
    });

    // Add draw effect to path
    const pathLine = document.querySelector('.path-line');
    if (pathLine) {
        // Path will animate on load
        setTimeout(() => {
            pathLine.style.animation = 'drawPath 8s ease-out forwards';
        }, 500);
    }

    // Parallax effect for floating elements
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        const bubbles = document.querySelectorAll('.bubble');
        
        bubbles.forEach((bubble, index) => {
            const speed = 0.1 + (index % 3) * 0.05;
            // Store original transform in data attribute
            if (!bubble.dataset.originalTransform) {
                bubble.dataset.originalTransform = bubble.style.transform || '';
            }
            bubble.style.transform = `${bubble.dataset.originalTransform} translateY(${scrollY * speed}px)`;
        });
    });

    // Add sketchy underline effects
    const stageTitles = document.querySelectorAll('.stage-title-sketch');
    stageTitles.forEach(title => {
        title.addEventListener('mouseenter', function() {
            this.style.textDecoration = 'underline wavy';
            this.style.textDecorationColor = '#FF69B4';
        });
        
        title.addEventListener('mouseleave', function() {
            this.style.textDecoration = 'none';
        });
    });

    // Random jitter animation for hand-drawn feel
    setInterval(() => {
        const boxes = document.querySelectorAll('.sketch-box');
        boxes.forEach(box => {
            if (Math.random() > 0.95) {
                const currentRotate = parseFloat(box.style.transform.replace('rotate(', '').replace('deg)', '') || '0.5');
                const newRotate = currentRotate + (Math.random() - 0.5) * 0.2;
                box.style.transform = `rotate(${newRotate}deg)`;
            }
        });
    }, 1000);

    // Add ripple effect on bubble click
    bubbles.forEach(bubble => {
        bubble.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 182, 193, 0.5)';
            ripple.style.width = '10px';
            ripple.style.height = '10px';
            ripple.style.left = e.offsetX + 'px';
            ripple.style.top = e.offsetY + 'px';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.animation = 'ripple 0.6s ease-out';
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                width: 200px;
                height: 200px;
                opacity: 0;
            }
        }
        
        @keyframes float {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-10px);
            }
        }
    `;
    document.head.appendChild(style);

    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Add entrance animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);

    // Console easter egg
    console.log('%c🎨 SYNAPSE Sketchnote Journey 🎨', 'font-size: 24px; color: #FF69B4; font-weight: bold;');
    console.log('%cTrust is the foundation of innovation ✨', 'font-size: 14px; color: #87CEEB;');
});
