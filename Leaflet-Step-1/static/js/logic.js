//Creating Map

let myMap = L.map("map", {
  center: [40.871960, -102.817644],
  zoom: 5
});

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// Store our API endpoint as queryUrl
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

// Perform a GET request to the query URL
d3.json(url).then(function(data) {
  console.log(data.features);

  let features = data.features;

  features.forEach(d => {

    let lat = d.geometry.coordinates[1];
    let long = d.geometry.coordinates[0];
    let depth = d.geometry.coordinates[2];
    let magnitude = d.properties.mag;
    
    let color = "blue";

    if (depth >= -10 && depth <= 10){
      color = "#a3f700";
    } else if (depth >= 10 && depth <= 30){
      color = "#dcf400";
    } else if (depth >= 30 && depth <= 50){
      color = "#f7db0f";
    } else if (depth >= 50 && depth <= 70){
      color = "#fdb729";      
    } else if (depth >= 70 && depth <= 90){
      color = "#fca45c";      
    } else {
      color = "#ff5f65";      
    }

    let size = 0;

    if (magnitude >= 0 && magnitude <= 3.9){
      size = 30000;
    } else if (magnitude >= 4 && magnitude <= 4.9){
      size = 40000;
    } else if (magnitude >= 5 && magnitude <= 5.9){
      size = 45000;
    } else if (magnitude >= 6 && magnitude <= 6.9){
      size = 50000;
    } else if (magnitude >= 7 && magnitude <= 7.9){
      size = 65000;
    } else {
      size = 70000;
    }

    

    L.circle([lat, long], {
      weight: 1,
      opacity: 0.5,
      color: "grey",
      fillColor: color,
      fillOpacity: 0.6,
      radius: size
    }).addTo(myMap);

  })
  

});
