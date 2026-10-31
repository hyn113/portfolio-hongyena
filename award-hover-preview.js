(() => {
  const preview = document.createElement("div");
  preview.className = "award-hover-preview";
  preview.setAttribute("aria-hidden", "true");
  const image = document.createElement("img");
  preview.append(image);
  document.body.append(preview);

  let activeTarget = null;
  let pointerX = 0;
  let pointerY = 0;

  function positionPreview() {
    const bounds = preview.getBoundingClientRect();
    const offset = 22;
    const x = pointerX > window.innerWidth / 2 ? pointerX - offset - bounds.width / 2 : pointerX + offset + bounds.width / 2;
    const y = Math.min(window.innerHeight - bounds.height / 2 - 12, Math.max(bounds.height / 2 + 12, pointerY + 12));
    preview.style.left = `${Math.min(window.innerWidth - bounds.width / 2 - 12, Math.max(bounds.width / 2 + 12, x))}px`;
    preview.style.top = `${y}px`;
    preview.style.setProperty("--preview-rotation", `${pointerX > window.innerWidth / 2 ? 3 : -3}deg`);
  }

  document.addEventListener("pointerover", (event) => {
    if (event.pointerType === "touch") return;
    const target = event.target instanceof Element ? event.target.closest("[data-hover-preview]") : null;
    if (!target || target === activeTarget || (event.relatedTarget instanceof Node && target.contains(event.relatedTarget))) return;

    activeTarget = target;
    pointerX = event.clientX;
    pointerY = event.clientY;
    image.src = target.dataset.hoverPreview;
    image.alt = target.dataset.hoverPreviewAlt || "Project preview";
    positionPreview();
    preview.classList.add("is-visible");
  });

  document.addEventListener("pointermove", (event) => {
    if (!activeTarget) return;
    pointerX = event.clientX;
    pointerY = event.clientY;
    positionPreview();
  });

  document.addEventListener("pointerout", (event) => {
    if (!activeTarget || !(event.target instanceof Element)) return;
    const target = event.target.closest("[data-hover-preview]");
    if (target !== activeTarget || (event.relatedTarget instanceof Node && activeTarget.contains(event.relatedTarget))) return;
    activeTarget = null;
    preview.classList.remove("is-visible");
  });
})();
