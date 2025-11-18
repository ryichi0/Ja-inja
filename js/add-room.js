// import {map} from './home.js'
function addRoom () {
  event.preventDefault()
  let form = document.getElementById('addRoomForm') ;
  const data = {
    'title' : form.elements['title'].value
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
  console.log(val, url) ;
  document.getElementById('prev-image').src = url ;
}

function handleCloseFile() {
  document.getElementById('select-image').style.display = 'flex'  ;
  document.getElementById('prev-section').style.display = 'none' ;
}
