document.getElementById('input-blank-error').style.display = 'none'

const search = document.getElementById('inputField')
function searchPlayer() {
    const playerName = search.value
    search.value = ''
    if (playerName == '') {
        document.getElementById('input-blank-error').style.display = 'block'
    }
    
    else {
        document.getElementById('input-blank-error').style.display = 'none'
        const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${playerName}`
        fetch(url)
            .then(response => response.json())
            .then(data => displayPlayer(data.player))
            .catch(error=>serverErorr(error))
    }
}
// API link error hendel
document.getElementById('link-error-message').style.display='none'
const serverErorr=(eror)=>{
    document.getElementById('link-error-message').style.display='block'
}
// player by Name 
document.getElementById('not-mach-player').style.display='none'
const displayPlayer = (playerInfo) => {
    if(playerInfo == null){
        document.getElementById('not-mach-player').style.display='block'
        document.getElementById('All').style.display='none'
    }
   else{
    document.getElementById('not-mach-player').style.display='none'
    document.getElementById('All').style.display='block'
    const playerInfoDom = document.getElementById('player-info')
    playerInfoDom.textContent = ''
    playerInfo.forEach(onePlayerInfo => {
        console.log(onePlayerInfo)
        const div = document.createElement('div')
        div.innerHTML = `
      <div class="col">
      <div class="card player">
        <img src="${onePlayerInfo.strThumb}" class="card-img-top" alt="photo">
        <div class="card-body text-center">
          <h6><span class="text-danger">Name</span>: ${onePlayerInfo.strPlayer}</h6>
          <h6><span class="text-danger">Country</span>:${onePlayerInfo.strBirthLocation}</h6>
          <p ><span class="text-danger">Natonality</span>:${onePlayerInfo.strNationality}</p>
          <p ><span class="text-danger">Gender</span>:${onePlayerInfo.strGender}</p>
          <button type="button" onclick="DetailInfo(${onePlayerInfo.idPlayer})" class="btn btn-info">Detail</button>
          <button type="button" class="btn btn-danger">Delete</button>
        </div>
      </div>
      </div>
      `
        playerInfoDom.appendChild(div)
   
     });
   }
  
}
// right side part Api by id
const DetailInfo = (playerId) => {
    const url = (`https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${playerId}`)
    fetch(url)
        .then(response => response.json())
        .then(data => displayPlayerDetail(data.players[0]))

}

function displayPlayerDetail(playerDetail) {
    if(playerDetail.strGender=='Male' ){
        document.getElementById('male').style.display='block'
        document.getElementById('female').style.display='none' 
    }
    else if(playerDetail.strGender=='Female'){
        document.getElementById('female').style.display='block' 
        document.getElementById('male').style.display='none' 
    }
        const mainPlayerDetail = document.getElementById('main-playr-detail')
        mainPlayerDetail.innerHTML = `
        <div class="text-player-detail d-flex">
        <div class="item-1 w-50">
        <h6><span class="text-danger">Name</span>: ${playerDetail.strPlayer}</h6>
        <h6><span class="text-danger">Name</span>: ${playerDetail.strGender}</h6>
        <h6><span class="text-danger">Name</span>: ${playerDetail.strHeight}</h6>
            <h6><span class="text-danger">artical</span>:${playerDetail.strDescriptionEN}</h6>
        </div>
        <div class="item-2 w-50">
            <img src="${playerDetail.strThumb}" class ="img-fluid"alt="randomplayer">
        </div>
    </div>
        `
       
}