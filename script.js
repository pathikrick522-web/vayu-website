/**
 * ==========================================================================
 * TEAM VAYU — Official Aerospace & UAV Engineering Website
 * IEM (Institute of Engineering & Management), Kolkata
 * Architecture: Modular Component & Data Separation Layer
 * ==========================================================================
 */

/**
 * --------------------------------------------------------------------------
 * 01. MODULAR DATA STORE (VAYU_DATA)
 * --------------------------------------------------------------------------
 * The website is architected so the team can easily update all rosters,
 * aircraft specs, milestones, competitions, and articles here in the future
 * without rebuilding or modifying HTML markup.
 */
window.VAYU_DATA = {
  institution: {
    name: "Institute of Engineering & Management (IEM), Kolkata",
    department: "Department of Aerospace & Mechanical Engineering",
    campus: "Salt Lake Electronics Complex, Sector V, Kolkata, India",
    coordinates: "LAT: 22° 34' 12\" N / LON: 88° 26' 02\" E"
  },
  social: {
    instagram: "https://www.instagram.com/teamvayu.iemk/",
    handle: "@teamvayu.iemk",
    email: "contact@teamvayu.in"
  },
  // Additional dynamic data hooks can be populated here in Stage 2
};

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
     02. STICKY HEADER & SCROLLSPY (01 - 10)
     ------------------------------------------------------------------------ */
  const header = document.getElementById('vayuHeader');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const sections = document.querySelectorAll('section[id], footer[id]');

  function handleScroll() {
    const scrollY = window.scrollY;

    // Header background toggle
    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // ScrollSpy active state
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check on load

  /* ------------------------------------------------------------------------
     03. MOBILE DRAWER NAVIGATION
     ------------------------------------------------------------------------ */
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openDrawer() {
    mobileDrawer.classList.add('open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburgerBtn?.addEventListener('click', openDrawer);
  drawerCloseBtn?.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // Close drawer on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  /* ------------------------------------------------------------------------
     04. AEROSPACE FLIGHT TRAJECTORY CANVAS (HERO PARTICLES)
     ------------------------------------------------------------------------ */
  const canvas = document.getElementById('flightTrajectoryCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    const particleCount = 45;

    function resizeCanvas() {
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    }

    class FlightParticle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.2) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        this.alpha = Math.random() * 0.5 + 0.15;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 180, 216, ${this.alpha})`;
        ctx.fill();
      }
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new FlightParticle());
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Connect adjacent nodes with subtle telemetry lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 180, 216, ${0.12 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
      resizeCanvas();
      initParticles();
    });

    resizeCanvas();
    initParticles();
    animate();
  }

  /* ------------------------------------------------------------------------
     05. PROJECT CATEGORY FILTER
     ------------------------------------------------------------------------ */
  const projectFilterBtns = document.querySelectorAll('#projectFilterBar .filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  projectFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      projectFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease';
            card.style.opacity = '1';
          }, 30);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ------------------------------------------------------------------------
     06. TEAM SUBSYSTEM FILTER
     ------------------------------------------------------------------------ */
  const teamPills = document.querySelectorAll('#teamFilterBar .team-pill');
  const teamCards = document.querySelectorAll('.team-card');

  teamPills.forEach(pill => {
    pill.addEventListener('click', () => {
      teamPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const subsystem = pill.getAttribute('data-subsystem');

      teamCards.forEach(card => {
        const cardSub = card.getAttribute('data-subsystem');
        if (subsystem === 'all' || cardSub === subsystem) {
          card.style.display = 'block';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.transition = 'opacity 0.35s ease';
            card.style.opacity = '1';
          }, 30);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ------------------------------------------------------------------------
     07. FULLSCREEN LIGHTBOX FOR GALLERY
     ------------------------------------------------------------------------ */
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');
  const galleryItems = document.querySelectorAll('.gallery-item');

  function openLightbox(src, caption) {
    if (!lightboxModal) return;
    lightboxImg.src = src;
    lightboxCaption.textContent = caption || 'Team VAYU Aerospace Archive';
    lightboxModal.classList.add('active');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const src = item.getAttribute('data-src');
      const caption = item.getAttribute('data-caption');
      openLightbox(src, caption);
    });
  });

  lightboxClose?.addEventListener('click', closeLightbox);
  lightboxBackdrop?.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal?.classList.contains('active')) {
      closeLightbox();
    }
  });

  /* ------------------------------------------------------------------------
     08. SPONSORSHIP MODAL
     ------------------------------------------------------------------------ */
  const sponsorModal = document.getElementById('sponsorModal');
  const sponsorModalTrigger = document.getElementById('sponsorModalTrigger');
  const sponsorClose = document.getElementById('sponsorClose');
  const sponsorBackdrop = document.getElementById('sponsorBackdrop');

  function openSponsorModal() {
    if (!sponsorModal) return;
    sponsorModal.classList.add('active');
    sponsorModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeSponsorModal() {
    if (!sponsorModal) return;
    sponsorModal.classList.remove('active');
    sponsorModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  sponsorModalTrigger?.addEventListener('click', openSponsorModal);
  sponsorClose?.addEventListener('click', closeSponsorModal);
  sponsorBackdrop?.addEventListener('click', closeSponsorModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sponsorModal?.classList.contains('active')) {
      closeSponsorModal();
    }
  });

  /* ------------------------------------------------------------------------
     09. CONTACT FORM VALIDATION & INTERACTION
     ------------------------------------------------------------------------ */
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    // Field references
    const name = document.getElementById('contactName');
    const email = document.getElementById('contactEmail');
    const subject = document.getElementById('contactSubject');
    const message = document.getElementById('contactMessage');
    const submitBtn = document.getElementById('submitBtn');

    let isValid = true;

    // Reset error messages
    document.querySelectorAll('.form-error').forEach(el => el.textContent = '');

    if (!name.value.trim()) {
      document.getElementById('nameError').textContent = 'Please enter your name or callsign.';
      isValid = false;
    }

    if (!email.value.trim() || !/^\S+@\S+\.\S+$/.test(email.value.trim())) {
      document.getElementById('emailError').textContent = 'Please enter a valid electronic mail address.';
      isValid = false;
    }

    if (!subject.value.trim()) {
      document.getElementById('subjectError').textContent = 'Please specify transmission subject.';
      isValid = false;
    }

    if (!message.value.trim()) {
      document.getElementById('messageError').textContent = 'Transmission message content is required.';
      isValid = false;
    }

    if (!isValid) return;

    // Simulate sending transmission
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>TRANSMITTING...</span> <i class="fas fa-spinner fa-spin"></i>';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      contactForm.reset();

      formFeedback.className = 'form-feedback success';
      formFeedback.textContent = '// TRANSMISSION RECEIVED: Your message has been logged in Team VAYU telemetry. We will respond shortly.';

      setTimeout(() => {
        formFeedback.textContent = '';
      }, 7000);
    }, 1200);
  });

});
