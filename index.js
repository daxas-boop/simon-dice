let eleccionesMaquina = [];
let eleccionesUsuario = [];
let puntaje = 0;
const sonidos = [
  new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
  new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
  new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
  new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'),
];

function manejarRonda() {
  eleccionesUsuario = [];
  cambiarTextoEstado('Turno de la maquina.');
  const opcionAleatoria = Math.floor(Math.random() * 4) + 1;
  eleccionesMaquina.push(opcionAleatoria);
  mostrarEleccionesMaquina(eleccionesMaquina);

  const TIEMPO_TURNO_USUARIO = 1000 * (eleccionesMaquina.length + 1);
  setTimeout(() => {
    cambiarTextoEstado('Tu turno.');
    desbloquearInputUsuario();
  }, TIEMPO_TURNO_USUARIO);
}

function manejarInputUsuario(boton) {
  const opcionSeleccionada = boton.id.split('-')[1];
  eleccionesUsuario.push(Number(opcionSeleccionada));
  resaltarElemento(boton);

  const esInputCorrecto = eleccionesUsuario.at(-1) === eleccionesMaquina.at(eleccionesUsuario.length - 1);
  const esUltimoInput = eleccionesUsuario.length === eleccionesMaquina.length;

  if (!esInputCorrecto) {
    bloquearInputUsuario();
    habilitarBotonEmpezar();
    cambiarTextoEstado('Perdiste. Tu puntaje: ' + puntaje);
    cambiarFondoEstado('perdedor');
    eleccionesUsuario = [];
    eleccionesMaquina = [];
    puntaje = 0;
  } else if (esInputCorrecto && esUltimoInput) {
    bloquearInputUsuario();
    puntaje++;
    setTimeout(() => {
      manejarRonda();
    }, 500);
  }
}

function cambiarFondoEstado(estado) {
  const fondoEstado = document.querySelector('#fondo-estado');
  if (estado === 'perdedor') {
    fondoEstado.classList.remove('bg-primary-subtle');
    fondoEstado.classList.add('bg-danger');
  } else if (estado === 'normal') {
    fondoEstado.classList.remove('bg-danger');
    fondoEstado.classList.add('bg-primary-subtle');
  }
}

function bloquearInputUsuario() {
  const botonesSimonDice = document.querySelectorAll('.boton');
  botonesSimonDice.forEach((boton) => {
    boton.onclick = () => {};
    boton.role = '';
  });
}

function desbloquearInputUsuario() {
  const botonesSimonDice = document.querySelectorAll('.boton');
  botonesSimonDice.forEach((botonSeleccionado, i) => {
    botonSeleccionado.onclick = () => {
      manejarInputUsuario(botonSeleccionado);
      sonidos[i].play();
    };
    botonSeleccionado.role = 'button';
  });
}

function mostrarEleccionesMaquina(elecciones) {
  elecciones.forEach((eleccion, i) => {
    const TIEMPO_SELECCION_MS = 1000 * (i + 1);
    setTimeout(() => {
      const botonSeleccionado = document.querySelector('#opcion-' + eleccion);
      resaltarElemento(botonSeleccionado);
      sonidos[eleccion - 1].play();
    }, TIEMPO_SELECCION_MS);
  });
}

function resaltarElemento(elemento) {
  elemento.style.opacity = '100%';
  setTimeout(() => {
    elemento.style.opacity = '20%';
  }, 200);
}

function cambiarTextoEstado(texto) {
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
    cambiarFondoEstado('normal');
    bloquearBotonEmpezar();
  };
}

function inicializar() {
  habilitarBotonEmpezar();
}

inicializar();
