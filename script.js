document.addEventListener("DOMContentLoaded", () => {
  /* ---------- DOM refs ---------- */
  const header = document.getElementById("header");
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const currentYear = document.getElementById("currentYear");
  const navLinks = document.querySelectorAll(".header__link");
  const sections = document.querySelectorAll(".section, .hero");
  const animatedEls = document.querySelectorAll("[data-animate]");

  if (currentYear) {
    currentYear.textContent = String(new Date().getFullYear());
  }

  /* ---------- Mobile menu toggle ---------- */
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("active");
      navMenu.classList.toggle("open");
      document.body.style.overflow = navMenu.classList.contains("open")
        ? "hidden"
        : "";
    });
  }

  // Close menu when a link is clicked
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navToggle && navMenu) {
        navToggle.classList.remove("active");
        navMenu.classList.remove("open");
      }
      document.body.style.overflow = "";
    });
  });

  /* ---------- Header shadow on scroll ---------- */
  const onScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add("header--scrolled");
    } else {
      header.classList.remove("header--scrolled");
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Active nav link on scroll ---------- */
  const updateActiveLink = () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", updateActiveLink, { passive: true });
  updateActiveLink();

  /* ---------- Scroll-reveal animations ---------- */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target); // animate only once
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  animatedEls.forEach((el) => revealObserver.observe(el));

  /* ---------- Stagger animation for card grids ---------- */
  document.querySelectorAll(".card-grid, .tips-grid").forEach((grid) => {
    const children = grid.children;
    Array.from(children).forEach((child, i) => {
      child.style.transitionDelay = `${i * 0.1}s`;
    });
  });
});
