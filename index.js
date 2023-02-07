let eleccionesMaquina = [];
let eleccionesUsuario = [];

function manejarRonda() {
  eleccionesUsuario = [];
  cambiarEstadoJuego('Turno de la maquina.');
  const opcionAleatoria = Math.floor(Math.random() * 4) + 1;
  eleccionesMaquina.push(opcionAleatoria);
  mostrarEleccionesMaquina(eleccionesMaquina);
}

function mostrarEleccionesMaquina(elecciones) {
  elecciones.forEach((eleccion, i) => {
    const TIEMPO_SELECCION_MS = 1000 * (i + 1);
    setTimeout(() => {
      const botonSeleccionado = document.querySelector('#opcion-' + eleccion);
      resaltarElemento(botonSeleccionado);
    }, TIEMPO_SELECCION_MS);
  });
}

function resaltarElemento(elemento) {
  elemento.style.opacity = '100%';
  setTimeout(() => {
    elemento.style.opacity = '20%';
  }, 200);
}

function cambiarEstadoJuego(texto) {
  const estado = document.querySelector('#estado');
  estado.textContent = texto;
}

function bloquearBotonEmpezar() {
  const botonEmpezar = document.querySelector('#empezar-juego');
  botonEmpezar.disabled = true;
  botonEmpezar.onclick = () => {};
}

function habilitarBotonEmpezar() {
  const botonEmpezar = document.querySelector('#empezar-juego');
  botonEmpezar.disabled = false;
  botonEmpezar.onclick = () => {
    manejarRonda();
    bloquearBotonEmpezar();
  };
}

function inicializar() {
  habilitarBotonEmpezar();
}

inicializar();
