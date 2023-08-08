// Объявление переменных для работы с элементами страницы
const profilePopup = document.querySelector(".profile-popup");
const addPopup = document.querySelector(".add-popup");
const addName = addPopup.querySelector(".add-name");
const addLink = addPopup.querySelector(".add-link");
const editButton = document.querySelector("#open-popup");
const addButton = document.querySelector("#button-add");
const profileNameElement = document.querySelector("#profile-name");
const userName = document.querySelector("#user-name");
const profileDescriptionElement = document.querySelector(
  "#profile-description"
);
const editSubmitButton = document.querySelector("#editSubmitButton");
const userPost = document.querySelector("#user-post");
const profilePopupForm = profilePopup.querySelector(".popup__form");
const templateElement = document.querySelector(".elements__template").content;
const templateElements = document.querySelector(".elements");
const popupImage = document.querySelector(".popup-image");
const popupImageTitle = popupImage.querySelector(".popup__container-title");
const popupImageImg = popupImage.querySelector(".popup__container-image");

// Функция для открытия попапа
function openPopup(popup) {
  popup.classList.add("popup_open");
  document.addEventListener("keydown", handleEscPress);
}

// Функция для закрытия попапа
function closePopup(popup) {
  disableButton(editSubmitButton, "popup__save-button_inactive");
  popup.classList.remove("popup_open");
  document.removeEventListener("keydown", handleEscPress);
}

// Функция обработки нажатия клавиши Esc
function handleEscPress(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_open");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

// Функция для активации/деактивации кнопки 'Лайк' на карточке
function likeButtonActive(evt) {
  evt.target.classList.toggle("element__group-button-active");
}

// Обработчик события отправки формы редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileNameElement.textContent = userName.value;
  profileDescriptionElement.textContent = userPost.value.trim();
  closePopup(profilePopup);
}

// Функция для удаления карточки
function deleteCard(evt) {
  const cardElement = evt.target.closest(".element");
  if (cardElement) {
    cardElement.remove();
  }
}

function createPlace(element) {
  const templateElementCopy = templateElement.cloneNode(true);
  const templateImage = templateElementCopy.querySelector(
    ".element__card-image"
  );
  const templateTitle = templateElementCopy.querySelector(
    ".element__group-title"
  );
  const likeButton = templateElementCopy.querySelector(
    ".element__group-button"
  );
  const trashButton = templateElementCopy.querySelector(
    ".element__card-trashbutton"
  );
  templateImage.setAttribute("src", element.link);
  templateImage.setAttribute("alt", element.name);
  templateTitle.textContent = element.name;

  // Добавляем обработчики событий для кнопок 'Лайк' и 'Удалить'
  likeButton.addEventListener("click", likeButtonActive);
  trashButton.addEventListener("click", deleteCard);

  // Добавляем обработчик события клика на изображение карточки
  templateImage.addEventListener("click", (evt) => {
    openPopup(popupImage);
    popupImageImg.src = evt.target.getAttribute("src");
    popupImageImg.alt = evt.target.getAttribute("alt");
    popupImageTitle.textContent = popupImageImg.alt;
  });

  return templateElementCopy;
}

// Функция для создания новой карточки и добавления её на страницу
function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: addName.value.trim(),
    link: addLink.value,
  };
  addCard(newCard);
  closePopup(addPopup);
  evt.target.reset();
}

// Функция для добавления карточки на страницу
function addCard(item) {
  const element = createPlace(item);
  templateElements.prepend(element);
}

// Добавляем обработчик для закрытия попапа при клике на overlay
document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target === popup) {
      closePopup(popup);
    }
  });
});

// Обработчик события клика на кнопку 'Редактировать профиль'
editButton.addEventListener("click", function () {
  openPopup(profilePopup);
  userName.value = profileNameElement.textContent;
  userPost.value = profileDescriptionElement.textContent.trim();
});

// Обработчик события клика на кнопку 'Добавить' (открывает попап для добавления карточки)
addButton.addEventListener("click", function () {
  openPopup(addPopup);
});

// Добавляем обработчики событий для кнопок закрытия внутри попапов
document.querySelectorAll(".popup__close-button").forEach((button) => {
  const buttonsPopup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(buttonsPopup));
});

// Добавляем обработчик события отправки формы редактирования профиля
profilePopupForm.addEventListener("submit", handleProfileFormSubmit);

// Функция для создания карточки из шаблона

initialCards.forEach(addCard);

// Добавляем обработчик события отправки формы добавления карточки
addPopup.addEventListener("submit", handleAddFormSubmit);
