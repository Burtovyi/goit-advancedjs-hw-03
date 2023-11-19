import { fetchBreeds, fetchCatByBreed } from './сomponents/cat-api';

const refs = {
  select: document.querySelector('.breed-select'),
  cat_info: document.querySelector('.cat-info'),
};

fetchBreeds()
  .then(data => {
    refs.select.insertAdjacentHTML('afterbegin', createOption(data.data));
  })
  .catch(function (error) {
    console.log(error);
  });

function createOption(arr) {
  return arr
    .map(
      ({ reference_image_id, name }) =>
        `<option value="${reference_image_id}">${name}</option>`
    )
    .join('');
}

// console.log(fetchCatByBreed);

refs.select.addEventListener('change', e => {
  fetchCatByBreed(e.currentTarget.value).then(data => {
    const img = data.data.url;
    const nameCat = data.data.breeds[0].name;
    const description = data.data.breeds[0].description;
    const temperament = data.data.breeds[0].temperament;

    refs.cat_info.innerHTML = `<img src="${img}" alt="${nameCat}" />
    <h1>${nameCat}</h1>
    <h2>${description}</h2>
    <h2>${temperament}</h2>`;
  });
});

// event => {
//   return event.currentTarget.value;
// };
// console.log(refs.select.currentTarget.value);
// console.log(refs.select);

// function dataSelect() {
//   fetch(`${URL_BREEDS}?api_key=${API_KEY}`)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(response.status);
//       }
//       return response.json();
//     })
//     .then(data => {
//       return data
//         .map(optionMarcup => {
//           `<option value="${optionMarcup.id}">${optionMarcup.name}</option>`;
//         })
//         .join('');
//     })
//     .catch(error => {
//       console.log(error);
//     });
// }

// refs.select.insertAdjacentHTML('beforeend', dataSelect);
