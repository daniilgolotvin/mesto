const page = document.querySelector('.page');

const popup = document.querySelector('#popup');

const openPopupButton = document.querySelector('#open-popup');

const closePopupButton = document.querySelector('#close-popup');

let profileNameElement = document.querySelector('#profile-name'); //выводим это все на страницу

let profileDescriptionElement = document.querySelector('#profile-description');

let userName = document.querySelector('#user-name'); // первое поле ввода

let userPost = document.querySelector('#user-post'); //второе поля ввода

let popupWindow = document.querySelector('.popup__window');

popup.classList.add('popup_open');

function openPopup() {
  //функция открытия
  popup.classList.remove('popup_open');
  userName.value = profileNameElement.textContent;
  userPost.value = profileDescriptionElement.textContent;
}

function closePopup() {
  //функция закрытия
  popup.classList.add('popup_open');
}

openPopupButton.addEventListener('click', openPopup);
//открытие попапа на кнопку

closePopupButton.addEventListener('click', closePopup);
//закрытие попапа на кнопку

function handleFormSubmit(evt) {
  //замена дефолтных данных на новые значения
  evt.preventDefault();
  profileNameElement.textContent = userName.value;
  profileDescriptionElement.textContent = userPost.value;
  closePopup();
}

popupWindow.addEventListener('submit', handleFormSubmit);
