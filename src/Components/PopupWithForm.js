import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitFormHandler) {
        super(popupSelector);
        this._submitFormHandler = submitFormHandler;
        this._form = this._popupSelector.querySelector('.popup__window');
        this._inputsList = this._popupSelector.querySelectorAll('.popup__field');
    }

    close() {
        super.close();
        this._form.reset();
    }

    _getInputValues() {
        this._inputArray = Array.from(this._inputsList);
        this._inputsValues = {};
        this._inputArray.forEach((input) => this._inputsValues[input.name] = input.value);
        return this._inputsValues;
    }

    setEventListners() {
        super.setEventListners();
        this._popupSelector.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitFormHandler(this._getInputValues());
        })
    }
}