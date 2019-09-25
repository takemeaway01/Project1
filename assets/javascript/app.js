
// VARIABLES
// ==============================================================================
var strCity = "";								// String for storing city from input textbox
var CityLatLng = {};							// Object for storing OpenCageData API's Latitude/Longitude of city 
var apiLatitude = 0;							// Amadeus API Parameter for Latitude
var apiLongitude = 0;							// Amadeus API Parameter for Longitude
var apiRadius = 2;								// Amadeus API Parameter for radius set to 2 KM
var apiPageLimit = 10;							// Amadeus API Parameter for max number of results set to 10
var apiPageOffset = 0;							// Amadeus API Parameter for offset of results set to 0
var AmadeusData = [];							// Array for storing Amadeus API Data
var poiData = [];								// Array for storing Points of Interest (i.e. Name, Category)

// Web app's Firebase configuration
var firebaseConfig = {
	apiKey: "AIzaSyCr5-OYKTaDKEYDPTMX7j8cYJdCPidavtY",
	authDomain: "project1-94b01.firebaseapp.com",
	databaseURL: "https://project1-94b01.firebaseio.com",
	projectId: "project1-94b01",
	storageBucket: "",
	messagingSenderId: "215218801398",
	appId: "1:215218801398:web:17f017d3ae14f36007bad7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
var database = firebase.database();

// FUNCTIONS
// ==============================================================================

// Function to empty out the Points of Interest of the specified location
function clear() {
	$(".travel-results").empty();
}


// MAIN PROCESS
// ==============================================================================


// CLICK HANDLERS
// ==============================================================================

// .on("click") function associated with the Go Button
$("#go").on("click", function (event) {
	// Prevents the page from reloading on form submit.
	event.preventDefault();

	// Grab the city that the user typed into the search input.
	// Format it so that special characters are properly handled by using encodeURIComponent().
	var strCity = encodeURIComponent($("#search-city").val().trim());

	console.log("strCity: " + strCity);

	// Make the AJAX request to the Open Weather Map API to get the city's current weather
	var settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://community-open-weather-map.p.rapidapi.com/weather?&id=2172797&units=imperial&q=" + strCity,
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
			"x-rapidapi-key": "147b3f8497msh00278760d20ce9bp1c5669jsnacb348959b12"
		}
	}
	$.ajax(settings).done(function (response) {
		console.log("Weather info response: " + response);

		$("#tempimg").html('<img src="http://openweathermap.org/img/wn/' + response.weather[0].icon + '@2x.png">');
		$(".js-city").text(strCity);
		$(".js-weather-temp").text(response.main.temp);
	});

	// Make the AJAX request to the Open Cage Data API
	$.ajax({
		url: "https://api.opencagedata.com/geocode/v1/json?",
		method: "GET",
		data: {
			q: strCity,
			key: "7ea4ac36337742a5aaee9cee8a99ad63",
			limit: 1,
			language: "en",
			pretty: 1
		}
	}).then(function (response) {
		console.log("response.results: " + JSON.stringify(response.results[0].geometry));

		// Store results from Open Cage Data API in Firebase's DB
		database.ref("/OpenCageDataResults/" + strCity).push(response.results[0].geometry);

		// Store the data from the AJAX request in a variable
		CityLatLng = response.results[0].geometry;

		// Grab the latitude/longitude into variables
		apiLatitude = CityLatLng.lat;
		apiLongitude = CityLatLng.lng;
	}).then(function () {
		console.log("apiLatitude: " + apiLatitude);
		console.log("apiLongitude: " + Math.abs(apiLongitude));

		// Make the AJAX request to the Amadeus API
		// The API's Access Token is ONLY VALID for 30 minutes!!!
		$.ajax({
			url: "https://test.api.amadeus.com/v1/reference-data/locations/pois?",
			method: "GET",
			data: {
				latitude: apiLatitude,
				longitude: Math.abs(apiLongitude),
				radius: apiRadius
			},
			dataType: "json",
			async: true,
			crossDomain: true,
			beforeSend: function (xhr) {
				xhr.setRequestHeader("Authorization", "Bearer " + "N9bzVxSIprj0N3D7oIPUEg7KErye");
			},
			success: function (json) {
				console.log("json: " + JSON.stringify(json));

				// Store results from Amadeus API in Firebase's DB
				database.ref("/AmadeusResults/" + strCity).push(json);

				// Store results data array into array AmadeusData
				AmadeusData = json.data;

				// Parse results to grab relevant data of Point of Interests (up to 10 items per page)
				// 6 categories: Sights, Beach/Park, Historical, Nightlife, Restaurant and Shopping
				// Rank (0-100): Based on popularity and on certain categories of social relevance.
				//				 For example, found popular venues to visit, but not to eat or vice-versa.
				for (var i = 0; i < AmadeusData.length; i++) {
					poiData.push({ category: AmadeusData[i].category, name: AmadeusData[i].name, rank: AmadeusData[i].rank, tags: AmadeusData[i].tags });



					// Create the new row
					var newRow = $("<tr>").append(
						$("<td>").text(poiData[i].name),
						$("<td>").text(poiData[i].category)
					);

					// Append the new row to the table
					$("#poi-table > tbody").append(newRow);

					// console.log("i: " + i + "; poiData[i].category: " + poiData[i].category);
					// console.log("i: " + i + "; poiData[i].name: " + poiData[i].name);
					// console.log("i: " + i + "; poiData[i].rank: " + poiData[i].rank);
					// console.log("i: " + i + "; poiData[i].tags: " + poiData[i].tags);
				}


			},
			error: function (err) {
				console.log(err);
			}
		});

	}).catch(function () {
		$('js-interests').text('Error loading information');
	})


    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://community-open-weather-map.p.rapidapi.com/weather?&id=2172797&units=imperial&q="+strCity,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
            "x-rapidapi-key": "147b3f8497msh00278760d20ce9bp1c5669jsnacb348959b12"


        }

    }
    
    
    $.ajax(settings).done(function (response) {
        console.log(response)
        $("#tempimg").html('<img src="http://openweathermap.org/img/wn/'+response.weather[0].icon+'@2x.png">')
        $(".js-city").text(strCity)
        $(".js-weather-temp").text(response.main.temp)

        
	})
	console.log("before")
	var settings2 = {
		"async": true,
		"crossDomain": true,
		"url": "https://community-open-weather-map.p.rapidapi.com/forecast/daily?lat=35&lon=139&cnt=10&units=metric%20or%20imperial&mode=xml%2C%20html&q="+strCity,
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
			"x-rapidapi-key": "147b3f8497msh00278760d20ce9bp1c5669jsnacb348959b12"
		}
	}
	
	$.ajax(settings2).done(function (response) {
		console.log(response);
		console.log("after")
	});

});

$(document).ready(function(){
	    $('.modal').modal();
	  });