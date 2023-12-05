import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import {
  createCard,
  handleCardDelete,
  renderCard,
  renderCardStart,
  addLiketoCard,
  popUpImage,

} from "./scripts/card.js";

import {allPopUP, openPopUp, closePopUp, closePopupByOverlay} from "./scripts/modal.js";

// редактирование шапки pop-up DOM
const popupTypeEdit = document.querySelector(".popup_type_edit");
const profileEditButton = document.querySelector(".profile__edit-button");

// добавление карточки pop-up DOM
const popNewCard = document.querySelector(".popup_type_new-card");
const addCardButton = document.querySelector(".profile__add-button");

// Добавление плавности при открытии
popupTypeEdit.classList.add("popup_is-animated");
popNewCard.classList.add("popup_is-animated");
popUpImage.classList.add("popup_is-animated");

// открытие окна редактирования шапки и обновление полей форм
profileEditButton.addEventListener("click", () => {
  openPopUp(popupTypeEdit);
  fillPopupEditInputs();
});

// открытие окна добавления карточки
addCardButton.addEventListener("click", () => openPopUp(popNewCard));

// закрытие POPUP оверлей и по крестику 
document.addEventListener("click",closePopupByOverlay)






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
  closePopUp(document.querySelector('.popup_is-opened'));;
}

popupTypeEdit.addEventListener("submit", handleEditFormSubmit);

// DOM поля формы добавление карточки
const cardForm = popNewCard.querySelector(".popup__form")
const cardNameInput = popNewCard.querySelector(".popup__input_type_card-name");
const cardUrlInput = popNewCard.querySelector(".popup__input_type_url");

// функция добаление новой карточки через форму
function submitCardForm(evt) {
  evt.preventDefault();
  const newObj = { name: cardNameInput.value, link: cardUrlInput.value };
  closePopUp(document.querySelector('.popup_is-opened'));;
  cardForm.reset(evt)
  renderCardStart(createCard(newObj, handleCardDelete, addLiketoCard, openPopUp)
  );
}

popNewCard.addEventListener("submit", submitCardForm);

initialCards.forEach((card) => {
  renderCard(createCard(card, handleCardDelete, addLiketoCard, openPopUp));
});
