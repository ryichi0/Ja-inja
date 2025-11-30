// function createCard (rooms) {
//   let roomsList  = document.getElementById('rooms-list')
//   for (let item of rooms) {
//     let div = document.createElement('div')
//     div.classList.add('card')
//     div.innerHTML = `
//       <img src="${baseUrl}/image_rooms/${item.image}" alt="${item.title}"/>
//       <h3>${item.title}</h3>
//       <span>${item.price}</span>
//       <div class="buttons">
//         <button onclick="deleteRoom()">حذف اقامتگاه</button>
//         <button onclick="editRoom()">ویرایش</button>
//       </div>
//       `
//     roomsList.appendChild(div)
//   }
// }

// async function getAllRooms () {
//   try {
//     const res = await axios.get(`${baseUrl}/room`,{
//       withCredentials: true
//     })
//     const data  = await res.data.data ;
//     createCard(data) ; 
//     updateMap(data) ;

//   } catch (error) {
//     console.log(error);
//   }
// }

// document.addEventListener('DOMContentLoaded', getAllRooms)


// // MAP CONFIG

// var map = L.map('map').setView([35.6892, 51.389], 13);

// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// }).addTo(map);

// function updateMap (data) {
//   for (let room of data) {
//     let marker = L.marker([room.lat, room.lng]).addTo(map);
//     console.log(room.title, room.price);
    
//     marker.bindPopup(
//       `<div class="card">
//           <img src="${baseUrl}/image_rooms/${room.image}" alt="${room.title}"/>
//           <h3>${room.title}</h3>
//           <span>${room.price}</span>
//       </div>`
//     )
//   }
// }

// document.addEventListener('DOMContentLoaded', ()=>{
//   let isAuth = sessionStorage.getItem('isAuth') ;
//   if (!isAuth) {
//     location.href = './login.html'
//   } 
// })

async function getAllRooms () {
  try {
    const response = await fetch(`https://api.webehsan.com/room`,
      { credentials : "include" }
    ) ;
    const responseData = await response.json() ;
    console.log(response, responseData, responseData.data);
    return responseData.data ;
    

  } catch (error) {
    console.log(`Error : ${error}`); 
  }
}


async function displayAllRooms () {
  try {
    const rooms = await getAllRooms() ;
    const roomCard = document.getElementById('rooms-list') ;

    if (rooms.length == 0) {
      const alert = document.createElement('p') ;
      alert.innerText = 'هیج اقامتگاهی یافت نشد' ;
      roomCard.appendChild(alert)


    } else {
      for (let room of rooms) {
        const div = document.createElement('div') ;
        div.classList.add('card') ;
        div.innerHTML = `
          <img src="${baseUrl}/image_rooms/${room.image}" alt="${room.name}"/>
          <h3>${room.title}</h3>
          <span>${room.price}</span>
          <div class="buttons">
            <button onclick="delRoom('${room._id}')" >حذف اقامتگاه</button>
            <button>ویرایش</button>
          </div>
        ` ;
        roomCard.appendChild(div) ;
      }
    }
    

  } catch (error) {
    console.log(`Error : ${error}`); 
  }
}

async function delRoom(room_id) {
  console.log("Deleting:", room_id);

  try {
    const response = await fetch(`https://api.webehsan.com/room/${room_id}`, {
      method: "DELETE",
      credentials: "include"
    });

    const data = await response.json();
    console.log("Server:", data);

    document.getElementById('rooms-list').innerHTML = "";
    displayAllRooms();

  } catch (error) {
    console.log("Error:", error);
  }
}


document.addEventListener('DOMContentLoaded', displayAllRooms)



