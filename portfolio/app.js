/* ============================================
   M TARINI PRASAD — PORTFOLIO SCRIPTS
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
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

/* ============================================
   THEME (dark / light)
   ============================================ */
function initTheme() {
  const saved = localStorage.getItem("theme") || "dark";
  applyTheme(saved);

  document.getElementById("themeToggle")?.addEventListener("click", () => {
    const next =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem("theme", next);
  });
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const btn = document.getElementById("themeToggle");
  if (!btn) return;
  // swap icon
  btn.querySelector(".icon-sun").style.display =
    theme === "dark" ? "none" : "block";
  btn.querySelector(".icon-moon").style.display =
    theme === "light" ? "none" : "block";
  btn.setAttribute(
    "title",
    theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
  );
}

/* ============================================
   LOADER
   ============================================ */
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
  let pct = 0,
    step = 0;

  const iv = setInterval(() => {
    pct += Math.random() * 25 + 10;
    if (pct >= 100) pct = 100;
    progress.style.width = pct + "%";
    text.textContent = steps[Math.min(step++, steps.length - 1)];
    if (pct >= 100) {
      clearInterval(iv);
      setTimeout(() => loader.classList.add("hidden"), 400);
    }
  }, 300);
}

/* ============================================
   CUSTOM CURSOR
   ============================================ */
function initCursor() {
  const cursor = document.getElementById("cursor");
  const follower = document.getElementById("cursorFollower");
  if (!cursor || !follower) return;

  let mx = 0,
    my = 0,
    fx = 0,
    fy = 0;

  document.addEventListener("mouseleave", () => {
    cursor.style.opacity = "0";
    follower.style.opacity = "0";
  });
  document.addEventListener("mouseenter", () => {
    cursor.style.opacity = "1";
    follower.style.opacity = "0.6";
  });
  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + "px";
    cursor.style.top = my + "px";
  });

  (function animateFollower() {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * 0.12;
    follower.style.left = fx + "px";
    follower.style.top = fy + "px";
    requestAnimationFrame(animateFollower);
  })();

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

/* ============================================
   HERO CANVAS — NEURAL NETWORK
   ============================================ */
function initHeroCanvas() {
  const canvas = document.getElementById("heroCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let W, H;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const NODE_COUNT = 70;
  const CONNECT_DIST = 160;

  // Read node colour from CSS variable so it adapts to theme
  function nodeColor(alpha) {
    const theme = document.documentElement.dataset.theme;
    return theme === "light"
      ? `rgba(109,40,217,${alpha})` // deeper violet for light bg
      : `rgba(139,92,246,${alpha})`;
  }
  function edgeColor2(alpha) {
    const theme = document.documentElement.dataset.theme;
    return theme === "light"
      ? `rgba(6,182,212,${alpha * 0.6})`
      : `rgba(34,211,238,${alpha * 0.6})`;
  }

  class Node {
    constructor() {
      this.respawn();
    }
    respawn() {
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
      ctx.fillStyle = nodeColor(0.7);
      ctx.fill();
    }
  }

  const nodes = Array.from({ length: NODE_COUNT }, () => new Node());

  (function drawFrame() {
    ctx.clearRect(0, 0, W, H);
    nodes.forEach((n) => {
      n.update();
      n.draw();
    });

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.hypot(dx, dy);
        if (dist < CONNECT_DIST) {
          const alpha = (1 - dist / CONNECT_DIST) * 0.35;
          const grad = ctx.createLinearGradient(
            nodes[i].x,
            nodes[i].y,
            nodes[j].x,
            nodes[j].y,
          );
          grad.addColorStop(0, nodeColor(alpha));
          grad.addColorStop(1, edgeColor2(alpha));
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(drawFrame);
  })();
}

/* ============================================
   TYPEWRITER
   ============================================ */
function initTypewriter() {
  const el = document.getElementById("heroName");
  if (!el) return;
  const text = "M Tarini Prasad";
  let i = 0;
  function type() {
    if (i <= text.length) {
      el.textContent = text.slice(0, i++);
      setTimeout(type, 80);
    }
  }
  setTimeout(type, 1500);
}

/* ============================================
   ROLE CYCLE
   ============================================ */
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

  setInterval(() => {
    el.style.cssText +=
      "opacity:0;transform:translateY(-10px);transition:opacity .3s,transform .3s";
    setTimeout(() => {
      idx = (idx + 1) % roles.length;
      el.textContent = roles[idx];
      el.style.cssText += "opacity:1;transform:translateY(0)";
    }, 300);
  }, 2500);
}

/* ============================================
   NAVBAR
   ============================================ */
function initNavbar() {
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");
  const scrollBtn = document.getElementById("scrollToTop");

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 60);
    scrollBtn?.classList.toggle("show", window.scrollY > 500);

    // Active nav link
    let current = "";
    document.querySelectorAll("section[id]").forEach((s) => {
      if (window.scrollY >= s.offsetTop - 150) current = s.id;
    });
    document
      .querySelectorAll(".nav-link")
      .forEach((l) =>
        l.classList.toggle("active", l.getAttribute("href") === "#" + current),
      );
  });

  hamburger?.addEventListener("click", () => {
    const open = navMenu.classList.toggle("open");
    const spans = hamburger.querySelectorAll("span");
    spans[0].style.transform = open ? "rotate(45deg) translate(5px,5px)" : "";
    spans[1].style.opacity = open ? "0" : "1";
    spans[2].style.transform = open ? "rotate(-45deg) translate(7px,-6px)" : "";
  });

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
}

/* ============================================
   SMOOTH SCROLL
   ============================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const target = document.querySelector(a.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 80,
        behavior: "smooth",
      });
      document.getElementById("navMenu")?.classList.remove("open");
    });
  });
}

/* ============================================
   SCROLL REVEAL
   ============================================ */
function initScrollReveal() {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const delay = entry.target.dataset.index
          ? +entry.target.dataset.index * 120
          : 0;
        setTimeout(() => entry.target.classList.add("visible"), delay);
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
  );

  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
}

/* ============================================
   PROJECT FILTER
   ============================================ */
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

/* ============================================
   PROJECT CARD MOUSE-GLOW
   ============================================ */
function initProjectCardMagnet() {
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty(
        "--mouse-x",
        ((e.clientX - r.left) / r.width) * 100 + "%",
      );
      card.style.setProperty(
        "--mouse-y",
        ((e.clientY - r.top) / r.height) * 100 + "%",
      );
    });
  });
}

/* ============================================
   CONTACT FORM — EmailJS
   Keys are loaded from config.js (gitignored).
   Commit config.example.js instead.
   ============================================ */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  // Load EmailJS SDK
  if (!window.emailjs) {
    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    s.onload = () => {
      const cfg = window.EMAILJS_CONFIG || {};
      if (cfg.publicKey) emailjs.init({ publicKey: cfg.publicKey });
    };
    document.head.appendChild(s);
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const cfg = window.EMAILJS_CONFIG || {};

    if (!cfg.publicKey || cfg.publicKey === "YOUR_PUBLIC_KEY") {
      showToast("Contact form not configured — see config.js", "error");
      return;
    }

    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    try {
      await emailjs.send(cfg.serviceId, cfg.templateId, {
        from_name: form.querySelector('[name="name"]').value.trim(),
        from_email: form.querySelector('[name="email"]').value.trim(),
        subject: form.querySelector('[name="subject"]').value.trim(),
        message: form.querySelector('[name="message"]').value.trim(),
      });
      showToast("Message sent! I'll get back to you soon.", "success");
      form.reset();
    } catch (err) {
      console.error("EmailJS error:", err);
      showToast("Failed to send. Email me at mtarini5612@gmail.com", "error");
    } finally {
      btn.disabled = false;
      btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
    }
  });
}

/* ============================================
   TOAST
   ============================================ */
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

/* ============================================
   SCROLL TO TOP
   ============================================ */
function initScrollTop() {
  document
    .getElementById("scrollToTop")
    ?.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" }),
    );
}

/* ============================================
   RESUME DOWNLOAD CHECK
   ============================================ */
document.getElementById("resumeDownloadBtn")?.addEventListener("click", (e) => {
  fetch("resume.pdf", { method: "HEAD" })
    .then((r) => {
      if (!r.ok) {
        e.preventDefault();
        showToast("resume.pdf not found in your folder.", "error");
      }
    })
    .catch(() => {
      e.preventDefault();
      showToast("Could not reach resume.pdf", "error");
    });
});

/* ============================================
   NAV ACTIVE STYLE HELPER
   ============================================ */
const _s = document.createElement("style");
_s.textContent = `.nav-link.active{color:var(--violet-l)!important}.nav-link.active::after{width:100%!important}`;
document.head.appendChild(_s);
