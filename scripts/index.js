// Объявление переменных для работы с элементами страницы
const page = document.querySelector(".page");
const profilePopup = document.querySelector(".profile-popup");
const addPopup = document.querySelector(".add-popup");
const addName = addPopup.querySelector(".add-name");
const addLink = addPopup.querySelector(".add-link");
const editButton = document.querySelector("#open-popup");
const closeProfileButton = document.querySelector("#close-popup");
const addButton = document.querySelector("#button-add");
const profileNameElement = document.querySelector("#profile-name");
const userName = document.querySelector("#user-name");
const profileDescriptionElement = document.querySelector(
  "#profile-description"
);
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

// Добавляем обработчик для закрытия попапа при клике на overlay
document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target === popup) {
      closePopup(popup);
    }
  });
});

// Функция для открытия попапа добавления новой карточки (не используется в коде)
function openPopupAdd() {
  popup.classList.add("popup_add");
}

// Обработчик события клика на кнопку "Редактировать профиль"
editButton.addEventListener("click", function () {
  openPopup(profilePopup);
  userName.value = profileNameElement.textContent;
  userPost.value = profileDescriptionElement.textContent;
});

// Обработчик события клика на кнопку "Добавить" (открывает попап для добавления карточки)
addButton.addEventListener("click", function () {
  openPopup(addPopup);
});

// Функция для активации/деактивации кнопки "Лайк" на карточке
function likeButtonActive(evt) {
  evt.target.classList.toggle("element__group-button-active");
}

// Добавляем обработчики событий для кнопок закрытия внутри попапов
document.querySelectorAll(".popup__close-button").forEach((button) => {
  const buttonsPopup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(buttonsPopup));
});

// Функция для удаления карточки
function deleteCard(evt) {
  const cardElement = evt.target.closest(".element");
  if (cardElement) {
    cardElement.remove();
  }
}

// Обработчик события отправки формы редактирования профиля
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileNameElement.textContent = userName.value;
  profileDescriptionElement.textContent = userPost.value;
  closePopup(profilePopup);
}

// Добавляем обработчик события отправки формы редактирования профиля
profilePopupForm.addEventListener("submit", handleFormSubmit);

// Функция для создания карточки из шаблона
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

  // Добавляем обработчики событий для кнопок "Лайк" и "Удалить"
  likeButton.addEventListener("click", likeButtonActive);
  trashButton.addEventListener("click", deleteCard);

  // Добавляем обработчик события клика на изображение карточки
  templateImage.addEventListener("click", (event) => {
    openPopup(popupImage);
    popupImageImg.src = event.target.getAttribute("src");
    popupImageImg.alt = event.target.getAttribute("alt");
    popupImageTitle.textContent = popupImageImg.alt;
  });

  return templateElementCopy;
}

// Функция для добавления карточки на страницу
function addCard(item) {
  const element = createPlace(item);
  templateElements.prepend(element);
}

initialCards.forEach(addCard);

// Функция для создания новой карточки и добавления её на страницу
function createCard(evt) {
  evt.preventDefault();
  const newCard = {
    name: addName.value,
    link: addLink.value,
  };
  addCard(newCard);
  evt.target.reset();
  closePopup(addPopup);
}

// Добавляем обработчик события отправки формы добавления карточки
addPopup.addEventListener("submit", createCard);
