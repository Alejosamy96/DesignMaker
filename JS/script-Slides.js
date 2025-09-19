const pista = document.querySelector('.seccion-deslizar-pista');
  const logos = pista.innerHTML;
  const repeticiones = 5; // 👈 aquí pones cuántas veces quieres repetir el set
  let contenido = '';
  for (let i = 0; i < repeticiones; i++) {
    contenido += logos;
  }
  pista.innerHTML = contenido;