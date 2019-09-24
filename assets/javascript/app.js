// VARIABLES
// ==============================================================================
let strCity = "";
let strURL = "";
let queryURL = "";
let cityResults = {};
let numLongitute = 0;
let numLatitude = 0;


// FUNCTIONS
// ==============================================================================
// Build the URL for Amadeus API based on the location (i.e. City)
// @returns {string} URL
function buildQueryURL() {
	// strURL is the URL we'll use to query the Amadeus API
	strURL = "";
	strURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";

	// Begin building an object to contain our API call's query parameters
	// Set the API key
	let queryParams = {};
	queryParams = { "api-key": "R1a31F4tBjCUaM2ho8GtIFsrSdtXt30M" };

	// Grab the city that the user typed into the search input, add to the queryParams object
	queryParams.q = $("#search-city").val().trim();

	// Logging the URL so we have access to it for troubleshooting
	console.log("---------------\nURL: " + strURL + "\n---------------");
	console.log(strURL + $.param(queryParams));
	return strURL + $.param(queryParams);
}

// MAIN PROCESS
// ==============================================================================


// CLICK HANDLERS
// ==============================================================================

// .on("click") function associated with the Go Button
$("#go").on("click", function (event) {
	// Prevents the page from reloading on form submit.
	event.preventDefault();

	// Build the query URL for the ajax request to the Amadeus API
	queryURL = "";
	queryURL = buildQueryURL();
	console.log(queryURL);

	// Make the AJAX request to the API - GETs the JSON data at the queryURL.
	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function (response) {
		console.log(response);

		// Store the data from the AJAX request in a variable
		cityResults = response.data;
	});
});


