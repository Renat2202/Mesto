//Показать ошибку поля ввода
function showInputError (formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add('popup__field_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__error_active');
}

//Скрыть ошибку поля ввода
function hideInputError (formElement, inputElement) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove('popup__field_error');
  errorElement.classList.remove('popup__error_active');
  errorElement.textContent = '';
};


//Проверка валидации
function checkInputValidity (formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};


function checkButtons (inputList, buttonElement, openPopupButton) {
  openPopupButton.onclick = function() {
      toggleButtonState(inputList, buttonElement);
  }
}


//Установка обработчиков событий
function setEventListeners (formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__field'));
  const buttonElement = formElement.querySelector('.popup__button');


  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};


//Включение валидации
function enableValidation ()  {
  const formList = Array.from(document.querySelectorAll('.popup__window'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};


//Проверка всех полей на валидность
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  }); 
};

//Переключение состояния кнопки 
function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__button_disabled');
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove('popup__button_disabled');
    buttonElement.disabled = false;
  } 
}

enableValidation();