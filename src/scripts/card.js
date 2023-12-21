
// добавления темплейта в дом
const cardTemplate = document.querySelector("#card-template").content;
// добавление в дом места в разметке куда будут добавляться карточки
const cardContainer = document.querySelector(".places__list");

// функция создания карточки
function createCard(cardsItem, handleCardDelete, addDeletLiketoCard, openPopupImage,userID,cardID) {
  const cardElement = cardTemplate.querySelector(".places__item.card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDelButt = cardElement.querySelector(".card__delete-button");
  const cardLikeButt = cardElement.querySelector(".card__like-button");

  cardImage.src = cardsItem.link;
  cardImage.alt = cardsItem.name;
  cardTitle.textContent = cardsItem.name;
   //console.log(userID)
  //  console.log(cardID)
  if(userID!==cardID){
     cardDelButt.remove() 
  }

  cardDelButt.addEventListener("click",(el)=>{

   handleCardDelete(el,cardID)});
  // добавление лайка по аналогу с удалением
  cardLikeButt.addEventListener("click", addDeletLiketoCard);
  //добавление обработчика открытия картинки, передача url,alt
  cardImage.addEventListener("click", () => {
    openPopupImage(cardImage.src,cardImage.alt);
  });

  
  return cardElement;

}

//функция удаления карточки
function handleCardDelete(element,cardOwnerId) {
  const deletingCard = element.target.closest(".places__item.card");
  deletingCard.remove();
  cardDel(cardOwnerId)
  console.log(cardOwnerId)
}

const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-3',
  headers: {
    authorization: '0896f9f7-5274-4e46-b933-ae3efb20bf7b',
    'Content-Type': 'application/json'
  }
}


function cardDel(cardOwnerId){
  fetch(`${config.baseUrl}/cards/${cardOwnerId}`, {
      method: "DELETE",
      headers: config.headers,
  })
  
  
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
function addDeletLikeToCard(element) {
  const like = element.target.closest(".card__like-button");
  like.classList.toggle("card__like-button_is-active");
}

export {
  createCard,
  handleCardDelete,
  renderCard,
  renderCardStart,
  addDeletLikeToCard,
  cardTemplate,
};
