import axios from "axios";
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select'
import { fetchBreeds, catByBreed } from "./cat-api.js"


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
const select = document.querySelector(".breed-select");
const catInfo = document.querySelector(".cat-info");
const loader = document.querySelector(".catLoader");
const divBar = document.querySelector(".ss-main");
const error = document.querySelector(".error");
const body = document.querySelector("body");

let markup
let catList

fetchBreeds(loader, select, catInfo)
    .then(data => {
        const markup = data.map((list) => ({text: list.name}) );
        select.innerHTML = markup;
        catList = data
        return catList, markup
    })
    .then((markup) => {
    new SlimSelect({
    select: '#selectElement',
    allowDeselect: true,
    showSearch: true, 
    data:markup
    })
  })


select.addEventListener('change', function (event) {
  let catName = event.target.value
  let catId
  for (let i = 0; i < catList.length; i++) {
        if (catList[i].name === catName) {
            catId = catList[i].id;
            break
        }
  }
          catByBreed(catId, loader, select, catInfo)
          .then(data => {
                catInfo.innerHTML = `<img src=${data[0].url} alt="Cat Image">`
            })
            .then(() => {
                createInfo(catId)     
            })
          .catch(error => {
            Notiflix.Notify.warning('Wybierz innego kota, ten się gdzies zapodział:'+error);
            select.classList.remove('visually-hidden')
            divInfo.classList.remove('visually-hidden')
            });
    })

        function createInfo(catId) {
            let idList = catList.flatMap(cat => cat.id)
                    let catNo = idList.indexOf(catId)
                    let description = (catList[catNo].description)
                    let breed = (catList[catNo].name)
                    let temperament = (catList[catNo].temperament)
                    catInfo.innerHTML +=
                    `<ul>
                    <li class='breed'>${breed}</li>
                    <li>${description}</li>
                    <li><span class='temperament'>Temperament: </span>${temperament}</li>
                    </ul>`
        }
 