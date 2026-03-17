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
});
