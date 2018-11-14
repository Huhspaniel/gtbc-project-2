
//this function hides the welcome page and shows the search page on button click
const hideHomePage = function () {
    $('.welcome-page').addClass('hide');
    $('.band-page').removeClass('hide');
}
$('.login-button').on('click', hideHomePage);
$('.search-artists').on('click', hideHomePage);

//this function allows the user to go back to the home page when home is clicked on navbar

const goHome = function () {
    $('.welcome-page').removeClass('hide');
    $('.band-page').addClass('hide');
}
$('.go-home').on('click', goHome);

$(function () {

let queryURL = `https://api.spotify.com/v1/search?q=${bandName}&type=artist&market=US&limit=10&offset=5`

    $.ajax({
        url: queryURL,
        method: 'GET',
        headers: {

        }
    }).then(function(response){
        console.log(response);
    })
})