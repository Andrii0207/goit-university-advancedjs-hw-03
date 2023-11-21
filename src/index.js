import "izitoast/dist/css/iziToast.min.css";
import SlimSelect from 'slim-select'
import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";
import { iziToastError } from "./service.js"

const refs = {
    select: document.querySelector('.breed-select'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
    catInfo: document.querySelector('.cat-info'),
}

const PLACE_HOLDER = "choose a cat";

const slimSelect = new SlimSelect({
    select: refs.select,
})

refs.select.addEventListener("change", onChangeSelect)

fetchBreeds()
    .then(({ data }) => {
        refs.select.innerHTML = ('beforeend', setSelectData(data))
    })
    .catch(err => {
        iziToastError(err)
        refs.error.style.display = "block";
        return;
    })
    .finally(() => {
        refs.loader.style.display = "none";
        refs.error.style.display = "none";
    });

function setSelectData(data) {
    const selectsData = data.map(({ id, name }) => ({ text: name, value: id }))
    return slimSelect.setData(
        [{ 'placeholder': true, 'text': PLACE_HOLDER }, ...selectsData]
    )
}

function onChangeSelect(evt) {
    refs.catInfo.innerHTML = "";
    refs.loader.style.display = "block";
    const selectedBreed = evt.target.value;

    if (selectedBreed === PLACE_HOLDER) return

    fetchCatByBreed(selectedBreed)
        .then(resp => {
            const data = resp.data[0];
            createMarkup({ breeds: data.breeds[0], url: data.url });
        })
        .catch(err => console.log(err))
        .finally(() => refs.loader.style.display = "none");
};

function createMarkup({ breeds, url }) {
    const { name, description, temperament } = breeds;

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
