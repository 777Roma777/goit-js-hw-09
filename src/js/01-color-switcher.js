const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

let interval = null;

startButton.addEventListener('click', startChange);
stopButton.addEventListener('click', stopChange);

function backgroundColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function startChange() {
  startButton.disabled = true;
 interval = setInterval(backgroundColor, 1000);
}

function stopChange() {
    startButton.disabled = false;
    clearInterval(interval);

}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
