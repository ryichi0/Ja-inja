async function getAllRooms () {
  try {
    const res = await axios.get(`${baseUrl}/room`,{
      withCredentials: true
    })
    const data  = await res.data.data ;
    console.log(data);
    let roomsList  = document.getElementById('rooms-list')
    for (let item of data) {
      let div = document.createElement('div')
      div.classList.add('card')
      div.innerHTML = `
          <img src="${baseUrl}/image_rooms/${item.image}" alt="${item.title}"/>
          <h3>${item.title}</h3>
          <span>${item.price}</span>
        `
      roomsList.appendChild(div)
      updateMap(data)
    }
  } catch (error) {
    console.log(error);
  }
}

window.addEventListener('DOMContentLoaded', getAllRooms)


// MAP CONFIG

var map = L.map('map').setView([35.6892, 51.389], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function updateMap (data) {
  for (let room of data) {
    let marker = L.marker([room.lat, room.lng]).addTo(map);
    console.log(room.title, room.price);
    
    marker.bindPopup(
      `<div class="card">
          <img src="${baseUrl}/image_rooms/${room.image}" alt="${room.title}"/>
          <h3>${room.title}</h3>
          <span>${room.price}</span>
      </div>`
    )
  }
}
