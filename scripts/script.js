const editForm = document.querySelector('.popup_edit-form');//Обертка формы редактирования профиля
const editFormWindow = document.querySelector('.popup__window_edit-form');//Форма редактирования профиля
const editFormCloseButton = document.querySelector('.popup__close-button_edit-form');

const profileEditButton = document.querySelector('.profile__edit-button');//Кнопка редактирования профиля

const profileName = document.querySelector('.profile__name');//Имя профиля
const profileSubline = document.querySelector('.profile__name-subline');//Подпись профиля 

const editFormFieldName = document.querySelector('.popup__field_name');//Поле "Имя" формы редактирования профиля
const editFormFieldSubline = document.querySelector('.popup__field_subline');//Поле "Подпись" формы редактирования профиля

const elementsList = document.querySelector('.elements');//Список карточек

const tmpl = document.querySelector('.element-template');//Шаблон нового элемента

const itemForm = document.querySelector('.popup_item-form'); //Обертка формы добавления нового элемента
const itemFormWindow = document.querySelector('.popup__window_item-form');//Форма добавления нового элемента

const addProfileButton = document.querySelector('.profile__button');//Кнопка добавления нового элемента

const itemFormFieldName = document.querySelector('.popup__field_title');//Поле "Имя" формы добавления нового элемента
const itemFormFieldLink = document.querySelector('.popup__field_url');//Поле "Ссылка" формы добавления нового элемента
const itemFormCloseButton = document.querySelector('.popup__close-button_item-form');//Кнопка закрытия попапа добалния нового элемента

const imagePopup = document.querySelector('.popup_image-popup');//Попап с картинокой
const imagePopupImage = document.querySelector('.popup__image');//Окно попапа с картинокой
const imagePopupCaption = document.querySelector('.popup__caption');//Подпись к картинке попапа
const imagePopupCloseButton = document.querySelector('.popup__close-button_image-popup');//Кнопка закрытия попапа с картинокой

const popupsList = document.querySelectorAll('.popup')//Список попапов


//Закрыть попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  clearError(popup);

  document.removeEventListener('keydown', closePopupEscape);

}

//Очистка ошибок
function clearError(popup) {
  const inputList = Array.from(popup.querySelectorAll('.popup__field'));
  inputList.forEach((inputElement) => {
    hideInputError (popup, inputElement, configValidation.inputErrorClass, configValidation.errorClass);
  });
}


//Открыть попап
function openPopup(popup) {
  currentPopup = popup;

  const inputList = Array.from(popup.querySelectorAll('.popup__field'));
  const popupButton = popup.querySelector('.popup__button');
  if (popupButton) {
    toggleButtonState(inputList, popupButton, configValidation.inactiveButtonClass);
  }

  popup.classList.add('popup_opened');

  document.addEventListener('keydown', closePopupEscape);

}

//Открытие окна просмотра изображения 
function showImagePopup(caption, src) {
  openPopup(imagePopup);
  imagePopupImage.setAttribute('src', src);
  imagePopupImage.setAttribute('alt', caption);
  imagePopupCaption.textContent = caption;
}

//Открытие формы добаления нового элемента
function showItemForm () {
  itemFormWindow.reset();
  openPopup(itemForm);
}

//Добавление нового элемента
function addNewCard () {
  createCard(itemFormFieldName.value, itemFormFieldLink.value);
}

//"Отправка" формы создания нового элемента
function handleItemFormSubmit(evt) {
  evt.preventDefault();
  addCard(createCard(itemFormFieldName.value, itemFormFieldLink.value), elementsList);
  closePopup(itemForm);
}

//"Отправка" формы редактирования профиля
function handleEditFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent =  editFormFieldName.value;
  profileSubline.textContent = editFormFieldSubline.value;
  closePopup(editForm);
}

//Закрыть форму редактировния профиля
function closeForm () {
    editForm.classList.remove('popup_opened');
}

//Открыть форму редактировния профиля
function openEditForm () { 
    getValues();
    openPopup(editForm);
}

//Получение значений в форме редактировния профиля
function getValues () {
    editFormFieldName.value = profileName.textContent;
    editFormFieldSubline.value = profileSubline.textContent;
}

//Переключения лайка
function toggleLike () {
  this.classList.toggle('element__like-button_active');
}

//Удаление карточки
function deleteCard () {
  this.closest('.element').remove();
}

function createCard(name, link) {
    const newCard = tmpl.content.cloneNode(true);
    newCard.querySelector('.element__image').style.backgroundImage = `url(${link})`;
    newCard.querySelector('.element__title').textContent = name;

    newCard.querySelector('.element__trash-button').onclick = deleteCard;

    newCard.querySelector('.element__like-button').onclick = toggleLike; 

    newCard.querySelector('.element__image').addEventListener('click', function(){
      showImagePopup(name, link);
    });
    
    return newCard;
}


function addCard(card, container) {
  container.prepend(card);
}


//Инициализация карточек
function initial() {
    initialCards.forEach(function(card) {
      addCard(createCard(card.name, card.link), elementsList);
    });
}


//Отрисовка карточек
initial();



editFormCloseButton.addEventListener('click', function() {
  closePopup(editForm);
});

editFormWindow.onsubmit = handleEditFormSubmit;


addProfileButton.addEventListener('click', showItemForm);

itemFormCloseButton.addEventListener('click', function() {
  closePopup(itemForm);
});


//Обработчик кнопок закрытия попап'ов
imagePopupCloseButton.addEventListener('click', function() {
  closePopup(imagePopup);
});

itemFormWindow.onsubmit = handleItemFormSubmit;

profileEditButton.addEventListener('click', openEditForm);//Открытие формы редактирования профиля


// Закрытие попапа по кнопке Escape
function closePopupEscape (evt) {
  let openedPopup = document.querySelector('.popup_opened');
  if(evt.key === 'Escape') {
    closePopup(openedPopup);
  }
}


// Закрытие попапа по клику на фоне
popupsList.forEach(function(popup) {
  popup.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget) {
        closePopup(popup);
      }
      
    });
})


