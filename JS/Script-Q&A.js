document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".conjunto-container");
  const QYAcontainer = document.querySelector(".QYA .QYA-container");

  // Función para obtener el margen correcto según el tamaño de pantalla
  function getMargenes() {
    if (window.innerWidth <= 800) {
      return {
        cerrado: "-140px",   // el que pusiste en CSS responsive
        abierto: "-140px"    // un poco menos para evitar cortes
      };
    } else {
      return {
        cerrado: "-260px",   // valor de escritorio
        abierto: "-210px"
      };
    }
  }

  function actualizarMargen(algunoActivo) {
    const margenes = getMargenes();
    QYAcontainer.style.marginBottom = algunoActivo
      ? margenes.abierto
      : margenes.cerrado;
  }

  items.forEach((item) => {
    const preguntaContainer = item.querySelector(".pregunta-container");
    const respuestaContainer = item.querySelector(".respuesta-container");
    const respuesta = item.querySelector(".respuesta");

    preguntaContainer.addEventListener("click", () => {
      let algunoActivo = false;

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
        algunoActivo = true;
      }

      actualizarMargen(algunoActivo);
    });
  });

  // Ajuste automático al cambiar tamaño de pantalla
  window.addEventListener("resize", () => {
    let algunoActivo = false;

    items.forEach((item) => {
      if (item.classList.contains("activo")) {
        algunoActivo = true;
        const respuesta = item.querySelector(".respuesta");
        const respuestaContainer = item.querySelector(".respuesta-container");
        respuestaContainer.style.maxHeight = respuesta.scrollHeight + "px";
      }
    });

    actualizarMargen(algunoActivo);
  });
});
