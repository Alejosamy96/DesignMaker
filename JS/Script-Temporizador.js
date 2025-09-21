const duracion = 3 * 60 * 60 * 1000;
const fin = Date.now() + duracion;

function actualizar() {
  const ahora = Date.now();
  let restante = fin - ahora;

  if (restante < 0) restante = 0;

  const horas = Math.floor(restante / (1000 * 60 * 60));
  const minutos = Math.floor((restante % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((restante % (1000 * 60)) / 1000);

  document.getElementById("horas").textContent = String(horas).padStart(2, "0");
  document.getElementById("minutos").textContent = String(minutos).padStart(2, "0");
  document.getElementById("segundos").textContent = String(segundos).padStart(2, "0");
}

actualizar();
setInterval(actualizar, 1000);
