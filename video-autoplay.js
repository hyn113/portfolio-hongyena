(() => {
  function play(video) {
    if (document.hidden || !video.paused) return;
    const attempt = video.play();
    if (attempt && typeof attempt.catch === 'function') attempt.catch(() => {});
  }

  function setup() {
    const videos = [...document.querySelectorAll('video')];
    videos.forEach((video) => {
      video.controls = false;
      video.muted = true;
      video.defaultMuted = true;
      video.autoplay = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = 'auto';
      video.disablePictureInPicture = true;
      video.removeAttribute('controls');
      for (const name of ['muted', 'autoplay', 'loop', 'playsinline', 'disablepictureinpicture']) {
        video.setAttribute(name, '');
      }
      video.setAttribute('controlslist', 'nodownload noplaybackrate nofullscreen');
      // Never call load() on scroll: it cancels buffering and pending playback.
      video.addEventListener('loadeddata', () => play(video));
      video.addEventListener('canplay', () => play(video));
      play(video);
    });

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (isIntersecting) play(target);
        });
      }, { rootMargin: '150px' });
      videos.forEach((video) => observer.observe(video));
    }
    const resume = () => videos.forEach(play);
    window.addEventListener('pageshow', resume);
    document.addEventListener('visibilitychange', resume);
    document.addEventListener('pointerdown', resume, { passive: true });
    window.addEventListener('scroll', resume, { passive: true });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup, { once: true });
  } else setup();
})();
