// Navbar Toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
    }
});

// Smooth scrolling for navigation links
const links = document.querySelectorAll('a[href^="#"]');
for (const link of links) {
    link.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
            // Close mobile nav after click
            if (navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
            }
        }
    });
}

// Enhanced scroll spy functionality
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

function updateActiveSection() {
    const scrollPosition = window.scrollY;
    const navHeight = document.querySelector('.navbar').offsetHeight;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 50;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            // Remove active class from all nav items
            navItems.forEach(item => item.classList.remove('active'));
            
            // Add active class to corresponding nav item
            const activeNavItem = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
            if (activeNavItem) {
                activeNavItem.classList.add('active');
            }
        }
    });
}

// Add scroll event listener with throttling
let isScrolling;
window.addEventListener('scroll', () => {
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
        updateActiveSection();
    }, 100);
});

// Initial check for active section
document.addEventListener('DOMContentLoaded', updateActiveSection);

// Form submission handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        // Here you would typically send the form data to a server
        console.log('Form submitted:', formData);
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

// Typewriter effect (re-trigger on load)
window.addEventListener('DOMContentLoaded', () => {
    const typewriter = document.querySelector('.typewriter');
    if (typewriter) {
        typewriter.style.animation = 'none';
        // Force reflow
        void typewriter.offsetWidth;
        typewriter.style.animation = null;
    }
});

// Download Resume (placeholder)
document.getElementById('downloadResume').addEventListener('click', function () {
    window.location.href = 'Unnati_Resume.pdf'; // Update the path accordingly
});

// Scroll-based animation for About section
const animateOnScroll = document.querySelectorAll('.animate-on-scroll');
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    animateOnScroll.forEach(el => observer.observe(el));
} else {
    // Fallback for old browsers
    animateOnScroll.forEach(el => el.classList.add('visible'));
}
