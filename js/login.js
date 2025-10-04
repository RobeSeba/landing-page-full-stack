/**
 * JavaScript para Login Interactivo
 * Autor: Matias
 * Funcionalidades: Validación, animaciones, efectos visuales
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // =========================
    // ELEMENTOS DEL DOM
    // =========================
    
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('EmailInput');
    const passwordInput = document.getElementById('PasswordInput');
    const submitBtn = document.getElementById('submitBtn');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const rememberMeCheckbox = document.getElementById('rememberMe');
    const loginLoader = document.getElementById('login-loader');
    const alertsContainer = document.getElementById('login-alerts');
    
    // =========================
    // CONFIGURACIÓN DE VALIDACIÓN
    // =========================
    
    const validationConfig = {
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            messages: {
                required: 'El correo electrónico es obligatorio',
                pattern: 'Por favor ingresa un correo electrónico válido'
            }
        },
        password: {
            required: true,
            minLength: 4,
            messages: {
                required: 'La contraseña es obligatoria',
                minLength: 'La contraseña debe tener al menos 4 caracteres'
            }
        }
    };
    
    // =========================
    // INICIALIZACIÓN
    // =========================
    
    function init() {
        showLoadingScreen();
        setTimeout(() => {
            hideLoadingScreen();
            initAnimations();
            initFormValidation();
            initPasswordToggle();
            initTypingEffect();
            restoreRememberedUser();
        }, 1500);
    }
    
    // =========================
    // LOADING SCREEN
    // =========================
    
    function showLoadingScreen() {
        if (loginLoader) {
            loginLoader.classList.remove('hidden');
        }
    }
    
    function hideLoadingScreen() {
        if (loginLoader) {
            loginLoader.classList.add('hidden');
            setTimeout(() => {
                loginLoader.style.display = 'none';
            }, 500);
        }
    }
    
    // =========================
    // ANIMACIONES DE ENTRADA
    // =========================
    
    function initAnimations() {
        // Animación de reveal para elementos
        const revealElements = document.querySelectorAll('[data-reveal]');
        
        revealElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.animation = 'cardReveal 0.8s ease forwards';
            }, index * 200);
        });
        
        // Animación de entrada para inputs
        const inputs = document.querySelectorAll('.login-input');
        inputs.forEach((input, index) => {
            setTimeout(() => {
                input.style.animation = 'slideInRight 0.6s ease forwards';
                input.style.animationDelay = `${index * 0.1}s`;
            }, 800);
        });
        
        // Agregar estilos de animación
        addAnimationStyles();
    }
    
    function addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(30px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @keyframes bounceIn {
                0% {
                    opacity: 0;
                    transform: scale(0.3);
                }
                50% {
                    opacity: 1;
                    transform: scale(1.05);
                }
                70% {
                    transform: scale(0.9);
                }
                100% {
                    opacity: 1;
                    transform: scale(1);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // =========================
    // EFECTO DE TYPING
    // =========================
    
    function initTypingEffect() {
        const typingElements = document.querySelectorAll('[data-typing]');
        
        typingElements.forEach(element => {
            const text = element.getAttribute('data-typing');
            const speed = parseInt(element.getAttribute('data-typing-speed')) || 100;
            
            element.textContent = '';
            element.classList.add('typing-cursor');
            
            let i = 0;
            function typeWriter() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, speed);
                } else {
                    setTimeout(() => {
                        element.classList.remove('typing-cursor');
                    }, 1000);
                }
            }
            
            setTimeout(typeWriter, 1000);
        });
    }
    
    // =========================
    // VALIDACIÓN DE FORMULARIO
    // =========================
    
    function initFormValidation() {
        if (emailInput) {
            setupFieldValidation(emailInput, 'email');
        }
        
        if (passwordInput) {
            setupFieldValidation(passwordInput, 'password');
        }
        
        if (loginForm) {
            loginForm.addEventListener('submit', handleFormSubmit);
        }
    }
    
    function setupFieldValidation(field, fieldType) {
        const config = validationConfig[fieldType];
        const feedbackElement = field.parentNode.querySelector('.validation-feedback');
        
        // Validación en tiempo real
        field.addEventListener('input', function() {
            validateField(this, fieldType, config, feedbackElement);
        });
        
        // Validación al perder el foco
        field.addEventListener('blur', function() {
            validateField(this, fieldType, config, feedbackElement, true);
        });
        
        // Efectos visuales al enfocar
        field.addEventListener('focus', function() {
            this.classList.remove('is-invalid');
            if (feedbackElement) {
                feedbackElement.classList.remove('show', 'invalid');
            }
        });
    }
    
    function validateField(field, fieldType, config, feedbackElement, showSuccess = false) {
        const value = field.value.trim();
        let isValid = true;
        let message = '';
        
        // Validar campo requerido
        if (config.required && !value) {
            isValid = false;
            message = config.messages.required;
        }
        // Validar longitud mínima
        else if (config.minLength && value && value.length < config.minLength) {
            isValid = false;
            message = config.messages.minLength;
        }
        // Validar patrón (para email)
        else if (config.pattern && value && !config.pattern.test(value)) {
            isValid = false;
            message = config.messages.pattern;
        }
        
        // Aplicar estilos visuales
        updateFieldFeedback(field, feedbackElement, isValid, message, showSuccess && value);
        
        return isValid;
    }
    
    function updateFieldFeedback(field, feedbackElement, isValid, message, showSuccess) {
        // Limpiar clases previas
        field.classList.remove('is-valid', 'is-invalid');
        
        if (feedbackElement) {
            feedbackElement.classList.remove('show', 'valid', 'invalid');
        }
        
        if (!isValid && message) {
            // Campo inválido
            field.classList.add('is-invalid');
            if (feedbackElement) {
                feedbackElement.textContent = message;
                feedbackElement.classList.add('show', 'invalid');
            }
        } else if (showSuccess && field.value.trim()) {
            // Campo válido
            field.classList.add('is-valid');
            if (feedbackElement) {
                feedbackElement.textContent = '✓ Correcto';
                feedbackElement.classList.add('show', 'valid');
            }
        }
    }
    
    // =========================
    // TOGGLE PASSWORD
    // =========================
    
    function initPasswordToggle() {
        if (togglePasswordBtn && passwordInput) {
            togglePasswordBtn.addEventListener('click', function() {
                const isPassword = passwordInput.type === 'password';
                
                passwordInput.type = isPassword ? 'text' : 'password';
                
                const icon = this.querySelector('i');
                icon.className = isPassword ? 'bi bi-eye-slash' : 'bi bi-eye';
                
                // Efecto visual
                this.style.transform = 'translateY(-50%) scale(0.9)';
                setTimeout(() => {
                    this.style.transform = 'translateY(-50%) scale(1)';
                }, 150);
            });
        }
    }
    
    // =========================
    // SUBMIT DEL FORMULARIO
    // =========================
    
    function handleFormSubmit(e) {
        // e.preventDefault();
        
        const isEmailValid = validateField(emailInput, 'email', validationConfig.email, 
            emailInput.parentNode.querySelector('.validation-feedback'), true);
        const isPasswordValid = validateField(passwordInput, 'password', validationConfig.password, 
            passwordInput.parentNode.querySelector('.validation-feedback'), true);
        
        if (!isEmailValid || !isPasswordValid) {
            showAlert('Por favor corrige los errores antes de continuar', 'danger');
            shakeForm();
            return;
        }
        
        // Recordar usuario si está marcado
        if (rememberMeCheckbox && rememberMeCheckbox.checked) {
            localStorage.setItem('rememberedEmail', emailInput.value);
        } else {
            localStorage.removeItem('rememberedEmail');
        }
        
        // Mostrar loading y simular envío
        showLoadingButton();
        
        // Simular verificación (reemplazar con envío real)
        setTimeout(() => {
            // Aquí enviarías al servidor real
            loginForm.submit();
        }, 2000);
    }
    
    function showLoadingButton() {
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        submitBtn.disabled = true;
        btnText.classList.add('d-none');
        btnLoading.classList.remove('d-none');
        
        submitBtn.style.background = 'linear-gradient(135deg, #6c757d, #495057)';
    }
    
    function hideLoadingButton() {
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        submitBtn.disabled = false;
        btnText.classList.remove('d-none');
        btnLoading.classList.add('d-none');
        
        submitBtn.style.background = 'linear-gradient(135deg, #00e6e6, #0072ff)';
    }
    
    // =========================
    // RECORDAR USUARIO
    // =========================
    
    function restoreRememberedUser() {
        const rememberedEmail = localStorage.getItem('rememberedEmail');
        
        if (rememberedEmail && emailInput && rememberMeCheckbox) {
            emailInput.value = rememberedEmail;
            rememberMeCheckbox.checked = true;
            
            // Trigger focus event para mostrar label correctamente
            emailInput.dispatchEvent(new Event('input'));
        }
    }
    
    // =========================
    // SISTEMA DE ALERTAS
    // =========================
    
    function showAlert(message, type = 'info') {
        if (!alertsContainer) return;
        
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible`;
        alertDiv.innerHTML = `
            <i class="bi bi-${type === 'success' ? 'check-circle' : type === 'danger' ? 'exclamation-triangle' : 'info-circle'} me-2"></i>
            ${message}
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert"></button>
        `;
        
        alertsContainer.appendChild(alertDiv);
        
        // Auto-remove después de 5 segundos
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.style.animation = 'slideInAlert 0.5s ease reverse';
                setTimeout(() => {
                    if (alertDiv.parentNode) {
                        alertDiv.parentNode.removeChild(alertDiv);
                    }
                }, 500);
            }
        }, 5000);
    }
    
    function shakeForm() {
        const loginCard = document.querySelector('.login-card');
        if (loginCard) {
            loginCard.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
                loginCard.style.animation = '';
            }, 500);
        }
    }
    
    // =========================
    // EFECTOS ADICIONALES
    // =========================
    
    function addRippleEffect(element, e) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
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
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }
    
    // Agregar efecto ripple a botones
    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            if (!this.disabled) {
                addRippleEffect(this, e);
            }
        });
    }
    
    // =========================
    // KEYBOARD SHORTCUTS
    // =========================
    
    document.addEventListener('keydown', function(e) {
        // Enter para enviar formulario
        if (e.key === 'Enter' && (e.target === emailInput || e.target === passwordInput)) {
            e.preventDefault();
            loginForm.dispatchEvent(new Event('submit'));
        }
        
        // Escape para limpiar formulario
        if (e.key === 'Escape') {
            emailInput.value = '';
            passwordInput.value = '';
            emailInput.classList.remove('is-valid', 'is-invalid');
            passwordInput.classList.remove('is-valid', 'is-invalid');
            
            // Limpiar feedback
            const feedbacks = document.querySelectorAll('.validation-feedback');
            feedbacks.forEach(feedback => {
                feedback.classList.remove('show', 'valid', 'invalid');
            });
        }
    });
    
    // =========================
    // MANEJO DE ERRORES DEL SERVIDOR
    // =========================
    
    // Detectar si hay parámetros de error en la URL
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get('error');
    const success = urlParams.get('success');
    
    if (error) {
        let errorMessage = 'Error desconocido';
        switch(error) {
            case 'invalid_credentials':
                errorMessage = 'Credenciales inválidas. Verifica tu email y contraseña.';
                break;
            case 'user_not_found':
                errorMessage = 'Usuario no encontrado. Verifica tu email.';
                break;
            case 'account_disabled':
                errorMessage = 'Tu cuenta está deshabilitada. Contacta al administrador.';
                break;
            default:
                errorMessage = 'Error al iniciar sesión. Inténtalo de nuevo.';
        }
        
        setTimeout(() => {
            showAlert(errorMessage, 'danger');
        }, 1000);
    }
    
    if (success) {
        setTimeout(() => {
            showAlert('¡Sesión iniciada correctamente!', 'success');
        }, 1000);
    }
    
    // =========================
    // INICIALIZAR TODO
    // =========================
    
    init();
    
    // Agregar estilos para ripple effect
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
});