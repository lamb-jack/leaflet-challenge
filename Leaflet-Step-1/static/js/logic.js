//Creating Map

let myMap = L.map("map", {
  center: [48.957085, -115.850145],
  zoom: 4
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
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL
d3.json(url).then(function(data) {
  console.log(data.features);

  let features = data.features;

  features.forEach(d => {

    let lat = d.geometry.coordinates[1];
    let long = d.geometry.coordinates[0];
    let depth = d.geometry.coordinates[2];
    let size = d.properties.mag;  

    L.circle([lat, long], {
      color: "grey",
      fillColor: "lightblue",
      fillOpacity: 0.75,
      radius: 50000
    }).addTo(myMap);

  })
  

});
