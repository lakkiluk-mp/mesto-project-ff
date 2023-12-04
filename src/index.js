import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import {
  createCard,handleCardDelete,renderCard,renderCardSt,LikeAdd,popupImage,
} from "./scripts/card.js";

import{ OpenPop, ClosePop,PopUP,EcsRemov} from "./scripts/modal.js";

// редактирование шапки pop-up DOM
const popupTypeEdit = document.querySelector(".popup_type_edit");
const profileEditButton = document.querySelector(".profile__edit-button");
const popupClose = document.querySelectorAll(".popup__close");

// добавление карточки pop-up DOM
const popNewCard = document.querySelector(".popup_type_new-card");
const AddButtonCard = document.querySelector(".profile__add-button");



// Добавление плавности при открытии
popupTypeEdit.classList.add("popup_is-animated");
popNewCard.classList.add("popup_is-animated");
popupImage.classList.add("popup_is-animated");

// открытие окна редактирования шакпки и обновление полей
profileEditButton.addEventListener("click", () => {
OpenPop(popupTypeEdit);
CurrentUpdate();
});

// открытие окна добавления карточки
AddButtonCard.addEventListener("click", () => OpenPop(popNewCard));

// закрытие окон для всех по кнопке закрытия
popupClose.forEach((el) => el.addEventListener("click", ClosePop));

document.addEventListener("keydown", EcsRemov);

// закрытие клик вне области для всех
PopUP.forEach((el) =>el.addEventListener("click", (evt) => {
    if (!el.querySelector(".popup__content").contains(evt.target)) {
      ClosePop();
    }
  })
);

// DOM текущее имя и вид деятельности
const NameCurrent = document.querySelector(".profile__title");
const JobCurrent = document.querySelector(".profile__description");

// фунция передачи текущего значения в поля формы (вызывается при открытии)
function CurrentUpdate() {
  nameInput.value = NameCurrent.textContent;
  jobInput.value = JobCurrent.textContent;
}

// DOM поля формы шапка

const nameInput = popupTypeEdit.querySelector(".popup__input_type_name");
const jobInput = popupTypeEdit.querySelector(".popup__input_type_description");

// функция изменения текущего имени и вида деятельности + закрытие POP-UP
function handleFormSubmit(evt) {
  evt.preventDefault();
  NameCurrent.textContent = nameInput.value;
  JobCurrent.textContent = jobInput.value;
  ClosePop();
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
  ClosePop();
  console.log(initialCards);
  CardNameInput.value = "";
  CardUrlInput.value = "";

  renderCardSt(createCard(initialCards[0], handleCardDelete));
}

popNewCard.addEventListener("submit", CardFormSubmit);



initialCards.forEach((card) => {
  renderCard(createCard(card, handleCardDelete, LikeAdd,OpenPop));
});
