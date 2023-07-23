var geocoder;
var map;
 function initialize() {
   geocoder = new google.maps.Geocoder();
   var latlng = new google.maps.LatLng(-34.397, 150.644);
   var mapOptions = {
     zoom: 12,
     center: latlng
   }
   map = new google.maps.Map(document.getElementById('mapview'), mapOptions);
 }

document.getElementById("submit").addEventListener("click", function() {
     var address = document.getElementById('address').value;
     geocoder.geocode( { 'address': address}, function(results, status) {
       if (status == 'OK') {
         map.setCenter(results[0].geometry.location);
         var lat = results[0].geometry.location.lat();
         var lng = results[0].geometry.location.lng();
         geoCode(lat, lng);
       } else {
         alert('Geocode was not successful for the following reason: ' + status);
       }
     });

     function geoCode(lat, lng){
     var settings = {
       "url": "https://discover.search.hereapi.com/v1/discover?apikey=yCew7qjRgCd7iqphaN2k9jJ5Feih_9tqRAGeWE7PJv0&q=Covid&at="+lat+","+lng+"&limit=5",
       "method": "GET",
       "timeout": 0,
     };

     $.ajax(settings).done(function (response) {
      //console.log(response)
      //Add HTML Elements
      let locationlist = document.getElementById("location-list")
      locationlist.innerHTML = "" 
      let ul = document.createElement("ul");
      ul.classList = "list-group"
      locationlist.appendChild(ul)
      for(var i=0; i<5; i++){
        let li = document.createElement("li");
        li.classList = "list-group-item"
        
        let header = document.createElement("h5") 
        header.innerHTML = response.items[i].title
        li.appendChild(header)

        let br = document.createElement('br');
        li.appendChild(br);
        
        let phone = document.createElement("p")
        phone.innerHTML = response.items[i].contacts[0].phone[0].value
        li.appendChild(phone)

        let website = document.createElement("a")
        website.innerHTML = response.items[i].contacts[0].www[0].value
        website.href = response.items[i].contacts[0].www[0].value
        website.target = "_blank" 
        li.appendChild(website)

        let distance = document.createElement("p")
        distance.innerHTML = "Distance: " + response.items[i].distance + " Meters"
        li.appendChild(distance)
        ul.appendChild(li)

        //Add Marker
        new google.maps.Marker({
         position: { lat:response["items"][i]["position"]["lat"], lng:response["items"][i]["position"]["lng"] },
         map,
         title: response["items"][i]["title"]
      });}
    })
  }});
