// Contact Form JavaScript - Complete Version

document.addEventListener('DOMContentLoaded', () => {
    initializeContactForm();
    setupCharacterCounter();
});

function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', handleContactSubmit);

    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateField(input);
            }
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    } else if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    } else if (field.type === 'text' && value && value.length < 2) {
        isValid = false;
        errorMessage = 'Must be at least 2 characters';
    } else if (field.tagName === 'TEXTAREA' && value && value.length < 10) {
        isValid = false;
        errorMessage = 'Message must be at least 10 characters';
    }

    updateFieldStatus(field, isValid, errorMessage);
    return isValid;
}

function updateFieldStatus(field, isValid, errorMessage = '') {
    const formGroup = field.closest('.form-group');
    if (!formGroup) return;

    const existingError = formGroup.querySelector('.error-message');
    if (existingError) existingError.remove();

    field.classList.remove('error', 'success');

    if (!isValid && errorMessage) {
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = errorMessage;
        formGroup.appendChild(errorDiv);
    } else if (isValid && field.value.trim()) {
        field.classList.add('success');
    }
}

async function handleContactSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
        name: formData.get('name')?.trim() || '',
        email: formData.get('email')?.trim() || '',
        subject: formData.get('subject') || '',
        message: formData.get('message')?.trim() || '',
        timestamp: new Date().toISOString(),
        read: false
    };

    // Validate all required fields
    const form = e.target;
    const requiredFields = form.querySelectorAll('[required]');
    let allValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            allValid = false;
        }
    });

    if (!allValid) {
        showToast('Please fix the errors in the form', 'error');
        return;
    }

    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    try {
        // Store in localStorage
        const existingFeedback = JSON.parse(localStorage.getItem('contactFeedback') || '[]');
        existingFeedback.unshift(data);
        localStorage.setItem('contactFeedback', JSON.stringify(existingFeedback));

        // Show success
        showSuccessPanel(form);
        showToast('Message sent successfully! We\'ll get back to you soon.', 'success');
        
        // Reset form
        form.reset();
        requiredFields.forEach(field => {
            field.classList.remove('success', 'error');
        });

        // Reset character counter
        const charCounter = document.getElementById('char-counter');
        if (charCounter) charCounter.textContent = '0';

    } catch (error) {
        console.error('Contact form error:', error);
        showToast('Failed to send message. Please try again.', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
    }
}

function showSuccessPanel(form) {
    const existingPanel = document.querySelector('.success-panel');
    if (existingPanel) existingPanel.remove();

    const successPanel = document.createElement('div');
    successPanel.className = 'success-panel';
    successPanel.innerHTML = `
        <div class="success-icon">
            <i class="fas fa-check-circle"></i>
        </div>
        <h3>Message Sent Successfully!</h3>
        <p>Thank you for contacting us. We'll get back to you as soon as possible.</p>
        <button class="btn btn-primary" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i> Close
        </button>
    `;

    form.parentElement.insertBefore(successPanel, form);
    successPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });

    setTimeout(() => successPanel.remove(), 10000);
}

function setupCharacterCounter() {
    const messageField = document.getElementById('message');
    const charCounter = document.getElementById('char-counter');
    
    if (messageField && charCounter) {
        messageField.addEventListener('input', () => {
            const length = messageField.value.length;
            const maxLength = 1000;
            charCounter.textContent = length;
            
            if (length >= maxLength * 0.9) {
                charCounter.style.color = '#ef4444';
            } else {
                charCounter.style.color = '#6b7280';
            }

            if (length > maxLength) {
                messageField.value = messageField.value.substring(0, maxLength);
                charCounter.textContent = maxLength;
            }
        });
    }
}