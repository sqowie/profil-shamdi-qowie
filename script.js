/* ============================================
   INITIALIZE AOS ANIMATION
   ============================================ */
AOS.init({
    duration: 800,
    once: true,
    offset: 100,
    easing: 'ease-out'
});

/* ============================================
   LOADING ANIMATION
   ============================================ */
window.addEventListener('load', () => {
    const loading = document.getElementById('loading');
    setTimeout(() => {
        loading.style.opacity = '0';
        setTimeout(() => {
            loading.style.display = 'none';
        }, 500);
    }, 1000);
});

/* ============================================
   DARK MODE TOGGLE
   ============================================ */
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Check saved preference
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
} else {
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
}

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    } else {
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    }
});

/* ============================================
   STICKY NAVBAR & ACTIVE LINK
   ============================================ */
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    // Sticky navbar
    if (window.scrollY > 100) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
    
    // Active link on scroll
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

/* ============================================
   HAMBURGER MENU
   ============================================ */
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // Animate hamburger
        const spans = hamburger.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = hamburger?.querySelectorAll('span');
        if (spans) {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
});

/* ============================================
   SMOOTH SCROLL
   ============================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* ============================================
   CIRCULAR SKILLS PROGRESS BAR
   ============================================ */
const skillsData = [
    { name: "HTML5", percent: 92, icon: "fab fa-html5" },
    { name: "CSS3", percent: 88, icon: "fab fa-css3-alt" },
    { name: "JavaScript", percent: 78, icon: "fab fa-js" },
    { name: "Editing Video", percent: 85, icon: "fas fa-video" },
    { name: "Content Creator", percent: 90, icon: "fas fa-chart-line" }
];

const radius = 54;
const circumference = 2 * Math.PI * radius;
const skillsGrid = document.getElementById('skillsGrid');

if (skillsGrid) {
    skillsData.forEach((skill, index) => {
        const card = document.createElement('div');
        card.className = 'skill-circle';
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-delay', index * 100);
        
        const percentVal = skill.percent;
        const strokeDashoffset = circumference - (percentVal / 100) * circumference;
        
        card.innerHTML = `
            <div class="circular-progress">
                <svg width="120" height="120" viewBox="0 0 120 120">
                    <circle class="bg-circle" cx="60" cy="60" r="${radius}" stroke="var(--stone-200)" stroke-width="8" fill="none"/>
                    <circle class="progress-circle" cx="60" cy="60" r="${radius}" stroke="var(--primary)" stroke-width="8" fill="none" stroke-dasharray="${circumference}" stroke-dashoffset="${circumference}"/>
                </svg>
                <div class="skill-percent">${percentVal}%</div>
            </div>
            <i class="${skill.icon}" style="font-size: 1.8rem; color: var(--primary); margin-top: 0.5rem; display: inline-block;"></i>
            <h3>${skill.name}</h3>
        `;
        
        skillsGrid.appendChild(card);
        
        // Animate progress bar when visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const circle = card.querySelector('.progress-circle');
                    if (circle) {
                        setTimeout(() => {
                            circle.style.strokeDashoffset = strokeDashoffset;
                        }, 200);
                    }
                    observer.unobserve(card);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(card);
    });
}

/* ============================================
   BACK TO TOP BUTTON
   ============================================ */
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/* ============================================
   CONTACT FORM HANDLER
   ============================================ */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        if (name && email && message) {
            alert(`🌿 Terima kasih ${name}! Pesan Anda telah terkirim. Saya akan menghubungi Anda segera. 🌿`);
            contactForm.reset();
        } else {
            alert('🍃 Mohon isi semua field yang diperlukan! 🍃');
        }
    });
}

/* ============================================
   PORTFOLIO ALERT
   ============================================ */
window.showProjectAlert = (projectName) => {
    alert(`🌱 Terima kasih tertarik dengan project "${projectName}"! Detail lengkap akan segera diupdate. 🌱`);
};

/* ============================================
   SCROLL ANIMATION FOR SECTIONS
   ============================================ */
const fadeElements = document.querySelectorAll('.about-content, .skill-circle, .portfolio-card, .timeline-item, .contact-wrapper, .info-grid');

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => {
    el.classList.add('fade-scroll');
    scrollObserver.observe(el);
});

/* ============================================
   TIMELINE ANIMATION
   ============================================ */
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.timeline-content').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'all 0.6s ease';
    timelineObserver.observe(item);
});

/* ============================================
   PREVENT FOUC (Flash of Unstyled Content)
   ============================================ */
document.body.style.visibility = 'visible';