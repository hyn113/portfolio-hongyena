(() => {
  const targets = document.querySelectorAll(
    ".home-project, .resume-section-text, .case-frame"
  );

  if (
    targets.length === 0 ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    !("IntersectionObserver" in window)
  ) {
    return;
  }

  document.documentElement.classList.add("reveal-ready");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.01,
      rootMargin: "0px 0px -32px 0px",
    }
  );

  targets.forEach((target) => {
    target.classList.add("reveal-item");
    observer.observe(target);
  });
})();
