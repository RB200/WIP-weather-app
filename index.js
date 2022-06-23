let coordinates = {}
mapboxgl.accessToken = 'pk.eyJ1IjoiYXBvb3J2ZWxvdXMiLCJhIjoiY2ttZnlyMDgzMzlwNTJ4a240cmEzcG0xNyJ9.-nSyL0Gy2nifDibXJg4fTA'

let latitude,longitude


$(document).ready(()=>{
    alert('Please allow location tracking')
    initGeolocation()
    getWeather()
})


function initGeolocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(success)
        navigator.geolocation.getCurrentPosition((e)=>{
            coordinates.latitude = e.coords.latitude
            coordinates.longitude = e.coords.longitude
        })
    }
    else{
        alert('Your browser does not support geolocation services.')
    }
}

function success(position){
    getWeather(position)
    latitude = position.coords.latitude
    longitude = position.coords.longitude
    
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [longitude,latitude],
        zoom: 16
    })
    var marker1 = new mapboxgl.Marker({
        element:document.querySelector('#wm')
    })
    .setLngLat([-77.0364997,38.8894677])
    .addTo(map)
    
    var marker2 = new mapboxgl.Marker({
        element:document.querySelector('#sol')
    })
    .setLngLat([-74.045489,40.6894114])
    .addTo(map)
    
    var marker3 = new mapboxgl.Marker({
        element:document.querySelector('#wh')
    })
    .setLngLat([-77.036515,38.897384])
    .addTo(map)
    map.addControl(
        new MapboxGeocoder({
            accessToken:mapboxgl.accessToken,
            mapboxgl:mapboxgl
        })
    )

}
function getWeather(position){
    console.log(position)
    var latitude = position.coords.latitude
    var longitude = position.coords.longitude
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=f48d3b20f167cbc97687caeef21dea98`,
        type: 'get',
        success: function(response){
            let city_name = response.name
            // temperature from K to F
            let temp = (response.main.temp -273.15) * (9/5) + 32 
            console.log(temp, city_name)
            console.log(response)
        }
    })
}


