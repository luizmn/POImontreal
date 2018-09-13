//Function used to show distances
var DistanceVM = function DistancesViewModel() {
    this.distances = [
                      { label: "10 min", time: 10},
                      { label: "15 min", time: 15},
                      { label: "30 min", time: 30},
                      { label: "1 hr", time: 60}
                      ];
    this.chosenDistance = ko.observable();
    this.resetDistance = function() {this.chosenDistance(null) }
};

//Function used to show travel modes
var ModeVM = function TravelModesViewModel() {
    this.modes = [
                  { mode: "Drive", value: "DRIVING"},
                  { mode: "Walk", value: "WALKING"},
                  { mode: "Bike", value: "BICYCLING"},
                  { mode: "Transit ride", value: "TRANSIT"}
                  ];
    this.chosenMode = ko.observable();
};

//The bindings are applied directly to the elements
ko.applyBindings(DistanceVM, document.getElementById('selectDistance'));
ko.applyBindings(ModeVM, document.getElementById('selectMode'));

var map;

var markers = [];

var locations = [
    { title: 'The Montreal Museum of Fine Arts', location: { lat: 45.498522, lng: -73.5794 } },
    { title: 'Mount Royal Park', location: { lat: 45.504798, lng: -73.587842 } },
    { title: 'Ecole de technologie superiure ETS', location: { lat: 45.494546, lng: -73.562246 } }
];


function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 45.5016889, lng: -73.567256 },
        zoom: 13,
        mapTypeId: 'roadmap'
    });


    // Create the markers based on locations array
    for (var i = 0; i < locations.length; i++) {
        // Get the position from the location array.
        var position = locations[i].location;
        var title = locations[i].title;
        // Create a marker per location, and put into markers array.
        var marker = new google.maps.Marker({
            position: position,
            map: map,
            title: title,
            animation: google.maps.Animation.DROP,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10
            },
            id: i
        });
        // Push the marker to our array of markers.
        markers.push(marker);
    }

}
// Function used to display all pre-selected markers
function showListings() {
    var bounds = new google.maps.LatLngBounds();
    // Extend the boundaries of the map for each marker and display the marker
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
        bounds.extend(markers[i].position);
    }
    map.fitBounds(bounds);
}

// Function used to hide all pre-selected markers
function hideMarkers(markers) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
}
