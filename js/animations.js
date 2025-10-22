<<<<<<< HEAD
/**
 * Archivo de animaciones de scroll
 * Autor: matias
 * 
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // =========================
    // SMOOTH SCROLLING
    // =========================
    
    function initSmoothScrolling() {
        // Obtener todos los enlaces de navegaciones 
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                   
                    const navbar = document.querySelector('.navbar');
                    const navbarHeight = navbar ? navbar.offsetHeight : 0;
                    
                  
                    const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                    
                   
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                  
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    
                    if (navbarToggler && navbarCollapse.classList.contains('show')) {
                        navbarToggler.click();
                    }
                }
            });
        });
    }
    
    // =========================
    // SCROLL REVEAL ANIMATIONS TIKIRIKI
    // =========================
    
    function initScrollReveal() {
        // Agregar estilos para las animaciones
        const style = document.createElement('style');
        style.textContent = `
            .reveal-element {
                opacity: 0;
                transform: translateY(50px);
                transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            
            .reveal-element.revealed {
                opacity: 1;
                transform: translateY(0);
            }
            
            .reveal-left {
                opacity: 0;
                transform: translateX(-50px);
                transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            
            .reveal-left.revealed {
                opacity: 1;
                transform: translateX(0);
            }
            
            .reveal-right {
                opacity: 0;
                transform: translateX(50px);
                transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            
            .reveal-right.revealed {
                opacity: 1;
                transform: translateX(0);
            }
            
            .reveal-scale {
                opacity: 0;
                transform: scale(0.8);
                transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            
            .reveal-scale.revealed {
                opacity: 1;
                transform: scale(1);
            }
            
            .reveal-fade {
                opacity: 0;
                transition: opacity 1s ease;
            }
            
            .reveal-fade.revealed {
                opacity: 1;
            }
        `;
        document.head.appendChild(style);
        
        
        addRevealClasses();
        
      
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);
        
        
        const revealElements = document.querySelectorAll('[class*="reveal-"]');
        revealElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    function addRevealClasses() {
       
        const heroTitle = document.querySelector('.hero-section h1');
        const heroSubtitle = document.querySelector('.hero-section p');
        const heroButton = document.querySelector('.hero-section .btn');
        
        if (heroTitle) heroTitle.classList.add('reveal-fade');
        if (heroSubtitle) heroSubtitle.classList.add('reveal-fade');
        if (heroButton) heroButton.classList.add('reveal-scale');
        
       
        const cards = document.querySelectorAll('.card');
        cards.forEach((card, index) => {
            if (index % 2 === 0) {
                card.classList.add('reveal-left');
            } else {
                card.classList.add('reveal-right');
            }
        });
        
        
        const listItems = document.querySelectorAll('.list-unstyled li');
        listItems.forEach(item => {
            item.classList.add('reveal-element');
        });
        
        
        const formElements = document.querySelectorAll('.formulario .mb-3');
        formElements.forEach(element => {
            element.classList.add('reveal-element');
        });
        
       
        const submitButton = document.querySelector('.formulario .btn');
        if (submitButton) {
            submitButton.classList.add('reveal-scale');
        }
    }
    
    // =========================
    // EFECTOS DE SCROLL ADICIONALES TIKIRIKI
    // =========================
    
    function initScrollEffects() {
        let ticking = false;
        
        function updateScrollEffects() {
            const scrollY = window.pageYOffset;
            const windowHeight = window.innerHeight;
            
           
            const heroSection = document.querySelector('.hero-section');
            if (heroSection && scrollY < windowHeight) {
                const rate = scrollY * -0.3;
                heroSection.style.transform = `translateY(${rate}px)`;
            }
            
          
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                if (scrollY > 100) {
                    navbar.style.background = 'linear-gradient(90deg, rgba(35, 37, 38, 0.95) 0%, rgba(65, 67, 69, 0.95) 100%)';
                    navbar.style.backdropFilter = 'blur(10px)';
                    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
                } else {
                    navbar.style.background = 'linear-gradient(90deg, #232526 0%, #414345 100%)';
                    navbar.style.backdropFilter = 'none';
                    navbar.style.boxShadow = 'none';
                }
            }
            
            
            updateScrollProgress();
            
            ticking = false;
        }
        
        function onScroll() {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', onScroll);
    }
    
    // =========================
    // INDICADOR DE PROGRESO DE SCROLL
    // =========================
    
    function createScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.id = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #00e6e6, #0072ff);
            z-index: 9999;
            transition: width 0.1s ease;
            box-shadow: 0 0 10px rgba(0, 230, 230, 0.5);
        `;
        document.body.appendChild(progressBar);
    }
    
    function updateScrollProgress() {
        const scrollProgress = document.getElementById('scroll-progress');
        if (scrollProgress) {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrolled = window.pageYOffset;
            const progress = (scrolled / documentHeight) * 100;
            
            scrollProgress.style.width = `${Math.min(progress, 100)}%`;
        }
    }
    
    // =========================
    // NAVEGACIÓN ACTIVA
    // =========================
    
    function enhanceNavigation() {
        const sections = document.querySelectorAll('section[id], div[id]');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        
        function updateActiveNavLink() {
            const scrollPosition = window.pageYOffset + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }
        
        window.addEventListener('scroll', updateActiveNavLink);
    }
    
    // =========================
    // INICIALIZAR TODAS LAS FUNCIONES
    // =========================
    
    function init() {
        initSmoothScrolling();
        initScrollReveal();
        initScrollEffects();
        createScrollProgress();
        enhanceNavigation();
        
       
        setTimeout(() => {
            const heroElements = document.querySelectorAll('.hero-section [class*="reveal-"]');
            heroElements.forEach((element, index) => {
                setTimeout(() => {
                    element.classList.add('revealed');
                }, index * 200);
            });
        }, 500);
    }
    
    
    init();
=======
/**
 * Archivo de animaciones de scroll
 * Autor: matias
 * 
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // =========================
    // SMOOTH SCROLLING
    // =========================
    
    function initSmoothScrolling() {
        // Obtener todos los enlaces de navegaciones 
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                   
                    const navbar = document.querySelector('.navbar');
                    const navbarHeight = navbar ? navbar.offsetHeight : 0;
                    
                  
                    const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                    
                   
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                  
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    
                    if (navbarToggler && navbarCollapse.classList.contains('show')) {
                        navbarToggler.click();
                    }
                }
            });
        });
    }
    
    // =========================
    // SCROLL REVEAL ANIMATIONS TIKIRIKI
    // =========================
    
    function initScrollReveal() {
        // Agregar estilos para las animaciones
        const style = document.createElement('style');
        style.textContent = `
            .reveal-element {
                opacity: 0;
                transform: translateY(50px);
                transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            
            .reveal-element.revealed {
                opacity: 1;
                transform: translateY(0);
            }
            
            .reveal-left {
                opacity: 0;
                transform: translateX(-50px);
                transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            
            .reveal-left.revealed {
                opacity: 1;
                transform: translateX(0);
            }
            
            .reveal-right {
                opacity: 0;
                transform: translateX(50px);
                transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            
            .reveal-right.revealed {
                opacity: 1;
                transform: translateX(0);
            }
            
            .reveal-scale {
                opacity: 0;
                transform: scale(0.8);
                transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            
            .reveal-scale.revealed {
                opacity: 1;
                transform: scale(1);
            }
            
            .reveal-fade {
                opacity: 0;
                transition: opacity 1s ease;
            }
            
            .reveal-fade.revealed {
                opacity: 1;
            }
        `;
        document.head.appendChild(style);
        
        
        addRevealClasses();
        
      
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);
        
        
        const revealElements = document.querySelectorAll('[class*="reveal-"]');
        revealElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    function addRevealClasses() {
       
        const heroTitle = document.querySelector('.hero-section h1');
        const heroSubtitle = document.querySelector('.hero-section p');
        const heroButton = document.querySelector('.hero-section .btn');
        
        if (heroTitle) heroTitle.classList.add('reveal-fade');
        if (heroSubtitle) heroSubtitle.classList.add('reveal-fade');
        if (heroButton) heroButton.classList.add('reveal-scale');
        
       
        const cards = document.querySelectorAll('.card');
        cards.forEach((card, index) => {
            if (index % 2 === 0) {
                card.classList.add('reveal-left');
            } else {
                card.classList.add('reveal-right');
            }
        });
        
        
        const listItems = document.querySelectorAll('.list-unstyled li');
        listItems.forEach(item => {
            item.classList.add('reveal-element');
        });
        
        
        const formElements = document.querySelectorAll('.formulario .mb-3');
        formElements.forEach(element => {
            element.classList.add('reveal-element');
        });
        
       
        const submitButton = document.querySelector('.formulario .btn');
        if (submitButton) {
            submitButton.classList.add('reveal-scale');
        }
    }
    
    // =========================
    // EFECTOS DE SCROLL ADICIONALES TIKIRIKI
    // =========================
    
    function initScrollEffects() {
        let ticking = false;
        
        function updateScrollEffects() {
            const scrollY = window.pageYOffset;
            const windowHeight = window.innerHeight;
            
           
            const heroSection = document.querySelector('.hero-section');
            if (heroSection && scrollY < windowHeight) {
                const rate = scrollY * -0.3;
                heroSection.style.transform = `translateY(${rate}px)`;
            }
            
          
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                if (scrollY > 100) {
                    navbar.style.background = 'linear-gradient(90deg, rgba(35, 37, 38, 0.95) 0%, rgba(65, 67, 69, 0.95) 100%)';
                    navbar.style.backdropFilter = 'blur(10px)';
                    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
                } else {
                    navbar.style.background = 'linear-gradient(90deg, #232526 0%, #414345 100%)';
                    navbar.style.backdropFilter = 'none';
                    navbar.style.boxShadow = 'none';
                }
            }
            
            
            updateScrollProgress();
            
            ticking = false;
        }
        
        function onScroll() {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', onScroll);
    }
    
    // =========================
    // INDICADOR DE PROGRESO DE SCROLL
    // =========================
    
    function createScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.id = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #00e6e6, #0072ff);
            z-index: 9999;
            transition: width 0.1s ease;
            box-shadow: 0 0 10px rgba(0, 230, 230, 0.5);
        `;
        document.body.appendChild(progressBar);
    }
    
    function updateScrollProgress() {
        const scrollProgress = document.getElementById('scroll-progress');
        if (scrollProgress) {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrolled = window.pageYOffset;
            const progress = (scrolled / documentHeight) * 100;
            
            scrollProgress.style.width = `${Math.min(progress, 100)}%`;
        }
    }
    
    // =========================
    // NAVEGACIÓN ACTIVA
    // =========================
    
    function enhanceNavigation() {
        const sections = document.querySelectorAll('section[id], div[id]');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        
        function updateActiveNavLink() {
            const scrollPosition = window.pageYOffset + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }
        
        window.addEventListener('scroll', updateActiveNavLink);
    }
    
    // =========================
    // INICIALIZAR TODAS LAS FUNCIONES
    // =========================
    
    function init() {
        initSmoothScrolling();
        initScrollReveal();
        initScrollEffects();
        createScrollProgress();
        enhanceNavigation();
        
       
        setTimeout(() => {
            const heroElements = document.querySelectorAll('.hero-section [class*="reveal-"]');
            heroElements.forEach((element, index) => {
                setTimeout(() => {
                    element.classList.add('revealed');
                }, index * 200);
            });
        }, 500);
    }
    
    
    init();
>>>>>>> 4d0d2f9e58d34b3aee270105c075f1d1a1d1fb91
});