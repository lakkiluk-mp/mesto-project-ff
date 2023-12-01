import './pages/index.css'
import {initialCards} from'./scripts/cards.js'


const cardTemplate = document.querySelector("#card-template").content;
const cardContainer = document.querySelector(".places__list");

function createCard(cardsItem, handleCardDelete) {
  const cardElement = cardTemplate.querySelector(".places__item.card").cloneNode(true);
  cardElement.querySelector(".card__image").src = cardsItem.link;
  cardElement.querySelector(".card__image").alt = cardsItem.name;
  cardElement.querySelector(".card__title").textContent = cardsItem.name;
  cardElement.querySelector(".card__delete-button") .addEventListener("click", handleCardDelete);
  return cardElement;
}


function handleCardDelete(element) {
  const deletingCard = element.target.closest(".places__item.card");
  deletingCard.remove();
}

function renderCard(cardElement) {
  cardContainer.append(cardElement);
}

initialCards.forEach((card) => {
  renderCard(createCard(card, handleCardDelete));
});


// const cardList = document.querySelector(".places__list");

// const addCard = (srcCard, titleCard) => {
//   const cardTemplate = document.querySelector("#card-template").content;
//   const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

//   cardElement.querySelector(".card__image").src = srcCard;
//   cardElement.querySelector(".card__title").textContent = titleCard;

//   cardList.append(cardElement);

//   cardElement.querySelector(".card__delete-button").addEventListener("click", deleteCard);

// };

// // @todo: Функция создания карточки

// // @todo: Функция удаления карточки
// const deleteCard = (event) => {
//   const item = event.target.closest(".card");
//   item.remove();
// };

// // @todo: Вывести карточки на страницу
// initialCards.forEach(function (item) {
//   addCard(item.link, item.name);
// });
