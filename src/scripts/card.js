import { openPopUp } from "./modal.js";

// добавления темплейта в дом
const cardTemplate = document.querySelector("#card-template").content;
// добавление в дом места в разметке куда будут добавляться карточки
const cardContainer = document.querySelector(".places__list");

//кнопка
// const cardLike = document.querySelector('.card__like-button')

// открытие картинки pop-up DOM
const popUpImage = document.querySelector(".popup_type_image");
const cardImage = document.querySelector(".places__list");
const currentUrl = document.querySelector(".popup__image");
const currentAlt = document.querySelector(".popup__caption");


// функция создания карточки
function createCard(cardsItem, handleCardDelete, addLiketoCard,) {
  const cardElement = cardTemplate
    .querySelector(".places__item.card")
    .cloneNode(true);
  cardElement.querySelector(".card__image").src = cardsItem.link;
  cardElement.querySelector(".card__image").alt = cardsItem.name;
  cardElement.querySelector(".card__title").textContent = cardsItem.name;
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", handleCardDelete);
  // добавление лайка
  cardImage.addEventListener("click", addLiketoCard);
  // открытие окна картинки
  cardImage.addEventListener("click", assignCurrentImgSrc);
  return cardElement;
}

//функция удаления карточки
function handleCardDelete(element) {
  const deletingCard = element.target.closest(".places__item.card");
  deletingCard.remove();
}
//функция добавления карточки в разметку
function renderCard(cardElement) {
  cardContainer.append(cardElement);
}
//функция добавления карточки в начало
function renderCardStart(cardElement) {
  cardContainer.prepend(cardElement);
}

// добавление лайка и удаление функция
function addLiketoCard(evt) {
  if (evt.target.classList.contains("card__like-button"))
    evt.target.classList.toggle("card__like-button_is-active");
}

// функция присвоения текущего url и alt при нажатии на картинку + открытие popup
function assignCurrentImgSrc(evt) {
  if (evt.target.classList.contains("card__image")) {
    currentUrl.src = evt.target.src;
    currentAlt.textContent = evt.target.alt;
    openPopUp(popUpImage);
  }
}

export {
  createCard,
  handleCardDelete,
  renderCard,
  renderCardStart,
  addLiketoCard,
  popUpImage
};




