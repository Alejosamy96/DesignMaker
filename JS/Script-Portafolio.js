(() => {
  const items = document.querySelectorAll(".carrusel-item");
  const prevBtn = document.querySelector(".btn-prev");
  const nextBtn = document.querySelector(".btn-next");

  if (!items.length || !prevBtn || !nextBtn) return; // seguridad

  let current = 0;

  function updateCarrusel() {
    items.forEach((item, index) => {
      item.classList.remove("active", "prev", "next");

      if (index === current) {
        item.classList.add("active");
      } else if (index === (current - 1 + items.length) % items.length) {
        item.classList.add("prev");
      } else if (index === (current + 1) % items.length) {
        item.classList.add("next");
      }
    });
  }

  prevBtn.addEventListener("click", () => {
    current = (current - 1 + items.length) % items.length;
    updateCarrusel();
  });

  nextBtn.addEventListener("click", () => {
    current = (current + 1) % items.length;
    updateCarrusel();
  });

  updateCarrusel();
})();
