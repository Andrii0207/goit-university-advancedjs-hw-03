import axios from "axios";

const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY = 'live_5by06OFwHheRUp9VstzvBimzl4BKirSYssLaw602WJRBzfwsIyF76sXRpAIxqc7F';

axios.defaults.headers.common["x-api-key"] = API_KEY;

const instance = axios.create({
    baseURL: BASE_URL,
})

function fetchBreeds() {
    // return fetch(`${BASE_URL}/breeds`)
    return instance.get('/breeds')
}

function fetchCatByBreed(breedId) {
    // return fetch(`${BASE_URL}/images/search?breed_ids=${breedId}&api_key=${API_KEY}`)
    return instance.get('images/search', {
        params: {
            breed_ids: breedId
        }
    })
}

export { fetchBreeds, fetchCatByBreed };

