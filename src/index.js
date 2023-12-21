import "./pages/index.css";
// import { initialCards } from "./scripts/cards.js";
import {
  createCard,
  handleCardDelete,
  renderCard,
  renderCardStart,
  addDeletLikeToCard,
  cardTemplate,
} from "./scripts/card.js";
import { openModal, closeModal } from "./scripts/modal.js";
import { enableValidation, clearValidation } from "./scripts/validation.js";
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

let userID

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

// DOM текущее имя и вид деятельности
const currentName = document.querySelector(".profile__title");
const currentJob = document.querySelector(".profile__description");
const currentAvatar = document.querySelector(".profile__image");

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
  editProfile();
  closeModal(popupTypeEdit);
}

popupTypeEdit.addEventListener("submit", handleEditFormSubmit);

// DOM поля формы добавление карточки
const formCard = popNewCard.querySelector(".popup__form");
const cardNameInput = popNewCard.querySelector(".popup__input_type_card-name");
const cardUrlInput = popNewCard.querySelector(".popup__input_type_url");
//like counter
const likeCounter = cardTemplate.querySelector(".card__like-counter");

// функция добаление новой карточки через форму
function submitCardForm(evt) {
  evt.preventDefault();
  const newObj = { name: cardNameInput.value, link: cardUrlInput.value };
  closeModal(popNewCard);
  formCard.reset(evt);
  clearValidation(popNewCard, validationConfig);
  // console.log(newObj.name)
  addNewCard(newObj);

  renderCardStart(
    createCard(
      newObj,
      handleCardDelete,
      addDeletLikeToCard,
      openPopupImage,
      userID
    )
  );
}

popNewCard.addEventListener("submit", submitCardForm);

// initialCards.forEach((card) => {
//   renderCard(
//     createCard(card, handleCardDelete, addDeletLikeToCard, openPopupImage)
//   );
// });

////////////////
;

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_error",
  errorClass: "popup__input_error-active",
};

//обновление информации о пользователе
function updateProfile() {
  fetch("https://mesto.nomoreparties.co/v1/wff-cohort-3/users/me", {
    headers: {
      authorization: "0896f9f7-5274-4e46-b933-ae3efb20bf7b",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      currentName.textContent = data.name;
      currentJob.textContent = data.about;
      currentAvatar.style.backgroundImage = `url('${data.avatar}')`;
      userID = data._id;
      console.log(userID);
    })
    .catch((err) => {
      console.log("Proeb1");
    });
}

updateProfile();

// Загрузка карточек  с сервера
function getCards() {
  fetch("https://mesto.nomoreparties.co/v1/wff-cohort-3/cards", {
    headers: {
      authorization: "0896f9f7-5274-4e46-b933-ae3efb20bf7b",
    },
  })
    .then((res) => {
      return res.json();
    })

    .then((data) => {
      data.forEach((card) => {

        renderCard(
          createCard(
            card,
            handleCardDelete,
            addDeletLikeToCard,
            openPopupImage,
            userID,
            card.owner._id
          )
        );
      });
    })
    .catch((err) => {
      console.log("Proeb2");
    });
}

getCards();

//отображение лайков
function getCardsLike() {
  return fetch("https://mesto.nomoreparties.co/v1/wff-cohort-3/cards", {
    headers: {
      authorization: "0896f9f7-5274-4e46-b933-ae3efb20bf7b",
    },
  })
    .then((res) => {
      return res.json();
    })

    .then((data) => {
      data.forEach((card) => {
        likeCounter.textContent = card.likes.length;
      });
    })
    .catch((err) => {
      console.log("Proeb5");
    });
}
getCardsLike();

//Редактирование профиля
function editProfile() {
  fetch("https://mesto.nomoreparties.co/v1/wff-cohort-3/users/me", {
    method: "PATCH",
    headers: {
      authorization: "0896f9f7-5274-4e46-b933-ae3efb20bf7b",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameInput.value,
      about: jobInput.value,
    }),
  }).catch((err) => {
    console.log("Proeb4");
  });
}

//добавление новой карточки
function addNewCard(cardObj) {
  fetch("https://mesto.nomoreparties.co/v1/wff-cohort-3/cards", {
    method: "POST",
    headers: {
      authorization: "0896f9f7-5274-4e46-b933-ae3efb20bf7b",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: cardObj.name,
      link: cardObj.link,
    }),
  }).catch((err) => {
    console.log("Proeb3");
  });
}
