$(function () {
    // const getBandInfo = function (event) {

        // let bandName = $('#band-input').val();
    // let queryURL = `https://api.spotify.com/v1/search?q=${bandName}&type=artist&market=US&limit=10&offset=5`
    let queryURL = `https://api.spotify.com/v1/search?q=the%20rolling%20stones&type=artist&market=US&limit=10&offset=5`;

    $.ajax({
        url: queryURL,
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer BQCprzhOUbLPsXXM4Ntrs4c-xZdABPikVEcvTbzXbf1Y_1YOtfgsALPgj6KcLueRcvQ1FsmXhHcVHfJMKkPBvR4lUoJM6NFVGEa2Uk1xgp2TRPZ9tbXiO3Mwa6aw90FbdZkbpyQlKGBJyGVlLl7r1cK4U8ayBFtl-HHSDjVgglx0yKl0wXSEDXGD2zQ"
        }
    }).then(function (response) {
        console.log(response);
    })
    // }
    // $('.search-button').on('click', getBandInfo);
});