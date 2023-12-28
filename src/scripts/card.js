// добавления темплейта в дом
const cardTemplate = document.querySelector("#card-template").content;

// функция создания карточки
function createCard(
  cardsItem,
  handleCardDelete,
  openPopupImage,
  userID,
  handleLike,
  // modalCardDelete
) {
  const cardElement = cardTemplate
    .querySelector(".places__item.card")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDelButt = cardElement.querySelector(".card__delete-button");
  const cardLikeButt = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".card__like-counter");
  const cardOwnerID = cardsItem.owner._id;
  const cardID = cardsItem._id;
  const cardLikes = cardsItem.likes.length;
  cardImage.src = cardsItem.link;
  cardImage.alt = cardsItem.name;
  cardTitle.textContent = cardsItem.name;
  //добавление кнопки удаления только своей карточке (проверка)
  if (userID !== cardOwnerID) {
    cardDelButt.remove();
  }

  //определение постановки лайка отображение при перезагрузке
  cardsItem.likes.find((el) => {
    if (el._id === userID) {
      cardLikeButt.classList.add("card__like-button_is-active");
    }
  });
  //отображение кол лайков
  likeCounter.textContent = cardLikes;

  cardDelButt.addEventListener("click", () => {
    // modalCardDelete()
    handleCardDelete(cardID, cardElement);
  });


  cardLikeButt.addEventListener("click", (el) => {
    handleLike(cardID, cardLikeButt, likeCounter);
  });

  //добавление обработчика открытия картинки, передача url,alt
  cardImage.addEventListener("click", () => {
    openPopupImage(cardImage.src, cardImage.alt);
  });

  return cardElement;
}

//функция удаления карточки
function handleDelete(card) {
  card.remove();
}

function toggleLikeToCard(cardLikeButt, dataLikeCounter, likeCounter) {
  cardLikeButt.classList.toggle("card__like-button_is-active");
  likeCounter.textContent = dataLikeCounter;
}

export { createCard, handleDelete,toggleLikeToCard };
