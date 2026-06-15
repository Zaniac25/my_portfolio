// DOM Elements
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const scrollToTopBtn = document.getElementById("scrollToTop");
const contactForm = document.getElementById("contactForm");
const toast = document.getElementById("toast");
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const timelineItems = document.querySelectorAll(".timeline-item");

// Initialize the application
document.addEventListener("DOMContentLoaded", function () {
  initializeAnimations();
  initializeNavigation();
  initializeScrollEffects();
  initializeProjectTilt();
  initializeContactForm();
  initializeSkillBars();
  initializeParallax();
  addMicroInteractions();
  preloadAnimations();
  initializeProjectFilter();
  initializeTimeline();

  // Initialize background particles after a delay
  setTimeout(createBackgroundParticles, 1000);
});

// Project Filter Functionality
function initializeProjectFilter() {
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all buttons
      filterBtns.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      this.classList.add("active");

      const filter = this.dataset.filter;

      projectCards.forEach((card) => {
        if (filter === "all" || card.dataset.category === filter) {
          card.style.display = "block";
          // Trigger reflow for animation
          void card.offsetWidth;
          card.style.animation = "fadeIn 0.5s ease-out";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

// Timeline Animation
function initializeTimeline() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    },
  );

  timelineItems.forEach((item) => {
    observer.observe(item);
  });
}

// Custom cursor
const cursor = document.createElement("div");
const cursorDot = document.createElement("div");
cursor.className = "cursor-ring";
cursorDot.className = "cursor-dot";
document.body.appendChild(cursor);
document.body.appendChild(cursorDot);

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
  cursorDot.style.left = e.clientX + "px";
  cursorDot.style.top = e.clientY + "px";
});

// Smooth scrolling for navigation links
function initializeNavigation() {
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerOffset = 80;
        const elementPosition =
          targetSection.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }

      // Close mobile menu if open
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");
      resetHamburgerIcon();
    });
  });

  // Mobile menu toggle
  if (hamburger) {
    hamburger.addEventListener("click", function () {
      navMenu.classList.toggle("active");
      this.classList.toggle("active");

      const spans = this.querySelectorAll("span");
      if (this.classList.contains("active")) {
        spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
        spans[1].style.opacity = "0";
        spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
      } else {
        resetHamburgerIcon();
      }
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (e) {
    if (
      hamburger &&
      navMenu &&
      !hamburger.contains(e.target) &&
      !navMenu.contains(e.target)
    ) {
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");
      resetHamburgerIcon();
    }
  });
}

function resetHamburgerIcon() {
  if (hamburger) {
    const spans = hamburger.querySelectorAll("span");
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  }
}

// Scroll effects and animations
function initializeScrollEffects() {
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 500) {
      scrollToTopBtn.classList.add("show");
    } else {
      scrollToTopBtn.classList.remove("show");
    }

    const navbar = document.querySelector(".navbar");
    if (navbar) {
      if (window.pageYOffset > 100) {
        navbar.style.background = "rgba(4, 1, 15, 0.95)";
      } else {
        navbar.style.background = "rgba(4, 1, 15, 0.8)";
      }
    }
  });

  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  const scrollIndicator = document.querySelector(".scroll-indicator");
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", function () {
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        const elementPosition =
          aboutSection.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - 80;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  }

  const ctaButtons = document.querySelectorAll(
    ".hero-cta .btn-primary, .hero-cta .btn-secondary",
  );
  ctaButtons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();

      if (this.textContent.includes("View My Work")) {
        const projectsSection = document.getElementById("projects");
        if (projectsSection) {
          const elementPosition =
            projectsSection.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - 80;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      } else if (this.textContent.includes("Get In Touch")) {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
          const elementPosition =
            contactSection.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - 80;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }
    });
  });
}

// Initialize scroll-triggered animations
function initializeAnimations() {
  const observerOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");

        if (entry.target.classList.contains("skills-container")) {
          animateSkillBars();
        }

        if (entry.target.classList.contains("projects-grid")) {
          const projectCards = entry.target.querySelectorAll(".project-card");
          projectCards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add("animate");
            }, index * 200);
          });
        }
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll(
    [
      ".section-header",
      ".about-info",
      ".skills-container",
      ".projects-grid",
      ".project-card",
      ".contact-form-container",
      ".contact-info",
      ".fade-in",
      ".slide-in-left",
      ".slide-in-right",
      ".timeline-item",
    ].join(","),
  );

  animatedElements.forEach((el) => observer.observe(el));
}

// Animate skill bars
function initializeSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress");
  skillBars.forEach((bar) => {
    const progress = bar.getAttribute("data-progress");
    bar.style.setProperty("--progress", progress + "%");
  });
}

function animateSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress");
  skillBars.forEach((bar, index) => {
    setTimeout(() => {
      bar.classList.add("animate");
    }, index * 300);
  });
}

// Project card tilt effects
function initializeProjectTilt() {
  const projectCards = document.querySelectorAll("[data-tilt]");

  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "perspective(1000px)";
    });

    card.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;

      this.style.boxShadow = `
                0 20px 60px rgba(177, 108, 234, 0.3),
                0 0 50px rgba(255, 94, 126, 0.2)
            `;
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
      this.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.3)";
    });
  });
}

// Contact form handling
function initializeContactForm() {
  if (!contactForm) return;

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    console.log("Contact form submitted:", data);

    const submitBtn = this.querySelector('button[type="submit"]');
    const originalHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      this.reset();
      submitBtn.innerHTML = originalHTML;
      submitBtn.disabled = false;
      showToast("Message sent successfully!", "success");
      createParticleEffect(submitBtn);

      const inputs = this.querySelectorAll(".glow-input");
      inputs.forEach((input) => input.classList.remove("has-content"));
    }, 2000);
  });

  const formInputs = document.querySelectorAll(".glow-input");
  formInputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.parentElement.classList.add("focused");
      createFieldGlow(this);
    });

    input.addEventListener("blur", function () {
      this.parentElement.classList.remove("focused");
    });

    input.addEventListener("input", function () {
      if (this.value.length > 0) {
        this.classList.add("has-content");
      } else {
        this.classList.remove("has-content");
      }
    });
  });
}

// Toast notification system
function showToast(message, type = "success") {
  if (!toast) return;

  const toastContent = toast.querySelector("span");
  const toastIcon = toast.querySelector("i");

  if (toastContent) toastContent.textContent = message;

  if (toastIcon) {
    if (type === "success") {
      toastIcon.className = "fas fa-check-circle";
      toast.style.borderColor = "var(--neon-purple)";
    } else if (type === "error") {
      toastIcon.className = "fas fa-exclamation-circle";
      toast.style.borderColor = "#ff4444";
    }
  }

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// Create particle effect for button clicks
function createParticleEffect(element) {
  const rect = element.getBoundingClientRect();
  const particles = 12;

  for (let i = 0; i < particles; i++) {
    const particle = document.createElement("div");
    particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: var(--neon-purple);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
        `;

    document.body.appendChild(particle);

    const angle = (360 / particles) * i;
    const velocity = 2 + Math.random() * 3;

    let x = 0;
    let y = 0;
    let opacity = 1;

    const animate = () => {
      x += Math.cos((angle * Math.PI) / 180) * velocity;
      y += Math.sin((angle * Math.PI) / 180) * velocity;
      opacity -= 0.02;

      particle.style.transform = `translate(${x}px, ${y}px)`;
      particle.style.opacity = opacity;

      if (opacity > 0) {
        requestAnimationFrame(animate);
      } else {
        if (document.body.contains(particle)) {
          document.body.removeChild(particle);
        }
      }
    };

    animate();
  }
}

// Create glow effect for form fields
function createFieldGlow(element) {
  const existingGlow = element.parentElement.querySelector(".field-glow");
  if (existingGlow) {
    existingGlow.remove();
  }

  const glow = document.createElement("div");
  glow.className = "field-glow";
  glow.style.cssText = `
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        background: linear-gradient(45deg, var(--neon-purple), var(--neon-pink), var(--neon-blue));
        border-radius: ${getComputedStyle(element).borderRadius};
        z-index: -1;
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
    `;

  element.parentElement.style.position = "relative";
  element.parentElement.appendChild(glow);

  setTimeout(() => {
    glow.style.opacity = "0.3";
  }, 100);

  const removeGlow = () => {
    setTimeout(() => {
      if (glow.parentElement) {
        glow.parentElement.removeChild(glow);
      }
    }, 300);
  };

  element.addEventListener("blur", removeGlow, { once: true });
}

// Parallax effect for floating icons
function initializeParallax() {
  const floatingIcons = document.querySelectorAll(".floating-icon");

  const handleScroll = () => {
    const scrollTop = window.pageYOffset;

    floatingIcons.forEach((icon, index) => {
      const speed = 0.5 + index * 0.1;
      const yPos = -(scrollTop * speed);
      icon.style.transform = `translateY(${yPos}px) rotate(${scrollTop * 0.1}deg)`;
    });
  };

  window.addEventListener("scroll", debounce(handleScroll, 16));
}

// Add dynamic background particles
function createBackgroundParticles() {
  const particleCount = 50;
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.style.cssText = `
            position: fixed;
            width: 2px;
            height: 2px;
            background: var(--neon-purple);
            border-radius: 50%;
            pointer-events: none;
            opacity: ${Math.random() * 0.5 + 0.1};
            z-index: -1;
        `;

    particle.style.left = Math.random() * window.innerWidth + "px";
    particle.style.top = Math.random() * window.innerHeight + "px";

    document.body.appendChild(particle);
    particles.push({
      element: particle,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    });
  }

  function animateParticles() {
    particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0) particle.x = window.innerWidth;
      if (particle.x > window.innerWidth) particle.x = 0;
      if (particle.y < 0) particle.y = window.innerHeight;
      if (particle.y > window.innerHeight) particle.y = 0;

      particle.element.style.left = particle.x + "px";
      particle.element.style.top = particle.y + "px";
    });

    requestAnimationFrame(animateParticles);
  }

  animateParticles();
}

// Keyboard navigation
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    if (navMenu) navMenu.classList.remove("active");
    if (hamburger) {
      hamburger.classList.remove("active");
      resetHamburgerIcon();
    }
  }

  if (e.key === "Enter" && e.target.classList.contains("btn-primary")) {
    e.target.click();
  }
});

// Add loading states and micro-interactions
function addMicroInteractions() {
  const buttons = document.querySelectorAll(".btn-primary, .btn-secondary");
  buttons.forEach((btn) => {
    btn.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px) scale(1.02)";
    });

    btn.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });

    btn.addEventListener("mousedown", function () {
      this.style.transform = "translateY(0) scale(0.98)";
    });

    btn.addEventListener("mouseup", function () {
      this.style.transform = "translateY(-2px) scale(1.02)";
    });
  });

  const cards = document.querySelectorAll(".glass-card");
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.borderColor = "rgba(177, 108, 234, 0.3)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.borderColor = "rgba(255, 255, 255, 0.1)";
    });
  });
}

// Performance optimization: Debounce scroll events
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

// Preload critical animations
function preloadAnimations() {
  const animatedElements = document.querySelectorAll(
    ".fade-in, .slide-in-left, .slide-in-right",
  );
  animatedElements.forEach((el) => {
    el.style.willChange = "transform, opacity";
  });

  setTimeout(() => {
    animatedElements.forEach((el) => {
      el.style.willChange = "auto";
    });
  }, 5000);
}
