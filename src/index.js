import "./pages/index.css";
// import { initialCards } from "./scripts/cards.js";
import { createCard, handleDelete, toggleLikeToCard } from "./scripts/card.js";
import { openModal, closeModal } from "./scripts/modal.js";
import { enableValidation, clearValidation } from "./scripts/validation.js";

import {
  addNewCard,
  editProfile,
  getCards,
  updateProfile,
  editAvatar,
  delLike,
  addLike,
  cardDel,
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
const avatarForm = document.querySelector(".popup__form-avatar");
let userID;
// добавление в дом места в разметке куда будут добавляться карточки
const cardContainer = document.querySelector(".places__list");
// функция добавления карточки в разметку
function renderCard(cardElement) {
  cardContainer.append(cardElement);
}
//функция добавления карточки в начало
function renderCardStart(cardElement) {
  cardContainer.prepend(cardElement);
}

//открытие окна добавления аватара
avatarEditButton.addEventListener("click", () => {
  openModal(popUpAvatar);
});

//открытие окна редактирования шапки и обновление полей форм
profileEditButton.addEventListener("click", () => {
  openModal(popupTypeEdit);
  fillPopupEditInputs();
  clearValidation(popupTypeEdit, validationConfig);
});

//открытие окна добавления карточки
addCardButton.addEventListener("click", () => {
  openModal(popNewCard);
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

//функция добавления аватара
function submitAvatarForm(evt) {
  const saveButton = popUpAvatar.querySelector(".popup__button");
  saveButton.textContent = "Сохранение...";
  evt.preventDefault();
  // currentAvatar.style.backgroundImage = `url(${avatarUrl.value})`;
  editAvatar(avatarUrl.value)
    .then((data) => {
      currentAvatar.style.backgroundImage = `url(${data.avatar})`;
      closeModal(popUpAvatar);
      avatarForm.reset();
    })
    .catch((err) => {
      console.log("Ошибка при обновлении данных: ", err);
    })
    .finally(() => (saveButton.textContent = "Сохранить"));
}

popUpAvatar.addEventListener("submit", submitAvatarForm);

// функция изменения в форме edit текущего имени и вида деятельности + закрытие POP-UP
function handleEditFormSubmit(evt) {
  const saveButton = popupTypeEdit.querySelector(".popup__button");
  saveButton.textContent = "Сохранение...";
  evt.preventDefault();
  editProfile(nameInput.value, jobInput.value)
    .then((data) => {
      currentName.textContent = data.name;
      currentJob.textContent = data.about;
      closeModal(popupTypeEdit);
    })
    .catch((err) => {
      console.log("Ошибка при обновлении данных: ", err);
    })
    .finally(() => (saveButton.textContent = "Сохранить"));
}

popupTypeEdit.addEventListener("submit", handleEditFormSubmit);

// функция добаление новой карточки через форму
function submitCardForm(evt) {
  const saveButton = popNewCard.querySelector(".popup__button");
  saveButton.textContent = "Сохранение...";
  evt.preventDefault();
  const newObj = { name: cardNameInput.value, link: cardUrlInput.value };
  addNewCard(newObj)
    .then((cardData) => {
      renderCardStart(
        createCard(
          cardData,
          handleCardDelete,
          openPopupImage,
          userID,
          handleLike
        )
      );
      formCard.reset(evt);
      clearValidation(popNewCard, validationConfig);
      closeModal(popNewCard);
    })
    .catch((err) => {
      console.log("Ошибка при обновлении данных: ", err);
    })
    .finally(() => (saveButton.textContent = "Создать"));
}

popNewCard.addEventListener("submit", submitCardForm);

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__input_error-active",
};

enableValidation(validationConfig);

Promise.all([updateProfile(), getCards()])
  .then(([userData, cardsData]) => {
    currentName.textContent = userData.name;
    currentJob.textContent = userData.about;
    currentAvatar.style.backgroundImage = `url('${userData.avatar}')`;
    userID = userData._id;

    cardsData.forEach((card) => {
      renderCard(
        createCard(card, handleCardDelete, openPopupImage, userID, handleLike)
      );
    });
  })
  .catch((error) => console.log("Ошибка при загрузке данных:", error));

function handleLike(cardID, cardLikeButt, likeCounter) {
  if (cardLikeButt.classList.contains("card__like-button_is-active")) {
    delLike(cardID)
      .then((data) => {
        toggleLikeToCard(cardLikeButt, data.likes.length, likeCounter);
      })
      .catch((err) => {
        console.log("Ошибка тут", err);
      });
  } else {
    addLike(cardID)
      .then((data) => {
        toggleLikeToCard(cardLikeButt, data.likes.length, likeCounter);
      })
      .catch((err) => {
        console.log("Ошибка", err);
      });
  }
}

function handleCardDelete(cardID, cardsItem) {
  cardDel(cardID)
    .then(() => {
      handleDelete(cardsItem);
    })
    .catch((err) => {
      console.log("Ошибка тут", err);
    });
}
