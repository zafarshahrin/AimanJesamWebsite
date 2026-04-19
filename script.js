document.addEventListener('DOMContentLoaded', () => {
    
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Add 'loaded' class to hero for initial animation
    setTimeout(() => {
        const hero = document.getElementById('hero');
        if (hero) hero.classList.add('loaded');
    }, 100);

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.add('scrolled'); // Force keep it
            if (window.scrollY < 10) {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // For the flow connectors
                if(entry.target.classList.contains('flow-step')) {
                    const nextConnector = entry.target.nextElementSibling;
                    if(nextConnector && nextConnector.classList.contains('flow-connector')) {
                        setTimeout(() => {
                            nextConnector.classList.add('active');
                        }, 300); // delay after step animation
                    }
                }
                
                // Optional: Stop observing once animated
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select elements to animate
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-scale, .reveal-right');
    revealElements.forEach(el => observer.observe(el));
    // Photo Auto Slider Logic with Controls
    const sliderImages = document.querySelectorAll('.slider-image');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('slider-prev');
    const nextBtn = document.getElementById('slider-next');
    const pauseBtn = document.getElementById('slider-pause');

    if (sliderImages.length > 0) {
        let currentSlide = 0;
        let slideInterval;
        let isPaused = false;

        const goToSlide = (index) => {
            sliderImages[currentSlide].classList.remove('active');
            if (dots[currentSlide]) dots[currentSlide].classList.remove('active');
            
            // Handle wrap around limits
            if (index < 0) currentSlide = sliderImages.length - 1;
            else if (index >= sliderImages.length) currentSlide = 0;
            else currentSlide = index;

            sliderImages[currentSlide].classList.add('active');
            if (dots[currentSlide]) dots[currentSlide].classList.add('active');
        };

        const startSlider = () => {
            slideInterval = setInterval(() => {
                if (!isPaused) goToSlide(currentSlide + 1);
            }, 6000); // 6 seconds for each slide
        };

        const togglePause = () => {
            isPaused = !isPaused;
            if (isPaused) {
                // Show play icon
                pauseBtn.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>';
            } else {
                // Show pause icon
                pauseBtn.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>';
            }
        };

        // Initialize slider
        startSlider();

        // Event listeners for controls
        if (nextBtn) nextBtn.addEventListener('click', () => { goToSlide(currentSlide + 1); });
        if (prevBtn) prevBtn.addEventListener('click', () => { goToSlide(currentSlide - 1); });
        if (pauseBtn) pauseBtn.addEventListener('click', togglePause);
        
        dots.forEach((dot, idx) => {
            dot.addEventListener('click', () => {
                goToSlide(idx);
            });
        });
    }
});
