document.querySelectorAll(".case-frame[data-project-title]").forEach((page) => {
  const dialog = document.createElement("dialog");
  const content = document.createElement("div");
  const closeButton = document.createElement("button");
  const bottom = document.createElement("div");
  const heading = document.createElement("div");
  const title = document.createElement("h2");
  const details = document.createElement("div");
  const subtitle = document.createElement("h3");
  const description = document.createElement("div");
  const meta = document.createElement("div");
  const team = document.createElement("p");
  const duration = page.dataset.projectDuration ? document.createElement("span") : null;
  const websiteLink = page.dataset.projectLinkUrl
    ? document.createElement("a")
    : null;
  const sourceSwitcher = page.parentElement.querySelector(":scope > .project-switcher");
  const overlaySwitcher = sourceSwitcher?.cloneNode(true) || null;

  dialog.className = "project-info-dialog";
  dialog.setAttribute("aria-label", `${page.dataset.projectTitle} project information`);
  if (overlaySwitcher) overlaySwitcher.classList.add("project-info-switcher");

  content.className = "project-info-content";
  closeButton.className = "project-info-close";
  closeButton.type = "button";
  closeButton.setAttribute("aria-label", "Close project details");
  closeButton.textContent = "닫기 ×";

  bottom.className = "project-info-bottom";
  heading.className = "project-info-heading";
  title.className = "project-info-title";
  details.className = "project-info-details";
  subtitle.className = "project-info-subtitle";
  description.className = "project-info-description";
  meta.className = "project-info-meta";
  team.className = "project-info-team";

  title.textContent = page.dataset.projectTitle;
  team.classList.add("project-info-meta-item");
  const teamValue = document.createElement("span");
  teamValue.className = "project-info-meta-value";
  teamValue.textContent = page.dataset.projectTeam || "";
  team.append(teamValue);
  if (duration) {
    duration.className = "project-info-duration project-info-meta-value";
    const durationValue = document.createElement("span");
    durationValue.className = "project-info-meta-value";
    durationValue.textContent = page.dataset.projectDuration;
    duration.append(durationValue);
    team.append(" · ", duration);
  }
  subtitle.textContent = page.dataset.projectSubtitle;
  page.dataset.projectDescription
    .split(/\r?\n\s*\r?\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .forEach((paragraphText) => {
      const paragraph = document.createElement("p");
      paragraph.textContent = paragraphText;
      description.append(paragraph);
    });

  if (websiteLink) {
    websiteLink.className = "project-info-link";
    websiteLink.href = page.dataset.projectLinkUrl;
    websiteLink.target = "_blank";
    websiteLink.rel = "noopener noreferrer";
    websiteLink.textContent = page.dataset.projectLinkLabel || page.dataset.projectLinkUrl;
  }

  heading.append(title, subtitle);
  details.append(description);
  if (websiteLink) meta.append(websiteLink);
  meta.append(team);
  bottom.append(heading);
  bottom.append(meta, details);
  content.append(bottom);
  dialog.append(closeButton, content);
  if (overlaySwitcher) dialog.append(overlaySwitcher);
  document.body.append(dialog);

  const openDialog = () => {
    if (!dialog.open) dialog.showModal();
  };

  let hintTimer = null;
  let lastPointer = { x: 0, y: 0 };
  const hint = document.createElement("span");
  hint.className = "project-info-hint";
  hint.textContent = "클릭해 정보 보기";
  hint.setAttribute("aria-hidden", "true");
  document.body.append(hint);

  const hideHint = () => {
    window.clearTimeout(hintTimer);
    hint.classList.remove("is-visible");
  };

  const showHint = () => {
    const left = Math.min(lastPointer.x + 18, window.innerWidth - hint.offsetWidth - 12);
    const top = Math.min(lastPointer.y + 18, window.innerHeight - hint.offsetHeight - 12);
    hint.style.left = `${Math.max(12, left)}px`;
    hint.style.top = `${Math.max(12, top)}px`;
    hint.classList.add("is-visible");
  };

  page.addEventListener("pointermove", (event) => {
    if (event.pointerType !== "mouse") return;
    lastPointer = { x: event.clientX, y: event.clientY };
    hideHint();
    hintTimer = window.setTimeout(showHint, 400);
  });
  page.addEventListener("pointerleave", hideHint);
  page.addEventListener("click", hideHint);
  page.addEventListener("keydown", hideHint);
  window.addEventListener("scroll", hideHint, { passive: true });

  page.addEventListener("click", openDialog);
  page.addEventListener("keydown", (event) => {
    if (event.repeat || (event.key !== "Enter" && event.key !== " ")) return;
    event.preventDefault();
    openDialog();
  });

  closeButton.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    const clickedText = event.target.closest?.(
      ".project-info-title, .project-info-subtitle, .project-info-description, .project-info-link, .project-info-team, .project-info-close, .project-info-switcher",
    );
    if (!clickedText) dialog.close();
  });
});
