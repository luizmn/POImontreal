var map;
var markers = ko.observableArray();

ko.bindingHandlers.googlemap = {
init: function(element, valueAccessor) {

    var
    value = valueAccessor(),
    mapOptions = {
    zoom: 11,
    center: {
    lat: 45.5016889,
    lng: -73.567256
    },
    mapTypeId: google.maps.MapTypeId.ROADMAP
    },
    map = new google.maps.Map(element, mapOptions);
    setMarkers(map);

}
};

// Define the variables to label the markers
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;

// Create the markers with labels from A to Z
function setMarkers(map) {
    // Adds markers to the map.

    for (var l in locations()) {
        var latLng = new google.maps.LatLng(
                                            locations()[l].latitude,
                                            locations()[l].longitude);
        var marker = new google.maps.Marker({
                                            position: latLng,
                                            map: map,
                                            label: labels[labelIndex++ % labels.length],
                                            title: locations()[l].title
                                            });
        markers.push(marker);
    }
}

var locations = ko.observableArray([{
                                    title: "The Montreal Museum of Fine Arts",
                                    latitude: 45.498522,
                                    longitude: -73.5794
                                    },
                                    {
                                    title: "Mount Royal Park",
                                    latitude: 45.504798,
                                    longitude: -73.587842
                                    },
                                    {
                                    title: "Ecole de technologie superiure ETS",
                                    latitude: 45.494546,
                                    longitude: -73.562246
                                    },
                                    {
                                    title: "Notre-Dame Basilica of Montreal",
                                    latitude: 45.504542,
                                    longitude: -73.556128
                                    },
                                    {
                                    title: "Old Montreal",
                                    latitude: 45.507453,
                                    longitude: -73.554418
                                    },
                                    {
                                    title: "Montreal Botanical Garden",
                                    latitude: 45.560002,
                                    longitude: -73.563009
                                    },
                                    {
                                    title: "Montreal Biodome",
                                    latitude: 45.559737,
                                    longitude: -73.549862
                                    },
                                    {
                                    title: "Belvédère Camillien-Houde",
                                    latitude: 45.510798,
                                    longitude: -73.592949
                                    },
                                    {
                                    title: "St. Josephs Oratory",
                                    latitude: 45.492574,
                                    longitude: -73.618339
                                    },
                                    {
                                    title: "Place-dArmes",
                                    latitude: 45.505775,
                                    longitude: -73.559904
                                    }
                                    ]);
var vm = {
    locations
};


var SimpleListModel = function(list) {
    this.list = ko.observableArray(list);
};

// Sets the map on all markers in the array.
function setMapOnAll(map) {
    for (var i = 0; i < markers().length; i++) {
        markers()[i].setMap(map);
    }
}

var setMapOnAll = function(map) {
    this.list = ko.observableArray(list);
};

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
ko.applyBindings(DistanceVM,document.getElementById('selectDistance'));
ko.applyBindings(ModeVM, document.getElementById('selectMode'));
ko.applyBindings(vm, document.getElementById('map'));
ko.applyBindings(new SimpleListModel(locations),
                 document.getElementById('visitList'));
