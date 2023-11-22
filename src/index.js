import { fetchBreeds, fetchCatByBreed } from './сomponents/cat-api';
import iziToast from 'izitoast';

const refs = {
  select: document.querySelector('.breed-select'),
  cat_info: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  optionPlug: document.querySelector('.plug'),
};

fetchBreeds()
  .then(data => {
    toggleLoader(true);
    refs.select.insertAdjacentHTML('beforeend', createOption(data.data));
    refs.select.style.display = 'block';
  })
  .catch(function (error) {
    console.log(error);
    iziToast.error({
      title: 'Error',
      message: 'Servi is temporarily out of service.',
    });
  })
  .finally(() => {
    toggleLoader(false);
  });

function createOption(arr) {
  return arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}

refs.select.addEventListener('change', e => {
  toggleLoader(true);
  refs.optionPlug.disabled = true;
  fetchCatByBreed(e.currentTarget.value)
    .then(data => {
      const img = data.data[0].url;
      const nameCat = data.data[0].breeds[0].name;
      const description = data.data[0].breeds[0].description;
      const temperament = data.data[0].breeds[0].temperament;

      refs.cat_info.innerHTML = `<img src="${img}" alt="${nameCat}" />
      <div class="cat_characteristic">
        <h1>${nameCat}</h1>
        <p>${description}</p>
        <p><b>Temperament:</b>${temperament}</p>
      </div>
`;
    })
    .catch(function (error) {
      refs.cat_info.innerHTML = '';
      iziToast.error({
        title: 'Error',
        message: 'Oops! Something went wrong! Try reloading the page!',
      });
    })
    .finally(() => {
      toggleLoader(false);
    });
});

function toggleLoader(isVisible) {
  if (isVisible) {
    refs.loader.classList.remove('loader-hidden');
  } else {
    refs.loader.classList.add('loader-hidden');
  }
}
