
$(".btn").on("click",function(){
    var city= $("#city").val()

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://community-open-weather-map.p.rapidapi.com/weather?&id=2172797&units=imperial&q="+city,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
            "x-rapidapi-key": "147b3f8497msh00278760d20ce9bp1c5669jsnacb348959b12"


        }

    }
    
    
    $.ajax(settings).done(function (response) {
        $("#temp").text("Temperature "  + response.main.temp);
    })
})


// //var settings = {
// 	"async": true,
// 	"crossDomain": true,
// 	"url": "https://yelpapiserg-osipchukv1.p.rapidapi.com/getAutocomplete",
// 	"method": "POST",
// 	"headers": {
// 		"x-rapidapi-host": "YelpAPIserg-osipchukV1.p.rapidapi.com",
// 		"x-rapidapi-key": "147b3f8497msh00278760d20ce9bp1c5669jsnacb348959b12",
// 		"content-type": "application/x-www-form-urlencoded"
// 	},
// 	"data": {}
// }

// $.ajax(settings).done(function (response) {
//     console.log(response);
// })