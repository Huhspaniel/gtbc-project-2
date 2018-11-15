const displayEvents = function () {

  const artist = $('.artist').val().trim();
  const city = $('.city').val().trim();
  const state = $('.state').val().trim();
  const zipCode = $('.zip-code').val().trim();


  $.ajax({
    type: 'GET',
    url: `https://app.ticketmaster.com/discovery/v2/events.json?apikey=nwxOIKtHH091zDnP5hT7HPf3mYiGEHN1&classificationName=[Music]&size=27&keyword=${artist || ''}&city=${city}&stateCode=${state}`,
    async: true,
    dataType: "json",
    success: function (data) {
      if (data._embedded) {
        console.log(data._embedded.events);
        data._embedded.events.forEach(event => {
          console.log(event);
          $('.search-results').append(
            $('<div>').addClass('event').html(
              `<h2>${event.name}</h2>
              <img src='${event.images[0].url}'>`
            ).attr('data-id', event.id)
          )
        });
      } else {
        $('.search-results').html('No results found.');
      }
    },
    error: function (xhr, status, err) {
      console.log(err);
    }
  });
}
const clearEvents = function() {
  $('.search-results').html('');
}

$('.findEvent').on('click', () => {
  clearEvents();
  displayEvents();
})

$('.search-results').on('click', 'div.event', function() {
  $.ajax({
    type: 'GET',
    url: `https://app.ticketmaster.com/discovery/v2/events/${$(this).attr('data-id')}-bh.json?apikey=nwxOIKtHH091zDnP5hT7HPf3mYiGEHN1`,
    async: true,
    dataType: 'json',
    success: function(data) {
      console.log(data);
    }
  })
})
