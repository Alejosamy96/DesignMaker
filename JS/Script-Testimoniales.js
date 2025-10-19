
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".testimoniales .mid");
  const track = container.querySelector(".carrusel");
  const slides = Array.from(track.children);
  const puntos = Array.from(document.querySelectorAll(".testimoniales .bot .punto"));

  if (!container || !track || slides.length === 0) {
    console.error("Carrusel: elementos no encontrados");
    return;
  }

  // índice inicial
  let currentIndex = slides.findIndex(s => s.classList.contains("slide_activo"));
  if (currentIndex === -1) currentIndex = 0;

  // sincroniza clases
  function updateClasses(index) {
    slides.forEach((s, i) => {
      s.classList.toggle("slide_activo", i === index);
    });
    puntos.forEach((p, i) => p.classList.toggle("activo", i === index));
  }

  // calcula y aplica translateX para centrar el slide en el viewport del contenedor
  function centerSlide(index) {
    const slide = slides[index];
    if (!slide) return;

    // actualizamos clases antes (en caso de que anchura cambie cuando se activa)
    updateClasses(index);

    // rectángulos
    const containerRect = container.getBoundingClientRect();
    const slideRect = slide.getBoundingClientRect();

    // slideCenter relativo al track: usamos offsetLeft para obtener la posición del slide dentro del track
    const slideCenterInTrack = slide.offsetLeft + (slide.offsetWidth / 2);

    // container center (en coordenadas de scroll): queremos que slideCenterInTrack coincida con este valor
    const containerCenter = container.clientWidth / 2;

    // nueva translateX: llevar slideCenterInTrack al containerCenter
    const translateX = Math.round(containerCenter - slideCenterInTrack);

    // aplicar transform
    track.style.transform = `translateX(${translateX}px)`;

    currentIndex = index;
  }

  // listeners: click en slides y puntos
  slides.forEach((s, i) => s.addEventListener("click", () => centerSlide(i)));
  puntos.forEach((p, i) => p.addEventListener("click", () => centerSlide(i)));

  // recalcula al redimensionar (debounce simple)
  let rt;
  window.addEventListener("resize", () => {
    clearTimeout(rt);
    rt = setTimeout(() => centerSlide(currentIndex), 120);
  });

  // esperar carga de imágenes antes de centrar la primera vez
  const imgs = Array.from(track.querySelectorAll("img"));
  const promises = imgs.map(img => img.complete ? Promise.resolve() : new Promise(res => { img.addEventListener('load', res); img.addEventListener('error', res); }));

  Promise.all(promises).then(() => {
    // forzamos estado inicial y centramos
    updateClasses(currentIndex);
    // pequeño delay para que el layout esté 100% estable
    setTimeout(() => centerSlide(currentIndex), 30);
  });
});
