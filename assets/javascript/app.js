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

$('.travel-results').hide();
$('.js-repeat-search').hide();

