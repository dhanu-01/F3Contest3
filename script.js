let x = document.getElementById("get-location")
let iframe = document.getElementById("i-frame");
let myFrame = document.getElementById("myFrame");
let getBtn = document.getElementById("getBtn")
let deleteBtn = document.getElementById("deleteBtn")


if(localStorage.getItem("coordinates")){
  const getCoordinates = JSON.parse(localStorage.getItem("coordinates"));
  iframe.src = `https://maps.google.com/maps?q=${getCoordinates.latitude},${getCoordinates.longitude}&output=embed`
  console.log("second time user")
  getBtn.disabled  = true;
  deleteBtn.disabled = false;
  console.log(getCoordinates);
}

function getLocation() {

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition,showError);
        console.log("first time user")
      } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
      }
      deleteBtn.disabled = false;
      getBtn.disabled= true;
}

  
function showPosition(position) {
    let obj = {
      latitude : position.coords.latitude,
      longitude : position.coords.longitude,
    }
    
    localStorage.setItem("coordinates",JSON.stringify(obj))
    iframe.src = `https://maps.google.com/maps?q=${obj.latitude},${obj.longitude}&output=embed`

}

function showError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        x.innerHTML = "User denied the request for Geolocation."
        break;
      case error.POSITION_UNAVAILABLE:
        x.innerHTML = "Location information is unavailable."
        break;
      case error.TIMEOUT:
        x.innerHTML = "The request to get user location timed out."
        break;
      case error.UNKNOWN_ERROR:
        x.innerHTML = "An unknown error occurred."
        break;
    }
}

function removeLocation(){
    localStorage.removeItem("coordinates")
}

