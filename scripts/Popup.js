
export class Popup {
    constructor (popupSelector) {
        this._popupSelector = popupSelector;
        this._handleEscClose = this._handleEscClose.bind(this);
        this._closeButton = this._popupSelector.querySelector('.popup__close-button');
    }

    open() {
        this._popupSelector.classList.add("popup_opened");
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popupSelector.classList.remove("popup_opened");
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {

        if (evt.key === "Escape") {
          this.close();
        } 
    }

    setEventListners() {
        this._closeButton.addEventListener('click', () => this.close());
    }
}