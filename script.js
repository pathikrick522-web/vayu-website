/* =========================================
   TEAM VAYU — JavaScript (Arrow-style)
   Preloader, GSAP Scroll Animations,
   Slideshow, Carousel, Nav, Sponsor Popup
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ===== PRELOADER =====
  const preloader = document.getElementById('preloader');
  const preloaderBar = document.getElementById('preloaderBar');
  const preloaderPct = document.getElementById('preloaderPct');
  let progress = 0;

  const preloaderInterval = setInterval(() => {
    progress += Math.random() * 10 + 4;
    if (progress >= 100) {
      progress = 100;
      clearInterval(preloaderInterval);
      setTimeout(() => {
        preloader.classList.add('hidden');
        document.body.classList.remove('preloading');
        document.querySelectorAll('body > *:not(.preloader)').forEach(el => {
          el.style.opacity = '1';
          el.style.visibility = 'visible';
          el.style.transition = 'opacity 0.6s ease';
        });
        initGSAP();
      }, 500);
    }
    preloaderBar.style.width = progress + '%';
    preloaderPct.textContent = Math.floor(progress) + '%';
  }, 70);


  // ===== HEADER SCROLL =====
  const header = document.getElementById('mainHeader');
  const scrollIndicator = document.getElementById('scrollIndicator');

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 80);
    if (window.scrollY > 200 && scrollIndicator) {
      scrollIndicator.classList.add('hidden');
    }
  });


  // ===== HAMBURGER MENU =====
  const hamburger = document.getElementById('hamburger');
  const headerHead = document.getElementById('headerHead');

  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    headerHead.classList.toggle('open');
    document.body.style.overflow = headerHead.classList.contains('open') ? 'hidden' : '';
  });

  document.querySelectorAll('.nav-link-item').forEach(link => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('active');
      headerHead?.classList.remove('open');
      document.body.style.overflow = '';
    });
  });


  // ===== GSAP SCROLL ANIMATIONS =====
  function initGSAP() {
    gsap.registerPlugin(ScrollTrigger);

    // Hero scroll text 1 — TEAM VAYU
    gsap.fromTo('#text11',
      { opacity: 0, y: 80 },
      {
        opacity: 1, y: 0,
        scrollTrigger: {
          trigger: '.vid',
          start: 'top top',
          end: '30% top',
          scrub: 1,
        }
      }
    );

    // Hero scroll text 2 — tagline
    gsap.fromTo('#text12',
      { opacity: 0, y: 80 },
      {
        opacity: 1, y: 0,
        scrollTrigger: {
          trigger: '.vid',
          start: '20% top',
          end: '50% top',
          scrub: 1,
        }
      }
    );

    // Overlay darkness on scroll
    gsap.to('#overlay', {
      opacity: 0.8,
      scrollTrigger: {
        trigger: '.vid',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });

    // Logo fade out on scroll
    gsap.to('#logo', {
      opacity: 0,
      scale: 0.8,
      scrollTrigger: {
        trigger: '.vid',
        start: '10% top',
        end: '40% top',
        scrub: true,
      }
    });

    // Secondary nav pin (sticky behavior enhanced)
    ScrollTrigger.create({
      trigger: '.navbar',
      start: 'top top',
      endTrigger: 'footer',
      end: 'bottom top',
      pin: false,
      toggleClass: { targets: '.navbar', className: 'stuck' }
    });
  }


  // ===== INTERSECTION OBSERVER — Fade Ins =====
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { root: null, rootMargin: '0px 0px -60px 0px', threshold: 0.1 });

  document.querySelectorAll('.fade-in-up').forEach(el => fadeObserver.observe(el));


  // ===== SLIDESHOW =====
  let currentSlide = 0;
  const slides = document.querySelectorAll('.slide');

  window.changeSlide = function(direction) {
    if (slides.length === 0) return;
    slides[currentSlide].classList.remove('active-slide');
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    slides[currentSlide].classList.add('active-slide');
  };

  // Auto-advance slideshow
  if (slides.length > 0) {
    setInterval(() => changeSlide(1), 5000);
  }


  // ===== SPONSOR POPUP =====
  const centerTrigger = document.getElementById('centerTrigger');
  const sponsorOverlay = document.getElementById('sponsorOverlay');
  const sponsorClose = document.getElementById('sponsorClose');
  const popupSponsorBtn = document.getElementById('popupSponsorBtn');

  centerTrigger?.addEventListener('click', () => {
    sponsorOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  sponsorClose?.addEventListener('click', () => {
    sponsorOverlay.classList.remove('active');
    document.body.style.overflow = '';
  });

  sponsorOverlay?.addEventListener('click', (e) => {
    if (e.target === sponsorOverlay) {
      sponsorOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  popupSponsorBtn?.addEventListener('click', () => {
    alert('Thank you for your interest! Please email us at teamvayu@college.ac.in');
  });


  // ===== CONTACT FORM =====
  const contactForm = document.getElementById('contact-form');
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.submit-btn');
    const originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = 'Message Sent!';
      btn.style.background = 'linear-gradient(135deg, #4a9eff, #2196F3)';
      btn.style.color = '#fff';

      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.style.background = '';
        btn.style.color = '';
        contactForm.reset();
      }, 2500);
    }, 1500);
  });


  // ===== SMOOTH SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 60,
          behavior: 'smooth'
        });
      }
    });
  });


  // ===== TILT ON PREMIUM CARDS =====
  document.querySelectorAll('.premium-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = (y - rect.height / 2) / 30;
      const rotateY = (rect.width / 2 - x) / 30;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });


  // ===== PARALLAX HERO =====
  const heroImg = document.querySelector('#vidd');
  if (heroImg) {
    window.addEventListener('scroll', () => {
      if (window.scrollY < window.innerHeight) {
        heroImg.style.transform = `translateY(${window.scrollY * 0.3}px)`;
      }
    });
  }

});
