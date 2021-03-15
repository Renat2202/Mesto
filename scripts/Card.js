export class Card {
  constructor(name, link, openCard) {
    this._name = name;
    this._link = link;
    this._openCard = openCard;
  }

  generateCard() {
    this._element = this._getTemplate();
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
    this._element
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this._openCard();
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
    const cardElement = document
      .querySelector(".element-template")
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }
}
