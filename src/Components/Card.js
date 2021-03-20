export class Card {
  constructor(name, link, cardTemplate, handleCardClick) {
    this._name = name;
    this._link = link;
    this._handleCardClick = handleCardClick;
    this._cardTemplate = cardTemplate;
    
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".element__image");
    this._setEventListners();

    this._element.querySelector(
      ".element__image"
    ).style.backgroundImage = `url(${this._link})`;
    this._element.querySelector(".element__title").textContent = this._name;

    return this._element;
  }

  _handleLikeCard() {
    this._element
      .querySelector(".element__like-button")
      .classList.toggle("element__like-button_active");
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  _setEventListners() {
    this._cardImage
      .addEventListener("click", () => {
        this._handleCardClick();
      });

    this._element
      .querySelector(".element__like-button")
      .addEventListener("click", () => {
        this._handleLikeCard();
      });

    this._element
      .querySelector(".element__trash-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });
  }

  _getTemplate() {
    const cardElement = this._cardTemplate
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }
}
