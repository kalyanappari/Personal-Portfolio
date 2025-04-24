document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Sticky Header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        header.classList.toggle('sticky', window.scrollY > 0);
    });
    
    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({top: 0, behavior: 'smooth'});
    });
    
    // Smooth Scrolling for all links
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
            }
        });
    });
    
    // Animate elements when scrolling
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.hero-text, .hero-image, .about-image, .about-text, .certification-card, .project-card, .timeline-item, .contact-info, .contact-form');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    document.querySelectorAll('.hero-text, .hero-image, .about-image, .about-text, .certification-card, .project-card, .timeline-item, .contact-info, .contact-form').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Trigger animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Form Submission
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the form data to a server
        // For this example, we'll just log it and show an alert
        console.log({name, email, subject, message});
        
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
    
    // Download CV Button
    
    // Animate skill bars on scroll
    const animateSkills = function() {
        const skillBars = document.querySelectorAll('.skill-progress');
        const skillsSection = document.getElementById('about');
        const sectionPosition = skillsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionPosition < windowHeight - 200) {
            skillBars.forEach(bar => {
                const width = bar.parentElement.previousElementSibling.lastElementChild.textContent;
                bar.style.width = width;
            });
            
            // Remove the event listener after animation
            window.removeEventListener('scroll', animateSkills);
        }
    };
    
    window.addEventListener('scroll', animateSkills);
});

// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const icon = themeToggle.querySelector('i');

// Check for saved theme preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    document.body.classList.add('dark-theme');
    icon.classList.replace('fa-moon', 'fa-sun');
}

// Theme toggle click handler
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    
    if (document.body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
        icon.classList.replace('fa-moon', 'fa-sun');
    } else {
        localStorage.setItem('theme', 'light');
        icon.classList.replace('fa-sun', 'fa-moon');
    }
});

// Add to your scroll reveal function
const cards = section.querySelectorAll('.project-card, .certification-card');
cards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});



// Dramatic Scroll Animations
function initScrollAnimations() {
    // Animation configuration
    const animationConfig = [
        { selector: '#home', effect: 'zoom-in', delay: 0 },
        { selector: '.section-title', effect: 'fade-down', delay: 0.2 },
        { selector: '#about .about-image', effect: 'slide-left', delay: 0.3 },
        { selector: '#about .about-text', effect: 'slide-right', delay: 0.4 },
        { selector: '.certification-card', effect: 'flip-up', stagger: 0.15 },
        { selector: '.project-card', effect: 'flip-up', stagger: 0.1 },
        { selector: '.internship-card', effect: 'zoom-in', delay: 0.2 },
        { selector: '.contact-info', effect: 'slide-up', delay: 0.3 },
        { selector: '.contact-form', effect: 'slide-up', delay: 0.4 }
    ];

    // Initialize Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const effect = element.dataset.animationEffect;
                const delay = element.dataset.animationDelay || 0;
                
                setTimeout(() => {
                    element.classList.add('animated');
                    observer.unobserve(element);
                }, parseFloat(delay) * 1000);
            }
        });
    }, { threshold: 0.1 });

    // Apply configuration to elements
    animationConfig.forEach(config => {
        document.querySelectorAll(config.selector).forEach((el, index) => {
            el.dataset.animationEffect = config.effect;
            el.dataset.animationDelay = (config.delay || 0) + (index * (config.stagger || 0));
            el.style.opacity = '0';
            observer.observe(el);
        });
    });
}

// Call this when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    // Keep your existing theme toggle code
});

function initEducationAnimations() {
    const educationItems = document.querySelectorAll('.education-item');
    
    educationItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    });

    const animateEducation = function() {
        const educationSection = document.querySelector('#education');
        
        if (isElementInViewport(educationSection)) {
            educationItems.forEach(item => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            });
            window.removeEventListener('scroll', animateEducation);
        }
    };
    
    window.addEventListener('scroll', animateEducation);
}

// Call this in your DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    initEducationAnimations();
    // ... your other initialization code
});

// Your existing JavaScript code...

// Load 3D background only on desktop
if (window.innerWidth > 768) {
    const script = document.createElement('script');
    script.src = 'js/3d-background.js';
    document.body.appendChild(script);
}
// Typing Animation for Name
function typeWriter() {
    const nameElement = document.getElementById('typing-name');
    if (!nameElement) return;
    
    const fullName = "N V M Sai Kalyan";
    let i = 0;
    const speed = 120; // Typing speed in milliseconds (adjust as needed)
    
    // Clear existing content
    nameElement.textContent = '';
    
    function type() {
        if (i < fullName.length) {
            nameElement.textContent += fullName.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Animation complete - remove cursor
            nameElement.classList.add('typing-complete');
        }
    }
    
    // Start typing after 500ms delay (adjust as needed)
    setTimeout(type, 500);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', typeWriter);

// Optional: Restart animation when tab becomes visible again
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        const nameElement = document.getElementById('typing-name');
        if (nameElement) {
            nameElement.classList.remove('typing-complete');
            nameElement.textContent = '';
            typeWriter();
        }
    }
});
