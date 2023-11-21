import axios from "axios";

const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY = 'live_5by06OFwHheRUp9VstzvBimzl4BKirSYssLaw602WJRBzfwsIyF76sXRpAIxqc7F';

// axios.defaults.headers.common["x-api-key"] = API_KEY;

const API = axios.create({
    baseURL: BASE_URL,
    headers: {
        common: {
            "x-api-key": API_KEY,
        }
    }
})

function fetchBreeds() {
    return API.get('/breeds')
}

function fetchCatByBreed(breedId) {
    return API.get('images/search', {
        params: {
            breed_ids: breedId,
            order: "ASC",
        }
    })
}

export { fetchBreeds, fetchCatByBreed };

