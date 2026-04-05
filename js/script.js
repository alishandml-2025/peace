// =============================================
// SPLASH SCREEN LOGIC
// Countdown from 5 to 0, then auto-dismiss
// =============================================
var countdownInterval;
var countdownValue = 5;

function startSplashCountdown() {
    var countdownEl = document.getElementById('countdown-number');

    countdownInterval = setInterval(function() {
        countdownValue--;
        if (countdownEl) {
            countdownEl.textContent = countdownValue;
        }
        if (countdownValue <= 0) {
            clearInterval(countdownInterval);
            hideSplash();
        }
    }, 1000);
}

function skipSplash() {
    clearInterval(countdownInterval);
    hideSplash();
}

function hideSplash() {
    var splash = document.getElementById('splash-screen');
    if (!splash) return;
    splash.classList.add('hidden');
    document.body.style.overflow = 'auto';

    // Show navbar and hero badge
    document.getElementById('navbar').style.display = 'flex';
    var heroBadge = document.querySelector('.hero-badge');
    if (heroBadge) heroBadge.style.display = 'inline-flex';

    // Remove splash from DOM after fade animation
    setTimeout(function() {
        if (splash.classList.contains('hidden')) {
            splash.style.display = 'none';
        }
    }, 1000);
}

// Generate floating particles for splash screen
function createParticles() {
    var container = document.getElementById('splash-particles');
    if (!container) return;

    for (var i = 0; i < 25; i++) {
        var particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.width = (Math.random() * 4 + 2) + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDuration = (Math.random() * 10 + 8) + 's';
        particle.style.animationDelay = (Math.random() * 8) + 's';
        container.appendChild(particle);
    }
}

// =============================================
// NAVBAR SCROLL EFFECT
// Adds 'scrolled' class when user scrolls down
// =============================================
function handleNavbarScroll() {
    var navbar = document.getElementById('navbar');
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// =============================================
// MOBILE NAV TOGGLE
// =============================================
function setupMobileNav() {
    var toggle = document.getElementById('nav-toggle');
    var links = document.getElementById('nav-links');

    toggle.addEventListener('click', function() {
        toggle.classList.toggle('active');
        links.classList.toggle('open');
    });

    // Close menu when any link is clicked
    var navLinks = links.querySelectorAll('a');
    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener('click', function() {
            toggle.classList.remove('active');
            links.classList.remove('open');
        });
    }
}

// =============================================
// SCROLL REVEAL ANIMATION
// Elements with class 'reveal' fade in on scroll
// =============================================
function setupScrollReveal() {
    var reveals = document.querySelectorAll('.reveal');

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(function(el) {
        observer.observe(el);
    });
}

// =============================================
// ANIMATED STAT COUNTERS
// Numbers count up when they scroll into view
// =============================================
function setupStatCounters() {
    var stats = document.querySelectorAll('.stat-number[data-target]');

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                var el = entry.target;
                var target = parseFloat(el.getAttribute('data-target'));
                var isDecimal = target % 1 !== 0;
                var duration = 2000;
                var start = performance.now();

                function animate(now) {
                    var elapsed = now - start;
                    var progress = Math.min(elapsed / duration, 1);
                    var eased = 1 - Math.pow(1 - progress, 4);
                    var current = eased * target;

                    el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);

                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        el.textContent = isDecimal ? target.toFixed(1) : target;
                    }
                }

                requestAnimationFrame(animate);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(function(s) { observer.observe(s); });
}

// =============================================
// SCROLL INDICATOR HIDE ON SCROLL
// =============================================
function setupScrollIndicator() {
    var indicator = document.getElementById('scroll-indicator');
    if (!indicator) return;
    var hidden = false;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100 && !hidden) {
            indicator.style.opacity = '0';
            hidden = true;
        } else if (window.scrollY <= 100 && hidden) {
            indicator.style.opacity = '1';
            hidden = false;
        }
    });
}

// =============================================
// GO TO TOP BUTTON
// Shows when user scrolls down 400px
// =============================================
function setupGoTopBtn() {
    var btn = document.getElementById('goTopBtn');
    if (!btn) return;
    window.addEventListener('scroll', function() {
        if (window.scrollY > 400) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });
}

// =============================================
// GALLERY PAGE - Modal functionality
// =============================================
var galleryData = [
    {
        img: 'https://images.unsplash.com/photo-1591848478625-de43268e6fb8?w=900&h=500&fit=crop',
        title: 'Peaceful Protest',
        desc: 'Peaceful protests are a cornerstone of democratic societies. They allow citizens to voice their concerns, challenge unjust policies, and advocate for change without resorting to violence. Throughout history, peaceful movements have driven some of the most significant social transformations, from civil rights to environmental justice.'
    },
    {
        img: 'https://images.unsplash.com/photo-1589578228447-e1a4e481c6c8?w=900&h=500&fit=crop',
        title: 'Justice System',
        desc: 'An effective justice system ensures that laws are applied fairly and equally. It protects the rights of all citizens, provides mechanisms for dispute resolution, and holds wrongdoers accountable. When justice systems function properly, they build trust between citizens and the state, strengthening social cohesion.'
    },
    {
        img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&h=500&fit=crop',
        title: 'Community Dialogue',
        desc: 'Community dialogue brings diverse groups together to discuss shared challenges and find common ground. These conversations foster mutual understanding, break down stereotypes, and build the social bonds that prevent conflict. Effective dialogue requires active listening, respect for different perspectives, and a commitment to collaborative solutions.'
    },
    {
        img: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=900&h=500&fit=crop',
        title: 'Strong Institutions',
        desc: 'Strong institutions are characterised by transparency, accountability, and responsiveness to citizens\' needs. They ensure that public resources are used effectively, that services reach those who need them, and that power is exercised responsibly. Building strong institutions requires sustained investment in governance capacity and public oversight.'
    },
    {
        img: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=900&h=500&fit=crop',
        title: 'Youth Empowerment',
        desc: 'Young people represent the future of governance and civic life. Empowering youth through education, leadership opportunities, and meaningful participation in decision-making creates a generation capable of building more peaceful and just societies. Youth-led initiatives are increasingly recognised as vital contributors to sustainable development.'
    },
    {
        img: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=900&h=500&fit=crop',
        title: 'Global Partnership',
        desc: 'Achieving SDG 16 requires international cooperation and partnership. Nations must work together to combat transnational corruption, support conflict prevention, and share best practices in governance. Global partnerships amplify the impact of local efforts and ensure that no community is left behind in the pursuit of peace and justice.'
    }
];

function openGalleryModal(index) {
    var modal = document.getElementById('galleryModal');
    if (!modal) return;
    var data = galleryData[index];
    document.getElementById('modalImg').src = data.img;
    document.getElementById('modalImg').alt = data.title + ' - detailed view';
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalDesc').textContent = data.desc;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Reset theme
    setModalTheme('light');
}

function closeGalleryModal() {
    var modal = document.getElementById('galleryModal');
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = 'auto';
}

// Theme controls for gallery modal
function setModalTheme(theme) {
    var body = document.getElementById('modalBody');
    if (!body) return;
    body.className = 'gallery-modal-body';
    if (theme === 'dark') body.classList.add('theme-dark');
    if (theme === 'sepia') body.classList.add('theme-sepia');

    // Update active button
    var btns = document.querySelectorAll('.theme-btn');
    for (var i = 0; i < btns.length; i++) {
        btns[i].classList.remove('active-theme');
    }
    if (event && event.target) event.target.classList.add('active-theme');
}

// =============================================
// AIS (Action Impact Simulator)
// Tracks selected actions and calculates score
// =============================================
var aisMaxScore = 25;

function toggleAisCard(cardEl) {
    cardEl.classList.toggle('selected');
    updateAisScore();
}

function updateAisScore() {
    var selectedCards = document.querySelectorAll('.ais-card.selected');
    var totalPoints = 0;

    for (var i = 0; i < selectedCards.length; i++) {
        totalPoints += parseInt(selectedCards[i].getAttribute('data-points'));
    }

    var fill = document.getElementById('aisScoreFill');
    var scoreNum = document.getElementById('aisScoreNum');
    var feedback = document.getElementById('aisFeedback');
    var header = document.getElementById('aisHeader');

    if (!fill) return;

    var percentage = (totalPoints / aisMaxScore) * 100;
    fill.style.width = percentage + '%';
    scoreNum.textContent = totalPoints;

    if (totalPoints === 0) {
        feedback.style.display = 'none';
        header.style.background = 'linear-gradient(160deg, #00356b, #0077b6)';
        fill.style.background = 'linear-gradient(90deg, #94a3b8, #cbd5e1)';
    } else if (totalPoints <= 8) {
        feedback.style.display = 'inline-block';
        feedback.textContent = '🌱 Low Impact — Every small action matters. Keep going!';
        feedback.style.background = '#fef3c7';
        feedback.style.color = '#92400e';
        fill.style.background = 'linear-gradient(90deg, #f59e0b, #fbbf24)';
        header.style.background = 'linear-gradient(160deg, #78350f, #b45309)';
    } else if (totalPoints <= 16) {
        feedback.style.display = 'inline-block';
        feedback.textContent = '🌿 Medium Impact — Great progress! You are making a real difference.';
        feedback.style.background = '#dbeafe';
        feedback.style.color = '#1e40af';
        fill.style.background = 'linear-gradient(90deg, #3b82f6, #0077b6)';
        header.style.background = 'linear-gradient(160deg, #1e3a5f, #0077b6)';
    } else {
        feedback.style.display = 'inline-block';
        feedback.textContent = '🌍 High Impact — Outstanding! You are a champion of peace & justice!';
        feedback.style.background = '#d1fae5';
        feedback.style.color = '#065f46';
        fill.style.background = 'linear-gradient(90deg, #22c55e, #10b981)';
        header.style.background = 'linear-gradient(160deg, #064e3b, #059669)';
    }
}

// =============================================
// FEEDBACK FORM VALIDATION & SUBMISSION
// =============================================
function handleFeedbackSubmit(e) {
    e.preventDefault();

    var isValid = true;

    var name = document.getElementById('fbName');
    var nameGroup = name.parentElement;
    if (!name.value.trim()) {
        nameGroup.classList.add('has-error');
        isValid = false;
    } else {
        nameGroup.classList.remove('has-error');
    }

    var email = document.getElementById('fbEmail');
    var emailGroup = email.parentElement;
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRegex.test(email.value)) {
        emailGroup.classList.add('has-error');
        isValid = false;
    } else {
        emailGroup.classList.remove('has-error');
    }

    var programme = document.getElementById('fbProgramme');
    var progGroup = programme.parentElement;
    if (!programme.value) {
        progGroup.classList.add('has-error');
        isValid = false;
    } else {
        progGroup.classList.remove('has-error');
    }

    var message = document.getElementById('fbMessage');
    var msgGroup = message.parentElement;
    if (!message.value.trim()) {
        msgGroup.classList.add('has-error');
        isValid = false;
    } else {
        msgGroup.classList.remove('has-error');
    }

    if (isValid) {
        document.getElementById('feedbackForm').style.display = 'none';
        document.getElementById('formSuccess').style.display = 'block';
    }

    return false;
}

function updateCharCounter() {
    var textarea = document.getElementById('fbMessage');
    var counter = document.getElementById('charCounter');
    var remaining = 500 - textarea.value.length;
    counter.textContent = '(' + remaining + ' characters remaining)';
    if (remaining < 50) {
        counter.style.color = '#ef4444';
    } else {
        counter.style.color = '#94a3b8';
    }
}

// =============================================
// CONTENT PAGE - Smooth scroll to section
// =============================================
function smoothScrollContent(e, sectionId) {
    e.preventDefault();
    var el = document.getElementById(sectionId);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    var links = document.querySelectorAll('.content-side-nav a');
    for (var i = 0; i < links.length; i++) {
        links[i].classList.remove('active-link');
    }
    e.target.classList.add('active-link');
}

// =============================================
// INITIALIZE EVERYTHING ON DOM LOAD
// =============================================
document.addEventListener('DOMContentLoaded', function() {
    var splash = document.getElementById('splash-screen');

    if (splash) {
        // Prevent scroll while splash is showing
        document.body.style.overflow = 'hidden';
        // Create particles and start countdown
        createParticles();
        startSplashCountdown();
    }

    // Setup interactive features
    setupMobileNav();
    setupScrollReveal();
    setupStatCounters();
    setupScrollIndicator();
    setupGoTopBtn();

    // Navbar scroll listener
    window.addEventListener('scroll', handleNavbarScroll);

    // Gallery hover effects
    var galleryItems = document.querySelectorAll('.gallery-img-item');
    galleryItems.forEach(function(item) {
        item.addEventListener('mouseenter', function() {
            this.style.borderColor = '#0077b6';
        });
        item.addEventListener('mouseleave', function() {
            this.style.borderColor = 'transparent';
        });
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                this.click();
            }
        });
    });

    // Close gallery modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeGalleryModal();
        }
    });

    // Close gallery modal on background click
    document.addEventListener('click', function(e) {
        var modal = document.getElementById('galleryModal');
        if (modal && e.target === modal) {
            closeGalleryModal();
        }
    });
});
