import { OpenPop,EcsRemov} from "./modal.js";


// добавления темплейта в дом
const cardTemplate = document.querySelector("#card-template").content;
// добавление в дом места в разметке куда будут добавляться карточки
const cardContainer = document.querySelector(".places__list");

// открытие картинки pop-up DOM
const popupImage = document.querySelector(".popup_type_image");
const cardImage = document.querySelector(".places__list");
const CurrentUrl = document.querySelector(".popup__image");
const CurrentAlt = document.querySelector(".popup__caption");

// функция создания карточки
function createCard(cardsItem, handleCardDelete, LikeAdd) {
  const cardElement = cardTemplate.querySelector(".places__item.card").cloneNode(true);
  cardElement.querySelector(".card__image").src = cardsItem.link;
  cardElement.querySelector(".card__image").alt = cardsItem.name;
  cardElement.querySelector(".card__title").textContent = cardsItem.name;
  cardElement.querySelector(".card__delete-button").addEventListener("click", handleCardDelete);
    // добавление лайка
  cardImage.addEventListener("click", LikeAdd);
  // открытие окна картинки
  cardImage.addEventListener("click", (evt)=>{
    if (evt.target.classList.contains("card__image")){
    OpenPop(popupImage)
    CurrentUrl.src = evt.target.src;
    CurrentAlt.textContent = evt.target.alt;
    }})

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

function renderCardSt(cardElement) {
  cardContainer.prepend(cardElement);
}

// добавление лайка и удаление функция
function LikeAdd(evt) {
  if (evt.target.classList.contains("card__like-button"))
    evt.target.classList.toggle("card__like-button_is-active");
}

// функция присвоения текущего url и alt при нажатии на картинку 
function CurrentImgSrc (evt){
  if (evt.target.classList.contains("card__image")) {
    CurrentUrl.src = evt.target.src;
    CurrentAlt.textContent = evt.target.alt;
}
}

export {
  createCard,
  handleCardDelete,
  renderCard,
  renderCardSt,
  LikeAdd,
  popupImage,
};
