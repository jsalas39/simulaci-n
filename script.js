// Selección de elementos del DOM
const startScreen = document.getElementById('start-screen');
const simulationScreen = document.getElementById('simulation-screen');
const inputForm = document.getElementById('input-form');
const waveCanvas = document.getElementById('waveCanvas');
const ctx = waveCanvas.getContext('2d');
const changeNBtn = document.getElementById('change-n');
const increaseSpeedBtn = document.getElementById('increase-speed');
const endSimulationBtn = document.getElementById('end-simulation');
const nInput = document.getElementById('n');
const nError = document.getElementById('n-error');

// Parámetros de la onda
let amplitud, frecuencia, longitudOnda, longitudCuerda, n;
let animationId;
let speed = 20; // Intervalo en ms
let t = 0;

// Función para iniciar la simulación
inputForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Captura de valores
    amplitud = parseFloat(document.getElementById('amplitud').value) || 1;
    frecuencia = parseFloat(document.getElementById('frecuencia').value) || 1;
    longitudOnda = parseFloat(document.getElementById('longitud_onda').value) || 1;
    longitudCuerda = parseFloat(document.getElementById('longitud_cuerda').value) || 1;
    n = parseInt(document.getElementById('n').value) || 1;

    // Validación de n
    if (n <= 0 || isNaN(n)) {
        nError.style.display = 'block';
        return;
    } else {
        nError.style.display = 'none';
    }

    // Ocultar pantalla de inicio y mostrar simulación
    startScreen.classList.add('hidden');
    simulationScreen.classList.remove('hidden');
    iniciarAnimacion();
});

// Función para calcular la onda estacionaria
function calcularOnda(x, t) {
    const numeroDeOnda = n * Math.PI / longitudCuerda;
    const frecuenciaAngular = 2 * Math.PI * frecuencia;
    return 2 * amplitud * Math.sin(numeroDeOnda * x) * Math.cos(frecuenciaAngular * t);
}

// Función para dibujar la onda en el canvas
function dibujarOnda() {
    ctx.clearRect(0, 0, waveCanvas.width, waveCanvas.height);
    ctx.beginPath();
    ctx.moveTo(0, waveCanvas.height / 2);

    const puntos = 1000;
    for (let i = 0; i <= puntos; i++) {
        const x = (i / puntos) * longitudCuerda;
        const scaledX = (x / longitudCuerda) * waveCanvas.width;
        const y = calcularOnda(x, t);
        const scaledY = (y / (2 * amplitud)) * (waveCanvas.height / 2);
        ctx.lineTo(scaledX, waveCanvas.height / 2 - scaledY);
    }

    ctx.strokeStyle = '#00796b';
    ctx.lineWidth = 2;
    ctx.stroke();
}

// Función de animación
function animar() {
    dibujarOnda();
    t += (speed / 1000);
    animationId = setTimeout(() => {
        requestAnimationFrame(animar);
    }, speed);
}

// Iniciar animación
function iniciarAnimacion() {
    t = 0;
    animar();
}

// Cambiar el valor de n
changeNBtn.addEventListener('click', () => {
    let nuevoN = prompt("Introduce un nuevo valor para n (entero > 0):", n);
    nuevoN = parseInt(nuevoN);
    if (!isNaN(nuevoN) && nuevoN > 0) {
        n = nuevoN;
        // Reiniciar la animación para reflejar el cambio
        clearTimeout(animationId);
        t = 0;
        animar();
    } else {
        alert("Valor inválido. 'n' permanece igual.");
    }
});

// Aumentar la velocidad de la animación
increaseSpeedBtn.addEventListener('click', () => {
    if (speed > 5) { // Establece un límite mínimo para la velocidad
        speed -= 5;
    } else {
        alert("La velocidad ya está al máximo.");
    }
});

// Terminar simulación y regresar al inicio
endSimulationBtn.addEventListener('click', () => {
    clearTimeout(animationId);
    simulationScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
});
