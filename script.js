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

    // Form submission (Netlify Forms + фронтенд-валидация)
    document.querySelector('.hero__form-inner').addEventListener('submit', function (e) {
        const phoneDigits = mask.unmaskedValue; 
        const nameInput = document.getElementById('hero__form-input-name');
        const name = nameInput.value.trim();
        
        let hasError = false;

        // Validation - Name
        if (!name) {
            hasError = true;
            nameInput.style.borderColor = '#ef4444';
            nameInput.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.2)';
            showNotification('Please enter your name', 'error');
        } else {
            nameInput.style.borderColor = '';
            nameInput.style.boxShadow = '';
        }
        
        // Validation - Phone
        if (phoneDigits.length !== 11) {
            hasError = true;
            telInput.style.borderColor = '#ef4444';
            telInput.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.2)';
            telInput.focus();
            showNotification('Please enter a valid phone number', 'error');
        } else {
            telInput.style.borderColor = '';
            telInput.style.boxShadow = '';
        }

        // Если есть ошибки — отменяем отправку, иначе даём Netlify самому обработать POST
        if (hasError) {
            e.preventDefault();
            return;
        }
    });

    // Function to show notifications
    function showNotification(message, type = 'info') {
        // Remove existing notification if any
        const existingNotification = document.querySelector('.form-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create new notification
        const notification = document.createElement('div');
        notification.className = `form-notification form-notification-${type}`;
        
        // Icon based on type
        let icon = '';
        switch(type) {
            case 'success':
                icon = '<i class="fas fa-check-circle"></i>';
                break;
            case 'error':
                icon = '<i class="fas fa-exclamation-circle"></i>';
                break;
            case 'info':
                icon = '<i class="fas fa-info-circle"></i>';
                break;
            default:
                icon = '<i class="fas fa-info-circle"></i>';
        }
        
        notification.innerHTML = `
            <div class="notification-icon">${icon}</div>
            <div class="notification-content">${message}</div>
            <button class="notification-close">&times;</button>
        `;
        
        // Styles
        notification.style.cssText = `
            position: fixed;
            top: 25px;
            right: 25px;
            padding: 18px 20px;
            border-radius: 12px;
            color: white;
            font-weight: 500;
            z-index: 99999;
            animation: notificationSlideIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            max-width: 420px;
            min-width: 320px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
            display: flex;
            align-items: center;
            gap: 15px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.1);
        `;
        
        // Colors based on type
        switch(type) {
            case 'success':
                notification.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                break;
            case 'error':
                notification.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
                break;
            case 'info':
                notification.style.background = 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)';
                break;
        }
        
        // Icon styles
        notification.querySelector('.notification-icon').style.cssText = `
            font-size: 24px;
            opacity: 0.9;
        `;
        
        // Content styles
        notification.querySelector('.notification-content').style.cssText = `
            flex: 1;
            font-size: 15px;
            line-height: 1.4;
        `;
        
        // Close button styles
        notification.querySelector('.notification-close').style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            opacity: 0.7;
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: opacity 0.2s;
        `;
        
        // Close handler
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.style.animation = 'notificationSlideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        });
        
        document.body.appendChild(notification);
        
        // Auto remove after time
        const autoRemoveTime = type === 'error' ? 5000 : 4000;
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'notificationSlideOut 0.3s ease-out';
                setTimeout(() => notification.remove(), 300);
            }
        }, autoRemoveTime);
    }
    
    // Add notification animation styles
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes notificationSlideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes notificationSlideOut {
                from {
                    transform: translateX(0) ;
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            
            .notification-close:hover {
                opacity: 1 !important;
            }
        `;
        document.head.appendChild(style);
    }

    // Intersection Observer for animations
    const allSections = document.querySelectorAll('section');
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
});