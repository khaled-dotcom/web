// Form Validation Functions

// Validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validate phone
function validatePhone(phone) {
    const re = /^[\d\s\-\+\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// Validate required field
function validateRequired(value) {
    return value.trim().length > 0;
}

// Validate password strength
function validatePassword(password) {
    // At least 6 characters
    return password.length >= 6;
}

// Validate form field
function validateField(field, rules) {
    const value = field.value.trim();
    const errorElement = field.parentElement.querySelector('.error-message');
    let isValid = true;
    let errorMessage = '';

    // Required validation
    if (rules.required && !validateRequired(value)) {
        isValid = false;
        errorMessage = 'This field is required';
    }

    // Email validation
    if (isValid && rules.email && value && !validateEmail(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
    }

    // Phone validation
    if (isValid && rules.phone && value && !validatePhone(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number';
    }

    // Password validation
    if (isValid && rules.password && value && !validatePassword(value)) {
        isValid = false;
        errorMessage = 'Password must be at least 6 characters';
    }

    // Min length validation
    if (isValid && rules.minLength && value.length < rules.minLength) {
        isValid = false;
        errorMessage = `This field must be at least ${rules.minLength} characters`;
    }

    // Update field appearance
    if (isValid) {
        field.classList.remove('error');
        if (errorElement) {
            errorElement.classList.remove('show');
        }
    } else {
        field.classList.add('error');
        if (errorElement) {
            errorElement.textContent = errorMessage;
            errorElement.classList.add('show');
        }
    }

    return isValid;
}

// Validate entire form
function validateForm(formId, rules) {
    const form = document.getElementById(formId);
    if (!form) return false;

    let isValid = true;
    const fields = form.querySelectorAll('input, textarea, select');

    fields.forEach(field => {
        const fieldRules = rules[field.name] || rules[field.id];
        if (fieldRules) {
            const fieldValid = validateField(field, fieldRules);
            if (!fieldValid) {
                isValid = false;
            }
        }
    });

    return isValid;
}

// Setup real-time validation
function setupValidation(formId, rules) {
    const form = document.getElementById(formId);
    if (!form) return;

    const fields = form.querySelectorAll('input, textarea, select');

    fields.forEach(field => {
        const fieldRules = rules[field.name] || rules[field.id];
        if (fieldRules) {
            // Validate on blur
            field.addEventListener('blur', () => {
                validateField(field, fieldRules);
            });

            // Clear error on input
            field.addEventListener('input', () => {
                if (field.classList.contains('error')) {
                    const errorElement = field.parentElement.querySelector('.error-message');
                    if (errorElement) {
                        errorElement.classList.remove('show');
                    }
                    field.classList.remove('error');
                }
            });
        }
    });
}

// Add error message element to form fields
function addErrorMessages(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    const fields = form.querySelectorAll('.form-group input, .form-group textarea, .form-group select');
    fields.forEach(field => {
        const formGroup = field.closest('.form-group');
        if (formGroup && !formGroup.querySelector('.error-message')) {
            const errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            formGroup.appendChild(errorElement);
        }
    });
}

// Initialize validation on page load
document.addEventListener('DOMContentLoaded', function() {
    // Login form validation
    if (document.getElementById('login-form')) {
        addErrorMessages('login-form');
        setupValidation('login-form', {
            email: { required: true, email: true },
            password: { required: true }
        });
    }

    // Register form validation
    if (document.getElementById('register-form')) {
        addErrorMessages('register-form');
        setupValidation('register-form', {
            fullName: { required: true, minLength: 2 },
            email: { required: true, email: true },
            phone: { required: true, phone: true },
            password: { required: true, password: true },
            confirmPassword: { required: true }
        });
    }

    // Checkout form validation
    if (document.getElementById('checkout-form')) {
        addErrorMessages('checkout-form');
        setupValidation('checkout-form', {
            fullName: { required: true, minLength: 2 },
            phone: { required: true, phone: true },
            address: { required: true, minLength: 10 },
            city: { required: true },
            zipCode: { required: true }
        });
    }
});

