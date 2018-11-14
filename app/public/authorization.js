$(function () {

    let queryURL = "https://accounts.spotify.com/authorize?client_id=7886529ac1ca47028e6bbaf1f7e3cff5&response_type=code&redirect_uri=https://gtbc-project-2.herokuapp.com%2Fcallback&scope=user-read-private%20user-read-email%20playlist-read-private%20playlist-modify-public%20playlist-modify-private";

    $.ajax({
        url: queryURL,
        method: 'GET',
    }).then(function (response) {
        console.log(response);
    })

});