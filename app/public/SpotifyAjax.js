const findArtist = function (event) {
    event.preventDefault();
    let artist = $('.whateverInputField').val();

    let queryURL = `https://api.spotify.com/v1/search?q=${artist}&type=artist`;

    const access_token = localStorage.getItem("spotify_access_token");

    $.ajax({
        url: queryURL,
        method: 'GET',
        headers: {
            "Accept": "appliation/json",
            'Authorization': 'Bearer' + `${access_token}`,
            "Content-Type": "application/json"
        }

    }).then(function (response) {
        console.log(response);
        console.log(response.artists.items[0].external_urls.spotify);

        for (let i = 0; i < response.artists.items.length; i++) {
            $('.somediv').append('some information TBD');
        }
    });
}
