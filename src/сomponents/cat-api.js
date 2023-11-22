import axios from 'axios';
const URL_BREEDS = 'https://api.thecatapi.com/v1';
const END_POINTS = '/breeds';
const END_POINT_ID = '/images/search?breed_ids=';
const API_KEY =
  'live_g4r6jksHfEm50QU96rzqaaZ5ngCZFvmDRSqffOEuZ5LU7zJgOlfoyktmWogxNBtJ';
axios.defaults.headers.common['x-api-key'] = API_KEY;

export function fetchBreeds() {
  return axios.get(`${URL_BREEDS}${END_POINTS}`);
}

export function fetchCatByBreed(breedId) {
  axios.defaults.headers.common['x-api-key'] = API_KEY;
  return axios.get(`${URL_BREEDS}${END_POINT_ID}${breedId}`);
}

// https://api.thecatapi.com/v1/images/search?breed_ids=beng
