const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-3",
  headers: {
    authorization: "0896f9f7-5274-4e46-b933-ae3efb20bf7b",
    "Content-Type": "application/json",
  },
};

function errorCatch(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

//обновление информации о пользователе
function updateProfile() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
}

// Загрузка карточек  с сервера
function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then(errorCatch)

    .catch((err) => {
      console.log(err);
    });
}

//Редактирование профиля
function editProfile(nameInput, jobInput) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: nameInput,
      about: jobInput,
    }),
  })
    .then(errorCatch)
    .catch((err) => {
      console.log(err);
    });
}

//добавление аватара
function editAvatar(avatarInput) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarInput,
    }),
  })
    .then(errorCatch)
    .catch((err) => {
      console.log(err);
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
    .then(errorCatch)
    .catch((err) => {
      console.log(err);
    });
}
//удаление карточки 
function cardDel(cardID) {
  return fetch(`${config.baseUrl}/cards/${cardID}`, {
    method: "DELETE",
    headers: config.headers,
  }).catch((err) => {
    console.log(err);
  });
}

//удаление лайка
function delLike(cardID) {
  return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(errorCatch);
}
//добавление лайка
function addLike(cardID) {
  return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
    method: "PUT",
    headers: config.headers,
  });
}

export {
  updateProfile,
  getCards,
  editProfile,
  addNewCard,
  cardDel,
  delLike,
  addLike,
  editAvatar,
};
