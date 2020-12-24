let editForm = document.querySelector('.edit-form');
let profileEditButton = document.querySelector('.profile__edit-button');
let editFormCloseButton = document.querySelector('.edit-form__close-button');

let profileName = document.querySelector('.profile__name');
let profileSubline = document.querySelector('.profile__name-subline');   

let editFormFieldName = document.querySelector('.edit-form__field-name');
let editFormFieldSubline = document.querySelector('.edit-form__field-subline');

let editFormSaveButton = document.querySelector('.edit-form__button');

function saveValues () {
    profileName.textContent =  editFormFieldName.value;
    profileSubline.textContent = editFormFieldSubline.value;
    editForm.classList.add('hidden');
}


profileEditButton.onclick = () => {
    editForm.classList.remove('hidden');
}

editFormCloseButton.onclick = () => {
    editForm.classList.add('hidden');
}

editFormFieldName.setAttribute('value', profileName.textContent);
editFormFieldSubline.setAttribute("value", profileSubline.textContent);

editFormSaveButton.onclick = () => {
    saveValues();
}

document.onkeydown = function(evt) {
    if (evt.keyCode === 13) {
        evt.preventDefault();
        saveValues();
    }
};


