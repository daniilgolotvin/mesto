// Функция для отображения ошибки ввода
const showInputError = (
  formElement,
  inputElement,
  inputErrorType,
  errorMessage,
  inputErrorTypeClass,
  errorClassActive
) => {
  const errorElement = formElement.querySelector(
    `${inputErrorType}${inputElement.id}`
  );
  inputElement.classList.add(inputErrorTypeClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClassActive);
};

// Функция для скрытия ошибки ввода
const hideInputError = (
  formElement,
  inputElement,
  inputErrorType,
  inputErrorTypeClass,
  errorClassActive
) => {
  const errorElement = formElement.querySelector(
    `${inputErrorType}${inputElement.id}`
  );
  inputElement.classList.remove(inputErrorTypeClass);
  errorElement.classList.remove(errorClassActive);
  errorElement.textContent = "";
};

// Функция для проверки валидности введенных данных в поле ввода
const checkInputValidity = (
  formElement,
  inputElement,
  inputErrorType,
  inputErrorTypeClass,
  errorClassActive
) => {
  if (!inputElement.validity.valid) {
    // Если валидация не прошла, показываем ошибку
    showInputError(
      formElement,
      inputElement,
      inputErrorType,
      inputElement.validationMessage,
      inputErrorTypeClass,
      errorClassActive
    );
    console.log("input is not valid");
  } else {
    // Если валидация прошла успешно, скрываем ошибку
    hideInputError(
      formElement,
      inputElement,
      inputErrorType,
      inputErrorTypeClass,
      errorClassActive
    );
    console.log("input is valid");
  }
};

// Функция для добавления обработчиков событий для валидации формы
const setEventListeners = (
  formElement,
  inputErrorType,
  inputSelector,
  submitButtonSelector,
  inputErrorTypeClass,
  errorClassActive,
  inactiveButtonClass
) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  console.log(buttonElement);
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);

  // Добавляем обработчик события "reset" для формы
  formElement.addEventListener("reset", () => {
    disableButton(buttonElement, inactiveButtonClass);
  });

  // Добавляем обработчики события "input" для всех полей ввода
  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      // Проверяем валидность введенных данных при изменении содержимого поля
      checkInputValidity(
        formElement,
        input,
        inputErrorType,
        inputErrorTypeClass,
        errorClassActive
      );
      // Обновляем состояние кнопки при изменении валидности полей ввода
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

// Функция для включения валидации для всех указанных форм на странице
const enableValidation = (config) => {
  const forms = document.forms;
  const formList = Array.from(forms);
  console.log(formList);

  formList.forEach((formElement) => {
    // Отменяем стандартное поведение формы при отправке и добавляем обработчики событий
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(
      formElement,
      config.inputErrorType,
      config.inputSelector,
      config.submitButtonSelector,
      config.inputErrorTypeClass,
      config.errorClassActive,
      config.inactiveButtonClass
    );
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
  console.log(buttonElement);
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
    // Если есть невалидные поля, кнопка остается отключенной
    disableButton(buttonElement, inactiveButtonClass);
  } else {
    // Если все поля ввода валидны
    enableButton(buttonElement, inactiveButtonClass);
  }
}

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
