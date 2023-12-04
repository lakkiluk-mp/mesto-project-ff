
const AllPopUP = document.querySelectorAll(".popup");
// крестик popup
const PopUpClose = document.querySelectorAll(".popup__close");

//функция открытия окна + навешиваем обработчик удаления по ESC + навешиваем обработчик удаления по крестику
function OpenPopUp(DOM) {
  DOM.classList.add("popup_is-opened");
  document.addEventListener("keydown", EcsRemov);
  PopUpClose.forEach((el) => el.addEventListener("click", ClosePopUp));
}
// функция закрытия окна + снимаем  обработчик удаления по ESC + снимаем обработчик удаления по крестику
function ClosePopUp() {
AllPopUP.forEach((el) => el.classList.remove("popup_is-opened"));
  document.removeEventListener("keydown", EcsRemov);
  AllPopUP.forEach((el) => el.removeEventListener("click", ClosePopUp));
}

// функция закрытия окна по ESC
function EcsRemov(evt) {
  if (evt.key === "Escape") {
    ClosePopUp();
  }
}

//функция закрыте окна по оверлей

function Overlay(el,evt) {
  if (!el.querySelector(".popup__content").contains(evt.target)) {
    ClosePopUp();
  }
}

export {AllPopUP,OpenPopUp, ClosePopUp, EcsRemov,Overlay};
