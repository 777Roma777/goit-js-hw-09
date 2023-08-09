import Notiflix from 'notiflix';

const form = document.querySelector('.form');

const delayInput = document.querySelector('input[name="delay"]');
const stepInput = document.querySelector('input[name="step"]');
const amountInput = document.querySelector('input[name="amount"]');

form.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  let initialDelay = Number(delayInput.value);
  let step = Number(stepInput.value);
  let amount = Number(amountInput.value);

  for (let i = 0; i < amount; i++) {
    createPromise(i, initialDelay + step * i)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
  // form.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
