import { fetchBreeds, fetchCatByBreed } from "./cat-api.js"
import iziToast from 'izitoast'

const refs = {
    select: document.querySelector('.breed-select'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
    catInfo: document.querySelector('.cat-info')
}

refs.loader.style.display = "none";
refs.error.style.display = "none";

refs.select.addEventListener("change", onChangeSelect)

fetchBreeds()
    .then(({ data }) => {
        refs.loader.style.display = "block";
        refs.select.insertAdjacentHTML('beforeend', createSelectData(data))
    })
    .catch(err => {
        iziToast.error({
            title: 'Error',
            message: `Oops! Something went wrong! Try reloading the page! ${err}`,
            timeout: 2000,
            position: topCenter,
        })
        // return refs.error.style.display = "block"
    })
    .finally(() => {
        refs.loader.style.display = "none";
        refs.error.style.display = "none";
    })

function createSelectData(data) {
    console.log("DATA >>>", data)
    return data.map(({ id, name }) => `<option value=${id}>${name}</option>`).join('')
}

function onChangeSelect(evt) {
    const selectedBreed = evt.target.value
    fetchCatByBreed(selectedBreed)
        .then(dataBreed => createMarkup(dataBreed))
        .catch(err => console.log(err))
}

function createMarkup(data) {

    const { name, description, temperament } = data.data[0].breeds[0]
    const { url } = data.data[0]

    const markupCatInfo = `<div class="wrapper-card">
      <img class="image-cat" src="${url}" alt="${name}" width="600" />
      <div class="wrapper-info">
        <h2 class="name-cat">${name}</h2>
        <p class="description-cat">${description}</p>
        <p class="temperament-cat"><b>Temperament:</b> ${temperament}</p>
      </div>
    </div>`

    refs.catInfo.innerHTML = markupCatInfo;
}
