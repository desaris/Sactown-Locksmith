document.addEventListener('DOMContentLoaded', function() {
    var telInput = document.getElementById('hero__form-input-tel');
    var maskOptions = {
        mask: '+{1}(000) 000-0000',
        lazy: true,
    } 
    var mask = new IMask(telInput, maskOptions);

    
    // Mobile Navigation Toggle

    const burgerButton = document.getElementById('burgerButton');
    const headerNav = document.querySelector('.header__nav');

    burgerButton.addEventListener('click', () => {
        headerNav.classList.toggle('header__nav--active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.header__nav-link').forEach(link => {
        link.addEventListener('click', () => {
            headerNav.classList.remove('header__nav--active');
            document.body.style.overflow = '';
        });
    });


    // Mask validation

    telInput.addEventListener('input', function() {
        this.style.borderColor = '';
        this.style.boxShadow = '';
        
        const errorElement = this.parentNode.querySelector('.phone-error');
        if (errorElement) {
            errorElement.remove();
        }
    });
    
    document.querySelector('.hero__form-inner').addEventListener('submit', function (e) {
        e.preventDefault();


        const phoneDigits = mask.unmaskedValue; 
        
        if (phoneDigits.length !== 11) {

            telInput.style.borderColor = '#ef4444';
            telInput.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.2)';
            

            const errorElement = document.createElement('div');
            errorElement.className = 'phone-error';
            errorElement.textContent = 'Please enter a complete phone number!';
            errorElement.style.cssText = `
                color: #ef4444;
                font-size: 14px;
                margin-top: 6px;
                font-weight: 500;
            `;
            
            const oldError = telInput.parentNode.querySelector('.phone-error');
            if (oldError) oldError.remove();
            
            telInput.parentNode.appendChild(errorElement);
            telInput.focus();
            
            return; 
        }
        
        // Show success message
        const submitButton = this.querySelector('.hero__form-submit');
        const originalText = submitButton.innerHTML;

        submitButton.innerHTML = '<i class="fas fa-check"></i> REQUEST SENDED!';
        submitButton.style.background = '#10b981';

        setTimeout(() => {
            submitButton.innerHTML = originalText;
            submitButton.style.background = '';
            this.reset();
            // Также сбрасываем маску IMask
            mask.updateValue();
        }, 3000);
    });

    const allSections = document.querySelectorAll('section');


    // Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            } 
        });
    }, {
        threshold: 0.15, 
        rootMargin: '0px 0px 20px 0px'
    });

    allSections.forEach(section => {
        observer.observe(section);
    });
    
})