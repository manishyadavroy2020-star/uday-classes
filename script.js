// Initialize Lucide Icons
lucide.createIcons();

// Elements
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const themeToggle = document.getElementById('theme-toggle');
const htmlEl = document.documentElement;

// --- Navbar Scroll Effect ---
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        navbar.classList.add('shadow-md');
        navbar.classList.replace('py-4', 'py-2');
    } else {
        navbar.classList.remove('shadow-md');
        navbar.classList.replace('py-2', 'py-4');
    }
});

// --- Mobile Menu Toggle ---
if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        const icon = mobileMenu.querySelector('i');
        // Simple toggle icon logic
        if(mobileMenu.classList.contains('hidden')){
           mobileMenuBtn.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>';
        } else {
           mobileMenuBtn.innerHTML = '<i data-lucide="x" class="w-6 h-6"></i>';
        }
        lucide.createIcons();
    });
}

// --- Dark Mode Toggle Logic ---
// We initialize state in the HTML head to prevent flicker.
function updateThemeIcon() {
    if (!themeToggle) return;
    const isDark = htmlEl.classList.contains('dark');
    if (isDark) {
        themeToggle.innerHTML = '<i data-lucide="sun" class="w-5 h-5"></i>';
    } else {
        themeToggle.innerHTML = '<i data-lucide="moon" class="w-5 h-5"></i>';
    }
    lucide.createIcons();
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        if (htmlEl.classList.contains('dark')) {
            htmlEl.classList.remove('dark');
            localStorage.theme = 'light';
        } else {
            htmlEl.classList.add('dark');
            localStorage.theme = 'dark';
        }
        updateThemeIcon();
    });
}
// Initial icon update
document.addEventListener('DOMContentLoaded', updateThemeIcon);


// --- Scroll Reveal Animation ---
const revealElements = document.querySelectorAll('.reveal');
const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
    });
}, revealOptions);

revealElements.forEach(el => revealObserver.observe(el));


// --- Counter Animation ---
const counters = document.querySelectorAll('.counter-value');
const speed = 200; // The lower the slower

const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.getAttribute('data-target');
            
            const updateCount = () => {
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
            observer.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));


// --- Modal & WhatsApp Logic ---
const modal = document.getElementById('join-modal');

function openModal() {
    if(!modal) return;
    modal.classList.remove('modal-hidden');
    modal.classList.add('modal-visible');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeModal() {
    if(!modal) return;
    modal.classList.remove('modal-visible');
    modal.classList.add('modal-hidden');
    document.body.style.overflow = '';
}

// Close modal when clicking outside
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target.id === 'join-modal') {
            closeModal();
        }
    });
}

// Form Submission handling
const joinForm = document.getElementById('join-form');
if (joinForm) {
    joinForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const studentClass = document.getElementById('class').value;
        const board = document.getElementById('board').value;
        
        const message = `Hello, I want to join Uday Thakur Commerce Classes.
Name: ${name}
Phone: ${phone}
Class: ${studentClass}
Board: ${board}`;
        
        const encodedMessage = encodeURIComponent(message);
        const waLink = `https://wa.me/919614507478?text=${encodedMessage}`;
        
        // Open WhatsApp in a new tab
        window.open(waLink, '_blank');
        
        closeModal();
        joinForm.reset();
    });
}
