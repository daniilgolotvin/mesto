const page = document.querySelector('.page');

const popup = document.querySelector('#popup');

const openPopupButton = document.querySelector('#open-popup');
if (!openPopupButton) {
  //проверка на наличие вызванной константы

  throw new Error('openPopupButton not found');
}
openPopupButton.addEventListener('click', function () {
  //открытие попапа на кнопку
  openPopup();
});

const closePopupButton = document.querySelector('#close-popup');
if (!closePopupButton) {
  throw new Error('closePopupButton not found');
}
closePopupButton.addEventListener('click', function () {
  //закрытие попапа на кнопку
  closePopup();
});

const savePopupButton = document.querySelector('#save-button');

let profileName = 'Жак-Ив Кусто'; //присвоение имени

let profileDescription = 'Исследователь океана'; //присвоение должности

let profileNameElement = document.querySelector('#profile-name'); //выводим это все на страницу
profileNameElement.textContent = profileName;

let profileDescriptionElement = document.querySelector('#profile-description');
profileDescriptionElement.textContent = profileDescription;

let userName = document.querySelector('#user-name'); // первое поле ввода
userName.value = profileName;

let userPost = document.querySelector('#user-post'); //второе поля ввода
userPost.value = profileDescription;

page.classList.remove('hidden'); //удаление класса для отключения скролла

function handleFormSubmit(evt) {
  //замена дефолтных данных на новые значения
  evt.preventDefault();
  profileNameElement.textContent = userName.value;
  profileDescriptionElement.textContent = userPost.value;
  closePopup();
}

popup.addEventListener('submit', handleFormSubmit);

savePopupButton.addEventListener('click', handleFormSubmit);

function openPopup() {
  //функция открытия
  popup.classList.remove('popup__hidden');
  page.classList.add('hidden');
}

function closePopup() {
  //функция закрытия
  popup.classList.add('popup__hidden');
  page.classList.remove('hidden');
  userName.value = profileNameElement.textContent;
  userPost.value = profileDescriptionElement.textContent;
}
