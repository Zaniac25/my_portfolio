/* ============================================
   M TARINI PRASAD — PORTFOLIO SCRIPTS
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  initLoader();
  initCursor();
  initHeroCanvas();
  initTypewriter();
  initRoleCycle();
  initNavbar();
  initScrollReveal();
  initProjectFilter();
  initContactForm();
  initScrollTop();
  initSmoothScroll();
  initProjectCardMagnet();
});

/* ---------- LOADER ---------- */
function initLoader() {
  const loader = document.getElementById("loader");
  const progress = document.getElementById("loaderProgress");
  const text = document.getElementById("loaderText");
  const steps = [
    "Loading assets...",
    "Rendering UI...",
    "Almost there...",
    "Ready!",
  ];
  let pct = 0;
  let step = 0;

  const interval = setInterval(() => {
    pct += Math.random() * 25 + 10;
    if (pct >= 100) pct = 100;
    progress.style.width = pct + "%";
    text.textContent = steps[Math.min(step++, steps.length - 1)];
    if (pct >= 100) {
      clearInterval(interval);
      setTimeout(() => loader.classList.add("hidden"), 400);
    }
  }, 300);
}

/* ---------- CUSTOM CURSOR ---------- */
function initCursor() {
  const cursor = document.getElementById("cursor");
  const follower = document.getElementById("cursorFollower");
  if (!cursor || !follower) return;

  let mx = 0,
    my = 0,
    fx = 0,
    fy = 0;

  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + "px";
    cursor.style.top = my + "px";
  });

  function animateFollower() {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * 0.12;
    follower.style.left = fx + "px";
    follower.style.top = fy + "px";
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  document
    .querySelectorAll("a, button, .project-card, .cert-item, .filter-btn")
    .forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.classList.add("hover");
        follower.classList.add("hover");
      });
      el.addEventListener("mouseleave", () => {
        cursor.classList.remove("hover");
        follower.classList.remove("hover");
      });
    });
}

/* ---------- HERO CANVAS — NEURAL NETWORK ---------- */
function initHeroCanvas() {
  const canvas = document.getElementById("heroCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let W,
    H,
    nodes = [],
    RAF;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const NODE_COUNT = 70;
  const CONNECT_DIST = 160;

  class Node {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.r = Math.random() * 2 + 1;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W) this.vx *= -1;
      if (this.y < 0 || this.y > H) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(139,92,246,0.7)";
      ctx.fill();
    }
  }

  for (let i = 0; i < NODE_COUNT; i++) nodes.push(new Node());

  function drawFrame() {
    ctx.clearRect(0, 0, W, H);
    nodes.forEach((n) => {
      n.update();
      n.draw();
    });

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECT_DIST) {
          const alpha = (1 - dist / CONNECT_DIST) * 0.35;
          const grad = ctx.createLinearGradient(
            nodes[i].x,
            nodes[i].y,
            nodes[j].x,
            nodes[j].y,
          );
          grad.addColorStop(0, `rgba(139,92,246,${alpha})`);
          grad.addColorStop(1, `rgba(34,211,238,${alpha * 0.6})`);
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
    RAF = requestAnimationFrame(drawFrame);
  }
  drawFrame();
}

/* ---------- TYPEWRITER ---------- */
function initTypewriter() {
  const el = document.getElementById("heroName");
  if (!el) return;
  const text = "M Tarini Prasad";
  let i = 0;
  const speed = 80;

  function type() {
    if (i <= text.length) {
      el.textContent = text.slice(0, i++);
      setTimeout(type, speed);
    }
  }
  setTimeout(type, 1500);
}

/* ---------- ROLE CYCLE ---------- */
function initRoleCycle() {
  const el = document.getElementById("roleCycle");
  if (!el) return;
  const roles = [
    "Software Engineer",
    "Data Analytics",
    "AI Developer",
    "Computer Vision",
    "Problem Solver",
  ];
  let idx = 0;

  function cycle() {
    el.style.opacity = "0";
    el.style.transform = "translateY(-10px)";
    el.style.transition = "opacity 0.3s ease, transform 0.3s ease";
    setTimeout(() => {
      idx = (idx + 1) % roles.length;
      el.textContent = roles[idx];
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 300);
  }
  setInterval(cycle, 2500);
}

/* ---------- NAVBAR ---------- */
function initNavbar() {
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 60);
    document
      .getElementById("scrollToTop")
      .classList.toggle("show", window.scrollY > 500);
  });

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("open");
      const spans = hamburger.querySelectorAll("span");
      const isOpen = navMenu.classList.contains("open");
      spans[0].style.transform = isOpen
        ? "rotate(45deg) translate(5px,5px)"
        : "";
      spans[1].style.opacity = isOpen ? "0" : "1";
      spans[2].style.transform = isOpen
        ? "rotate(-45deg) translate(7px,-6px)"
        : "";
    });
  }

  document.addEventListener("click", (e) => {
    if (
      navMenu &&
      hamburger &&
      !navMenu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      navMenu.classList.remove("open");
      hamburger.querySelectorAll("span").forEach((s) => {
        s.style.transform = "";
        s.style.opacity = "1";
      });
    }
  });

  // Active link highlight
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((s) => {
      if (window.scrollY >= s.offsetTop - 150) current = s.id;
    });
    navLinks.forEach((l) => {
      l.classList.toggle("active", l.getAttribute("href") === "#" + current);
    });
  });
}

/* ---------- SMOOTH SCROLL ---------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const target = document.querySelector(a.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
      document.getElementById("navMenu")?.classList.remove("open");
    });
  });

  // Hero CTA "View Projects" button
  document
    .querySelector(".hero-cta .btn-primary")
    ?.addEventListener("click", (e) => {
      e.preventDefault();
      const s = document.getElementById("projects");
      if (s) window.scrollTo({ top: s.offsetTop - 80, behavior: "smooth" });
    });
}

/* ---------- SCROLL REVEAL ---------- */
function initScrollReveal() {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.index
            ? parseInt(entry.target.dataset.index) * 120
            : 0;
          setTimeout(() => entry.target.classList.add("visible"), delay);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
  );

  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
}

/* ---------- PROJECT FILTER ---------- */
function initProjectFilter() {
  const btns = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".project-card");

  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      btns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      cards.forEach((card) => {
        const match = filter === "all" || card.dataset.category === filter;
        card.style.display = match ? "block" : "none";
        if (match) {
          card.style.animation = "none";
          void card.offsetWidth;
          card.style.animation = "fadeUp 0.4s ease forwards";
        }
      });
    });
  });
}

/* ---------- PROJECT CARD MAGNET GLOW ---------- */
function initProjectCardMagnet() {
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--mouse-x", x + "%");
      card.style.setProperty("--mouse-y", y + "%");
    });
  });
}

/* ---------- CONTACT FORM ---------- */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    setTimeout(() => {
      showToast("Message sent! I'll get back to you soon.", "success");
      form.reset();
      btn.disabled = false;
      btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
    }, 1500);
  });
}

function showToast(msg, type = "success") {
  const toast = document.getElementById("toast");
  const msgEl = document.getElementById("toastMsg");
  if (!toast || !msgEl) return;
  msgEl.textContent = msg;
  toast.querySelector("i").className =
    type === "success" ? "fas fa-check-circle" : "fas fa-exclamation-circle";
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3500);
}

/* ---------- SCROLL TO TOP ---------- */
function initScrollTop() {
  document.getElementById("scrollToTop")?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ---------- RESUME DOWNLOAD CHECK ---------- */
const resumeBtn = document.getElementById("resumeDownloadBtn");
if (resumeBtn) {
  resumeBtn.addEventListener("click", (e) => {
    fetch("resume.pdf", { method: "HEAD" })
      .then((r) => {
        if (!r.ok) {
          e.preventDefault();
          showToast(
            "Resume file not found. Add resume.pdf to your folder.",
            "error",
          );
        }
      })
      .catch(() => {
        e.preventDefault();
        showToast("Could not reach resume.pdf — check your folder.", "error");
      });
  });
}

/* ---------- NAV LINK ACTIVE STYLE (CSS helper) ---------- */
const style = document.createElement("style");
style.textContent = `.nav-link.active { color: var(--violet-l) !important; }
.nav-link.active::after { width: 100% !important; }`;
document.head.appendChild(style);
