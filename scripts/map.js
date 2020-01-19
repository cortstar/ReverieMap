document.getElementById("clear").addEventListener("click", e => clear(e));
document.getElementById("feather").addEventListener("click", () => currentIcon = featherIcon);
document.getElementById("skull").addEventListener("click", () => currentIcon = skullIcon);

var MapIcon = L.Icon.extend({
    options: {
        iconSize:     [38, 38],
        shadowSize:   [50, 50],
    }
});

var featherIcon = new MapIcon({iconUrl: "resource/feather.png"});
var skullIcon = new MapIcon({iconUrl: "resource/skull.png"});

var currentIcon = featherIcon;

const bounds = [[0, 0], [6600,10200]];

let map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: -2,
    zoom: 5,
    maxBounds: bounds,
    maxBoundsViscosity: 1.0
});

let markerGroup = L.layerGroup().addTo(map);

function onMarkerClick(e){
    let marker = markerGroup.getLayer(e.target._leaflet_id);
    markerGroup.removeLayer(e.target._leaflet_id)
}

L.imageOverlay('resource/faerun.jpg', bounds).addTo(map);
map.fitBounds(bounds);
map.setZoom(1);

L.popup();

function onMapClick(e) {
    L.marker(e.latlng, {icon:currentIcon}).on('click', onMarkerClick).addTo(markerGroup);
}

map.on('click', onMapClick);

function clear() {
    markerGroup.clearLayers();
}