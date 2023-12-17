import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import {
  createCard,
  handleCardDelete,
  renderCard,
  renderCardStart,
  addDeletLikeToCard,
} from "./scripts/card.js";
import { openModal, closeModal } from "./scripts/modal.js";

// редактирование шапки pop-up DOM
const popupTypeEdit = document.querySelector(".popup_type_edit");
const profileEditButton = document.querySelector(".profile__edit-button");

// добавление карточки pop-up DOM
const popNewCard = document.querySelector(".popup_type_new-card");
const addCardButton = document.querySelector(".profile__add-button");

//добавление popup картинки
const popUpImage = document.querySelector(".popup_type_image");
const popUpImgUrl = document.querySelector(".popup__image");
const popUpImgAlt = document.querySelector(".popup__caption");
//добавление плавности при открытии
popupTypeEdit.classList.add("popup_is-animated");
popNewCard.classList.add("popup_is-animated");
popUpImage.classList.add("popup_is-animated");

//открытие окна редактирования шапки и обновление полей форм
profileEditButton.addEventListener("click", () => {
  openModal(popupTypeEdit);
  fillPopupEditInputs();
});

//открытие окна добавления карточки
addCardButton.addEventListener("click", () => openModal(popNewCard));

//функция открытия окна с картинкой
function openPopupImage(link, name) {
  popUpImgUrl.src = link;
  popUpImgUrl.alt = name;
  popUpImgAlt.textContent = name;
  openModal(popUpImage);
}

// DOM текущее имя и вид деятельности
const currentName = document.querySelector(".profile__title");
const currentJob = document.querySelector(".profile__description");

// фунция передачи текущего значения в поля формы редактирования шапки (вызывается при открытии)
function fillPopupEditInputs() {
  nameInput.value = currentName.textContent;
  jobInput.value = currentJob.textContent;
}

// DOM поля формы шапка
const nameInput = popupTypeEdit.querySelector(".popup__input_type_name");
const jobInput = popupTypeEdit.querySelector(".popup__input_type_description");

// функция изменения в форме edit текущего имени и вида деятельности + закрытие POP-UP
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  currentName.textContent = nameInput.value;
  currentJob.textContent = jobInput.value;
  closeModal(popupTypeEdit);
}

popupTypeEdit.addEventListener("submit", handleEditFormSubmit);

// DOM поля формы добавление карточки
const formElement = popNewCard.querySelector(".popup__form");
const cardNameInput = popNewCard.querySelector(".popup__input_type_card-name");
const cardUrlInput = popNewCard.querySelector(".popup__input_type_url");

// функция добаление новой карточки через форму
function submitCardForm(evt) {
  evt.preventDefault();
  const newObj = { name: cardNameInput.value, link: cardUrlInput.value };
  closeModal(popNewCard);
  formElement.reset(evt);
  renderCardStart(
    createCard(newObj, handleCardDelete, addDeletLikeToCard, openPopupImage)
  );
}

popNewCard.addEventListener("submit", submitCardForm);

initialCards.forEach((card) => {
  renderCard(
    createCard(card, handleCardDelete, addDeletLikeToCard, openPopupImage)
  );
});

////////////////


//проверка на ошибки, вызов error полей 
function isValid(formElement, inputElement) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    console.log(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

// показывает span ошибки 
function showInputError(formElement, inputElement, errMessage) {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add("popup__input_error");
  formError.classList.add("popup__input_error-active");
  formError.textContent = errMessage;
}

//скрывает span ошибки 
function hideInputError(formElement, inputElement) {
  const formError = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("popup__input_error");
  formError.classList.remove("popup__input_error-active");
  formError.textContent = "";
}

//проверяет все поля на ошибки 
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// деляет кнопку inactive если хоть в одном поле ошибка 
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add("popup__button_inactive");
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove("popup__button_inactive");
  }
};

// добавления обработчика валидации всем полям ввода
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button");
  //toggleButtonState(inputList,buttonElement)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};


// добавления обработчика валидации всем формам
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};
enableValidation();
