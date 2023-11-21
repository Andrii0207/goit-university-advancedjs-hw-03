import iziToast from 'izitoast';


export default function iziToastError() {
    iziToast.error({
        title: "ERROR",
        message: `Oops! Something went wrong! Try reloading the page!`,
        timeout: 3000,
        position: "topCenter",
    })
}