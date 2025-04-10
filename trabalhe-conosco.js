document.addEventListener('DOMContentLoaded', function() {
    // Form handling
    const applicationForm = document.getElementById('applicationForm');
    const formSuccess = document.getElementById('formSuccess');
    const resetFormBtn = document.getElementById('resetFormBtn');
    
    if (applicationForm) {
        applicationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            let isValid = true;
            const requiredFields = applicationForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim() && field.type !== 'file') {
                    isValid = false;
                    field.classList.add('error');
                } else if (field.type === 'file' && field.files.length === 0) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Hide form and show success message
                applicationForm.style.display = 'none';
                formSuccess.style.display = 'block';
                
                // In a real implementation, you would send the form data to the server here
                // For this example, we're just showing the success message
                
                // Reset form fields
                applicationForm.reset();
            }
        });
    }
    
    if (resetFormBtn) {
        resetFormBtn.addEventListener('click', function() {
            formSuccess.style.display = 'none';
            applicationForm.style.display = 'flex';
        });
    }
    
    // Form field validation
    const formInputs = document.querySelectorAll('.application-form input, .application-form textarea, .application-form select');
    
    formInputs.forEach(input => {
        if (input.type !== 'checkbox') {
            input.addEventListener('blur', function() {
                if (this.hasAttribute')('required') && !this.value.trim()) {
                    this.classList.add('error');
                } else {
                    this.classList.remove('error');
                }
            });
            
            input.addEventListener('focus', function() {
                this.classList.remove('error');
            });
        }
    });
    
    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) {
                value = value.slice(0, 11);
            }
            
            if (value.length > 2 && value.length <= 6) {
                value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
            } else if (value.length > 6) {
                value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
            }
            
            e.target.value = value;
        });
    }
    
    // Position button click handling
    const positionButtons = document.querySelectorAll('.position-btn');
    const positionField = document.getElementById('position');
    
    positionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const position = this.dataset.position;
            
            // Scroll to form
            const form = document.getElementById('applicationForm');
            form.scrollIntoView({ behavior: 'smooth' });
            
            // Set position field value
            if (positionField) {
                positionField.value = position;
            }
            
            // Focus on first form field
            const firstInput = form.querySelector('input');
            if (firstInput) {
                setTimeout(() => {
                    firstInput.focus();
                }, 800);
            }
        });
    });
});
