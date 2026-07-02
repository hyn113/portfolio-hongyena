function playPortfolioVideos() {
  document.querySelectorAll("video").forEach((video) => {
    video.muted = true;
    video.defaultMuted = true;
    video.autoplay = true;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("autoplay", "");
    video.setAttribute("loop", "");
    video.setAttribute("playsinline", "");
    const attempt = video.play();
    if (attempt && typeof attempt.catch === "function") {
      attempt.catch(() => {});
    }
  });
}

window.addEventListener("DOMContentLoaded", playPortfolioVideos);
window.addEventListener("pageshow", playPortfolioVideos);
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) playPortfolioVideos();
});
