//Creating Map

let myMap = L.map("map", {
  center: [10.873705, -93.434368],
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
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

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

    let circles = L.circle([lat, long], {
      weight: 1,
      opacity: 0.5,
      color: "grey",
      fillColor: color,
      fillOpacity: 0.6,
      radius: (Math.exp(magnitude))*1000
    }).addTo(myMap);

    // Popups
    circles.bindPopup(`Place: ${d.properties.place} <br> Magnitude: ${magnitude} <br> Depth: ${depth}`);

  })

  

});

function getColor(d) {
  return d > 90  ? '#ff5f65' :
         d > 70  ? '#fca45c' :
         d > 50   ? '#fdb729' :
         d > 30   ? '#f7db0f' :
         d > 10   ? '#dcf400' :
                    '#a3f700';
}

let info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>All Earthquakes from the Past 30 Days</h4>';
};

info.addTo(myMap);



let legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    let div = L.DomUtil.create('div', 'info legend'),
        grades = [-10, 10, 30, 50, 70, 90];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(myMap);