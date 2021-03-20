import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmit) {
        super(popupSelector);
        this._formSubmit = formSubmit;
        this._closeButton = this._popupSelector.querySelector('.popup__close-button');
        this._form = this._popupSelector.querySelector('.popup__window');
        this._inputsList = this._popupSelector.querySelectorAll('.popup__field');
    }

    _close() {
        this._popupSelector.reset();
        super.close();
    }

    _getInputValues() {
        this._inputArray = Array.from(this._inputsList);
        this._inputsValues = {};
        this._inputArray.forEach((input) = this._inputsValues[input.name] = input.value);
        return this._inputsValues;
    }

    setEventListners() {
        super.setEventListners();
        this._popupSelector.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._formSubmit(this._getInputValues());
        })
    }
}