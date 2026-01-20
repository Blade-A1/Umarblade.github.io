// ==================== Hamburger Menu ==================== //
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');

if (hamburger && menu) {
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.classList.toggle('active');
        
        // SVG animatsiyasi
        const spans = hamburger.querySelectorAll('span');
        if (menu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(8px, 8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '1';
            spans[2].style.transform = '';
        }
    });
    
    // Menu tashqari bosish
    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
            menu.classList.remove('active');
            hamburger.querySelectorAll('span').forEach(span => {
                span.style.transform = '';
                span.style.opacity = '1';
            });
        }
    });
}

// ==================== Smooth Scroll ==================== //
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ==================== Contact Form ==================== //
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Form ma'lumotlarini olish
        const inputs = this.querySelectorAll('input, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = '#ff6b35';
                isValid = false;
            } else {
                input.style.borderColor = '';
            }
        });
        
        if (isValid) {
            // Yuborish animatsiyasi
            const btn = this.querySelector('.submit-btn');
            const originalText = btn.textContent;
            btn.textContent = '✓ Yuborildi!';
            btn.style.background = '#00d4ff';
            
            // 2 sekunddan keyin qaytarish
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                this.reset();
            }, 2000);
        }
    });
}

// ==================== Navbar Background on Scroll ==================== //
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.borderBottomColor = 'rgba(42, 42, 62, 0.5)';
    } else {
        navbar.style.borderBottomColor = 'rgba(42, 42, 62, 1)';
    }
});

// ==================== Portfolio Cards Animation ==================== //
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.portfolio-card, .skill-category, .stat-item').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// ==================== CTA Button Animation ==================== //
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        const contactSection = document.getElementById('contact');
        contactSection.scrollIntoView({ behavior: 'smooth' });
    });
}

// ==================== Mobile Menu Close ==================== //
document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', () => {
        if (menu && hamburger) {
            const isSmallScreen = window.innerWidth <= 768;
            if (isSmallScreen && menu.classList.contains('active')) {
                menu.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = '';
                spans[1].style.opacity = '1';
                spans[2].style.transform = '';
            }
        }
    });
});

// ==================== Window Resize Handler ==================== //
window.addEventListener('resize', () => {
    if (menu && hamburger) {
        if (window.innerWidth > 768) {
            menu.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '1';
            spans[2].style.transform = '';
        }
    }
});

// ==================== Counter Animation for Stats ==================== //
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 50);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 50);
}

// Stats animatsiyasini boshlash
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const h3 = entry.target.querySelector('h3');
            if (h3 && !entry.target.classList.contains('animated')) {
                const number = parseInt(h3.textContent);
                animateCounter(h3, number);
                entry.target.classList.add('animated');
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(item => {
    statsObserver.observe(item);
});

// ==================== Active Menu Link ==================== //
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.menu a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.style.color = '#0066ff';
        } else {
            link.style.color = '';
        }
    });
});

// ==================== Loading Animation ==================== //
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

console.log('UmarBlade Portfolio Sayt Yuklandi ✓');
