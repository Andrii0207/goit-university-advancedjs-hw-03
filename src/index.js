import "izitoast/dist/css/iziToast.min.css";
import iziToastError from "./service.js"
import SlimSelect from 'slim-select'
import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";

const refs = {
    select: document.querySelector('.breed-select'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
    catInfo: document.querySelector('.cat-info'),
}

// const slimSelect = new SlimSelect({
//     select: refs.select,
//     settings: {
//         allowDeselect: true
//     }
// })

refs.select.addEventListener("change", onChangeSelect)

fetchBreeds()
    .then(({ data }) => {
        refs.select.innerHTML = ('beforeend', createSelectData(data))
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

function createSelectData(data) {
    console.log("DATA >>>", data)
    return data.map(({ id, name }) => `<option value=${id} data-placeholder="true">${name}</option>`).join('')
};




function onChangeSelect(evt) {

    refs.catInfo.innerHTML = "";
    refs.loader.style.display = "block";

    const selectedBreed = evt.target.value;

    fetchCatByBreed(selectedBreed)
        .then(dataBreed => createMarkup(dataBreed))
        .catch(err => console.log(err))
        .finally(() => refs.loader.style.display = "none");
};

function createMarkup(data) {

    const { name, description, temperament } = data.data[0].breeds[0];
    const { url } = data.data[0];

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
