<<<<<<< HEAD
/**
 * Archivo de navegación dinámica
 * Maneja efectos del navbar al hacer scroll, navegación activa y menú móvil mejorado
 * Autor: matiias
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // =========================
    // CONFIGURACIÓN
    // =========================
    
    const navConfig = {
        scrollThreshold: 50,
        activeOffset: 100,
        mobileBreakpoint: 992
    };
    
    let isScrolling = false;
    let currentSection = '';
    
    // =========================
    // NAVBAR DINÁMICO AL SCROLL
    // =========================
    
    function initDynamicNavbar() {
        const navbar = document.querySelector('.navbar');
        const navbarBrand = document.querySelector('.navbar-brand');
        
        if (!navbar) return;
        
        let lastScrollTop = 0;
        let navbarVisible = true;
        
        function updateNavbar() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';
            
        
            if (scrollTop > navConfig.scrollThreshold) {
                navbar.classList.add('navbar-scrolled');
                
               
                if (scrollDirection === 'down' && scrollTop > 200 && navbarVisible) {
                    navbar.style.transform = 'translateY(-100%)';
                    navbarVisible = false;
                } else if (scrollDirection === 'up' && !navbarVisible) {
                    navbar.style.transform = 'translateY(0)';
                    navbarVisible = true;
                }
            } else {
                navbar.classList.remove('navbar-scrolled');
                navbar.style.transform = 'translateY(0)';
                navbarVisible = true;
            }
            
            lastScrollTop = scrollTop;
        }
        
       
        addNavbarStyles();
        
 
        let ticking = false;
        function onScroll() {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateNavbar();
                    updateActiveSection();
                    ticking = false;
                });
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', onScroll);
    }
    
    function addNavbarStyles() {
        const style = document.createElement('style');
        style.id = 'navbar-dynamic-styles';
        style.textContent = `
            .navbar {
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                backdrop-filter: blur(0px);
            }
            
            .navbar-scrolled {
                background: rgba(35, 37, 38, 0.95) !important;
                backdrop-filter: blur(20px);
                box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
                border-bottom: 1px solid rgba(0, 230, 230, 0.2);
            }
            
            .navbar-scrolled .navbar-brand {
                transform: scale(0.9);
                color: #00e6e6 !important;
            }
            
            .navbar-scrolled .nav-link {
                color: rgba(255, 255, 255, 0.9) !important;
            }
            
            .navbar-scrolled .nav-link:hover,
            .navbar-scrolled .nav-link.active {
                color: #00e6e6 !important;
            }
            
            /* Efectos del menú móvil */
            .navbar-toggler {
                border: none;
                padding: 4px 8px;
                transition: all 0.3s ease;
            }
            
            .navbar-toggler:focus {
                box-shadow: 0 0 0 3px rgba(0, 230, 230, 0.25);
            }
            
            .navbar-toggler-icon {
                background-image: none;
                width: 24px;
                height: 24px;
                position: relative;
                transition: all 0.3s ease;
            }
            
            .navbar-toggler-icon::before,
            .navbar-toggler-icon::after,
            .navbar-toggler-icon {
                background: #fff;
            }
            
            .navbar-toggler-icon::before,
            .navbar-toggler-icon::after {
                content: '';
                position: absolute;
                left: 0;
                width: 100%;
                height: 2px;
                background: #fff;
                transition: all 0.3s ease;
            }
            
            .navbar-toggler-icon::before {
                top: -8px;
            }
            
            .navbar-toggler-icon::after {
                bottom: -8px;
            }
            
            .navbar-toggler[aria-expanded="true"] .navbar-toggler-icon {
                background: transparent;
            }
            
            .navbar-toggler[aria-expanded="true"] .navbar-toggler-icon::before {
                transform: rotate(45deg);
                top: 0;
                background: #00e6e6;
            }
            
            .navbar-toggler[aria-expanded="true"] .navbar-toggler-icon::after {
                transform: rotate(-45deg);
                bottom: 0;
                background: #00e6e6;
            }
            
            /* Animación del menú móvil */
            .navbar-collapse {
                transition: all 0.3s ease;
            }
            
            .navbar-collapse.collapsing {
                transition: height 0.3s ease;
            }
            
            @media (max-width: 991.98px) {
                .navbar-collapse.show {
                    background: rgba(24, 28, 32, 0.98);
                    margin: 15px -15px -15px -15px;
                    padding: 20px 15px;
                    border-radius: 0 0 15px 15px;
                    border-top: 1px solid rgba(0, 230, 230, 0.3);
                    animation: slideDown 0.3s ease;
                }
                
                .navbar-nav .nav-link {
                    padding: 12px 16px !important;
                    margin: 5px 0;
                    border-radius: 8px;
                    transition: all 0.3s ease;
                }
                
                .navbar-nav .nav-link:hover {
                    background: rgba(0, 230, 230, 0.1);
                    transform: translateX(10px);
                }
            }
            
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // =========================
    // SECCIÓN ACTIVA AUTOMÁTICA
    // =========================
    
    function initActiveSection() {
        const sections = document.querySelectorAll('section[id], div[id]');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        
        if (sections.length === 0 || navLinks.length === 0) return;
        
        
        createSectionIndicator();
    }
    
    function updateActiveSection() {
        const sections = document.querySelectorAll('section[id], div[id]');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        const scrollPosition = window.pageYOffset + navConfig.activeOffset;
        
        let activeSection = '';
        
     
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                activeSection = sectionId;
            }
        });
        
        
        if (activeSection && activeSection !== currentSection) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${activeSection}`) {
                    link.classList.add('active');
                    
                    
                    link.style.animation = 'activeLink 0.3s ease';
                    setTimeout(() => {
                        link.style.animation = '';
                    }, 300);
                }
            });
            
            currentSection = activeSection;
            updateSectionIndicator(activeSection);
        }
    }
    
    // =========================
    // INDICADOR DE SECCIÓN
    // =========================
    
    function createSectionIndicator() {
        const indicator = document.createElement('div');
        indicator.id = 'section-indicator';
        indicator.style.cssText = `
            position: fixed;
            right: 30px;
            top: 50%;
            transform: translateY(-50%);
            z-index: 1000;
            display: flex;
            flex-direction: column;
            gap: 10px;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        const sections = document.querySelectorAll('section[id], div[id]');
        sections.forEach(section => {
            const dot = document.createElement('div');
            dot.className = 'section-dot';
            dot.setAttribute('data-section', section.id);
            dot.style.cssText = `
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                cursor: pointer;
                transition: all 0.3s ease;
                position: relative;
            `;
            
            
            const tooltip = document.createElement('span');
            tooltip.textContent = section.id.charAt(0).toUpperCase() + section.id.slice(1);
            tooltip.style.cssText = `
                position: absolute;
                right: 20px;
                top: 50%;
                transform: translateY(-50%);
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 5px 10px;
                border-radius: 5px;
                font-size: 12px;
                white-space: nowrap;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.3s ease;
            `;
            
            dot.appendChild(tooltip);
            
            // Eventos
            dot.addEventListener('mouseenter', () => {
                tooltip.style.opacity = '1';
            });
            
            dot.addEventListener('mouseleave', () => {
                tooltip.style.opacity = '0';
            });
            
            dot.addEventListener('click', () => {
                const target = document.getElementById(section.id);
                if (target) {
                    const navbar = document.querySelector('.navbar');
                    const offset = navbar ? navbar.offsetHeight + 20 : 80;
                    
                    window.scrollTo({
                        top: target.offsetTop - offset,
                        behavior: 'smooth'
                    });
                }
            });
            
            indicator.appendChild(dot);
        });
        
        document.body.appendChild(indicator);
        
        
        setTimeout(() => {
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    indicator.style.opacity = '1';
                } else {
                    indicator.style.opacity = '0';
                }
            });
        }, 1000);
    }
    
    function updateSectionIndicator(activeSection) {
        const dots = document.querySelectorAll('.section-dot');
        
        dots.forEach(dot => {
            const isActive = dot.getAttribute('data-section') === activeSection;
            
            if (isActive) {
                dot.style.background = 'linear-gradient(45deg, #00e6e6, #0072ff)';
                dot.style.transform = 'scale(1.5)';
                dot.style.boxShadow = '0 0 10px rgba(0, 230, 230, 0.5)';
            } else {
                dot.style.background = 'rgba(255, 255, 255, 0.3)';
                dot.style.transform = 'scale(1)';
                dot.style.boxShadow = 'none';
            }
        });
    }
    
    // =========================
    // MEJORAS DEL MENÚ MÓVIL
    // =========================
    
    function enhanceMobileMenu() {
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        
        if (!navbarToggler || !navbarCollapse) return;
        
        
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < navConfig.mobileBreakpoint) {
                    navbarToggler.click();
                }
            });
        });
        
      
        document.addEventListener('click', (e) => {
            const isClickInsideNav = navbarCollapse.contains(e.target) || 
                                   navbarToggler.contains(e.target);
            
            if (!isClickInsideNav && navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
        
       
        navbarToggler.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
    
    // =========================
    // NAVEGACIÓN CON TECLADO
    // =========================
    
    function initKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.altKey) {
                const sections = Array.from(document.querySelectorAll('section[id], div[id]'));
                const currentIndex = sections.findIndex(section => 
                    section.id === currentSection
                );
                
                let targetIndex = currentIndex;
                
                if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
                    targetIndex = currentIndex + 1;
                } else if (e.key === 'ArrowUp' && currentIndex > 0) {
                    targetIndex = currentIndex - 1;
                }
                
                if (targetIndex !== currentIndex && sections[targetIndex]) {
                    e.preventDefault();
                    
                    const target = sections[targetIndex];
                    const navbar = document.querySelector('.navbar');
                    const offset = navbar ? navbar.offsetHeight + 20 : 80;
                    
                    window.scrollTo({
                        top: target.offsetTop - offset,
                        behavior: 'smooth'
                    });
                }
            }
        });
    }
    
    // =========================
    // INICIALIZACIÓN
    // =========================
    
    function init() {
        initDynamicNavbar();
        initActiveSection();
        enhanceMobileMenu();
        initKeyboardNavigation();
        
     
        const style = document.createElement('style');
        style.textContent = `
            @keyframes activeLink {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
            
            /* Ocultar indicador en móvil */
            @media (max-width: 768px) {
                #section-indicator {
                    display: none;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
   
    setTimeout(init, 300);
=======
/**
 * Archivo de navegación dinámica
 * Maneja efectos del navbar al hacer scroll, navegación activa y menú móvil mejorado
 * Autor: matiias
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // =========================
    // CONFIGURACIÓN
    // =========================
    
    const navConfig = {
        scrollThreshold: 50,
        activeOffset: 100,
        mobileBreakpoint: 992
    };
    
    let isScrolling = false;
    let currentSection = '';
    
    // =========================
    // NAVBAR DINÁMICO AL SCROLL
    // =========================
    
    function initDynamicNavbar() {
        const navbar = document.querySelector('.navbar');
        const navbarBrand = document.querySelector('.navbar-brand');
        
        if (!navbar) return;
        
        let lastScrollTop = 0;
        let navbarVisible = true;
        
        function updateNavbar() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';
            
        
            if (scrollTop > navConfig.scrollThreshold) {
                navbar.classList.add('navbar-scrolled');
                
               
                if (scrollDirection === 'down' && scrollTop > 200 && navbarVisible) {
                    navbar.style.transform = 'translateY(-100%)';
                    navbarVisible = false;
                } else if (scrollDirection === 'up' && !navbarVisible) {
                    navbar.style.transform = 'translateY(0)';
                    navbarVisible = true;
                }
            } else {
                navbar.classList.remove('navbar-scrolled');
                navbar.style.transform = 'translateY(0)';
                navbarVisible = true;
            }
            
            lastScrollTop = scrollTop;
        }
        
       
        addNavbarStyles();
        
 
        let ticking = false;
        function onScroll() {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateNavbar();
                    updateActiveSection();
                    ticking = false;
                });
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', onScroll);
    }
    
    function addNavbarStyles() {
        const style = document.createElement('style');
        style.id = 'navbar-dynamic-styles';
        style.textContent = `
            .navbar {
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                backdrop-filter: blur(0px);
            }
            
            .navbar-scrolled {
                background: rgba(35, 37, 38, 0.95) !important;
                backdrop-filter: blur(20px);
                box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
                border-bottom: 1px solid rgba(0, 230, 230, 0.2);
            }
            
            .navbar-scrolled .navbar-brand {
                transform: scale(0.9);
                color: #00e6e6 !important;
            }
            
            .navbar-scrolled .nav-link {
                color: rgba(255, 255, 255, 0.9) !important;
            }
            
            .navbar-scrolled .nav-link:hover,
            .navbar-scrolled .nav-link.active {
                color: #00e6e6 !important;
            }
            
            /* Efectos del menú móvil */
            .navbar-toggler {
                border: none;
                padding: 4px 8px;
                transition: all 0.3s ease;
            }
            
            .navbar-toggler:focus {
                box-shadow: 0 0 0 3px rgba(0, 230, 230, 0.25);
            }
            
            .navbar-toggler-icon {
                background-image: none;
                width: 24px;
                height: 24px;
                position: relative;
                transition: all 0.3s ease;
            }
            
            .navbar-toggler-icon::before,
            .navbar-toggler-icon::after,
            .navbar-toggler-icon {
                background: #fff;
            }
            
            .navbar-toggler-icon::before,
            .navbar-toggler-icon::after {
                content: '';
                position: absolute;
                left: 0;
                width: 100%;
                height: 2px;
                background: #fff;
                transition: all 0.3s ease;
            }
            
            .navbar-toggler-icon::before {
                top: -8px;
            }
            
            .navbar-toggler-icon::after {
                bottom: -8px;
            }
            
            .navbar-toggler[aria-expanded="true"] .navbar-toggler-icon {
                background: transparent;
            }
            
            .navbar-toggler[aria-expanded="true"] .navbar-toggler-icon::before {
                transform: rotate(45deg);
                top: 0;
                background: #00e6e6;
            }
            
            .navbar-toggler[aria-expanded="true"] .navbar-toggler-icon::after {
                transform: rotate(-45deg);
                bottom: 0;
                background: #00e6e6;
            }
            
            /* Animación del menú móvil */
            .navbar-collapse {
                transition: all 0.3s ease;
            }
            
            .navbar-collapse.collapsing {
                transition: height 0.3s ease;
            }
            
            @media (max-width: 991.98px) {
                .navbar-collapse.show {
                    background: rgba(24, 28, 32, 0.98);
                    margin: 15px -15px -15px -15px;
                    padding: 20px 15px;
                    border-radius: 0 0 15px 15px;
                    border-top: 1px solid rgba(0, 230, 230, 0.3);
                    animation: slideDown 0.3s ease;
                }
                
                .navbar-nav .nav-link {
                    padding: 12px 16px !important;
                    margin: 5px 0;
                    border-radius: 8px;
                    transition: all 0.3s ease;
                }
                
                .navbar-nav .nav-link:hover {
                    background: rgba(0, 230, 230, 0.1);
                    transform: translateX(10px);
                }
            }
            
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // =========================
    // SECCIÓN ACTIVA AUTOMÁTICA
    // =========================
    
    function initActiveSection() {
        const sections = document.querySelectorAll('section[id], div[id]');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        
        if (sections.length === 0 || navLinks.length === 0) return;
        
        
        createSectionIndicator();
    }
    
    function updateActiveSection() {
        const sections = document.querySelectorAll('section[id], div[id]');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        const scrollPosition = window.pageYOffset + navConfig.activeOffset;
        
        let activeSection = '';
        
     
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                activeSection = sectionId;
            }
        });
        
        
        if (activeSection && activeSection !== currentSection) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${activeSection}`) {
                    link.classList.add('active');
                    
                    
                    link.style.animation = 'activeLink 0.3s ease';
                    setTimeout(() => {
                        link.style.animation = '';
                    }, 300);
                }
            });
            
            currentSection = activeSection;
            updateSectionIndicator(activeSection);
        }
    }
    
    // =========================
    // INDICADOR DE SECCIÓN
    // =========================
    
    function createSectionIndicator() {
        const indicator = document.createElement('div');
        indicator.id = 'section-indicator';
        indicator.style.cssText = `
            position: fixed;
            right: 30px;
            top: 50%;
            transform: translateY(-50%);
            z-index: 1000;
            display: flex;
            flex-direction: column;
            gap: 10px;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        const sections = document.querySelectorAll('section[id], div[id]');
        sections.forEach(section => {
            const dot = document.createElement('div');
            dot.className = 'section-dot';
            dot.setAttribute('data-section', section.id);
            dot.style.cssText = `
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                cursor: pointer;
                transition: all 0.3s ease;
                position: relative;
            `;
            
            
            const tooltip = document.createElement('span');
            tooltip.textContent = section.id.charAt(0).toUpperCase() + section.id.slice(1);
            tooltip.style.cssText = `
                position: absolute;
                right: 20px;
                top: 50%;
                transform: translateY(-50%);
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 5px 10px;
                border-radius: 5px;
                font-size: 12px;
                white-space: nowrap;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.3s ease;
            `;
            
            dot.appendChild(tooltip);
            
            // Eventos
            dot.addEventListener('mouseenter', () => {
                tooltip.style.opacity = '1';
            });
            
            dot.addEventListener('mouseleave', () => {
                tooltip.style.opacity = '0';
            });
            
            dot.addEventListener('click', () => {
                const target = document.getElementById(section.id);
                if (target) {
                    const navbar = document.querySelector('.navbar');
                    const offset = navbar ? navbar.offsetHeight + 20 : 80;
                    
                    window.scrollTo({
                        top: target.offsetTop - offset,
                        behavior: 'smooth'
                    });
                }
            });
            
            indicator.appendChild(dot);
        });
        
        document.body.appendChild(indicator);
        
        
        setTimeout(() => {
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    indicator.style.opacity = '1';
                } else {
                    indicator.style.opacity = '0';
                }
            });
        }, 1000);
    }
    
    function updateSectionIndicator(activeSection) {
        const dots = document.querySelectorAll('.section-dot');
        
        dots.forEach(dot => {
            const isActive = dot.getAttribute('data-section') === activeSection;
            
            if (isActive) {
                dot.style.background = 'linear-gradient(45deg, #00e6e6, #0072ff)';
                dot.style.transform = 'scale(1.5)';
                dot.style.boxShadow = '0 0 10px rgba(0, 230, 230, 0.5)';
            } else {
                dot.style.background = 'rgba(255, 255, 255, 0.3)';
                dot.style.transform = 'scale(1)';
                dot.style.boxShadow = 'none';
            }
        });
    }
    
    // =========================
    // MEJORAS DEL MENÚ MÓVIL
    // =========================
    
    function enhanceMobileMenu() {
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        
        if (!navbarToggler || !navbarCollapse) return;
        
        
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < navConfig.mobileBreakpoint) {
                    navbarToggler.click();
                }
            });
        });
        
      
        document.addEventListener('click', (e) => {
            const isClickInsideNav = navbarCollapse.contains(e.target) || 
                                   navbarToggler.contains(e.target);
            
            if (!isClickInsideNav && navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
        
       
        navbarToggler.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
    
    // =========================
    // NAVEGACIÓN CON TECLADO
    // =========================
    
    function initKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.altKey) {
                const sections = Array.from(document.querySelectorAll('section[id], div[id]'));
                const currentIndex = sections.findIndex(section => 
                    section.id === currentSection
                );
                
                let targetIndex = currentIndex;
                
                if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
                    targetIndex = currentIndex + 1;
                } else if (e.key === 'ArrowUp' && currentIndex > 0) {
                    targetIndex = currentIndex - 1;
                }
                
                if (targetIndex !== currentIndex && sections[targetIndex]) {
                    e.preventDefault();
                    
                    const target = sections[targetIndex];
                    const navbar = document.querySelector('.navbar');
                    const offset = navbar ? navbar.offsetHeight + 20 : 80;
                    
                    window.scrollTo({
                        top: target.offsetTop - offset,
                        behavior: 'smooth'
                    });
                }
            }
        });
    }
    
    // =========================
    // INICIALIZACIÓN
    // =========================
    
    function init() {
        initDynamicNavbar();
        initActiveSection();
        enhanceMobileMenu();
        initKeyboardNavigation();
        
     
        const style = document.createElement('style');
        style.textContent = `
            @keyframes activeLink {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
            
            /* Ocultar indicador en móvil */
            @media (max-width: 768px) {
                #section-indicator {
                    display: none;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
   
    setTimeout(init, 300);
>>>>>>> 4d0d2f9e58d34b3aee270105c075f1d1a1d1fb91
});