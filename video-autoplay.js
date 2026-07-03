function playPortfolioVideos() {
  document.querySelectorAll("video").forEach((video) => {
    video.controls = false;
    video.muted = true;
    video.defaultMuted = true;
    video.autoplay = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = "auto";
    video.disablePictureInPicture = true;
    video.removeAttribute("controls");
    video.setAttribute("muted", "");
    video.setAttribute("autoplay", "");
    video.setAttribute("loop", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("preload", "auto");
    video.setAttribute("disablepictureinpicture", "");
    video.setAttribute("controlslist", "nodownload noplaybackrate nofullscreen");
    if (video.readyState < 2) video.load();
    const attempt = video.play();
    if (attempt && typeof attempt.catch === "function") {
      attempt.catch(() => {});
    }
  });
}

window.addEventListener("DOMContentLoaded", playPortfolioVideos);
window.addEventListener("pageshow", playPortfolioVideos);
window.addEventListener("load", playPortfolioVideos);
window.addEventListener("scroll", playPortfolioVideos, { passive: true });
window.setTimeout(playPortfolioVideos, 600);
window.setTimeout(playPortfolioVideos, 1800);
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) playPortfolioVideos();
});
