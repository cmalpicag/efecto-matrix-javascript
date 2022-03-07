// Obtener el nodo del canvas y el contexto de dibujo
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
// Dibujar un rectángulo negro del ancho y alto del canvas
ctx.fillStyle = '#000';
ctx.fillRect(0, 0, w, h);
var w;
var h;
var cols;
var ypos;
var nIntervId;

// Redimensionar la matrix
function doTheMatrix() {
  if (nIntervId) {
    clearInterval(nIntervId);
  }

  // Establecer el ancho y alto del canvas
  w = canvas.width = document.body.offsetWidth;
  h = canvas.height = document.body.offsetHeight;

  // Establecer las columnas a dibujar
  cols = Math.floor(w / 20) + 1;
  ypos = Array(cols).fill(0);

  // Invocar a la magia a 20 FPS.
  nIntervId = setInterval(matrix, 50);
}

// Magic!
function matrix() {
  // Dibujar un rectángulo negro semitransparente, encima del rectángulo del canvas
  ctx.fillStyle = '#0001';
  ctx.fillRect(0, 0, w, h);

  //  Establecer el color en verde y la fuente en monospace 15pt
  ctx.fillStyle = '#0f0';
  ctx.font = '15pt monospace';

  // Para cada columna, agrega un caracter al final
  ypos.forEach((y, ind) => {
    // Genera un caracter de forma aleatoria
    const text = String.fromCharCode(Math.random() * 128);

    // x -> Coordenada en x de la columna
    // y -> Coordenada en y proporcionada como parámetro
    const x = ind * 20;
    // Dibuja el caracter en la posición (x, y)
    ctx.fillText(text, x, y);

    // Restablece aleatoriamente el final de la columna si tiene al menos 100 px de alto
    if (y > 100 + Math.random() * 10000) ypos[ind] = 0;
    // de lo contrario, simplemente mueva la coordenada y de la columna 20px hacia abajo
    else ypos[ind] = y + 20;
  });
}

doTheMatrix();

// Definir evento para redimensionar el canvas al tamaño del navegador de forma dinámica
window.addEventListener('resize', doTheMatrix, false);