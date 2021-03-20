import { Card } from "./Card.js";
import { FormValidator, configValidation } from "./FormValidator.js";
import { Popup } from './Popup.js'
import { PopupWithForm } from "./PopupWithForm.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { Section } from "./Section.js";

const editForm = document.querySelector(".popup_edit-form"); //Обертка формы редактирования профиля
const editFormWindow = document.querySelector(".popup__window_edit-form"); //Форма редактирования профиля
const editFormCloseButton = document.querySelector(
  ".popup__close-button_edit-form"
);

const profileEditButton = document.querySelector(".profile__edit-button"); //Кнопка редактирования профиля

const profileName = document.querySelector(".profile__name"); //Имя профиля
const profileSubline = document.querySelector(".profile__name-subline"); //Подпись профиля

const editFormFieldName = document.querySelector(".popup__field_name"); //Поле "Имя" формы редактирования профиля
const editFormFieldSubline = document.querySelector(".popup__field_subline"); //Поле "Подпись" формы редактирования профиля

const elementsList = document.querySelector(".elements"); //Список карточек

const tmpl = document.querySelector(".element-template"); //Шаблон нового элемента

const itemForm = document.querySelector(".popup_item-form"); //Обертка формы добавления нового элемента
const itemFormWindow = document.querySelector(".popup__window_item-form"); //Форма добавления нового элемента

const addProfileButton = document.querySelector(".profile__button"); //Кнопка добавления нового элемента

const itemFormFieldName = document.querySelector(".popup__field_title"); //Поле "Имя" формы добавления нового элемента
const itemFormFieldLink = document.querySelector(".popup__field_url"); //Поле "Ссылка" формы добавления нового элемента
const itemFormCloseButton = document.querySelector(
  ".popup__close-button_item-form"
); //Кнопка закрытия попапа добалния нового элемента

const imagePopup = document.querySelector(".popup_image-popup"); //Попап с картинокой
const imagePopupImage = document.querySelector(".popup__image"); //Окно попапа с картинокой
const imagePopupCaption = document.querySelector(".popup__caption"); //Подпись к картинке попапа
const imagePopupCloseButton = document.querySelector(
  ".popup__close-button_image-popup"
); //Кнопка закрытия попапа с картинокой

const popupsList = document.querySelectorAll(".popup"); //Список попапов

//Скрыть ошибку поля ввода
// function hideInputError(
//   formElement,
//   inputElement,
//   inputErrorClass,
//   errorClass
// ) {
//   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
//   inputElement.classList.remove(inputErrorClass);
//   errorElement.classList.remove(errorClass);
//   errorElement.textContent = "";
// }

//Проверка всех полей на валидность
// function hasInvalidInput(inputList) {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   });
// }

//Переключение состояния кнопки
// function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.classList.add(inactiveButtonClass);
//     buttonElement.disabled = true;
//   } else {
//     buttonElement.classList.remove(inactiveButtonClass);
//     buttonElement.disabled = false;
//   }
// }

//Очистка ошибок
// function clearError(popup) {
//   const inputList = Array.from(popup.querySelectorAll(".popup__field"));
//   inputList.forEach((inputElement) => {
//     hideInputError(
//       popup,
//       inputElement,
//       configValidation.inputErrorClass,
//       configValidation.errorClass
//     );
//   });
// }



//Закрыть попап


function closePopup(popup) {
  const popupField = popup.querySelector(".popup__field");
  let popupWindow = popup.querySelector(".popup__window");
  popupWindow = new FormValidator(configValidation, popupWindow);
  if (popupField) {
    popupWindow.clearError();
  }

  let popupForm = new Popup(popup);
  popupForm.close();
  
}

//Открыть попап
function openPopup(popup) {
  const popupButton = popup.querySelector(".popup__button");
  let popupWindow = popup.querySelector(".popup__window");
  popupWindow = new FormValidator(configValidation, popupWindow);
  if (popupButton) {
    popupWindow.toggleButtonState();
  }

  let popupForm = new Popup(popup);
  popupForm.open();
  popupForm.setEventListners();

}

//Открытие формы добаления нового элемента
function showItemForm() {
  itemFormWindow.reset();
  openPopup(itemForm);
}

//"Отправка" формы создания нового элемента
function handleItemFormSubmit(evt) {
  evt.preventDefault();

  const item = new Card(
    itemFormFieldName.value,
    itemFormFieldLink.value,
    () => {
          
          let popupWithImage = new PopupWithImage(imagePopup);
          popupWithImage.open(itemFormFieldName.value, itemFormFieldLink.value);
          popupWithImage.setEventListners();

      // showImagePopup(itemFormFieldName.value, itemFormFieldLink.value);
      // handlePopupEscape();
    }
  );
  const itemElement = item.generateCard();

  elementsList.prepend(itemElement);

  closePopup(itemForm);
}

//"Отправка" формы редактирования профиля
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editFormFieldName.value;
  profileSubline.textContent = editFormFieldSubline.value;
  closePopup(editForm);
}

//Закрыть форму редактировния профиля
function closeForm() {
  editForm.classList.remove("popup_opened");
}

//Открыть форму редактировния профиля
function openEditForm() {
  getValues();
  openPopup(editForm);
  // let editFor = new Popup(".popup_edit-form");
  // editFor.open();
}

//Получение значений в форме редактировния профиля
function getValues() {
  editFormFieldName.value = profileName.textContent;
  editFormFieldSubline.value = profileSubline.textContent;
}

//Открытия попапа с изображением
function showImagePopup(name, link) {
  imagePopup.classList.add("popup_opened");
  imagePopupImage.setAttribute("src", link);
  imagePopupImage.setAttribute("alt", name);
  imagePopupCaption.textContent = name;
}

//Инициализация карточек
// export function initial() {
//   initialCards.forEach(function (card) {
//     const item = new Card(card.name, card.link, () => {
//       showImagePopup(card.name, card.link);
//       handlePopupEscape();
//     });
//     const itemElement = item.generateCard();
//     elementsList.prepend(itemElement);
//   });
// }



//Отрисовка карточек
// initial();




//Обработчик кнопок закрытия попап'ов

// editFormCloseButton.addEventListener("click", function () {
//   closePopup(editForm);
// });

// itemFormCloseButton.addEventListener("click", function () {
//   closePopup(itemForm);
// });

// imagePopupCloseButton.addEventListener("click", function () {
//   closePopup(imagePopup);
// });

editFormWindow.onsubmit = handleEditFormSubmit;
let editWindow = new PopupWithForm(editFormWindow, (item) => {
  
})


addProfileButton.addEventListener("click", showItemForm);

// itemFormWindow.onsubmit = handleItemFormSubmit;
itemFormWindow.addEventListener('submit', handleItemFormSubmit);

profileEditButton.addEventListener("click", openEditForm); //Открытие формы редактирования профиля

// Закрытие попапа по кнопке Escape
function closePopupEscape(evt) {
  let openedPopup = document.querySelector(".popup_opened");
  if (evt.key === "Escape") {
    closePopup(openedPopup);
  }
}

//Добавление обработчика закрытия попапа по кнопке Escape
export function handlePopupEscape() {
  document.addEventListener("keydown", closePopupEscape);
}

// Закрытие попапа по клику на фоне
popupsList.forEach(function (popup) {
  popup.addEventListener("click", (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    }
  });
});

const formList = Array.from(
  document.querySelectorAll(configValidation.formSelector)
);

formList.forEach((form) => {
  form = new FormValidator(configValidation, form);
  form.enableValidation();
});


const cardsList = new Section({
  items: initialCards,
  renderer: () => {
    initialCards.forEach(item => {
        const card = new Card(item.name, item.link, () => {
          let popupWithImage = new PopupWithImage(imagePopup);
          popupWithImage.open(item.name, item.link);
          popupWithImage.setEventListners();
        });
        const itemElement = card.generateCard();
        cardsList.addItem(itemElement);
    });
  }
  ,}, '.elements');

  cardsList.initial();