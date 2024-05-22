import throttle from 'lodash.throttle';

// localStorage.setItem('my-session', JSON.stringify({ name: 'Mango', age: 25 }));

const STORAGE_KEY = 'feedback-form-state';
const formData = {};

const form = document.querySelector('.feedback-form');
const message = document.querySelector('.feedback-form textarea');
const email = document.querySelector('input[type="email"]');

// message.addEventListener('input', throttle(onMessageInput, 500));
// email.addEventListener('input', throttle(onEmailInput, 500));

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onInput, 500));

function onInput(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

populateInputs();

// function fullInput(evt) {
//   //   console.log(evt.target.name);
//   //   console.log(evt.target.value);

//   formData[evt.target.name] = evt.target.value;

//   localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
// }
function populateInputs() {
  const savedFormData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

  if (savedFormData.message) {
    message.value = savedFormData.message;
    formData.message = savedFormData.message;
  }

  if (savedFormData.email) {
    email.value = savedFormData.email;
    formData.email = savedFormData.email;
  }
}

function onFormSubmit(evt) {
  evt.preventDefault();
  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  evt.target.reset();
  localStorage.removeItem(STORAGE_KEY);
}

// function onMessageInput(evt) {
//   formData.message = evt.target.value;
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
// }

// function onEmailInput(evt) {
//   formData.email = evt.target.value;
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
// }
