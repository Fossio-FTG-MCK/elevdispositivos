document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
        });
    }
    
    // Product Carousel
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.carousel-controls .prev');
    const nextBtn = document.querySelector('.carousel-controls .next');
    
    if (carouselItems.length && prevBtn && nextBtn) {
        let currentIndex = 0;
        
        function showSlide(index) {
            carouselItems.forEach(item => item.classList.remove('active'));
            
            if (index < 0) {
                currentIndex = carouselItems.length - 1;
            } else if (index >= carouselItems.length) {
                currentIndex = 0;
            } else {
                currentIndex = index;
            }
            
            carouselItems[currentIndex].classList.add('active');
        }
        
        prevBtn.addEventListener('click', () => {
            showSlide(currentIndex - 1);
        });
        
        nextBtn.addEventListener('click', () => {
            showSlide(currentIndex + 1);
        });
        
        // Auto slide every 5 seconds
        setInterval(() => {
            showSlide(currentIndex + 1);
        }, 5000);
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                }
            }
        });
    });
    
    // Animation for counter
    const counterElement = document.querySelector('.counter .number');
    
    if (counterElement) {
        const targetNumber = parseInt(counterElement.textContent);
        let currentNumber = 0;
        
        function animateCounter() {
            if (currentNumber < targetNumber) {
                currentNumber++;
                counterElement.textContent = currentNumber;
                setTimeout(animateCounter, 100);
            }
        }
        
        // Start animation when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counterElement);
    }
});

