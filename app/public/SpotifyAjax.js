const findArtist = function (event){
event.preventDefault();
const clientID = "7886529ac1ca47028e6bbaf1f7e3cff5";
let artist = $('.whateverInputField').val();

let queryURL = `https://api.spotify.com/v1/search?q=${artist}&type=artist`


$.ajax({
    url: queryURL,
    method: 'GET',
    headers: {
        "Accept":"appliation/json",
        'Authorization': 'Bearer' + `${dynamicallyGeneratedAccessTokenWhenUserLogsIn}`,
        "Content-Type": "application/json"
    }

}).then(function (response){
    console.log(response);
    console.log(response.artists.items[0].external_urls.spotify);

    for(let i = 0; i < response.artists.items.length; i++){
        $('.somediv').append('some information TBD');
    }
})
}
