import '../assets/styles/style.scss';

// Arreglo que alamacene los colors
let colors = ['red', 'blue', 'green', 'yellow'];

// Patron del juego
let gameP = [];

// Patron de clicks 
let gameClicksP = [];

// Funcion para iniciar el juego
let start = false;
let level = 0;

// Evento para que registre una tecla e inice el juego
$(document).keydown(() => {
  if (!start) {
    $('#level-title').text('Level ' + level);
    start = true;
    nextSequence();
  }

});

// Evento al que el usuario le esta dando click
$('.container__row__btn').click(function () {
  let userColor = $(this).attr('id');

  gameClicksP.push(userColor);

  playSound(userColor);

  animateClick(userColor);

  checkAnswer(gameClicksP.length - 1);
});


// Funcion para crear la secuencia del juego
function nextSequence() {
  // Reiniciar los clicks
  gameClicksP = [];

  // Actualizar el nivel
  level++;
  $('#level-title').text('Level ' + level);

  // Numeros aleatorios para el patron
  let randomNumber = Math.random() * 4;
  randomNumber = Math.floor(randomNumber);

  // Usar numero aleatorio para llamar el btn seleccionado
  let randomColor;
  randomColor = colors[randomNumber];

  // Alamacenar el numero en el patron
  gameP.push(randomColor);

  $('#' + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomColor);
}

// Funcion para confirmar los clicks del usuario
function checkAnswer(currentLevel) {
  if (gameP[currentLevel] === gameClicksP[currentLevel]) {
    if (gameP.length === gameClicksP.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    // Mostrar sonido de error
    playSound('wrong');

    // Clases para finalizar el juego
    $('body').addClass('game-over');

    // Cambiar titulo para poder reiniciarlo
    $('#level-title').text('Game Over, please restart!');

    // Quitar la clases agregada
    setTimeout(() => {
      $('body').removeClass('game-over');
    }, 400);

    // Llamar funcion para reiniciar el juego
    startOver();
  }
}

// Funcion para emular sonidos
function playSound(color) {
  let audio = new Audio('../assets/sounds/' + color + '.mp3');

  audio.play();
}

// Funcion para animar el click
function animateClick(userColor) {
  $('#' + userColor).addClass('pressed');

  // Quitar la clases agregada
  setTimeout(() => {
    $('#' + userColor).removeClass('pressed');
  }, 100);
}

// Funcion para reiniciar el juego
function startOver() {
  level = 0;
  gameP = [];
  start = false;
}