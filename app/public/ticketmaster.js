
const displayEvents = function () {

   const artist = $('.artist').val().trim();
  //  const setCity = $('.city').val().trim();
  //  const setState = $('.state').val().trim();
  const zipCode = $('.zip-code').val().trim();


  $.ajax({
    type: 'GET',
    url: `https://app.ticketmaster.com/discovery/v2/events.json?apikey=nwxOIKtHH091zDnP5hT7HPf3mYiGEHN1&classificationName=[Music]&size=27&keyword=${artist || ''}`,
    async: true,
    dataType: "json",
    success: function (data) {
      console.log(data._embedded.events);
      data._embedded.events.forEach(event => {
        console.log(event);
        $('.search-results').append(
          $('<div>').addClass('event').html(
            `<h2>${event.name}</h2>
            <img src='${event.images[0].url}'>`
          )
        )
      });
    },
    error: function (xhr, status, err) {
      console.log(err);
    }
  });
}

$('.findEvent').on('click', displayEvents)
