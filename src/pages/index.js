import './index.css';

import { initialCards } from "../Components/initial-cards.js";
import { Card } from "../Components/Card.js";
import { FormValidator, configValidation } from "../Components/FormValidator.js";
import { PopupWithForm } from "../Components/PopupWithForm.js";
import { PopupWithImage } from "../Components/PopupWithImage.js";
import { Section } from "../Components/Section.js";
import { UserInfo } from "../Components/UserInfo.js";

const editForm = document.querySelector(".popup_edit-form"); //Обертка формы редактирования профиля
const editFormWindow = document.querySelector(".popup__window_edit-form"); //Форма редактирования профиля


const profileEditButton = document.querySelector(".profile__edit-button"); //Кнопка редактирования профиля

const profileName = document.querySelector(".profile__name"); //Имя профиля
const profileSubline = document.querySelector(".profile__name-subline"); //Подпись профиля

const editFormFieldName = document.querySelector(".popup__field_name"); //Поле "Имя" формы редактирования профиля
const editFormFieldSubline = document.querySelector(".popup__field_subline"); //Поле "Подпись" формы редактирования профиля

const elementsList = document.querySelector(".elements"); //Список карточек

const template = document.querySelector(".element-template"); //Шаблон нового элемента

const itemForm = document.querySelector(".popup_item-form"); //Обертка формы добавления нового элемента
const itemFormWindow = document.querySelector(".popup__window_item-form"); //Форма добавления нового элемента

const addProfileButton = document.querySelector(".profile__button"); //Кнопка добавления нового элемента

const itemFormFieldName = document.querySelector(".popup__field_title"); //Поле "Имя" формы добавления нового элемента
const itemFormFieldLink = document.querySelector(".popup__field_url"); //Поле "Ссылка" формы добавления нового элемента

const imagePopup = document.querySelector(".popup_image-popup"); //Попап с картинокой




//Получение значений в форме редактировния профиля
function getValues() {
  const profile = user.getUserInfo();
  editFormFieldName.value = profile.name;
  editFormFieldSubline.value = profile.subline;
}


const user = new UserInfo({userNameSelector: profileName, userSublineSelector: profileSubline});


const editWindow = new PopupWithForm(editForm, (item) => {
  user.setUserInfo(item);
  editWindow.close();
});
editWindow.setEventListners();



const popupAddCard = new PopupWithForm(itemForm, () => {

  const itemElement = createCard(itemFormFieldName.value, itemFormFieldLink.value);

  elementsList.prepend(itemElement);
  popupAddCard.close();

});

popupAddCard.setEventListners();


const editProfileFormValidator = new FormValidator(configValidation, editFormWindow);
editProfileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(configValidation, itemFormWindow);
addCardFormValidator.enableValidation();



addProfileButton.addEventListener("click", () =>  {
  popupAddCard.open();
  addCardFormValidator.clearError();
  addCardFormValidator.toggleButtonState();
});

profileEditButton.addEventListener("click", () => { 
  getValues();
  editProfileFormValidator.clearError(); 
  editProfileFormValidator.toggleButtonState(); 
  editWindow.open() 
}); //Открытие формы редактирования профиля





const popupWithImage = new PopupWithImage(imagePopup);
popupWithImage.setEventListners();

function createCard(name, link) {
  const card = new Card(name, link, template, () => {  
    popupWithImage.open(name, link);
  });
  return card.generateCard();
}


const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
        const itemElement = createCard(item.name, item.link);
        cardsList.addItem(itemElement);
  }
  ,}, elementsList);

  cardsList.initial();