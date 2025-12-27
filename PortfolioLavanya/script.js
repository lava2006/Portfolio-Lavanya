// ════════════════════════════════════════════════════════════
// LAVANYA P - CLOUD MISSION CONTROL PORTFOLIO
// Complete Interactive JavaScript - All Features
// Interactive Rain + Animations + Mobile Support
// ════════════════════════════════════════════════════════════

console.log('🌧️ Cloud Portfolio Loaded!');
console.log('💙 Built with love by Lavanya P');
console.log('Interactive Rain System: ACTIVE');

// ═══════════════════ INTERACTIVE RAIN SYSTEM ═══════════════════

let rainActive = false;
let rainIntensity = 0;
let rainTimeout;
let activeRaindrops = [];
const maxRaindrops = 150;

const rainContainer = document.getElementById('rainContainer');

// Create Single Raindrop
function createRaindrop(x = null, y = null) {
    // Limit total raindrops for performance
    if (activeRaindrops.length >= maxRaindrops) {
        const oldDrop = activeRaindrops.shift();
        if (oldDrop && oldDrop.parentNode) {
            oldDrop.remove();
        }
    }

    const raindrop = document.createElement('div');
    raindrop.className = 'raindrop';

    // Position
    const left = x !== null ? x : Math.random() * 100;
    const animationDuration = 0.5 + Math.random() * 1;
    const animationDelay = Math.random() * 0.2;

    raindrop.style.left = left + '%';
    raindrop.style.animationDuration = animationDuration + 's';
    raindrop.style.animationDelay = animationDelay + 's';

    if (y !== null) {
        raindrop.style.top = y + 'px';
    }

    rainContainer.appendChild(raindrop);
    activeRaindrops.push(raindrop);

    // Auto-remove after animation
    setTimeout(() => {
        if (raindrop.parentNode) {
            raindrop.remove();
        }
        const index = activeRaindrops.indexOf(raindrop);
        if (index > -1) {
            activeRaindrops.splice(index, 1);
        }
    }, (animationDuration + animationDelay) * 1000);
}

// Create Rain Burst
function startRainBurst(intensity = 10, sourceX = null, sourceY = null) {
    for (let i = 0; i < intensity; i++) {
        setTimeout(() => {
            if (sourceX !== null) {
                const spreadX = sourceX + (Math.random() - 0.5) * 20;
                createRaindrop(spreadX, sourceY);
            } else {
                createRaindrop();
            }
        }, i * 50);
    }
}

// Continuous Rain Loop
function startContinuousRain() {
    if (!rainActive) {
        rainActive = true;
        rainLoop();
    }
}

function rainLoop() {
    if (rainActive && rainIntensity > 0) {
        const drops = Math.ceil(rainIntensity / 2);
        for (let i = 0; i < drops; i++) {
            createRaindrop();
        }
        setTimeout(rainLoop, 200);
    } else {
        rainActive = false;
    }
}

function increaseRainIntensity(amount = 5) {
    rainIntensity = Math.min(rainIntensity + amount, 20);
    startContinuousRain();

    clearTimeout(rainTimeout);

    // Decrease intensity after 3 seconds
    rainTimeout = setTimeout(() => {
        rainIntensity = Math.max(0, rainIntensity - 2);
        if (rainIntensity <= 0) {
            rainActive = false;
        }
    }, 3000);
}

// ═══════════════════ RAIN EVENT LISTENERS ═══════════════════

// Click anywhere - Big rain burst
document.addEventListener('click', (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = e.clientY;
    startRainBurst(15, x, y);
    increaseRainIntensity(3);
});

// Mouse Move - Gentle rain trail
let mouseMoveTimeout;
document.addEventListener('mousemove', (e) => {
    clearTimeout(mouseMoveTimeout);
    mouseMoveTimeout = setTimeout(() => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = e.clientY;
        startRainBurst(3, x, y);
        increaseRainIntensity(1);
    }, 100);
});

// Scroll - Medium rain
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        startRainBurst(8);
        increaseRainIntensity(2);
    }, 50);
});

// Hover on elements with data-trigger="rain"
document.querySelectorAll('[data-trigger="rain"]').forEach(element => {
    element.addEventListener('mouseenter', (e) => {
        const rect = e.target.getBoundingClientRect();
        const x = ((rect.left + rect.width / 2) / window.innerWidth) * 100;
        const y = rect.top;
        startRainBurst(10, x, y);
        increaseRainIntensity(3);
    });
});

// ═══════════════════ TYPING ANIMATION ═══════════════════

const roles = [
    "DevOps Engineer",
    "Cloud Architect", 
    "AWS Specialist",
    "Python Developer",
    "AI Enthusiast",
    "Problem Solver"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById('typingText');

function typeRole() {
    if (!typingElement) return;

    const currentRole = roles[roleIndex];

    if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500;
    }

    setTimeout(typeRole, typeSpeed);
}

// Start typing after page load
setTimeout(typeRole, 1000);

// ═══════════════════ STATS COUNTER ANIMATION ═══════════════════

function animateCounter(element) {
    const target = parseFloat(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target % 1 === 0 ? target : target.toFixed(2);
            clearInterval(timer);
        } else {
            element.textContent = current % 1 === 0 ? Math.floor(current) : current.toFixed(2);
        }
    }, 16);
}

// Intersection Observer for Counter Animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statValues = entry.target.querySelectorAll('.stat-value');
            statValues.forEach(stat => {
                if (stat.textContent === '0') {
                    animateCounter(stat);
                }
            });
        }
    });
}, observerOptions);

const statsGrid = document.querySelector('.stats-grid');
if (statsGrid) {
    counterObserver.observe(statsGrid);
}

// ═══════════════════ SKILL BARS ANIMATION ═══════════════════

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillFills = entry.target.querySelectorAll('.skill-fill');
            skillFills.forEach(fill => {
                const targetWidth = fill.getAttribute('data-width');
                setTimeout(() => {
                    fill.style.width = targetWidth;
                }, 200);
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-category').forEach(section => {
    skillObserver.observe(section);
});

// ═══════════════════ NAVIGATION FUNCTIONALITY ═══════════════════

const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

// Smooth Scroll Navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }

        // Update active state
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        // Close mobile menu if open
        const navMenu = document.getElementById('navMenu');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    });
});

// Update Active Nav Link on Scroll
window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// ═══════════════════ SCROLL PROGRESS BAR ═══════════════════

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.style.width = scrolled + '%';
    }
});

// ═══════════════════ PARTICLE CANVAS ANIMATION ═══════════════════

const canvas = document.getElementById('particleCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = 30;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = `rgba(255, 215, 0, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animateParticles);
    }

    animateParticles();
}

// ═══════════════════ MOBILE MENU TOGGLE ═══════════════════

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');

        // Animate hamburger icon
        const spans = navToggle.querySelectorAll('span');
        if (navToggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(10px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu && navToggle) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');

            // Reset hamburger icon
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
});

// ═══════════════════ CONTACT FORM HANDLING ═══════════════════

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Create mailto link
        const mailtoLink = `mailto:lavanyaragavan08@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;

        // Open default email client
        window.location.href = mailtoLink;

        // Show success message
        alert(`Thank you, ${name}! 🚀\n\nYour message has been prepared. Your default email client should open now.\n\nI'll get back to you soon!`);

        // Reset form
        contactForm.reset();

        // Extra rain celebration!
        startRainBurst(30);
        increaseRainIntensity(10);
    });
}

// ═══════════════════ SCROLL ANIMATIONS ═══════════════════

// Fade in elements on scroll
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Add fade-in to cards
document.querySelectorAll('.project-card, .achievement-card, .edu-card, .contact-card, .cert-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(card);
});

// ═══════════════════ WELCOME RAIN ANIMATION ═══════════════════

window.addEventListener('load', () => {
    // Welcome rain burst
    setTimeout(() => {
        startRainBurst(20);
        increaseRainIntensity(5);
    }, 1000);

    // Console messages
    console.log('✅ Portfolio Loaded Successfully!');
    console.log('🌧️ Rain System: Active');
    console.log('⭐ Stars: 3 Layers Animated');
    console.log('☁️ Clouds: 5 Floating');
    console.log('🚀 Ready to Impress Recruiters!');
    console.log('💙 Made with love by Lavanya P');
});

// ═══════════════════ PERFORMANCE OPTIMIZATION ═══════════════════

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll listeners
const optimizedScrollHandler = debounce(() => {
    // Update progress bar
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.style.width = scrolled + '%';
    }
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// ═══════════════════ ACCESSIBILITY IMPROVEMENTS ═══════════════════

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC to close mobile menu
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }

    // Enter to submit form
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
        if (contactForm && contactForm.contains(e.target)) {
            contactForm.dispatchEvent(new Event('submit'));
        }
    }
});

// Focus management for mobile menu
if (navMenu) {
    navMenu.addEventListener('transitionend', () => {
        if (navMenu.classList.contains('active')) {
            const firstLink = navMenu.querySelector('.nav-link');
            if (firstLink) firstLink.focus();
        }
    });
}

// ═══════════════════ EASTER EGGS 🥚 ═══════════════════

// Secret command: Type "rain" to trigger massive rain
let secretCode = '';
let secretTimeout;

document.addEventListener('keypress', (e) => {
    secretCode += e.key.toLowerCase();

    clearTimeout(secretTimeout);
    secretTimeout = setTimeout(() => {
        secretCode = '';
    }, 1000);

    if (secretCode.includes('rain')) {
        console.log('🌧️ SECRET RAIN ACTIVATED! 🌧️');
        startRainBurst(100);
        increaseRainIntensity(20);
        secretCode = '';
    }

    if (secretCode.includes('moon')) {
        console.log('🌔 MOON POWER ACTIVATED! 🌔');
        alert('🌔 You discovered the moon secret! Born on Jan 8, 2006 under Waxing Gibbous - 68% to fullness! 🌔');
        secretCode = '';
    }
});

// ═══════════════════ BROWSER COMPATIBILITY ═══════════════════

// Check for IntersectionObserver support
if (!('IntersectionObserver' in window)) {
    console.warn('IntersectionObserver not supported. Some animations may not work.');
    // Fallback: Show all elements immediately
    document.querySelectorAll('[style*="opacity: 0"]').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
    });
}

// ═══════════════════ ANALYTICS (Optional) ═══════════════════

// Track section views
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            console.log(`📍 Section viewed: ${sectionId}`);
            // You can add Google Analytics or other tracking here
        }
    });
}, {
    threshold: 0.5
});

sections.forEach(section => {
    if (section.id) {
        sectionObserver.observe(section);
    }
});

// ═══════════════════ SMOOTH SCROLLING POLYFILL ═══════════════════

// For browsers that don't support smooth scrolling
if (!('scrollBehavior' in document.documentElement.style)) {
    const smoothScrollTo = (targetPosition, duration) => {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        const ease = (t, b, c, d) => {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };

        requestAnimationFrame(animation);
    };

    // Override smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                smoothScrollTo(targetSection.offsetTop - 80, 1000);
            }
        });
    });
}
// ════════════════════════════════════════════════════════════
// VOICE-ENABLED CHATBOT - COMPLETE JAVASCRIPT
// Replace your entire chatbot JS with this updated version
// ════════════════════════════════════════════════════════════

console.log('🎤 Voice-Enabled Chatbot Loading...');

// CHATBOT ELEMENTS
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotContainer = document.getElementById('chatbotContainer');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');
const typingIndicator = document.getElementById('typingIndicator');
const chatbotNotification = document.getElementById('chatbotNotification');

// VOICE ELEMENTS
const voiceToggle = document.getElementById('voiceToggle');
const voiceIcon = document.getElementById('voiceIcon');
const voiceInputBtn = document.getElementById('voiceInputBtn');
const micIcon = document.getElementById('micIcon');
const voiceStatus = document.getElementById('voiceStatus');

// CHATBOT STATE
let isChatbotOpen = false;
let hasInteracted = false;

// VOICE STATE
let isVoiceEnabled = true;
let isListening = false;
let speechSynthesis = window.speechSynthesis;
let recognition = null;

// Initialize Speech Recognition
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
        isListening = true;
        voiceInputBtn.classList.add('listening');
        micIcon.textContent = '🎙️';
        voiceStatus.classList.add('active');
        console.log('🎙️ Listening started...');
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        chatbotInput.value = transcript;
        console.log('🎤 Heard:', transcript);
        sendMessage();
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        stopListening();
        if (event.error === 'no-speech') {
            addMessage("I didn't hear anything. Please try again! 🎤", 'bot');
        }
    };

    recognition.onend = () => {
        stopListening();
    };
} else {
    console.warn('⚠️ Speech Recognition not supported in this browser');
}

// KNOWLEDGE BASE - All about Lavanya!
const knowledgeBase = {
    greetings: [
        "Hi! 👋 I'm Lavanya's AI Assistant. I can tell you all about her skills, projects, experience, and more!",
        "Hello! 🌟 Welcome! I'm here to help you learn about Lavanya's amazing journey in DevOps and Cloud!",
        "Hey there! 💙 Ask me anything about Lavanya's qualifications, projects, or experience!"
    ],

    experience: {
        response: "Lavanya has great experience! She completed an AICTE Internship from May to July 2024, working on AI and Machine Learning projects. She built a phishing link detector browser extension and developed a containerized calculator with Docker. She gained expertise in Python, JavaScript, Flask, and Docker. She's also active in hackathons, research, and open-source!",
        keywords: ['experience', 'work', 'internship', 'job', 'aicte', 'worked']
    },

    skills: {
        response: "Lavanya's technical skills include Cloud and DevOps with AWS, Docker, Jenkins, and Kubernetes. She programs in Python, Java, JavaScript, and SQL. She works with AI and ML using OpenAI API and Generative AI. For web development, she uses HTML, CSS, React, and Flask. She's proficient with databases like MySQL and MongoDB, and uses tools like Git, Linux, and VS Code. Her mastery level is 68 percent and growing!",
        keywords: ['skills', 'technologies', 'tech stack', 'tools', 'programming', 'languages', 'what can']
    },

    projects: {
        response: "Lavanya has two featured projects. First, a Phishing Link Detector browser extension to detect malicious URLs using JavaScript, HTML, CSS, and Flask. Second, an AI-Powered Workout and Diet Planner that gives personalized fitness recommendations using Python, Streamlit, and OpenAI API. Both projects are completed. Check out more on her GitHub at github.com/lava2006",
        keywords: ['projects', 'work', 'built', 'created', 'developed', 'portfolio', 'github']
    },

    education: {
        response: "Lavanya is pursuing her B.Tech in Computer Science from Manakula Vinayagar Institute of Technology with an excellent CGPA of 9.02 out of 10. She's currently in pre-final year, from 2023 to 2027. She scored 84.5 percent in 12th standard and 85 percent in 10th standard. She's an active learner who has solved over 700 coding problems!",
        keywords: ['education', 'degree', 'college', 'university', 'study', 'cgpa', 'gpa', 'marks']
    },

    certifications: {
        response: "Lavanya has earned multiple certifications including NPTEL Cloud Computing with Elite plus Silver grade, CCNA Introduction to Networks from Cisco, Python Programming from IIT Bombay, Oracle Cloud Infrastructure AI Foundation, and she's currently pursuing AWS Cloud Practitioner certification. You can view all her certifications on Credly at credly.com/users/lavanya08",
        keywords: ['certifications', 'certificates', 'certified', 'credentials', 'courses']
    },

    achievements: {
        response: "Lavanya has impressive achievements! She solved over 700 coding problems, earned NPTEL Elite plus Silver certification, presented a research paper at HITS Chennai, participated in Smart India Hackathon in 2023 and 2024, led an NSS leadership program, and is a national-level badminton player. She's a well-rounded achiever!",
        keywords: ['achievements', 'accomplishments', 'awards', 'hackathon', 'badminton', 'sports']
    },

    contact: {
        response: "You can contact Lavanya via email at lavanyaragavan08@gmail.com. Connect with her on LinkedIn at linkedin.com/in/lavanya-ragavan, check her GitHub at github.com/lava2006, or view her certifications on Credly at credly.com/users/lavanya08. She's located in Puducherry, India. Feel free to reach out - she's always open to opportunities!",
        keywords: ['contact', 'email', 'reach', 'connect', 'linkedin', 'github', 'phone', 'call']
    },

    career: {
        response: "Lavanya is targeting roles as a DevOps Engineer, Cloud Engineer, Software Engineer, or Data Engineer. She's passionate about AWS, Docker, Kubernetes, and AI and ML. She's looking for opportunities at Fortune 500 and FAANG companies!",
        keywords: ['career', 'goals', 'aspiration', 'looking for', 'job', 'position', 'role', 'hire']
    },

    personal: {
        response: "Lavanya was born on January 8, 2006 under a Waxing Gibbous Moon at 68 percent. She's from Puducherry, India, and is a pre-final year B.Tech student. She's also a national-level badminton player and is passionate about DevOps, Cloud, and AI. She's a dedicated learner with a 9.02 CGPA!",
        keywords: ['about', 'who is', 'tell me about', 'personal', 'background', 'moon', 'age', 'born']
    },

    strengths: {
        response: "Lavanya's key strengths include technical excellence with a 9.02 CGPA, being a problem solver who completed over 700 coding challenges, quick learning ability with 5 plus certifications, being a team player through hackathons and NSS, athletic prowess as a national badminton player, and innovation through research papers and projects. She has a perfect blend of technical and soft skills!",
        keywords: ['strengths', 'strong', 'good at', 'best at', 'qualities']
    },

    why_hire: {
        response: "You should hire Lavanya because she has a strong academic record with 9.02 CGPA, hands-on DevOps and Cloud experience, solved over 700 problems, earned multiple certifications, built real-world projects, is a quick learner, great team player, and is passionate and dedicated. She brings value from day one!",
        keywords: ['why hire', 'why choose', 'what makes', 'stand out', 'unique']
    }
};

// SPEAK FUNCTION
function speak(text) {
    if (!isVoiceEnabled || !speechSynthesis) return;

    // Cancel any ongoing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    // Voice settings
    utterance.rate = 1.0;  // Speed (0.1 to 10)
    utterance.pitch = 1.0; // Pitch (0 to 2)
    utterance.volume = 1.0; // Volume (0 to 1)

    // Try to use a female voice
    const voices = speechSynthesis.getVoices();
    const femaleVoice = voices.find(voice => 
        voice.name.includes('Female') || 
        voice.name.includes('Samantha') || 
        voice.name.includes('Google UK English Female') ||
        voice.name.includes('Microsoft Zira')
    );

    if (femaleVoice) {
        utterance.voice = femaleVoice;
    }

    // Visual feedback while speaking
    utterance.onstart = () => {
        chatbotMessages.classList.add('speaking');
        console.log('🔊 Speaking...');
    };

    utterance.onend = () => {
        chatbotMessages.classList.remove('speaking');
        console.log('✅ Speech finished');
    };

    utterance.onerror = (event) => {
        console.error('Speech error:', event.error);
        chatbotMessages.classList.remove('speaking');
    };

    speechSynthesis.speak(utterance);
}

// TOGGLE VOICE
voiceToggle.addEventListener('click', () => {
    isVoiceEnabled = !isVoiceEnabled;

    if (isVoiceEnabled) {
        voiceIcon.textContent = '🔊';
        voiceToggle.classList.remove('muted');
        speak("Voice enabled!");
    } else {
        voiceIcon.textContent = '🔇';
        voiceToggle.classList.add('muted');
        speechSynthesis.cancel();
    }
});

// VOICE INPUT
voiceInputBtn.addEventListener('click', () => {
    if (!recognition) {
        addMessage("Sorry, voice input is not supported in your browser. Please use Chrome, Edge, or Safari. 🎤", 'bot');
        return;
    }

    if (isListening) {
        recognition.stop();
    } else {
        recognition.start();
    }
});

function stopListening() {
    isListening = false;
    voiceInputBtn.classList.remove('listening');
    micIcon.textContent = '🎤';
    voiceStatus.classList.remove('active');
}

// TOGGLE CHATBOT
chatbotToggle.addEventListener('click', () => {
    isChatbotOpen = !isChatbotOpen;
    chatbotContainer.classList.toggle('active');

    if (isChatbotOpen) {
        chatbotInput.focus();
        chatbotNotification.style.display = 'none';
        hasInteracted = true;
    }
});

chatbotClose.addEventListener('click', () => {
    isChatbotOpen = false;
    chatbotContainer.classList.remove('active');
    speechSynthesis.cancel();
});

// SEND MESSAGE FUNCTION
function sendMessage() {
    const message = chatbotInput.value.trim();
    if (!message) return;

    addMessage(message, 'user');
    chatbotInput.value = '';

    typingIndicator.classList.add('active');

    setTimeout(() => {
        typingIndicator.classList.remove('active');
        const response = generateResponse(message);
        addMessage(response, 'bot');

        // Speak the response
        speak(response);
    }, 1000 + Math.random() * 1000);
}

// ADD MESSAGE TO CHAT
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}-message`;

    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = sender === 'bot' ? '🤖' : '👤';

    const content = document.createElement('div');
    content.className = 'message-content';

    const paragraphs = text.split('\n').filter(p => p.trim());
    paragraphs.forEach(para => {
        const p = document.createElement('p');
        p.textContent = para;
        content.appendChild(p);
    });

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);

    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// GENERATE RESPONSE
function generateResponse(userMessage) {
    const message = userMessage.toLowerCase();

    if (message.match(/^(hi|hello|hey|hola|namaste)/)) {
        return knowledgeBase.greetings[Math.floor(Math.random() * knowledgeBase.greetings.length)];
    }

    if (message.match(/thank|thanks|appreciated/)) {
        return "You're welcome! 😊 Anything else you'd like to know about Lavanya?";
    }

    for (const [key, value] of Object.entries(knowledgeBase)) {
        if (key === 'greetings') continue;

        if (value.keywords && value.keywords.some(keyword => message.includes(keyword))) {
            return value.response;
        }
    }

    return "I can help you with Experience, Skills, Projects, Education, Certifications, Achievements, and Contact Info. What would you like to know? 😊";
}

// EVENT LISTENERS
chatbotSend.addEventListener('click', sendMessage);

chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// QUICK CHIPS
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('chip')) {
        const message = e.target.getAttribute('data-message');
        chatbotInput.value = message;
        sendMessage();
    }
});

// Load voices
if (speechSynthesis) {
    speechSynthesis.onvoiceschanged = () => {
        const voices = speechSynthesis.getVoices();
        console.log('🔊 Available voices:', voices.length);
    };
}

// AUTO-OPEN CHATBOT
if (!hasInteracted) {
    setTimeout(() => {
        if (!isChatbotOpen && !hasInteracted) {
            chatbotNotification.style.display = 'flex';
        }
    }, 5000);
}

console.log('✅ Voice-Enabled Chatbot Ready!');
console.log('🔊 Speech Synthesis:', speechSynthesis ? 'Available' : 'Not supported');
console.log('🎤 Speech Recognition:', recognition ? 'Available' : 'Not supported');

// ═══════════════════ END OF SCRIPT ═══════════════════

console.log('🎉 All systems loaded and ready!');
console.log('💙 Portfolio by Lavanya P - Cloud & DevOps Engineer');
console.log('🚀 Good luck with your job applications!');

// Fun console message for developers who inspect the code
console.log('%c👋 Hello fellow developer!', 'color: #00d4ff; font-size: 20px; font-weight: bold;');
console.log('%c💙 This portfolio was built with HTML, CSS, and JavaScript', 'color: #ffd700; font-size: 14px;');
console.log('%c🌧️ Try typing "rain" or "moon" for easter eggs!', 'color: #4facfe; font-size: 14px;');
console.log('%c🚀 Made by Lavanya P - DevOps & Cloud Engineer', 'color: #00d4ff; font-size: 14px;');
