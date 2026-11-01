// Set current year
const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

// Accessible Mobile Navigation
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");

if (navToggle && navMenu) {
  function setNavState(isOpen) {
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navMenu.classList.toggle("is-active", isOpen);
    navToggle.classList.toggle("is-active", isOpen);
    document.body.classList.toggle("nav-open", isOpen);
  }

  navToggle.addEventListener("click", () => {
    const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
    setNavState(!isExpanded);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu.classList.contains("is-active")) {
        setNavState(false);
      }
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navMenu.classList.contains("is-active")) {
      setNavState(false);
      navToggle.focus();
    }
  });

  document.addEventListener("click", (e) => {
    if (
      navMenu.classList.contains("is-active") &&
      !navMenu.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      setNavState(false);
    }
  });
}

// Scroll Reveal Animations
const revealTargets = document.querySelectorAll(
  ".section-heading, .work-card, .process-card, .about-inner > *, .faq-item, .contact-content, .contact-media, .service-item"
);

function revealElement(el) {
  el.classList.add("is-visible");
}

revealTargets.forEach((target) => target.classList.add("reveal"));

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          revealElement(entry.target);
          currentObserver.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: "0px 0px 60px 0px",
      threshold: 0.02,
    }
  );

  revealTargets.forEach((target) => observer.observe(target));

  // Check elements already in or near viewport on load
  const checkInitialVisibility = () => {
    const vh = window.innerHeight || document.documentElement.clientHeight;
    revealTargets.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= vh + 50) {
        revealElement(el);
      }
    });
  };

  requestAnimationFrame(checkInitialVisibility);
  window.addEventListener("load", checkInitialVisibility);

  // Safety fallback after 1.2s to guarantee no content remains hidden
  setTimeout(() => {
    revealTargets.forEach((el) => revealElement(el));
  }, 1200);
} else {
  revealTargets.forEach((target) => revealElement(target));
}
