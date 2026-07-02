(() => {
  const scriptBase = document.currentScript?.src || document.baseURI;
  const activeIcon = new URL("./assets/favicon-active.png", scriptBase).href;
  const idleIcon = new URL("./assets/favicon-idle.png", scriptBase).href;
  const defaultTitle = document.title;
  const idleTitles = ["Click me!", "Please look at me"];
  let idleIndex = 0;

  const setIcon = (href) => {
    let icon = document.querySelector('link[rel="icon"]');
    if (!icon) {
      icon = document.createElement("link");
      icon.rel = "icon";
      document.head.appendChild(icon);
    }
    icon.type = "image/png";
    icon.href = href;
  };

  const updateTabState = () => {
    if (document.hidden) {
      setIcon(idleIcon);
      document.title = idleTitles[idleIndex % idleTitles.length];
      idleIndex += 1;
      return;
    }
    setIcon(activeIcon);
    document.title = defaultTitle;
  };

  document.addEventListener("visibilitychange", updateTabState);
  window.addEventListener("focus", updateTabState);
  window.addEventListener("blur", updateTabState);
  updateTabState();
})();
