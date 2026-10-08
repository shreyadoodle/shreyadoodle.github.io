// ===== Loading Screen =====
const loader = document.getElementById('loader');
const loaderBar = document.getElementById('loaderBar');
const loaderPercent = document.getElementById('loaderPercent');
const siteWrapper = document.getElementById('siteWrapper');
const navbar = document.getElementById('navbar');
let loadProgress = 0;

function updateLoader() {
    if (!loader) return;
    if (loadProgress < 100) {
        loadProgress += Math.random() * 12 + 3;
        if (loadProgress > 100) loadProgress = 100;
        loaderBar.style.width = loadProgress + '%';
        loaderPercent.textContent = Math.floor(loadProgress) + '%';
        requestAnimationFrame(() => setTimeout(updateLoader, 50 + Math.random() * 80));
    } else {
        loaderBar.style.width = '100%';
        loaderPercent.textContent = '100%';
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.classList.add('loaded');
            if (navbar) navbar.classList.add('visible');
        }, 400);
    }
}

if (loader) {
    updateLoader();
} else {
    document.body.classList.add('loaded');
    if (navbar) navbar.classList.add('visible');
}

// ===== Custom Cursor =====
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
const dot = document.getElementById('cursorDot');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;
let dotX = 0, dotY = 0;

const cursorColors = ['#C8A2E8', '#FFB6C1', '#A8D8EA', '#FFCBA4', '#B8E6D0', '#E8D5F5'];
let colorIndex = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX - 5 + 'px';
    cursor.style.top = mouseY - 5 + 'px';
    dot.style.left = mouseX - 2.5 + 'px';
    dot.style.top = mouseY - 2.5 + 'px';
});

function animateCursor() {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    follower.style.left = followerX - 20 + 'px';
    follower.style.top = followerY - 20 + 'px';
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Rotate cursor colors
setInterval(() => {
    colorIndex = (colorIndex + 1) % cursorColors.length;
    cursor.style.background = cursorColors[colorIndex];
    follower.style.borderColor = cursorColors[colorIndex];
}, 2000);

// Cursor hover
document.querySelectorAll('[data-cursor="pointer"], a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        follower.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        follower.classList.remove('hover');
    });
});

// ===== Navbar Scroll =====
window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Image Fallbacks =====
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        const isPhoto = this.classList.contains('about-photo');
        const isLoader = this.classList.contains('loader-avatar');
        const placeholder = document.createElement('div');
        placeholder.style.cssText = `
            width: 100%;
            ${isPhoto ? 'height: 100%;' : ''}
            aspect-ratio: ${isPhoto ? 'auto' : isLoader ? '1/1' : '16/10'};
            background: linear-gradient(135deg, #FFF0EB 0%, #E8D5F5 50%, #FFD6E0 100%);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            gap: 8px;
            color: #C8A2E8;
            font-size: 3rem;
        `;
        placeholder.innerHTML = `<span style="font-size:3rem">✦</span><span style="font-size:0.8rem;color:#A0A0A0;font-family:Inter,sans-serif">Shreya Agarwal</span>`;
        this.replaceWith(placeholder);
    });
});

// ===== Text Scramble =====
function scrambleAndReplace(element, newText) {
    const chars = '!<>-_\\/[]{}—=+*^?#________';
    let iteration = 0;
    const finalText = newText;

    const interval = setInterval(() => {
        element.textContent = finalText
            .split('')
            .map((char, i) => {
                if (i < iteration) return finalText[i];
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');
        if (iteration >= finalText.length) {
            clearInterval(interval);
            element.textContent = finalText;
        }
        iteration += 1 / 2;
    }, 25);
}

// ===== Scroll Reveal =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.case-study, .about-left, .about-right, .contact-content, .exp-item, .stat').forEach(el => {
    observer.observe(el);
});

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== Magnetic Buttons =====
document.querySelectorAll('.btn-primary, .btn-secondary, .resume-btn, .btn-outline').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// ===== Case Study Tilt =====
document.querySelectorAll('.case-study-inner').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(1000px) rotateX(${y * -3}deg) rotateY(${x * 3}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===== Logo Text Scramble =====
const phrases = ['shreya.', 'shreya ✦', 'shreya ♡', 'shreya ~', 'shreya!'];
let phraseIndex = 0;
const logoEl = document.querySelector('.logo-text');

if (logoEl) {
    logoEl.addEventListener('mouseenter', () => {
        phraseIndex = (phraseIndex + 1) % phrases.length;
        scrambleAndReplace(logoEl, phrases[phraseIndex]);
    });
}

// ===== Konami Code Easter Egg =====
const konamiCode = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            document.body.style.animation = 'rainbow 2s linear';
            setTimeout(() => document.body.style.animation = '', 2000);
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// ===== Stagger reveal for case studies =====
document.querySelectorAll('.case-study').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.1}s`;
});

// ===== Hero Carousel (About Page) =====
const heroCarousel = document.getElementById('heroCarousel');
const heroTrack = document.getElementById('heroCarouselTrack');
const heroSlides = heroTrack ? Array.from(heroTrack.querySelectorAll('.hero-carousel-slide')) : [];
const heroDots = document.querySelectorAll('#heroDots .dot');
const heroTotal = heroSlides.length;
let heroSlide = 0;
let heroAutoPlay = null;

function goToHeroSlide(index) {
    if (!heroTotal || !heroTrack) return;
    if (index < 0) index = heroTotal - 1;
    if (index >= heroTotal) index = 0;
    heroSlide = index;
    heroTrack.style.transform = `translateX(-${heroSlide * 100}%)`;
    heroDots.forEach((dot, i) => dot.classList.toggle('active', i === heroSlide));
}

function stopHeroAutoPlay() {
    if (heroAutoPlay) {
        clearInterval(heroAutoPlay);
        heroAutoPlay = null;
    }
}

function startHeroAutoPlay() {
    stopHeroAutoPlay();
    if (heroTotal < 2) return;
    heroAutoPlay = setInterval(() => goToHeroSlide(heroSlide + 1), 4000);
}

if (heroCarousel && heroTotal) {
    heroCarousel.setAttribute('tabindex', '0');
    heroCarousel.setAttribute('role', 'region');
    heroCarousel.setAttribute('aria-roledescription', 'carousel');
    heroCarousel.setAttribute('aria-label', 'Illustrations of Shreya');

    heroDots.forEach((dot, i) => {
        dot.setAttribute('role', 'button');
        dot.setAttribute('tabindex', '0');
        dot.addEventListener('click', () => {
            goToHeroSlide(i);
            startHeroAutoPlay();
        });
    });

    // Pause on hover, focus, and when the tab is hidden
    heroCarousel.addEventListener('mouseenter', stopHeroAutoPlay);
    heroCarousel.addEventListener('mouseleave', startHeroAutoPlay);
    heroCarousel.addEventListener('focusin', stopHeroAutoPlay);
    heroCarousel.addEventListener('focusout', (e) => {
        if (!heroCarousel.contains(e.relatedTarget)) startHeroAutoPlay();
    });
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) stopHeroAutoPlay();
        else startHeroAutoPlay();
    });

    // Mouse drag (desktop swipe)
    let heroDragging = false;
    let heroDragStartX = 0;
    let heroDragDelta = 0;

    heroCarousel.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return;
        if (e.target.closest('#heroDots')) return;
        heroDragging = true;
        heroDragStartX = e.clientX;
        heroDragDelta = 0;
        heroTrack.classList.add('is-dragging');
        heroCarousel.classList.add('is-grabbing');
        stopHeroAutoPlay();
        e.preventDefault();
        heroCarousel.focus({ preventScroll: true });
    });

    window.addEventListener('mousemove', (e) => {
        if (!heroDragging) return;
        heroDragDelta = e.clientX - heroDragStartX;
        const width = heroTrack.offsetWidth || 1;
        heroTrack.style.transform = `translateX(${(-heroSlide * 100) + (heroDragDelta / width) * 100}%)`;
    });

    const endHeroDrag = () => {
        if (!heroDragging) return;
        heroDragging = false;
        heroTrack.classList.remove('is-dragging');
        heroCarousel.classList.remove('is-grabbing');
        const width = heroTrack.offsetWidth || 1;
        if (Math.abs(heroDragDelta) > width * 0.12) {
            if (heroDragDelta < 0) goToHeroSlide(heroSlide + 1);
            else goToHeroSlide(heroSlide - 1);
        } else {
            goToHeroSlide(heroSlide);
        }
        heroDragDelta = 0;
        startHeroAutoPlay();
    };

    window.addEventListener('mouseup', endHeroDrag);
    window.addEventListener('mouseleave', endHeroDrag);

    // Touch swipe
    let heroTouchStartX = 0;
    heroCarousel.addEventListener('touchstart', (e) => {
        heroTouchStartX = e.changedTouches[0].clientX;
        stopHeroAutoPlay();
    }, { passive: true });

    heroCarousel.addEventListener('touchend', (e) => {
        const diff = heroTouchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 45) {
            if (diff > 0) goToHeroSlide(heroSlide + 1);
            else goToHeroSlide(heroSlide - 1);
        }
        startHeroAutoPlay();
    }, { passive: true });

    // Keyboard
    heroCarousel.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            goToHeroSlide(heroSlide + 1);
            startHeroAutoPlay();
        } else if (e.key === 'ArrowLeft') {
            goToHeroSlide(heroSlide - 1);
            startHeroAutoPlay();
        }
    });

    startHeroAutoPlay();
}