var map;
var markers = ko.observableArray();

// Creates the map and set a center position
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
                              zoom: 11,
                              center: {lat: 45.5016889, lng: -73.567256}
                              });

    setMarkers(map);
}

// Sets the data for the pre-selected markers consisting of name, latitude and longitude
var locations = ko.observableArray([
                                    ['The Montreal Museum of Fine Arts', 45.498522, -73.5794],
                                    ['Mount Royal Park', 45.504798, -73.587842],
                                    ['Ecole de technologie superiure ETS', 45.494546, -73.562246],
                                    ['Notre-Dame Basilica of Montreal', 45.504542, -73.556128],
                                    ['Old Montreal', 45.507453, -73.554418],
                                    ['Montreal Botanical Garden', 45.560002, -73.563009],
                                    ['Montreal Biodome', 45.559737, -73.549862],
                                    ['Belvédère Camillien-Houde', 45.510798, -73.592949],
                                    ['St. Josephs Oratory', 45.492574, -73.618339],
                                    ['Place-dArmes', 45.505775, -73.559904]
                                    ]);


var SimpleListModel = function(list) {
    this.list = ko.observableArray(list);
};

// Define the variables to label the markers
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;

// Create the markers with labels from A to Z
function setMarkers(map) {
    // Adds markers to the map.
    for (var i = 0; i < locations().length; i++) {
        var position = locations()[i];
        var marker = new google.maps.Marker({
                                            position: {lat: position[1], lng: position[2]},
                                            map: map,
                                            label: labels[labelIndex++ % labels.length],
                                            title: position[0]
                                            });
        markers.push(marker);
    }
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
    for (var i = 0; i < markers().length; i++) {
        markers()[i].setMap(map);
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
//ko.applyBindings(ModeVM, document.getElementById('visitList'));


ko.applyBindings(new SimpleListModel(locations()),
                 document.getElementById('visitList'));
