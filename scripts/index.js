const template = document.querySelector("#card-template").content;
const CardContainer = document.querySelector(".places__list");
const CardElement = template.querySelector(".places__item.card");

function NewCard(DiscripCard, handleCardDelete) {
  DiscripCard.forEach(function (item) {
    const NewCard = CardElement.cloneNode(true);
    NewCard.querySelector(".card__image").src = item.link;
    NewCard.querySelector(".card__title").textContent = item.name;
    NewCard.querySelector(".card__delete-button").addEventListener("click", handleCardDelete);
    CardContainer.append(NewCard);
  });
}

function handleCardDelete(evt) {
  const DelCard = evt.target.closest(".places__item.card");
  DelCard.remove();
}

NewCard(initialCards, handleCardDelete);
