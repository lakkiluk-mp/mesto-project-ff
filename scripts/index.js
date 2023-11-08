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
