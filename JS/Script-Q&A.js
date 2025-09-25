document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".conjunto-container");

  items.forEach((item) => {
    const preguntaContainer = item.querySelector(".pregunta-container");
    const respuestaContainer = item.querySelector(".respuesta-container");
    const respuesta = item.querySelector(".respuesta");

    preguntaContainer.addEventListener("click", () => {
      items.forEach((i) => {
        if (i !== item) {
          i.classList.remove("activo");
          const r = i.querySelector(".respuesta-container");
          if (r) r.style.maxHeight = null;
        }
      });
      if (item.classList.contains("activo")) {
        item.classList.remove("activo");
        respuestaContainer.style.maxHeight = null;
      } else {
        item.classList.add("activo");
        respuestaContainer.style.maxHeight = respuesta.scrollHeight + "px";
      }
    });
  });
  window.addEventListener("resize", () => {
    items.forEach((item) => {
      if (item.classList.contains("activo")) {
        const respuesta = item.querySelector(".respuesta");
        const respuestaContainer = item.querySelector(".respuesta-container");
        if (respuesta && respuestaContainer) {
          respuestaContainer.style.maxHeight = respuesta.scrollHeight + "px";
        }
      }
    });
  });
});
