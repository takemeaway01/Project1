$(".travel-button").on("click",function(){
    console.log("in here")
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
        console.log(response)
        $("#tempimg").html('<img src="http://openweathermap.org/img/wn/'+response.weather[0].icon+'@2x.png">')
        $(".js-city").text(city)
        $("#temperature").text(response.main.temp)

        
    })


})







var s = {
    method: "GET",
    url: "https://test.api.amadeus.com/v1/reference-data/locations/pois?latitude=41.8781&longitude=2.160873&radius=2",
    headers: {
        'Authorization': 'Bearer ' + '8YgtfFS5HioRG39VFEIFdkYE8BkE'
    },
    async: true,
    crossDomain:true
}
$.ajax(
    {
    method: "GET",
    url: "https://test.api.amadeus.com/v1/reference-data/locations/pois?latitude=41.397158&longitude=2.160873&radius=2",
    dataType: 'json',
    async: true,
    crossDomain:true,
    beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization',
            'Bearer ' + 'JRv8V0WeUU6mJuu6t3qnVJvSBA78');
    },                
    success: function(json) {
        console.log(json);
    },
    error: function(err){
console.log(err);

    }
}
);

// $('.travel-results').hide();

