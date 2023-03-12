const page = document.querySelector('.page');

const popup = document.querySelector('#popup');

const profilePopup = document.querySelector('.profile-popup');

const addPopup = document.querySelector('.add-popup');

const addName = addPopup.querySelector('.add-name');

const addLink = addPopup.querySelector('.add-link');

const editButton = document.querySelector('#open-popup');

const closeProfileButton = document.querySelector('#close-popup');

const closeAddButton = document.querySelector('#close-addPopup');

const saveAddButton = document.querySelector('#add-save');

const addButton = document.querySelector('#button-add');

const profileNameElement = document.querySelector('#profile-name'); //выводим это все на страницу

const profileDescriptionElement = document.querySelector('#profile-description');

const userName = document.querySelector('#user-name'); // первое поле ввода

const userPost = document.querySelector('#user-post'); //второе поля ввода

const popupWindow = document.querySelector('.popup__window');

const templateElement = document.querySelector('.element__template').content;

const templateElements = document.querySelector('.elements');

userName.value = profileNameElement.textContent;
userPost.value = profileDescriptionElement.textContent;

function openPopup(popup) {
  //функция открытия
  popup.classList.add('popup_open');
}

function closePopup(popup) {
  //функция закрытия
  popup.classList.remove('popup_open');
}

function openPopupAdd() {
  popup.classList.add('popup_add');
}

editButton.addEventListener('click', function () {
  openPopup(profilePopup);
});

addButton.addEventListener('click', function () {
  openPopup(addPopup);
});

closeProfileButton.addEventListener('click', function () {
  closePopup(profilePopup);
});

closeAddButton.addEventListener('click', function () {
  closePopup(addPopup);
});

function handleFormSubmit(evt) {
  //замена дефолтных данных на новые значения
  evt.preventDefault();
  profileNameElement.textContent = userName.value;
  profileDescriptionElement.textContent = userPost.value;
  closePopup(profilePopup);
}

popupWindow.addEventListener('submit', handleFormSubmit); //слушатель событий для отправки формы

function createPlace(element) {
  const templateElementCopy = templateElement.cloneNode(true);
  const templateImage = templateElementCopy.querySelector('.element__image');
  const templateTitle = templateElementCopy.querySelector('.element__group-title');
  templateImage.setAttribute('src', element.link);
  templateTitle.textContent = element.name;
  return templateElementCopy;
}

function addPopupInitial(item) {
  const element = createPlace(item);
  templateElements.prepend(element);
}

initialCards.forEach(addPopupInitial);

function createCard(evt) {
  evt.preventDefault();
  const arrayCard = {
    name: addName.value,
    link: addLink.value
  };
  addPopupInitial(arrayCard);
  evt.target.reset();
  closePopup(addPopup);
}

addButton.addEventListener('submit', createCard);
