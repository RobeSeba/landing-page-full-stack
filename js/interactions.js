/**
 * Archivo de micro-interacciones y efectos visuales
 * Maneja efectos de hover avanzados, loading y feedback visual
 * Autor: matoas
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // =========================
    // EFECTOS DE LOADING
    // =========================
    
    
    function showPageLoader() {
        const loader = document.createElement('div');
        loader.id = 'page-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="spinner"></div>
                <p>Cargando experiencia increíble :3</p>
            </div>
        `;
        
       
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, #232526, #0f2027);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            .loader-content {
                text-align: center;
                color: #00e6e6;
            }
            
            .spinner {
                width: 50px;
                height: 50px;
                border: 3px solid rgba(0, 230, 230, 0.3);
                border-top: 3px solid #00e6e6;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 20px;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            .loader-content p {
                font-size: 1.2rem;
                margin: 0;
                animation: pulse 2s ease-in-out infinite;
            }
            
            @keyframes pulse {
                0%, 100% { opacity: 0.6; }
                50% { opacity: 1; }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(loader);
        
        
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                if (loader.parentNode) {
                    loader.parentNode.removeChild(loader);
                }
            }, 500);
        }, 1500);
    }
    
    
    showPageLoader();
    
    // =========================
    // EFECTOS DE ICONOS
    // =========================
    
  
    function addIconEffects() {
        const icons = document.querySelectorAll('.bi');
        
        icons.forEach(icon => {
            icon.addEventListener('mouseenter', function() {
                this.style.animation = 'pulse-icon 0.6s ease';
            });
            
            icon.addEventListener('animationend', function() {
                this.style.animation = '';
            });
        });
    }
    
    // =========================
    // EFECTOS DE BOTONES AVANZADOS
    // =========================
    
    function addButtonRippleEffect() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.5);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `;
                
                this.appendChild(ripple);
                
               
                setTimeout(() => {
                    if (ripple.parentNode) {
                        ripple.parentNode.removeChild(ripple);
                    }
                }, 600);
            });
        });
        
       
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // =========================
    // EFECTOS DE PARALLAX SUTIL
    // =========================
    
    function addParallaxEffect() {
        const heroSection = document.querySelector('.hero-section');
        
        if (heroSection) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                
                if (scrolled < window.innerHeight) {
                    heroSection.style.transform = `translateY(${rate}px)`;
                }
            });
        }
    }
    
    // =========================
    // EFECTOS DE TYPING TEXT
    // =========================
    
    function addTypingEffect() {
        const typingElements = document.querySelectorAll('[data-typing]');
        
        typingElements.forEach(element => {
            const text = element.textContent;
            const speed = parseInt(element.getAttribute('data-typing')) || 100;
            
            element.textContent = '';
            element.style.borderRight = '2px solid #00e6e6';
            element.style.animation = 'blink 1s infinite';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, speed);
                } else {
                   
                    setTimeout(() => {
                        element.style.borderRight = 'none';
                        element.style.animation = 'none';
                    }, 1000);
                }
            };
            
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(typeWriter, 500);
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(element);
        });
        
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes blink {
                0%, 50% { border-color: #00e6e6; }
                51%, 100% { border-color: transparent; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // =========================
    // EFECTOS DE CONTADOR ANIMADO
    // =========================
    
    function addCounterEffect() {
        const counters = document.querySelectorAll('[data-counter]');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-counter'));
            const duration = parseInt(counter.getAttribute('data-duration')) || 2000;
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounter(counter, target, duration);
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(counter);
        });
    }
    
    function animateCounter(element, target, duration) {
        const start = 0;
        const increment = target / (duration / 16); // 60 FPS
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            element.textContent = Math.floor(current);
            
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    }
    
    // =========================
    // INICIALIZAR TODAS LAS FUNCIONES
    // =========================
    
   
    setTimeout(() => {
        addIconEffects();
        addButtonRippleEffect();
        addParallaxEffect();
        addTypingEffect();
        addCounterEffect();
    }, 100);
    
    // =========================
    // FEEDBACK VISUAL GLOBAL
    // =========================
    
  
    function addGlobalFeedback() {
        const interactiveElements = document.querySelectorAll('button, .btn, .nav-link, .card');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mousedown', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            element.addEventListener('mouseup', function() {
                this.style.transform = '';
            });
            
            element.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
    }
    
    addGlobalFeedback();
});