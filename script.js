// Smooth scroll + active nav underline based on section in view

(function () {
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));
  const sections = navLinks
    .map(a => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;

    const id = a.getAttribute("href");
    const target = document.querySelector(id);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.pushState(null, "", id);
  });

  const setActive = (id) => {
    navLinks.forEach(l => l.classList.toggle("active", l.getAttribute("href") === id));
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter(en => en.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible?.target?.id) setActive(`#${visible.target.id}`);
    },
    { threshold: [0.2, 0.35, 0.5, 0.65] }
  );

  sections.forEach(sec => observer.observe(sec));

  window.addEventListener("load", () => {
    setActive(location.hash || "#home");
  });
})();
