
// для всех окон DOM
const PopUP = document.querySelectorAll(".popup");


//функция открытия окна + навешиваем обработчик удаления по ESC
function OpenPop(DOM) {
    DOM.classList.add("popup_is-opened");
    document.addEventListener("keydown", EcsRemov);
  }
// функция закрытия окна + снимаем  обработчик удаления по ESC
function ClosePop() {
    PopUP.forEach((el) => el.classList.remove("popup_is-opened"));
    document.removeEventListener("keydown", EcsRemov);
  }



// функция закрытия окна по ESC
  function EcsRemov(evt) {
    if (evt.key === "Escape") {
      ClosePop();
    }
  }

//открытие окна катинка 



  export {OpenPop,ClosePop,PopUP,EcsRemov}