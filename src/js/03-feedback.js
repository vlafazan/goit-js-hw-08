
import throttle from 'lodash.throttle';


const refForm = document.querySelector('.feedback-form');

const FORM_KEY_LS = 'feedback-form-state';
const formData = {};

const getFormDataFromLS = key => JSON.parse(localStorage.getItem(key));

const setFormDataToLS = event => {
  formData[event.target.name] = event.target.value;
  localStorage.setItem(FORM_KEY_LS, JSON.stringify(formData));
};

const removeFormDataFromLS = key => {
  localStorage.removeItem(key);
};

const setFormDataToForm = form => {
  const formData = getFormDataFromLS(FORM_KEY_LS);
  if (!formData) {
    return;
  }
  for (const key in formData) {
    // if (formData.hasOwnProperty(key)) {
    form.elements[key].value = formData[key];
    // }
  }
};

const onSubmitForm = event => {
  event.preventDefault();

  const formData = {
    email: refForm.email.value,
    message: refForm.message.value,
  };

  console.log(formData);

  event.currentTarget.reset();
  removeFormDataFromLS(FORM_KEY_LS);
};

setFormDataToForm(refForm);

refForm.addEventListener('input', throttle(setFormDataToLS, 500));
refForm.addEventListener('submit', onSubmitForm);


