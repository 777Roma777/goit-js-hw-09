import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const inputDataTime = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');

const refs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      startButton.disabled = true; // Деактивуємо кнопку "Start", при виборі дати раніше
      alert('Please choose a date in the future');
    } else {
      startButton.disabled = false; // Активуємо кнопку "Start", при виборі дати після
    }
  },
};

flatpickr(inputDataTime, options);

let interval;

startButton.addEventListener('click', startButtonClick);

function startButtonClick() {
  startButton.disabled = true;

  const selectedDate = flatpickr.parseDate(inputDataTime.value);

  clearInterval(interval);

  interval = setInterval(() => {
    const timeDiff = selectedDate - new Date();
    if (timeDiff <= 0) {
      clearInterval(interval);
      refs.days.textContent = '00';
      refs.hours.textContent = '00';
      refs.minutes.textContent = '00';
      refs.seconds.textContent = '00';
      startButton.disabled = false;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeDiff);
    refs.days.textContent = addLeadingZero(days);
    refs.hours.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds);
  }, 1000);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
