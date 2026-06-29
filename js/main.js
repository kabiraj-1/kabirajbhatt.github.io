/*=========================================================
  KABIRAJ BHATT PORTFOLIO — main.js
  Version 2.0 · Modern & Aesthetic
=========================================================*/

"use strict";

/*=========================================================
  DOM REFS
=========================================================*/

const body = document.body;
const header = document.querySelector(".header");
const menuBtn = document.querySelector(".menu-btn");
const navbar = document.querySelector(".navbar");
const themeToggle = document.getElementById("theme-toggle");
const backToTop = document.getElementById("backToTop");
const navLinks = document.querySelectorAll(".navbar a");
const sections = document.querySelectorAll("section");
const contactForm = document.querySelector(".contact-form");
const yearElement = document.getElementById("year");

/*=========================================================
  MOBILE MENU
=========================================================*/

if (menuBtn && navbar) {
  const menuIcon = menuBtn.querySelector("i") || menuBtn;

  menuBtn.addEventListener("click", () => {
    navbar.classList.toggle("active");
    const isOpen = navbar.classList.contains("active");
    menuIcon.textContent = isOpen ? "✕" : "☰";
    menuIcon.className = isOpen ? "fas fa-times" : "fas fa-bars";
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navbar.classList.remove("active");
      menuIcon.textContent = "☰";
      menuIcon.className = "fas fa-bars";
    });
  });
}

/*=========================================================
  DARK MODE — with system preference fallback
=========================================================*/

const storedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
  body.classList.add("dark-mode");
}

// update toggle icon on load
if (themeToggle) {
  const isDark = body.classList.contains("dark-mode");
  themeToggle.innerHTML = isDark
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    const dark = body.classList.contains("dark-mode");
    themeToggle.innerHTML = dark
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
    localStorage.setItem("theme", dark ? "dark" : "light");
  });
}

/*=========================================================
  STICKY HEADER — enhanced shadow
=========================================================*/

let lastScroll = 0;
window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > 80) {
    header.style.boxShadow = "0 8px 30px rgba(0, 0, 0, 0.08)";
    header.style.borderBottom = "1px solid rgba(0,0,0,0.04)";
  } else {
    header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.02)";
    header.style.borderBottom = "1px solid transparent";
  }

  lastScroll = currentScroll;
});

/*=========================================================
  BACK TO TOP — with progress ring (visual)
=========================================================*/

if (backToTop) {
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

    // show/hide
    if (scrollY > 400) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }

    // optional: ring progress via conic-gradient
    backToTop.style.background = `conic-gradient(#1e3a6f ${progress}%, #e2e8f0 ${progress}%)`;
    backToTop.style.setProperty("--progress", progress + "%");
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/*=========================================================
  SMOOTH SCROLL — with offset for fixed header
=========================================================*/

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;
    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();

    const headerHeight = header ? header.offsetHeight : 80;
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });

    // update URL hash without jumping
    history.pushState(null, null, targetId);
  });
});

/*=========================================================
  ACTIVE NAVIGATION — with highlight
=========================================================*/

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

/*=========================================================
  SCROLL REVEAL — with staggered delay
=========================================================*/

const revealElements = document.querySelectorAll(
  ".hero, .about, .skills, .projects, .services, .contact, .footer, " +
  ".project-card, .skill-card, .service-card, .about-info div"
);

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;
  const revealThreshold = 0.88;

  revealElements.forEach((el, index) => {
    const rect = el.getBoundingClientRect();
    const isVisible = rect.top < windowHeight * revealThreshold;

    if (isVisible) {
      // add staggered delay for cards
      const delay = el.classList.contains("project-card") ||
                    el.classList.contains("skill-card") ||
                    el.classList.contains("service-card") ||
                    el.classList.contains("about-info")
        ? Math.min(index * 60, 400)
        : 0;

      setTimeout(() => {
        el.classList.add("fade-up");
      }, delay);
    }
  });
};

// use Intersection Observer for better performance
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-up");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -30px 0px" }
  );

  revealElements.forEach((el) => observer.observe(el));
} else {
  // fallback
  window.addEventListener("scroll", revealOnScroll);
  window.addEventListener("load", revealOnScroll);
}

/*=========================================================
  CONTACT FORM — enhanced validation with feedback
=========================================================*/

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const inputs = contactForm.querySelectorAll("input[required], textarea[required]");
    let isValid = true;

    inputs.forEach((input) => {
      const value = input.value.trim();
      if (value === "") {
        input.style.borderColor = "#ef4444";
        input.style.boxShadow = "0 0 0 4px rgba(239, 68, 68, 0.15)";
        isValid = false;
      } else {
        input.style.borderColor = "";
        input.style.boxShadow = "";
      }
    });

    // email validation
    const emailInput = contactForm.querySelector('input[type="email"]');
    if (emailInput && emailInput.value.trim() !== "") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value.trim())) {
        emailInput.style.borderColor = "#ef4444";
        emailInput.style.boxShadow = "0 0 0 4px rgba(239, 68, 68, 0.15)";
        isValid = false;
      }
    }

    if (!isValid) {
      // show a subtle shake
      contactForm.style.animation = "shake 0.4s ease";
      setTimeout(() => {
        contactForm.style.animation = "";
      }, 500);
      return;
    }

    // success feedback
    const btn = contactForm.querySelector(".btn");
    const originalText = btn.textContent;
    btn.textContent = "✓ Sent!";
    btn.style.background = "#22c55e";
    btn.style.boxShadow = "0 8px 20px rgba(34, 197, 94, 0.3)";

    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = "";
      btn.style.boxShadow = "";
      contactForm.reset();
      // clear any error styles
      contactForm.querySelectorAll("input, textarea").forEach((el) => {
        el.style.borderColor = "";
        el.style.boxShadow = "";
      });
    }, 2000);
  });

  // clear error state on focus
  contactForm.querySelectorAll("input, textarea").forEach((el) => {
    el.addEventListener("focus", () => {
      el.style.borderColor = "";
      el.style.boxShadow = "";
    });
  });
}

/*=========================================================
  KEYBOARD ACCESSIBILITY
=========================================================*/

document.addEventListener("keydown", (e) => {
  // ESC closes mobile menu
  if (e.key === "Escape" && navbar && navbar.classList.contains("active")) {
    navbar.classList.remove("active");
    const icon = menuBtn?.querySelector("i");
    if (icon) {
      icon.className = "fas fa-bars";
      icon.textContent = "☰";
    }
  }
});

/*=========================================================
  COPYRIGHT YEAR
=========================================================*/

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

/*=========================================================
  PREVENT IMAGE DRAG & LAZY LOAD
=========================================================*/

document.querySelectorAll("img").forEach((img) => {
  img.setAttribute("draggable", "false");
  if (!img.hasAttribute("loading")) {
    img.setAttribute("loading", "lazy");
  }
});

/*=========================================================
  ADD SHAKE ANIMATION (if not already in CSS)
=========================================================*/

if (!document.querySelector("#shake-style")) {
  const style = document.createElement("style");
  style.id = "shake-style";
  style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-8px); }
      40% { transform: translateX(8px); }
      60% { transform: translateX(-6px); }
      80% { transform: translateX(6px); }
    }
  `;
  document.head.appendChild(style);
}

/*=========================================================
  CONSOLE BRANDING
=========================================================*/

console.log(
  "%c ✦ Kabiraj Bhatt Portfolio ✦ ",
  "background:#1e3a6f; color:#fff; font-size:16px; font-weight:bold; padding:8px 16px; border-radius:6px;"
);
console.log(
  "%c Built with ❤️ using HTML, CSS & JavaScript ",
  "color:#4a5b6e; font-size:13px;"
);

/*=========================================================
  PERFORMANCE — mark load complete
=========================================================*/

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
  // trigger any final reveal
  if (!("IntersectionObserver" in window)) {
    revealOnScroll();
  }
});

/*=========================================================
  END OF FILE
=========================================================*/
