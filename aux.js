// ----------------------
//Working
$.getJSON(foursquare_url,
          function (data) {
          console.log(data);
          if (data.meta.code == "200") {
              fs_title = data.response.venue.name;
              fs_category_id = data.response.venue.categories.pluralName;
              fs_category = data.response.venue.categories..name;
              fs_phone = data.response.venue.contact.formattedPhone;
              fs_url = data.response.venue.canonicalUrl;

              contentString = fs_category_id + fs_category +
              "<br> Phone:" +
              fs_phone +
              "<br>" +
              "<a href='>" +
              fs_url +
              "'>" +
              "More info</a>";
              }
          else {
              contentString = "<br> Failed to load results from Foursquare. Error no: " +
              data.meta.code;
          }
          });


// ----------------------

var venue, address, category, foursquareId, contentString;
foursquare_url = "https://api.foursquare.com/v2/venues/" +
position[3] +
"?v=20180922&client_id=" +
fs_client_id +
"&client_secret=" +
fs_client_secret;


$.getJSON(foursquare_url,
          function (data) {
          console.log(data);
          //        $.each(data.response.venues, function (i, venues) {
          fs_title = data.response.venue.name;
          fs_category = data.response.venue.categories.name;
          fs_phone = data.response.venue.contact.formattedPhone;
          fs_url =  data.response.venue.canonicalUrl;
                 $(".mypanel").html(text);
                 });
          });



// ----------------------




$.ajax({
       url: foursquare_url,
       dataType: "json",
       data: marker.title,
       query: marker.title, // gets data from marker.title (array of object)
       success: function(data) {
       // get venue info
       venue = data.response.venues[0];
       address = venue.location.formattedAddress[0];
       category = venue.categories[0].name;
       foursquareId = "https://foursquare.com/v/" + venue.id;
       // populates infowindow with api info
       contentString = "<div class='name'>" + "Name: " + "<span class='info'>" + title + "</span></div>" +
       "<div class='category'>" + "Catergory: " + "<span class='info'>" + category + "</span></div>" +
       "<div class='address'>" + "Location: " + "<span class='info'>" + address + "</span></div>" +
       "<div class='information'>" + "More info: " + "<a href='" + foursquareId + "'>" + "Click here" + "</a></div>";

       marker.contentString;
       },
       error: function() {
       contentString = "<div class='name'>Failed to load data from Foursquare.</div>";
       }
       });

// ----------------------

.done(function(data){
      var currentVenue = data.response.venues[0];
      var placeName = currentVenue.name;
      var placeAddress = currentVenue.address.formattedAddress;
      var placePhonenos = (currentVenue.contact.formattedPhone === undefined)? 'None': currentVenue.contact.formattedPhone;
      windowContent = '<div id="iw_container"><p><strong>Name: </strong>' + placeName+ '</p>' +
      '<p><strong>Address: </strong>  ' + placeAddress + '</p>' +
      '<p><strong>Phone: </strong>' + placePhonenos + '</p></div>';
      infoWindowCallback(windowContent);
      })
.fail(function(error){
              infoWindow.setContent('Fail to connect to Foursquare: ' + error);
              }
              );
}



$.getJSON(foursquare_url)
.done(function (data) {
      console.log(data);
      //if (data.meta.code == "200") {
      fs_title = data.response.venue.name;
      fs_category_id = data.response.venue.categories.pluralName;
      fs_category = data.response.venue.categories..name;
      fs_phone = data.response.venue.contact.formattedPhone;
      fs_url = data.response.venue.canonicalUrl;

      contentString = fs_category_id + fs_category +
      "<br> Phone:" +
      fs_phone +
      "<br>" +
      "<a href='>" +
      fs_url +
      "'>" +
      "More info</a>";
      })

.fail(function( jqxhr, textStatus, error ) {
      var err = textStatus + ", " + error;
      console.log( "Request Failed: " + err );
      infoWindow.setContent('Fail to connect to Foursquare: ' + error);
      });


$.getJSON(foursquare_url,
          .done(function (data) {
          console.log(data);
          //if (data.meta.code == "200") {
          fs_title = data.response.venue.name;
          fs_category = data.response.venue.categories[0].name;
          fs_phone = data.response.venue.contact.formattedPhone;
          fs_url = data.response.venue.canonicalUrl;

          contentString = fs_category_id + fs_category +
          "<br> Phone:" +
          fs_phone +
          "<br>" +
          "<a href='>" +
          fs_url +
          "'>" +
          "More info</a>";
          //$(".mypanel").html(contentString);
          //}
          })
          .fail(function(error){
                infoWindow.setContent('Fail to connect to Foursquare: ' + error);
          });


//----------------------------------------

          function setMarkers(map) {
          // Adds markers to the map.
          for (var i = 0; i < locations().length; i++) {
              var position = locations()[i];

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

          var infowindow = new google.maps.InfoWindow(content: marker.title + ' | Foursquare info: ' + FsPlacesInfo(pos[3]));



              google.maps.event.addListener(marker, 'click', (function(marker, i) {
                                                              return function() {
                                                              console.log(i);
                                                              pos = locations()[i];
                                                              console.log(pos[3]);
                                                              //          infowindow.setContent(marker.title + ' | Foursquare info: ' + FsPlacesInfo(pos[3]));
                                                              infowindow.setOptions({
                                                                                    maxWidth: 300
                                                                                    });
                                                              infowindow.open(map, marker);
                                                              }
                                                              }
                                                              )(marker, i, infowindow));
              markers.push(marker, infowindow);
              }
          }
