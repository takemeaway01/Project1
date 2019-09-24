// VARIABLES
// ==============================================================================
var strCity = "";
var strURL = "";
var queryURLOpenCageData = "";
var OpenCageDataResults = {};
var numLongitute = 0;
var numLatitude = 0;
var radius = 2;
var pageLimit = 10;
var pageOffset = 0;
var queryURLAmadeus = "";
var AmadeusData = [];
var poiData = [];
	/*{
		"category": "",
		"name": "",
		"rank": "",
		"tags": []
	}
];*/

// Initialize Firebase
var firebaseConfig = {
	apiKey: "AIzaSyDaxfigNzvcKeClhprOrG_5s-0JS5y-4iU",
	authDomain: "project1-961a7.firebaseapp.com",
	databaseURL: "https://project1-961a7.firebaseio.com",
	projectId: "project1-961a7",
	storageBucket: "project1-961a7.appspot.com",
	messagingSenderId: "383475471482",
	appId: "1:383475471482:web:0a43d3b380d67da8e8d7c3"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();




// FUNCTIONS
// ==============================================================================
// Build the URL for Open Cage Data API based on the location (i.e. City)
// @returns {string} URL
function buildQueryURLOpenCageData() {
	// strURL is the URL we'll use to query the Open Cage Data API
	strURL = "";
	strURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";

	// Begin building an object to contain our API call's query parameters
	// Set the API key
	var queryParams = {};
	queryParams = { "api-key": "R1a31F4tBjCUaM2ho8GtIFsrSdtXt30M" };

	// Grab the city that the user typed into the search input, add to the queryParams object
	queryParams.q = $("#search-city").val().trim();

	// Logging the URL so we have access to it for troubleshooting
	console.log("---------------\nURL: " + strURL + "\n---------------");
	console.log(strURL + $.param(queryParams));
	return strURL + $.param(queryParams);
}

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

	// Build the query URL for the ajax request to the Open Cage Data API
	queryURLOpenCageData = "";
	queryURLOpenCageData = buildQueryURLOpenCageData();
	console.log(queryURLOpenCageData);

	// Make the AJAX request to the Open Cage Data API - GETs the JSON data at the queryURLOpenCageData
	$.ajax({
		url: queryURLOpenCageData,
		method: "GET"
	}).then(function (response) {
		console.log(response);

		// Store the data from the AJAX request in a variable
		OpenCageDataResults = response.data;

		//ojo Should move AJAX request to Amadeus API ONLY IF were able to obtain location's longitude/latitude

	});


});

// Make the AJAX request to the Amadeus API - GETs the JSON data at the queryURLAmadeus
//ojo Access Token is valid for 30 minutes only!!!
$.ajax({
	method: "GET",
	url: "https://test.api.amadeus.com/v1/reference-data/locations/pois?latitude=41.397158&longitude=2.160873 &radius=2&page[limit]=10&page[offset]=0",
	dataType: 'json',
	async: true,
	crossDomain: true,
	beforeSend: function (xhr) {
		xhr.setRequestHeader('Authorization', 'Bearer ' + 'XW1GvlXFbweLVT4XJJACg6Vctvht');
	},
	success: function (json) {
		console.log(json);
		AmadeusData = json.data;
		console.log(AmadeusData);

		//ojo Should store results from Amadeus in Firebase as a backup (Keep Firebase Initialization and variable globally and/or in main process???)

		// Store results from Amadeus API in Firebase's DB
		// ojo database.ref("/AmadeusData").push(AmadeusData);

		// Parse results to grab relevant data of Point of Interests (up to 10 items per page)
		// 6 categories: Sights, Beach/Park, Historical, Nightlife, Restaurant and Shopping
		// Rank (0-100): Based on popularity and on certain categories of social relevance.
		//				 For example, found popular venues to visit, but not to eat or vice-versa. 
		for (var i = 0; i < AmadeusData.length; i++) {
			console.log("i: " + i + "; category: " + AmadeusData[i].category);
			console.log("i: " + i + "; name: " + AmadeusData[i].name);
			console.log("i: " + i + "; rank: " + AmadeusData[i].rank);
			console.log("i: " + i + "; tags: " + AmadeusData[i].tags);

			poiData.push({category: AmadeusData[i].category, name: AmadeusData[i].name, rank: AmadeusData[i].rank, tags: AmadeusData[i].tags});

			console.log("i: " + i + "; poiData: " + poiData[i]);
		}









	},
	error: function (err) {
		console.log(err);
	}
});

// $('.travel-results').hide();
// $('.js-repeat-search').hide();







