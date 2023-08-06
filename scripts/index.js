const page = document.querySelector(".page");

const profilePopup = document.querySelector(".profile-popup");

const addPopup = document.querySelector(".add-popup");

const addName = addPopup.querySelector(".add-name");

const addLink = addPopup.querySelector(".add-link");

const editButton = document.querySelector("#open-popup");

const closeProfileButton = document.querySelector("#close-popup");

const addButton = document.querySelector("#button-add");

const profileNameElement = document.querySelector("#profile-name"); //выводим это все на страницу

const userName = document.querySelector("#user-name"); // первое поле ввода

const profileDescriptionElement = document.querySelector(
  "#profile-description"
);

const userPost = document.querySelector("#user-post"); //второе поля ввода

const profilePopupForm = profilePopup.querySelector(".popup__form");

const templateElement = document.querySelector(".elements__template").content;

const templateElements = document.querySelector(".elements");

const popupImage = document.querySelector(".popup-image");

const popupImageTitle = popupImage.querySelector(".popup__container-title");

const popupImageImg = popupImage.querySelector(".popup__container-image");

function openPopup(popup) {
  popup.classList.add("popup_open");
  document.addEventListener("keydown", handleEscPress);
}

// Функция для закрытия попапа
function closePopup(popup) {
  popup.classList.remove("popup_open");
  document.removeEventListener("keydown", handleEscPress);
}

function handleEscPress(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_open");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target === popup) {
      closePopup(popup);
    }
  });
});
function openPopupAdd() {
  popup.classList.add("popup_add");
}

editButton.addEventListener("click", function () {
  openPopup(profilePopup);
  userName.value = profileNameElement.textContent;
  userPost.value = profileDescriptionElement.textContent;
});

addButton.addEventListener("click", function () {
  openPopup(addPopup);
});

function likeButtonActive(evt) {
  evt.target.classList.toggle("element__group-button-active");
}

document.querySelectorAll(".popup__close-button").forEach((button) => {
  const buttonsPopup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(buttonsPopup));
});

function deleteCard(evt) {
  const cardElement = evt.target.closest(".element");
  if (cardElement) {
    cardElement.remove();
  }
}

function handleFormSubmit(evt) {
  //замена дефолтных данных на новые значения
  evt.preventDefault();
  profileNameElement.textContent = userName.value;
  profileDescriptionElement.textContent = userPost.value;
  closePopup(profilePopup);
}

profilePopupForm.addEventListener("submit", handleFormSubmit); //слушатель событий для отправки формы

//создание карточек
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

  likeButton.addEventListener("click", likeButtonActive);
  trashButton.addEventListener("click", deleteCard); // Добавляем обработчик для кнопки удаления

  templateImage.addEventListener("click", (event) => {
    openPopup(popupImage);
    popupImageImg.src = event.target.getAttribute("src");
    popupImageImg.alt = event.target.getAttribute("alt");
    popupImageTitle.textContent = popupImageImg.alt;
  });

  return templateElementCopy;
}

function addCard(item) {
  const element = createPlace(item);
  templateElements.prepend(element);
}

initialCards.forEach(addCard);

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

addPopup.addEventListener("submit", createCard);
