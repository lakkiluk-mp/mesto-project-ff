const template = document.querySelector("#card-template").content;
const cardContainer = document.querySelector(".places__list");
const cardElement = template.querySelector(".places__item.card");

function addCard(cardData, handleCardDelete) {
  cardData.forEach(function (item) {
    const newCard = cardElement.cloneNode(true);
    newCard.querySelector(".card__image").src = item.link;
    newCard.querySelector(" .card__title").textContent = item.name;
    newCard.querySelector(".card__delete-button").addEventListener("click", handleCardDelete);
    cardContainer.append(newCard);
  });
}

function handleCardDelete(evt) {
  const delitCard = evt.target.closest(".places__item.card");
  delitCard.remove();
}

NewCard(initialCards, handleCardDelete);
