import "./pages/index.css";
// import { initialCards } from "./scripts/cards.js";
import {
  createCard,
  handleCardDelete,
  renderCard,
  renderCardStart,
  addLikeToCard,
  deletLikeToCard,
  cardTemplate,
} from "./scripts/card.js";
import { openModal, closeModal } from "./scripts/modal.js";
import { enableValidation, clearValidation } from "./scripts/validation.js";

import {
  addNewCard,
  editProfile,
  getCards,
  updateProfile,
  editAvatar,
} from "./scripts/api.js";

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

// DOM поля формы добавление карточки
const formCard = popNewCard.querySelector(".popup__form");
const cardNameInput = popNewCard.querySelector(".popup__input_type_card-name");
const cardUrlInput = popNewCard.querySelector(".popup__input_type_url");

//добавление плавности при открытии
popupTypeEdit.classList.add("popup_is-animated");
popNewCard.classList.add("popup_is-animated");
popUpImage.classList.add("popup_is-animated");

// DOM поля формы шапка
const nameInput = popupTypeEdit.querySelector(".popup__input_type_name");
const jobInput = popupTypeEdit.querySelector(".popup__input_type_description");

//DOM добавление аватара
const popUpAvatar = document.querySelector(".popup_type_avatar-profile");
const avatarEditButton = document.querySelector(".profile__image");
const avatarUrl = document.querySelector(".popup__input_type_url-avatar");

// DOM текущее имя и вид деятельности
const currentName = document.querySelector(".profile__title");
const currentJob = document.querySelector(".profile__description");
const currentAvatar = document.querySelector(".profile__image");

let userID;
//открытие окна добавления аватара
avatarEditButton.addEventListener("click", () => {
  openModal(popUpAvatar);
  enableValidation(validationConfig);
  clearValidation(popUpAvatar, validationConfig);
});

popUpAvatar.addEventListener("submit", submitAvatarForm);

//функция добавления аватара
function submitAvatarForm(evt) {
  evt.preventDefault();

  editAvatar(avatarUrl.value);
  currentAvatar.style.backgroundImage = `url(${avatarUrl.value})`;

  closeModal(popUpAvatar);
}

//открытие окна редактирования шапки и обновление полей форм
profileEditButton.addEventListener("click", () => {
  openModal(popupTypeEdit);
  fillPopupEditInputs();
  enableValidation(validationConfig);
  clearValidation(popupTypeEdit, validationConfig);
});

//открытие окна добавления карточки
addCardButton.addEventListener("click", () => {
  openModal(popNewCard);
  enableValidation(validationConfig);
});

//функция открытия окна с картинкой
function openPopupImage(link, name) {
  popUpImgUrl.src = link;
  popUpImgUrl.alt = name;
  popUpImgAlt.textContent = name;
  openModal(popUpImage);
}

// фунция передачи текущего значения в поля формы редактирования шапки (вызывается при открытии)
function fillPopupEditInputs() {
  nameInput.value = currentName.textContent;
  jobInput.value = currentJob.textContent;
}

// функция изменения в форме edit текущего имени и вида деятельности + закрытие POP-UP
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  currentName.textContent = nameInput.value;
  currentJob.textContent = jobInput.value;
  editProfile(nameInput.value, jobInput.value);
  closeModal(popupTypeEdit);
}

popupTypeEdit.addEventListener("submit", handleEditFormSubmit);

// функция добаление новой карточки через форму
function submitCardForm(evt) {
  evt.preventDefault();
  const newObj = { name: cardNameInput.value, link: cardUrlInput.value };
  closeModal(popNewCard);
  formCard.reset(evt);
  clearValidation(popNewCard, validationConfig);
  addNewCard(newObj).then((cardData) => {
    renderCardStart(
      createCard(
        cardData,
        handleCardDelete,
        addLikeToCard,
        deletLikeToCard,
        openPopupImage,
        userID,
        cardData.owner._id,
        cardData._id,
        cardData.likes.length
      )
    );
  });
}

popNewCard.addEventListener("submit", submitCardForm);

////////////////
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__input_error-active",
};

Promise.all([updateProfile(), getCards()]).then(([userData, cardsData]) => {
  currentName.textContent = userData.name;
  currentJob.textContent = userData.about;
  currentAvatar.style.backgroundImage = `url('${userData.avatar}')`;
  userID = userData._id;

  cardsData.forEach((card) => {
    // console.log(card)
    renderCard(
      createCard(
        card,
        handleCardDelete,
        addLikeToCard,
        deletLikeToCard,
        openPopupImage,
        userID,
        card.owner._id,
        card._id,
        card.likes.length
      )
    );
  });
});
