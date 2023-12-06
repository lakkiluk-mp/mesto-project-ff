
//функция открытия окна + навешиваем обработчик закрытия по ESC + навешиваем обработчик оверлей и крестик
function openModal(el) {
  el.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupByEsc);
  document.addEventListener("click",closePopupInOverlayCross)
}
// функция закрытия окна + снимаем  обработчик закрытия по ESC + снимаем обработчик оверлей и крестик
function closeModal(el) {
  el.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupByEsc);
  document.removeEventListener("click",closePopupInOverlayCross)
}

// функция закрытия окна по ESC
function closePopupByEsc(evt) {
  if (evt.key === "Escape") {
    closeModal(document.querySelector('.popup_is-opened'));
  }
}

//функция закрытия окна по оверлей или крестику
function closePopupInOverlayCross(evt) {
  if (evt.target.classList.contains('popup_is-opened')||evt.target.classList.contains('popup__close')) {
    closeModal(document.querySelector('.popup_is-opened'));;
  }
}

export {openModal,closeModal,};
