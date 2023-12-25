(()=>{"use strict";var e={baseUrl:"https://mesto.nomoreparties.co/v1/wff-cohort-3",headers:{authorization:"0896f9f7-5274-4e46-b933-ae3efb20bf7b","Content-Type":"application/json"}};function t(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}var n=document.querySelector("#card-template").content,o=document.querySelector(".places__list"),r=document.querySelector(".profile__title");function c(e,t,o,c,a,i,u,l,s){var d=n.querySelector(".places__item.card").cloneNode(!0),p=d.querySelector(".card__image"),f=d.querySelector(".card__title"),_=d.querySelector(".card__delete-button"),m=d.querySelector(".card__like-button"),y=d.querySelector(".card__like-counter");return p.src=e.link,p.alt=e.name,f.textContent=e.name,i!==u&&_.remove(),e.likes.find((function(e){e.name===r.textContent&&m.classList.add("card__like-button_is-active")})),y.textContent=s,_.addEventListener("click",(function(e){t(e,l)})),m.addEventListener("click",(function(e){m.classList.contains("card__like-button_is-active")?(c(e,l),y.textContent=y.textContent-1):(o(e,l),y.textContent++)})),p.addEventListener("click",(function(){a(p.src,p.alt)})),d}function a(t,n){t.target.closest(".places__item.card").remove(),function(t){fetch("".concat(e.baseUrl,"/cards/").concat(t),{method:"DELETE",headers:e.headers}).catch((function(e){console.log(e)}))}(n)}function i(n,o){n.target.closest(".card__like-button").classList.remove("card__like-button_is-active"),function(n){fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"DELETE",headers:e.headers}).then(t)}(o)}function u(t,n){t.target.closest(".card__like-button").classList.add("card__like-button_is-active"),function(t){fetch("".concat(e.baseUrl,"/cards/likes/").concat(t),{method:"PUT",headers:e.headers})}(n)}function l(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",d),document.addEventListener("click",p)}function s(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",d),document.removeEventListener("click",p)}function d(e){"Escape"===e.key&&s(document.querySelector(".popup_is-opened"))}function p(e){(e.target.classList.contains("popup_is-opened")||e.target.classList.contains("popup__close"))&&s(document.querySelector(".popup_is-opened"))}function f(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),o.classList.remove(n.errorClass),o.textContent=""}var _=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))},m=function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);_(n,o,t),n.forEach((function(r){r.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?f(e,t,n):function(e,t,n,o){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add(o.inputErrorClass),r.classList.add(o.errorClass),r.textContent=n}(e,t,t.validationMessage,n)}(e,r,t),_(n,o,t)}))}))}(t,e)}))},y=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);o.disabled=!1,o.classList.remove(t.inactiveButtonClass),n.forEach((function(n){f(e,n,t)}))};function v(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}var h=document.querySelector(".popup_type_edit"),S=document.querySelector(".profile__edit-button"),b=document.querySelector(".popup_type_new-card"),q=document.querySelector(".profile__add-button"),C=document.querySelector(".popup_type_image"),g=document.querySelector(".popup__image"),L=document.querySelector(".popup__caption"),k=b.querySelector(".popup__form"),E=b.querySelector(".popup__input_type_card-name"),x=b.querySelector(".popup__input_type_url");h.classList.add("popup_is-animated"),b.classList.add("popup_is-animated"),C.classList.add("popup_is-animated");var A,U=h.querySelector(".popup__input_type_name"),w=h.querySelector(".popup__input_type_description"),j=document.querySelector(".popup_type_avatar-profile"),O=document.querySelector(".profile__image"),T=document.querySelector(".popup__input_type_url-avatar"),B=document.querySelector(".profile__title"),D=document.querySelector(".profile__description"),P=document.querySelector(".profile__image"),I=document.querySelector(".popup__form-avatar");function M(e,t){g.src=e,g.alt=t,L.textContent=t,l(C)}O.addEventListener("click",(function(){l(j),m(N)})),S.addEventListener("click",(function(){l(h),U.value=B.textContent,w.value=D.textContent,m(N),y(h,N)})),q.addEventListener("click",(function(){l(b),m(N)})),j.addEventListener("submit",(function(n){var o,r=j.querySelector(".popup__button");r.textContent="Сохранение...",n.preventDefault(),P.style.backgroundImage="url(".concat(T.value,")"),(o=T.value,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:o})}).then(t).catch((function(e){console.log(e)}))).then((function(e){s(j),I.reset()})).catch((function(e){console.log("Ошибка при обновлении данных: ",e)})).finally((function(){return r.textContent="Сохранить"}))})),h.addEventListener("submit",(function(n){var o=h.querySelector(".popup__button");o.textContent="Сохранение...",n.preventDefault(),function(n,o){return fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:n,about:o})}).then(t).catch((function(e){console.log(e)}))}(U.value,w.value).then((function(e){B.textContent=U.value,D.textContent=w.value,s(h)})).catch((function(e){console.log("Ошибка при обновлении данных: ",e)})).finally((function(){return o.textContent="Сохранить"}))})),b.addEventListener("submit",(function(n){var r,l=b.querySelector(".popup__button");l.textContent="Сохранение...",n.preventDefault(),(r={name:E.value,link:x.value},fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:r.name,link:r.link})}).then(t).catch((function(e){console.log(e)}))).then((function(e){var t;t=c(e,a,u,i,M,A,e.owner._id,e._id,e.likes.length),o.prepend(t),k.reset(n),y(b,N),s(b)})).catch((function(e){console.log("Ошибка при обновлении данных: ",e)})).finally((function(){return l.textContent="Сохранить"}))}));var N={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_inactive",inputErrorClass:"popup__input_error",errorClass:"popup__input_error-active"};Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then((function(e){return e.json()})).catch((function(e){console.log(e)})),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then(t).catch((function(e){console.log(e)}))]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,r,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(o=c.call(n)).done)&&(i.push(o.value),i.length!==t);u=!0);}catch(e){l=!0,r=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw r}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return v(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?v(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),l=r[0],s=r[1];B.textContent=l.name,D.textContent=l.about,P.style.backgroundImage="url('".concat(l.avatar,"')"),A=l._id,s.forEach((function(e){var t;t=c(e,a,u,i,M,A,e.owner._id,e._id,e.likes.length),o.append(t)}))}))})();