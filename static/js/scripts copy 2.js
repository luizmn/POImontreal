
// In the following example, markers appear when the user clicks on the map.
// The markers are stored in an array.
// The user can then click an option to hide, show or delete the markers.
var map;
var markers = [];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
                              zoom: 12,
                              center: {lat: 45.5016889, lng: -73.567256}
                              });

    setMarkers(map);
}

// Data for the markers consisting of a name, a LatLng and a zIndex for the
// order in which these markers should display on top of each other.
var locations = [
                 ['The Montreal Museum of Fine Arts', 45.498522, -73.5794],
                 ['Mount Royal Park', 45.504798, -73.587842],
                 ['Ecole de technologie superiure ETS', 45.494546, -73.562246]
                 ];

//var locations = ko.observableArray([
//                                    ['The Montreal Museum of Fine Arts', 45.498522, -73.5794],
//                                    ['Mount Royal Park', 45.504798, -73.587842],
//                                    ['Ecole de technologie superiure ETS', 45.494546, -73.562246]
//                                    ]);
function setMarkers(map) {
    // Adds markers to the map.
    for (var i = 0; i < locations().length; i++) {
        var position = locations[i];
        var marker = new google.maps.Marker({
                                            position: {lat: position[1], lng: position[2]},
                                            map: map,
                                            title: position[0]
                                            });
        markers.push(marker);
    }
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
    setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
    setMapOnAll(markers);
}

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
