/**
 * Archivo de validación de formularios en tiempo real
 * Maneja validación de campos, feedback visual y envío de formularios
 * Autor: matias 
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // =========================
    // CONFIGURACIÓN DE VALIDACIÓN
    // =========================
    
    const formConfig = {
        nombre: {
            required: true,
            minLength: 2,
            maxLength: 50,
            pattern: /^[a-zA-ZÁÉÍÓÚáéíóúñÑ\s]+$/,
            messages: {
                required: 'El nombre es obligatorio',
                minLength: 'El nombre debe tener al menos 2 caracteres',
                maxLength: 'El nombre no puede exceder 50 caracteres',
                pattern: 'El nombre solo puede contener letras y espacios'
            }
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            messages: {
                required: 'El correo electrónico es obligatorio',
                pattern: 'Por favor ingresa un correo electrónico válido'
            }
        },
        comentario: {
            required: false,
            minLength: 10,
            maxLength: 500,
            messages: {
                minLength: 'El comentario debe tener al menos 10 caracteres',
                maxLength: 'El comentario no puede exceder 500 caracteres'
            }
        }
    };
    
    // =========================
    // INICIALIZACIÓN
    // =========================
    
    function initFormValidation() {
        const form = document.getElementById('formulario-bootcamp');
        const nombreField = document.getElementById('nombreControl');
        const emailField = document.getElementById('emailControl');
        const comentarioField = document.getElementById('comentarioControl');
        const submitButton = document.querySelector('.registrar');
        
        if (!form) return;
        
        if (nombreField) setupFieldValidation(nombreField, 'nombre');
        if (emailField) setupFieldValidation(emailField, 'email');
        if (comentarioField) setupFieldValidation(comentarioField, 'comentario');
        
        
        form.addEventListener('submit', handleFormSubmit);
        
        
        enhanceSubmitButton(submitButton);
    }
    
    // =========================
    // VALIDACIÓN DE CAMPOS
    // =========================
    
    function setupFieldValidation(field, fieldName) {
        const config = formConfig[fieldName];
        const feedbackElement = document.getElementById(`${fieldName}-feedback`);
        
       
        field.addEventListener('input', function() {
            validateField(this, fieldName, config, feedbackElement);
        });
        
        
        field.addEventListener('blur', function() {
            validateField(this, fieldName, config, feedbackElement, true);
        });
        
       
        field.addEventListener('focus', function() {
            this.classList.remove('is-invalid');
            if (feedbackElement) {
                feedbackElement.classList.remove('show', 'invalid');
            }
        });
    }
    
    function validateField(field, fieldName, config, feedbackElement, showSuccess = false) {
        const value = field.value.trim();
        let isValid = true;
        let message = '';
        
       
        if (config.required && !value) {
            isValid = false;
            message = config.messages.required;
        }
      
        else if (config.minLength && value && value.length < config.minLength) {
            isValid = false;
            message = config.messages.minLength;
        }
       
        else if (config.maxLength && value.length > config.maxLength) {
            isValid = false;
            message = config.messages.maxLength;
        }
       
        else if (config.pattern && value && !config.pattern.test(value)) {
            isValid = false;
            message = config.messages.pattern;
        }
        
        
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
    // VALIDACIÓN COMPLETA DEL FORMULARIO
    // =========================
    
    function validateForm() {
        const nombreField = document.getElementById('nombreControl');
        const emailField = document.getElementById('emailControl');
        const comentarioField = document.getElementById('comentarioControl');
        
        let isFormValid = true;
        
       
        if (nombreField) {
            const nombreValid = validateField(nombreField, 'nombre', formConfig.nombre, 
                document.getElementById('nombre-feedback'), true);
            isFormValid = isFormValid && nombreValid;
        }
        
        if (emailField) {
            const emailValid = validateField(emailField, 'email', formConfig.email, 
                document.getElementById('email-feedback'), true);
            isFormValid = isFormValid && emailValid;
        }
        
        if (comentarioField) {
            const comentarioValid = validateField(comentarioField, 'comentario', formConfig.comentario, 
                document.getElementById('comentario-feedback'), true);
            isFormValid = isFormValid && comentarioValid;
        }
        
        return isFormValid;
    }
    
    // =========================
    // MANEJO DEL ENVÍO DEL FORMULARIO
    // =========================
    
    function handleFormSubmit(e) {
        e.preventDefault();
        
        const isValid = validateForm();
        const submitButton = document.querySelector('.registrar');
        
        if (!isValid) {
         
            showFormError('Por favor corrige los errores antes de enviar');
            shakeForm();
            return;
        }
        
       
        simulateFormSubmission(submitButton);
    }
    
    function simulateFormSubmission(button) {
        const btnText = button.querySelector('.btn-text');
        const btnLoading = button.querySelector('.btn-loading');
      
        button.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline-block';
        btnLoading.style.animation = 'spin 1s linear infinite';
        
      
        if (!document.getElementById('spinner-styles')) {
            const style = document.createElement('style');
            style.id = 'spinner-styles';
            style.textContent = `
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                .btn-loading .bi-arrow-clockwise {
                    animation: spin 1s linear infinite;
                }
            `;
            document.head.appendChild(style);
        }
        
        
        setTimeout(() => {
            showSuccessMessage();
            resetForm();
            
           
            button.disabled = false;
            btnText.style.display = 'inline-block';
            btnLoading.style.display = 'none';
        }, 2500);
    }
    
    // =========================
    // MENSAJES DE FEEDBACK
    // =========================
    
    function showSuccessMessage() {
        const form = document.getElementById('formulario-bootcamp');
        
        
        const successMessage = document.createElement('div');
        successMessage.className = 'alert alert-success mt-3';
        successMessage.style.cssText = `
            background: linear-gradient(45deg, #28a745, #20c997);
            border: none;
            color: white;
            border-radius: 10px;
            animation: slideInSuccess 0.5s ease-out;
        `;
        successMessage.innerHTML = `
            <i class="bi bi-check-circle-fill me-2"></i>
            ¡Registro exitoso! Te contactaremos pronto con más información.
        `;
        
        
        if (!document.getElementById('success-styles')) {
            const style = document.createElement('style');
            style.id = 'success-styles';
            style.textContent = `
                @keyframes slideInSuccess {
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
        
        form.appendChild(successMessage);
        
     
        setTimeout(() => {
            if (successMessage.parentNode) {
                successMessage.style.animation = 'slideInSuccess 0.5s ease-out reverse';
                setTimeout(() => {
                    if (successMessage.parentNode) {
                        successMessage.parentNode.removeChild(successMessage);
                    }
                }, 500);
            }
        }, 5000);
    }
    
    function showFormError(message) {
        const form = document.getElementById('formulario-bootcamp');
        const existingError = form.querySelector('.alert-danger');
        
        if (existingError) {
            existingError.remove();
        }
        
        const errorMessage = document.createElement('div');
        errorMessage.className = 'alert alert-danger mt-3';
        errorMessage.style.cssText = `
            background: linear-gradient(45deg, #dc3545, #e74c3c);
            border: none;
            color: white;
            border-radius: 10px;
            animation: slideInError 0.5s ease-out;
        `;
        errorMessage.innerHTML = `
            <i class="bi bi-exclamation-triangle-fill me-2"></i>
            ${message}
        `;
        
        form.appendChild(errorMessage);
        
       
        setTimeout(() => {
            if (errorMessage.parentNode) {
                errorMessage.style.animation = 'slideInError 0.5s ease-out reverse';
                setTimeout(() => {
                    if (errorMessage.parentNode) {
                        errorMessage.parentNode.removeChild(errorMessage);
                    }
                }, 500);
            }
        }, 4000);
    }
    
    function shakeForm() {
        const form = document.getElementById('formulario-bootcamp');
        form.style.animation = 'shake 0.5s ease-in-out';
        
        setTimeout(() => {
            form.style.animation = '';
        }, 500);
    }
    
    function resetForm() {
        const form = document.getElementById('formulario-bootcamp');
        const fields = form.querySelectorAll('.form-control');
        const feedbacks = form.querySelectorAll('.feedback-message');
        
        
        fields.forEach(field => {
            field.value = '';
            field.classList.remove('is-valid', 'is-invalid');
        });
        
        
        feedbacks.forEach(feedback => {
            feedback.classList.remove('show', 'valid', 'invalid');
            feedback.textContent = '';
        });
    }
    
    // =========================
    // MEJORAS DEL BOTÓN DE ENVÍO
    // =========================
    
    function enhanceSubmitButton(button) {
        if (!button) return;
        
        
        const btnText = button.querySelector('.btn-text');
        const btnLoading = button.querySelector('.btn-loading');
        
        if (!btnLoading) {
            const loadingSpan = document.createElement('span');
            loadingSpan.className = 'btn-loading';
            loadingSpan.style.display = 'none';
            loadingSpan.innerHTML = '<i class="bi bi-arrow-clockwise me-2"></i>Enviando...';
            button.appendChild(loadingSpan);
        }
        
       
        button.addEventListener('mouseenter', function() {
            if (!this.disabled) {
                this.style.transform = 'translateY(-2px) scale(1.02)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.disabled) {
                this.style.transform = '';
            }
        });
    }
    
    // =========================
    // VALIDACIÓN DE EMAIL AVANZADA
    // =========================
    
    function validateEmailDomain(email) {
        const commonDomains = [
            'gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com',
            'icloud.com', 'live.com', 'msn.com', 'aol.com'
        ];
        
        const domain = email.split('@')[1];
        return commonDomains.includes(domain) || domain.includes('.');
    }
    
    // =========================
    // INICIALIZAR TODO
    // =========================
    
    
    setTimeout(() => {
        initFormValidation();
        
     
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInError {
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
    }, 200);
});