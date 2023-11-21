import iziToast from 'izitoast';


function iziToastError() {
    iziToast.error({
        title: "ERROR",
        message: `Oops! Something went wrong! Try reloading the page!`,
        timeout: 3000,
        position: "topCenter",
    })
}

// function isLoading(loading) {
//     // refs.loader.style.display = "none"

//     if (loading) {
//         return refs.loader.classList.toggle("visually-hidden")
//     }
// }

export { iziToastError };