(() => {
  const selector = [
    ".home-brand",
    ".site-header .brand",
    ".home-nav a",
  ].join(",");
  const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
  const koreanGlyphs = Array.from("가나다라마바사아자차카타파하거너더러머버서어저처커터퍼허고노도로모보소오조초코토포호");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const activeFrames = new WeakMap();
  const restoreLayout = new WeakMap();

  function randomGlyph(character) {
    if (/[\uac00-\ud7a3]/.test(character)) {
      return koreanGlyphs[Math.floor(Math.random() * koreanGlyphs.length)];
    }
    return glyphs[Math.floor(Math.random() * glyphs.length)];
  }

  function reveal(element) {
    if (reducedMotion.matches) return;

    const original = element.dataset.cipherOriginal ?? element.textContent;
    element.dataset.cipherOriginal = original;
    const characters = Array.from(original);
    const duration = 1000;
    const start = performance.now();
    const previousFrame = activeFrames.get(element);
    if (previousFrame) cancelAnimationFrame(previousFrame);
    restoreLayout.get(element)?.();

    const previousStyles = {
      width: element.style.width,
      overflow: element.style.overflow,
      whiteSpace: element.style.whiteSpace,
      flexShrink: element.style.flexShrink,
    };
    const measuredWidth = element.getBoundingClientRect().width;
    element.style.width = `${measuredWidth}px`;
    element.style.overflow = "hidden";
    element.style.whiteSpace = "nowrap";
    element.style.flexShrink = "0";
    restoreLayout.set(element, () => {
      element.style.width = previousStyles.width;
      element.style.overflow = previousStyles.overflow;
      element.style.whiteSpace = previousStyles.whiteSpace;
      element.style.flexShrink = previousStyles.flexShrink;
    });

    const animate = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const resolvedCount = Math.floor(progress * characters.length);
      element.textContent = characters.map((character, index) => {
        if (/\s/.test(character) || /[^\p{L}\p{N}]/u.test(character) || index < resolvedCount) {
          return character;
        }
        return randomGlyph(character);
      }).join("");

      if (progress < 1) {
        activeFrames.set(element, requestAnimationFrame(animate));
      } else {
        element.textContent = original;
        activeFrames.delete(element);
        restoreLayout.get(element)?.();
        restoreLayout.delete(element);
      }
    };

    activeFrames.set(element, requestAnimationFrame(animate));
  }

  function matchingElement(target) {
    return target instanceof Element ? target.closest(selector) : null;
  }

  document.addEventListener("pointerover", (event) => {
    const element = matchingElement(event.target);
    if (!element || (event.relatedTarget instanceof Node && element.contains(event.relatedTarget))) return;
    reveal(element);
  });

  document.addEventListener("focusin", (event) => {
    const element = matchingElement(event.target);
    if (element) reveal(element);
  });

  const homeSidebarText = document.querySelectorAll(".home-sidebar .home-brand, .home-sidebar .home-nav a");
  homeSidebarText.forEach(reveal);
})();
