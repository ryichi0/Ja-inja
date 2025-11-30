function getFormValues () {
  event.preventDefault()
  try {
    let form = document.getElementById('addRoomForm') ;
    let formData = new FormData(form) ;
    
    formData['image'] = form.elements['image'].files[0] ;
    formData['lat'] = form.elements['lat'].value ;
    formData['lng'] = form.elements['lng'].value ;
    formData['price'] = form.elements['price'].value ;
    formData['title'] = form.elements['title'].value ;
    console.log(formData);
    
    return formData ;

  } catch (error) {
    console.log(`Error : ${error}`);
  }
}

// import {map} from './home.js'

async function addRoom () {
  let formValues = getFormValues()
  try{
    // send POST request with user input as the req body
    const response = await axios.post(`${baseUrl}/room`,
      formValues,
      {withCredentials: true}
    ) ;
    const responseData = response.data ;
    console.log("state:", responseData.mes);
    if (!responseData.result) {
      console.log('اطلاعات فرم را به درستی وارد کنید.');
    } else {
      window.location.href = './home.html'
    }
  } catch(error){
    console.log(error);
  }
  
}



// MAP CONFIG

var map = L.map('map').setView([35.6892, 51.389], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map); 

let marker = L.marker([35.6892, 51.389], {draggable: true}).addTo(map)



// ADD LOCATION ON MAP

function updateMarker (lat, lng) {
  document.getElementById('lat').value = lat;
  document.getElementById('lng').value = lng;

}
map.on('click', (e)=>{
  console.log(e.latlng.lat, e.latlng.lng);
  updateMarker(e.latlng.lat, e.latlng.lng)
})


// UPLOAD IMAGE FILE AND DISPLAY IT

function handleFile(val) {
  document.getElementById('select-image').style.display = 'none'  ;
  document.getElementById('prev-section').style.display = 'flex' ;
  const url = window.URL.createObjectURL(val.files[0]) ;
  let image = document.getElementById('prev-image') ;
  image.src = url ;
  
}

function handleCloseFile() {
  document.getElementById('select-image').style.display = 'flex'  ;
  document.getElementById('prev-section').style.display = 'none' ;
}


document.addEventListener('DOMContentLoaded', ()=>{
  let isAuth = sessionStorage.getItem('isAuth') ;
  if (!isAuth) {
    location.href = './login.html'
  } 
})