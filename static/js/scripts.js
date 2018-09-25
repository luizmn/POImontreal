// Foursquare credentials

var fs_client_secret = "A5UFFIC2YA05X1KORVF31T4ORLFHAEIZGNVHA2NAWW5J4AII";
var fs_client_id = "YHMKWSBNT41RJFB5LLCA3WA3BJNMZDKZICQ0V02UD0O0KAZH";

// Functions used to show/hide the sidebar
function sidebar_open() {
    document.getElementById("placesSidebar").style.display = "block";
}

function sidebar_close() {
    document.getElementById("placesSidebar").style.display = "none";
}

// Creates the variables to store the map and pre-selected markers
var map;
var markers = ko.observableArray();

// Creates the map and set a center position
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
                              zoom: 11,
                              center: {
                              lat: 45.5016889,
                              lng: -73.567256
                              },
                              // Position map controls in the top center
                              mapTypeControl: true,
                              mapTypeControlOptions: {
                              style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                              position: google.maps.ControlPosition.TOP_CENTER
                              },
                              scaleControl: true,
                              fullscreenControl: true
                              });

    setMarkers(map);
}

// Sets the data for the pre-selected markers consisting of name, latitude and longitude
var locations = ko.observableArray([
                                    // ['name', latitude, longitude, foursquare_venue_id]
                                    ['The Montreal Museum of Fine Arts', 45.498522, -73.5794, '4e356969b61cddd1cd3cbba3', 1],
                                    ['Mount Royal Park', 45.504798, -73.587842, '4ad8f749f964a520871621e3', 2],
                                    ['Mary Queen of the World Cathedral', 45.49921, -73.568231, '4b201c13f964a520532d24e3', 3],
                                    ['Notre-Dame Basilica of Montreal', 45.504542, -73.556128, '4b0d9f4ef964a5207a4c23e3', 4],
                                    ['Old Port of Montreal', 45.512458, -73.548487, '4b6a38f5f964a520d8cd2be3', 5],
                                    ['Montreal Botanical Garden', 45.560002, -73.563009, '4ad4c06bf964a520acf920e3', 6],
                                    ['Montreal Biodome', 45.559737, -73.549862, '4ad4c06bf964a520abf920e3', 7],
                                    ['Belvédère Camillien-Houde', 45.510798, -73.592949, '4c0a7563340720a1bf678693', 8],
                                    ['St. Josephs Oratory', 45.492574, -73.618339, '4ad4c06cf964a520e7f920e3', 9],
                                    ['Place-d`Armes', 45.505775, -73.559904, '4d49a48c11a36ea8d8082a1c', 10]
                                    ]);

// Creates a list with the content
var SimpleListModel = function(list) {
    this.list = ko.observableArray(list);
};

//var infowindow;
var foursquare_url;
var contentString = [];

// Define the variables to label the markers
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;

// Create the markers with labels from A to Z
function setMarkers(map) {
    // Adds markers to the map.
    for (var i = 0; i < locations().length; i++) {
        var position = locations()[i];
        //--------------------------------
        //contentString = FsPlacesInfo(locations()[i][3]);

               //--------------------------------

         var marker = new google.maps.Marker({
                                            position: {
                                            lat: position[1],
                                            lng: position[2]
                                            },
                                            map: map,
                                            label: labels[labelIndex++ % labels.length],
                                            animation: google.maps.Animation.DROP,
                                            title: position[0],
                                            visible: true,
                                            zIndex: position[4]
                                            });

        var infowindow = new google.maps.InfoWindow();

        var contentString = FsPlacesInfo(locations()[i][3]);

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
                                                        return function() {
                                                        console.log(i);
                                                        infowindow.setContent(marker.title + ' | Foursquare info: ' + fs_title);
                                                        infowindow.setOptions({
                                                                              maxWidth: 300
                                                                              });
                                                        infowindow.open(map, marker);
                                                        }
                                                        }
                                                        )(marker, i, infowindow));
        markers.push(marker, infowindow);

        //Get the position of clicked marker
        marker.addListener('click', function() {
                           for (var i = 0; i < markers.length; i++) {
                           markers[i].setAnimation(null);
                           }
                           toggleBounce(this);
                           map.setZoom(12);
                           map.setCenter(marker.lat, marker.lng);
                           infowindow.open(map, marker.lat, marker.lng);
                           });
    }

    // Animate clicked marker
    function toggleBounce(poi) {
        if (poi.getAnimation() !== null) {
            poi.setAnimation(null);
        } else {
            poi.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function() {
                       poi.setAnimation(null);
                       }, 1400); //This value sets the duration of animation
        }
    }

}


/* Begin Get data from Foursquare

 function FsPlacesInfo() {
 var self = this;
 self.results = ko.observableArray([]);

 for (var i = 0; i < locations().length; i++) {
 var fs_venue_id = locations()[i];

 $.getJSON("https://api.foursquare.com/v2/venues/" +
 fs_venue_id[3] +
 "?v=20180922&client_id=" +
 fs_client_id +
 "&client_secret=" +
 fs_client_secret, function(data) {
 self.results(data);
 })
 }
 }


 End Get data from Foursquare */


/*
 // Filtering the places list
 filterList = ko.observable("");

 this.filteredList = ko.dependentObservable(function () {
 var q = this.filterList().toUpperCase();
 if (!q) {
 return ko.utils.arrayFilter(self.locations(), function (item) {
 item.marker.setVisible(true);
 return true;
 });
 } else {
 return ko.utils.arrayFilter(this.locations(), function (item) {
 if (item.name.toUpperCase().indexOf(q) >= 0) {
 return true;
 } else {
 item.marker.setVisible(false);
 return false;
 }
 });
 }
 }, this);
 */

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
    this.distances = [{
                      label: "10 min",
                      time: 10
                      },
                      {
                      label: "15 min",
                      time: 15
                      },
                      {
                      label: "30 min",
                      time: 30
                      },
                      {
                      label: "1 hr",
                      time: 60
                      }
                      ];
    this.chosenDistance = ko.observable();
    this.resetDistance = function() {
        this.chosenDistance(null)
    }
};

//Function used to show travel modes
var ModeVM = function TravelModesViewModel() {
    this.modes = [{
                  mode: "Drive",
                  value: "DRIVING"
                  },
                  {
                  mode: "Walk",
                  value: "WALKING"
                  },
                  {
                  mode: "Bike",
                  value: "BICYCLING"
                  },
                  {
                  mode: "Transit ride",
                  value: "TRANSIT"
                  }
                  ];
    this.chosenMode = ko.observable();
};

//The bindings are applied directly to the elements

//ko.applyBindings(DistanceVM, document.getElementById('selectDistance'));
//ko.applyBindings(ModeVM, document.getElementById('selectMode'));
//ko.applyBindings(ModeVM, document.getElementById('visitList'));

function FsPlacesInfo(pos) {
    //mapinfo[i].fourSquareUrl = fourSquareUrl;
    //mapInfo.push(marker);
    // ----------------------

    //foursquare_url = "https://api.foursquare.com/v2/venues/" +
    //position[3] +
    //pos +
    //"?v=20180922&client_id=" +
    //fs_client_id +
    //"&client_secret=" +
    //fs_client_secret;

    foursquare_url = "https://api.foursquare.com/v2/venues/" +
    //position[3] +
    pos +
    "?v=20180922&oauth_token=GXAGYHX5KE3JEPUGVPNDWTBZJ4DCUCYBCSTVZGSYIDUED1TU";


    $.getJSON(foursquare_url)
    .done(function(data) {
          contentString = "";
          var fs_title = data.response.venue.name;
          var fs_category = data.response.venue.categories[0].name;
          fs_phone = data.response.venue.contact.formattedPhone;
          fs_url = data.response.venue.canonicalUrl;
          contentString = fs_title /*+ fs_category +
          "<br> Phone:" +
          fs_phone +
          "<br>" +
          "<a href='" +
          fs_url +
          "'>" +
          "More info</a>"*/;
          })
    .fail(function(data) {
          contentString = "<br> Failed to load results from Foursquare.";
          });
    //return contentString;
}

ko.applyBindings(new SimpleListModel(locations()),
                 document.getElementById('visitList'));
//ko.applyBindings(new FsPlacesInfo(locations()),
//                 document.getElementById('fsList'));
