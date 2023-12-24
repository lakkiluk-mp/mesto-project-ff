const config = {
    baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-3",
    headers: {
      authorization: "0896f9f7-5274-4e46-b933-ae3efb20bf7b",
      "Content-Type": "application/json",
    },
  };
  //обновление информации о пользователе
  function updateProfile() {
   return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers,
    })
    .then((res=>res.json()))
      .catch(() => {
        console.log("Proeb1");
      });
  }
  
  
  // Загрузка карточек  с сервера
  function getCards() {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers,
    })
    .then(res=>res.json())

      .catch(() => {
        console.log("Proeb2");
      });
  }
  
  //Редактирование профиля
  function editProfile(nameInput,jobInput) {
    fetch(`${config.baseUrl}/users/me`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({
        name: nameInput,
        about: jobInput,
      }),

    })
    .catch(() => {
      console.log("Proeb4");
    });
  }


  //добавление аватара 
  function editAvatar(avatarInput) {
    fetch(`${config.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({
        avatar: avatarInput,

      }),

    })
    .then((res)=>res.json())
    .then((data)=>console.log(data))
    .catch(() => {
      console.log("Proeb6");
    });
  }




  //добавление новой карточки
  function addNewCard(cardObj) {
  return fetch(`${config.baseUrl}/cards`, {
      method: "POST",
      headers: config.headers,
      body: JSON.stringify({
        name: cardObj.name,
        link: cardObj.link,
  
      }),
      
    })
    .then((res)=>res.json())
    .catch(() => {
      console.log("Proeb3");
    });
  }

  function cardDel(cardID){
    return fetch(`${config.baseUrl}/cards/${cardID}`, {


        method: "DELETE",
        headers: config.headers,
    })
    .catch((err)=>{
      console.log("только свои посты")
    })
    };



//удаление лайка 
function delLike(cardID){
  return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
    method: "DELETE",
    headers: config.headers,  
})

.then((res)=>res.json())
.then((data)=>console.log(data))
}
//добавление лайка
function addLike(cardID){
  return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {


    method: "PUT",
    headers: config.headers,  
})
}
 // export {cardDel,addNewCard,editProfile,getCardsLike,getCards,updateProfile} 
 export {updateProfile,getCards,editProfile,addNewCard,cardDel,delLike,addLike,editAvatar} 