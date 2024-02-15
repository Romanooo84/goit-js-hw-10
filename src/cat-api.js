import axios from "axios";
import Notiflix from 'notiflix';

//inicjalizacja Notyiflix
Notiflix.Notify.init({
  width: '300px',
  position: 'right-top',
  distance: '40px',
  opacity: 1,
  borderRadius: '5px',
  timeout: 5000,
  cssAnimation: true,
  cssAnimationDuration: 700,
  cssAnimationStyle: 'zoom', // 'fade' - 'zoom' - 'from-right' - 'from-top' - 'from-bottom' - 'from-left'
  useIcon: true,
  warning: {
    background: '#ff5549',
    textColor: '#fff',
    childClassName: 'notiflix-notify-warning',
    notiflixIconColor: 'rgba(0,0,0,0.2)',
    fontAwesomeClassName: 'fas fa-exclamation-circle',
    fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
    backOverlayColor: 'rgba(238,191,49,0.2)',
  },
  success: {
    background: '#32c682',
    textColor: '#fff',
    childClassName: 'notiflix-notify-success',
    notiflixIconColor: 'rgba(0,0,0,0.2)',
    fontAwesomeClassName: 'fas fa-check-circle',
    fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
    backOverlayColor: 'rgba(50,198,130,0.2)',
  },

});

axios.defaults.headers.common["x-api-key"] = "live_m8CS4EOrduj1utGIHy5GJ517akfZuvCGnOVkYNv6vLHNOqWXTuP1xuqKnt6dFoJT";

export function fetchBreeds(loadElement, select, divInfo) {
    loadElement.classList.add('loaderData')
    select.classList.add('visually-hidden')
    divInfo.classList.add('visually-hidden')
    return fetch('https://api.thecatapi.com/v1/breeds')
        .then(response => {
            if (!response.ok) {
                Notiflix.Notify.warning("Response failed");
                throw new Error(response.status);
            }
            loadElement.classList.remove('loaderData')
            select.classList.remove('visually-hidden')
            divInfo.classList.remove('visually-hidden')
            return response.json()
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            Notiflix.Notify.warning('Error fetching data:'+ error);
            select.classList.remove('visually-hidden')
            divInfo.classList.remove('visually-hidden')
        });
}

export function catByBreed(breedId, loadElement, select, divInfo) {
    loadElement.classList.add('loaderData')
    select.classList.add('visually-hidden')
    divInfo.classList.add('visually-hidden')
    return fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
        .then(response => {
            if (!response.ok) {
                Notiflix.Notify.warning("Response failed");
                throw new Error(response.status);
            }
            loadElement.classList.remove('loaderData')
            select.classList.remove('visually-hidden')
            divInfo.classList.remove('visually-hidden')
            return response.json()
        })
        .then(data => {
            console.log(data);
            return data;
        })
        .catch(error => {
            Notiflix.Notify.warning('Error fetching data:' + error);
            select.classList.remove('visually-hidden')
            divInfo.classList.remove('visually-hidden')
        });
}