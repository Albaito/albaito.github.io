
let startingCoordinates= [37.96, -95.2]
let zoomLevel = 3


let bridges = [
    {"name": "Verrazanp-Narrows Bridge", "cityState": "New York", "span": 1298.4, "coordinates": [40.6066, -74.0447]},
    {"name": "Golden Gate Bridge", "cityState": "San Francisco and Marin, CA", "span": 1280.2, "coordinates": [37.8199, -122.4783]},
    {"name": "Makinac Bridge", "cityState": "Mackinaw and St Ignace, MI", "span": 1158.0, "coordinates": [45.8174, -84.7278]},
    {"name": "George Washington Bridge", "cityState": "New York, NY and New Jersey, NJ", "span": 1067.0, "coordinates": [40.8517, -73.9527]},
    {"name": "Tacoma Narrows Bridge", "cityState": "Tacoma and Kitsap, WA", "span": 853.44, "coordinates": [47.2690, -122.5517]}
]





// creates the map
let map = L.map('college-map').setView(startingCoordinates, zoomLevel)

// adds the tile layer - roads, streets
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// new map marker icon
var bridgeIcon = L.icon({
    iconUrl: 'bridge.png',

    iconSize: [55, 35],
    iconAnchor: [0, 0],
    popupAnchor: [0, 0]
})

// blue bridge for largest bridge
var blueBridge = L.icon({
    iconUrl: 'blueBridge.png',
    iconSize: [55, 35]
})

// list of all data stored as properties
let bridgeSpans  = []
let bridgeNames = []
let bridgeLocations = []
let bridgeCoordinates = []


for (j = 0; j < bridges.length; j++){
    bridgeLocations.push(bridges[j].cityState)
    bridgeSpans.push(bridges[j].span)
    bridgeNames.push(bridges[j].name)
    bridgeCoordinates.push(bridges[j].coordinates)
}

// sorts bridge lengths then gets largest one
let sortedSpans = []
sortedSpans = bridgeSpans.sort()
let largestSpan = sortedSpans[0]

// formats popups and sets markers
for (i = 0; i < bridges.length; i++){
        let coordinates = bridges[i].coordinates
        let mapPopup = bridges[i].name + '<br>Location: ' + bridges[i]["cityState"] + '<br>Length: ' + bridges[i].span + ' meters<br>'
    if (bridges[i].span === largestSpan){
        let markers = L.marker(coordinates, {icon: blueBridge}).bindPopup(mapPopup).addTo(map)
    }
    else{    
        let markers = L.marker(coordinates, {icon: bridgeIcon}).bindPopup(mapPopup).addTo(map)
    }
}

let canvas = document.querySelector('#bridge-chart')
let ctx = canvas.getContext('2d')

// creates the char
chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: bridgeNames,
        datasets: [{
            labels: bridgeNames,
            data: bridgeSpans,
            backgroundColor: ['red', 'blue', 'yellow', 'green', 'purple']
        }]
    }, options : {
        sclaes: {
            yXes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
})





