import { cardDel, delLike, addLike } from "./api.js";
// добавления темплейта в дом
const cardTemplate = document.querySelector("#card-template").content;
// добавление в дом места в разметке куда будут добавляться карточки
const cardContainer = document.querySelector(".places__list");
const userName = document.querySelector('.profile__title')
// функция создания карточки
function createCard(
  cardsItem,
  handleCardDelete,
  addLikeToCard,
  deletLikeToCard,
  openPopupImage,
  userID,
  cardOwnerID,
  cardID,
  cardLikes
) {
  const cardElement = cardTemplate
    .querySelector(".places__item.card")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDelButt = cardElement.querySelector(".card__delete-button");
  const cardLikeButt = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".card__like-counter");

  cardImage.src = cardsItem.link;
  cardImage.alt = cardsItem.name;
  cardTitle.textContent = cardsItem.name;
  //удаление кнопки лайка у не своей карточки 
  if (userID !== cardOwnerID) {
    cardDelButt.remove();
  }
  //определение постановки лайка отображение при перезагрузке 
  cardsItem.likes.find((el)=>{
    if(el.name === userName.textContent){
      cardLikeButt.classList.add("card__like-button_is-active")
    }
  })
//отображение кол лайков
  likeCounter.textContent = cardLikes;
  cardDelButt.addEventListener("click", (el) => {
    handleCardDelete(el, cardID);
  });
  // добавление лайка по аналогу с удалением
  cardLikeButt.addEventListener("click", (el) => {
    if (!cardLikeButt.classList.contains("card__like-button_is-active")) {
      addLikeToCard(el, cardID);
      likeCounter.textContent++;
    } else {
      deletLikeToCard(el, cardID);
      likeCounter.textContent =  likeCounter.textContent-1;
    }
  });

  //добавление обработчика открытия картинки, передача url,alt
  cardImage.addEventListener("click", () => {
    openPopupImage(cardImage.src, cardImage.alt);
  });

  return cardElement;
}

//функция удаления карточки
function handleCardDelete(element, cardID) {
  const deletingCard = element.target.closest(".places__item.card");
  deletingCard.remove();
  cardDel(cardID);
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
function deletLikeToCard(element, cardID) {
  const like = element.target.closest(".card__like-button");
  like.classList.remove("card__like-button_is-active");
  delLike(cardID);
}
function addLikeToCard(element, cardID) {
  const like = element.target.closest(".card__like-button");
  like.classList.add("card__like-button_is-active");
  addLike(cardID);
}

export {
  createCard,
  handleCardDelete,
  renderCard,
  renderCardStart,
  addLikeToCard,
  deletLikeToCard,
  cardTemplate,
};
