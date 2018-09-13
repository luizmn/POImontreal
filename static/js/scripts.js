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

// Create a new blank array for all the listing markers.
var markers = [];

// This global polygon variable is to ensure only ONE polygon is rendered.
var polygon = null;

// Create placemarkers array to use in multiple functions to have control
// over the number of places that show.
var placeMarkers = [];

function initMap() {
    // Create a styles array to use with the map.
    var styles = [
                  {
                  featureType: 'water',
                  stylers: [
                            { color: '#19a0d8' }
                            ]
                  },{
                  featureType: 'administrative',
                  elementType: 'labels.text.stroke',
                  stylers: [
                            { color: '#ffffff' },
                            { weight: 6 }
                            ]
                  },{
                  featureType: 'administrative',
                  elementType: 'labels.text.fill',
                  stylers: [
                            { color: '#e85113' }
                            ]
                  },{
                  featureType: 'road.highway',
                  elementType: 'geometry.stroke',
                  stylers: [
                            { color: '#efe9e4' },
                            { lightness: -40 }
                            ]
                  },{
                  featureType: 'transit.station',
                  stylers: [
                            { weight: 9 },
                            { hue: '#e85113' }
                            ]
                  },{
                  featureType: 'road.highway',
                  elementType: 'labels.icon',
                  stylers: [
                            { visibility: 'off' }
                            ]
                  },{
                  featureType: 'water',
                  elementType: 'labels.text.stroke',
                  stylers: [
                            { lightness: 100 }
                            ]
                  },{
                  featureType: 'water',
                  elementType: 'labels.text.fill',
                  stylers: [
                            { lightness: -100 }
                            ]
                  },{
                  featureType: 'poi',
                  elementType: 'geometry',
                  stylers: [
                            { visibility: 'on' },
                            { color: '#f0e4d3' }
                            ]
                  },{
                  featureType: 'road.highway',
                  elementType: 'geometry.fill',
                  stylers: [
                            { color: '#efe9e4' },
                            { lightness: -25 }
                            ]
                  }
                  ];

    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
                              center: {lat: 45.5016889, lng: -73.567256},
                              zoom: 13,
                              styles: styles,
                              mapTypeControl: false
                              });
}
    //-----Map creation end-----

    //----Markers section begin----

    // Pre-selected markers that will be shown to the user.

    var locations = [
                     {title: 'The Montreal Museum of Fine Arts', location: {lat: 45.498522, lng: -73.5794}},
                     {title: 'Mount Royal Park', location: {lat: 45.504798, lng: -73.587842}},
                     {title: 'Ecole de technologie superiure ETS', location: {lat: 45.494546, lng: -73.562246}}
                     //{title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377}},
                     //{title: 'TriBeCa Artsy Bachelor Pad', location: {lat: 40.7195264, lng: -74.0089934}},
                     //{title: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237}}
                     ];

    // Markers styling section

    // Create a new marker based in selected color with icon dimensions
    // 21 px wide by 34 high, have an origin of 0, 0 and anchored at 10, 34.
    function makeMarkerIcon(markerColor) {
        var markerImage = {
            url: place.icon,
            size: new google.maps.Size(21, 34),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(10, 34),
            scaledSize: new google.maps.Size(21, 34)
        };

        //new google.maps.MarkerImage(
        //                                              'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
        //                                              '|40|_|%E2%80%A2',
        //                                              new google.maps.Size(21, 34),
        //                                              new google.maps.Point(0, 0),
        //                                              new google.maps.Point(10, 34),
        //                                              new google.maps.Size(21,34));
        return markerImage;
    }

    // Set a default marker icon.
    var defaultIcon = makeMarkerIcon('0091ff');

    // Set a "highlighted location" color for when the user
    // mouses over the marker.
    var highlightedIcon = makeMarkerIcon('FFFF24');


    // Create the markers based on locations array
    for (var i = 0; i < locations.length; i++) {
        // Get the position from the location array.
        var position = locations[i].location;
        var title = locations[i].title;
        // Create a marker per location, and put into markers array.
        var marker = new google.maps.Marker({
                                            position: position,
                                            title: title,
                                            animation: google.maps.Animation.DROP,
                                            icon: defaultIcon,
                                            id: i
                                            });
        // Push the marker to our array of markers.
        markers.push(marker);
        // Create an onclick event to open the large infowindow at each marker.
        marker.addListener('click', function() {
                           populateInfoWindow(this, largeInfowindow);
                           });
        // Two event listeners - one for mouseover, one for mouseout,
        // to change the colors back and forth.
        marker.addListener('mouseover', function() {
                           this.setIcon(highlightedIcon);
                           });
        marker.addListener('mouseout', function() {
                           this.setIcon(defaultIcon);
                           });
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
//----Markers section end----


