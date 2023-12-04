import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import {
  createCard,
  handleCardDelete,
  renderCard,
  renderCardStart,
  LikeAdd,
  PopUpImage,
 
} from "./scripts/card.js";

import {AllPopUP, OpenPopUp, ClosePopUp,Overlay} from "./scripts/modal.js";

// все PopUP в проекте


// редактирование шапки pop-up DOM
const popupTypeEdit = document.querySelector(".popup_type_edit");
const ProfileEditButton = document.querySelector(".profile__edit-button");

// добавление карточки pop-up DOM
const popNewCard = document.querySelector(".popup_type_new-card");
const AddCardButton = document.querySelector(".profile__add-button");

// Добавление плавности при открытии
popupTypeEdit.classList.add("popup_is-animated");
popNewCard.classList.add("popup_is-animated");
PopUpImage.classList.add("popup_is-animated");

// открытие окна редактирования шапки и обновление полей форм
ProfileEditButton.addEventListener("click", () => {
  OpenPopUp(popupTypeEdit);
  CurrentUpdate();
});

// открытие окна добавления карточки
AddCardButton.addEventListener("click", () => OpenPopUp(popNewCard));

// закрытие POPUP оверлей для всех
AllPopUP.forEach((el) =>el.addEventListener("click", (evt) => Overlay(el,evt))
);



// DOM текущее имя и вид деятельности
const NameCurrent = document.querySelector(".profile__title");
const JobCurrent = document.querySelector(".profile__description");

// фунция передачи текущего значения в поля формы (вызывается при открытии)
function CurrentUpdate() {
  NameInput.value = NameCurrent.textContent;
  JobInput.value = JobCurrent.textContent;
}

// DOM поля формы шапка
const NameInput = popupTypeEdit.querySelector(".popup__input_type_name");
const JobInput = popupTypeEdit.querySelector(".popup__input_type_description");

// функция изменения текущего имени и вида деятельности + закрытие POP-UP
function handleFormSubmit(evt) {
  evt.preventDefault();
  NameCurrent.textContent = NameInput.value;
  JobCurrent.textContent = JobInput.value;
  ClosePopUp();
}

popupTypeEdit.addEventListener("submit", handleFormSubmit);

// DOM поля формы добавление карточки
const CardNameInput = popNewCard.querySelector(".popup__input_type_card-name");
const CardUrlInput = popNewCard.querySelector(".popup__input_type_url");

// функция добаление новой карточки через форму
function CardFormSubmit(evt) {
  evt.preventDefault();
  let newObj = { name: CardNameInput.value, link: CardUrlInput.value };
  initialCards.unshift(newObj);
  ClosePopUp();
  CardNameInput.value = "";
  CardUrlInput.value = "";

  renderCardStart(
    createCard(initialCards[0], handleCardDelete, LikeAdd, OpenPopUp)
  );
}

popNewCard.addEventListener("submit", CardFormSubmit);

initialCards.forEach((card) => {
  renderCard(createCard(card, handleCardDelete, LikeAdd, OpenPopUp));
});
