document.addEventListener("DOMContentLoaded", () => {
  const videosContainer = document.getElementById('videos');
  const slides = document.querySelectorAll('.video-slide');
  const indicators = document.querySelectorAll('#indicadores span');
  const nextBtn = document.getElementById('next');
  const prevBtn = document.getElementById('prev');
  const videos = document.querySelectorAll('video');

  let currentIndex = 0;
  let autoPlay = true;
  let timer;

  function updateCarousel() {
    videosContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    indicators.forEach((dot, i) => {
      dot.classList.toggle('activo', i === currentIndex);
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  }

  function startAutoPlay() {
    timer = setInterval(() => {
      if (autoPlay) nextSlide();
    }, 20000); // 20 segundos
  }

  function stopAutoPlay() {
    clearInterval(timer);
  }

  // Controles manuales
  nextBtn.addEventListener('click', () => {
    nextSlide();
    stopAutoPlay();
    startAutoPlay();
  });

  prevBtn.addEventListener('click', () => {
    prevSlide();
    stopAutoPlay();
    startAutoPlay();
  });

  indicators.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      currentIndex = i;
      updateCarousel();
      stopAutoPlay();
      startAutoPlay();
    });
  });

  // Pausar autoplay si el video está en reproducción
  videos.forEach(video => {
    video.addEventListener('play', () => {
      autoPlay = false;
      stopAutoPlay();
    });
    video.addEventListener('pause', () => {
      autoPlay = true;
      startAutoPlay();
    });
    video.addEventListener('ended', () => {
      autoPlay = true;
      startAutoPlay();
    });
  });

  updateCarousel();
  startAutoPlay();
});
