// Duración: 3 horas en milisegundos
const DURACION = 3 * 60 * 60 * 1000;

// Revisamos si ya hay una hora de fin guardada
let fin = localStorage.getItem("contadorFin");

// Si no existe, la creamos y la guardamos
if (!fin) {
  fin = Date.now() + DURACION;
  localStorage.setItem("contadorFin", fin);
} else {
  fin = parseInt(fin, 10);
}

function actualizar() {
  const ahora = Date.now();
  let restante = fin - ahora;

  if (restante < 0) restante = 0;

  const horas = Math.floor(restante / (1000 * 60 * 60));
  const minutos = Math.floor((restante % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((restante % (1000 * 60)) / 1000);

  document.querySelectorAll(".horas").forEach(e => e.textContent = String(horas).padStart(2, "0"));
  document.querySelectorAll(".minutos").forEach(e => e.textContent = String(minutos).padStart(2, "0"));
  document.querySelectorAll(".segundos").forEach(e => e.textContent = String(segundos).padStart(2, "0"));

  // Si llegó a 0, opcional: limpiar el localStorage para reiniciar después
  if (restante === 0) {
    clearInterval(intervalo);
    localStorage.removeItem("contadorFin");
  }
}

actualizar();
const intervalo = setInterval(actualizar, 1000);
