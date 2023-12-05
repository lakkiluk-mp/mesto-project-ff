
const allPopUP = document.querySelectorAll(".popup");


//функция открытия окна + навешиваем обработчик удаления по ESC + навешиваем обработчик удаления по крестику
function openPopUp(el) {
  el.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupByEsc);
}
// функция закрытия окна + снимаем  обработчик удаления по ESC + снимаем обработчик удаления по крестику
function closePopUp(el) {
  el.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupByEsc);
}

// функция закрытия окна по ESC
function closePopupByEsc(evt) {
  if (evt.key === "Escape") {
    closePopUp(document.querySelector('.popup_is-opened'));
  }
}

//функция закрыте окна по оверлей или крестику
function closePopupInOverlayCross(evt) {
  if (evt.target.classList.contains('popup_is-opened')||evt.target.classList.contains('popup__close')) {
    closePopUp(document.querySelector('.popup_is-opened'));;
  }
}

export {allPopUP ,openPopUp ,closePopUp , closePopupByEsc ,closePopupInOverlayCross as closePopupByOverlay};
