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

  

    // Form Submission

    document.querySelector('.hero__form-inner').addEventListener('submit', function (e) {
        e.preventDefault();

        // Show success message
        const submitButton = this.querySelector('.hero__form-submit');
        const originalText = submitButton.innerHTML;

        submitButton.innerHTML = '<i class="fas fa-check"></i> REQUEST SENDED!';
        submitButton.style.background = '#10b981';

        setTimeout(() => {
            submitButton.innerHTML = originalText;
            submitButton.style.background = '';
            this.reset();
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

