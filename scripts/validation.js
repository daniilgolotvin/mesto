// Функция для отображения ошибки ввода
const showInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(
    `${config.inputErrorType}${inputElement.id}`
  );
  inputElement.classList.add(config.inputErrorTypeClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(config.errorClassActive);
};

// Функция для скрытия ошибки ввода
const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(
    `${config.inputErrorType}${inputElement.id}`
  );
  inputElement.classList.remove(config.inputErrorTypeClass);
  errorElement.classList.remove(config.errorClassActive);
  errorElement.textContent = "";
};

// Функция для проверки валидности введенных данных в поле ввода
const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

// Функция для добавления обработчиков событий для валидации формы
const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  console.log(buttonElement);
  toggleButtonState(inputList, buttonElement, config.inactiveButtonClass);

  // Добавляем обработчик события "reset" для формы
  formElement.addEventListener("reset", () => {
    disableButton(buttonElement, config.inactiveButtonClass);
  });

  // Добавляем обработчики события "input" для всех полей ввода
  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(formElement, input, config);

      toggleButtonState(inputList, buttonElement, config.inactiveButtonClass);
    });
  });
};

// Функция для включения валидации для всех указанных форм на странице
const enableValidation = (config) => {
  const forms = document.forms;
  const formList = Array.from(forms);

  formList.forEach((formElement) => {
    // Отменяем стандартное поведение формы при отправке и добавляем обработчики событий
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, config);
  });
};

// Функция для проверки наличия невалидных полей в списке
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// Функция для отключения кнопки
function disableButton(buttonElement, inactiveButtonClass) {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.disabled = true;
}

// Функция для включения кнопки
function enableButton(buttonElement, inactiveButtonClass) {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.disabled = false;
}

// Функция для переключения состояния кнопки в зависимости от валидности полей ввода
function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  disableButton(buttonElement, inactiveButtonClass);
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, inactiveButtonClass);
  } else {
    enableButton(buttonElement, inactiveButtonClass);
  }
}

// Включаем валидацию для форм на странице с помощью конфигурации
enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__name",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorTypeClass: ".popup__name_type_error",
  errorClassActive: "popup__input-error_active",
  inputErrorType: ".popup__input-error_type_",
  fieldsetList: ".popup__fieldset",
});
