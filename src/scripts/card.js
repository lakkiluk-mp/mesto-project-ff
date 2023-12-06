
// добавления темплейта в дом
const cardTemplate = document.querySelector("#card-template").content;
// добавление в дом места в разметке куда будут добавляться карточки
const cardContainer = document.querySelector(".places__list");

const popUpImgUrl = document.querySelector(".popup__image");
const popUpImgAlt = document.querySelector(".popup__caption");

// функция создания карточки
function createCard(cardsItem, handleCardDelete, addLiketoCard, openPopupImage) {
  const cardElement = cardTemplate.querySelector(".places__item.card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDelButt = cardElement.querySelector(".card__delete-button");
  const cardLikeButt = cardElement.querySelector(".card__like-button");
  cardImage.src = cardsItem.link;
  cardImage.alt = cardsItem.name;
  cardTitle.textContent = cardsItem.name;

  cardDelButt.addEventListener("click", handleCardDelete);
  // добавление лайка по аналогу с удалением
  cardLikeButt.addEventListener("click", addLiketoCard);
  //добваление url и описание к popup + функции открытия
  cardImage.addEventListener("click", () => {
    popUpImgUrl.src = cardImage.src;
    popUpImgAlt.textContent = cardImage.alt;
    openPopupImage();
  });
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
function addLiketoCard(element) {
  const like = element.target.closest(".card__like-button");
  like.classList.toggle("card__like-button_is-active");
}

export {
  createCard,
  handleCardDelete,
  renderCard,
  renderCardStart,
  addLiketoCard,
};
