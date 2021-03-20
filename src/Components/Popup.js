export class Popup {
    constructor (popupSelector) {
        this._popupSelector = popupSelector;
        this._closeButton = this._popupSelector.querySelector('.popup__close-button');
        this._handleEscClose = this._handleEscClose.bind(this);
        this._closePopupOverlay = this._closePopupOverlay.bind(this);
    }

    open() {
        this._popupSelector.classList.add("popup_opened");
        document.addEventListener('keydown', this._handleEscClose);
        this._popupSelector.addEventListener('click', this._closePopupOverlay);
        // console.log(this._popupSelector);
    }

    close() {
        this._popupSelector.classList.remove("popup_opened");
        document.removeEventListener('keydown', this._handleEscClose);
        this._popupSelector.removeEventListener('click', this._closePopupOverlay);
    }

    _handleEscClose(evt) {

        if (evt.key === "Escape") {
          this.close();
        }
         
    }

    _closePopupOverlay(evt) {
        if (evt.target === this._popupSelector) {
            // closePopup(popup);
            this.close();
          }
    }

    setEventListners() {
        this._closeButton.addEventListener('click', () => this.close());
    }
}