//button nodes
const getRandomButton = document.getElementById('get-random-button');
const addFavoriteButton = document.getElementById('add-favorite-button');
const getFavoriteButton = document.getElementById('get-favorite-button');
const removeFavoriteButton = document.getElementById('remove-favorite-button');

//img nodes
const randomImgNODE = document.getElementById('random-img');
const favoriteImgNode = document.getElementById('favorite-img');

//display random img
getRandomButton.addEventListener('click', getRandomImg);
let currentRandomImg;

async function getRandomImg() {
  await fetch('https://api.thecatapi.com/v1/images/search')
    .then((response) => response.json())
    .then((data) => {
      randomImgNODE.src = data[0].url;
      currentRandomImg = data[0];
    });
}

//add random img to favorite
addFavoriteButton.addEventListener('click', addFavoriteImg);

async function addFavoriteImg() {
  await fetch('https://api.thecatapi.com/v1/favourites', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': '98cf8a7f-84d1-449a-91a5-158be79f1f83',
    },
    body: JSON.stringify({
      image_id: currentRandomImg.id,
      sub_id: 'mob-123',
    }),
  });
  getFavoriteImg();
}

//get favorite img
getFavoriteButton.addEventListener('click', getFavoriteImg);
let currentFavoriteImg;

function getFavoriteImg() {
  fetch('https://api.thecatapi.com/v1/favourites?sub_id=mob-123', {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': '98cf8a7f-84d1-449a-91a5-158be79f1f83',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0) {
        favoriteImgNode.src = data[data.length - 1].image.url;
        currentFavoriteImg = data[data.length - 1];
      } else {
        favoriteImgNode.src = '';
        currentFavoriteImg = data[0];
      }
    });
}

//delete favorite img
removeFavoriteButton.addEventListener('click', removeFromFavorite);

async function removeFromFavorite() {
  if (!currentFavoriteImg) return;
  await fetch(`https://api.thecatapi.com/v1/favourites/${currentFavoriteImg.id}`, {
    method: 'DELETE',
    headers: { 'x-api-key': '98cf8a7f-84d1-449a-91a5-158be79f1f83' },
  });
  getFavoriteImg();
}

//init page
getRandomImg();
getFavoriteImg();
