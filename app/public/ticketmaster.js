var opts = {
  lines: 13, // The number of lines to draw
  length: 38, // The length of each line
  width: 17, // The line thickness
  radius: 45, // The radius of the inner circle
  scale: 1, // Scales overall size of the spinner
  corners: 1, // Corner roundness (0..1)
  color: 'black', // CSS color or array of colors
  fadeColor: 'transparent', // CSS color or array of colors
  speed: 1, // Rounds per second
  rotate: 0, // The rotation offset
  animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
  direction: 1, // 1: clockwise, -1: counterclockwise
  zIndex: 2e9, // The z-index (defaults to 2000000000)
  className: 'spinner', // The CSS class to assign to the spinner
  top: '50%', // Top position relative to parent
  left: '50%', // Left position relative to parent
  shadow: '0 0 1px transparent', // Box-shadow for the lines
  position: 'absolute' // Element positioning
};
let lastSearch;
const displayEvents = function () {

  const artist = $('.artist').val().trim();
  const city = $('.city').val().trim();
  const state = $('.state').val().trim();
  const zipCode = $('.zip-code').val().trim();
  var spinner = new Spinner(opts).spin(document.querySelector('.search-results'));
  // document.querySelector('.search-results').appendChild(spinner.el);

  $.ajax({
    type: 'GET',
    url: `https://app.ticketmaster.com/discovery/v2/events.json?apikey=nwxOIKtHH091zDnP5hT7HPf3mYiGEHN1&classificationName=[Music]&size=27&keyword=${artist}&city=${city}&stateCode=${state}&postalCode=${zipCode}&radius=100`,
    async: true,
    dataType: "json",
    success: function (data) {
      spinner.stop();
      if (data._embedded) {
        console.log(data._embedded.events);
        data._embedded.events.forEach(event => {
          const venue = event._embedded.venues[0];
          $('.search-results').append(
            $('<div>').addClass('event').html(
              `<h2>${event.name}</h2>
              <img src='${event.images[0].url}'>
              <div>${event.dates.start.localDate}</div>
              <div>${venue.city.name}, ${venue.state ? venue.state.stateCode : venue.country.name}</div>`
            ).attr('data-id', event.id)
          )
        });
      } else {
        $('.search-results').html('No results found.');
      }
      lastSearch = Array.from(document.querySelector('.search-results').children);
    },
    error: function (xhr, status, err) {
      console.log(err);
    }
  });
}
const clearEvents = function () {
  $('.search-results').html('');
}

$('.findEvent').on('click', () => {
  clearEvents();
  displayEvents();
})

$('.search-results').on('click', 'div.event', function () {
  clearEvents();
  var spinner = new Spinner(opts).spin(document.querySelector('.search-results'));
  $.ajax({
    type: 'GET',
    url: `https://app.ticketmaster.com/discovery/v2/events/${$(this).attr('data-id')}?apikey=nwxOIKtHH091zDnP5hT7HPf3mYiGEHN1`,
    async: true,
    dataType: 'json',
    success: function (data) {
      console.log(data);
      spinner.stop();
      localStorage.setItem('joinroom', data.id);
      window.dispatchEvent(new Event('joinroom'));
      document.querySelector('main.search').classList.add('hidden');
      document.querySelector('.search-results').append(...lastSearch);
      document.querySelector('main.event-page').classList.remove('hidden');
      $('main.event-page h1').text(data.name);
      $('.event-details').html('').append(
        $('<img>').attr('src', data.images[0].url),
        $('<div>').text(`Date: ${data.dates.start.localDate}`),
        $('<div>').text(`Time: ${data.dates.start.localTime} ${data.dates.timezone}`),
        $('<div>').text(data.priceRanges ? `Price Range: $${data.priceRanges[0].min} - $${data.priceRanges[0].max}` : ''),
        $('<div>').html(data.seatmap ? `<a href=${data.seatmap.staticUrl} target="_blank">Seat Map</a>` : ''),
        $('<div>').html(`<a href=${data.url} target="_blank">Ticketmasters</a>`),
        (venues => {
          var venuesHTML = '<div>Venue(s):</div>';
          venues.forEach(venue => {
            venuesHTML += `<div><a href="${venue.url}" target="_blank">${venue.name}</a></div>
                              <div>${venue.address.line1}</div>
                              <div>${venue.address.line2 || ''}</div>
                              <div>${venue.address.line3 || ''}</div>
                              <div>${venue.city.name}, ${venue.state ? venue.state.name : venue.country.name}`;
          });
          return venuesHTML;
        })(data._embedded.venues)
      )
    }
  })
})

const corsAnywhere = function () {
  var cors_api_host = 'cors-anywhere.herokuapp.com';
  var cors_api_url = 'https://' + cors_api_host + '/';
  var slice = [].slice;
  var origin = window.location.protocol + '//' + window.location.host;
  var open = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function () {
    var args = slice.call(arguments);
    var targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
    if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
      targetOrigin[1] !== cors_api_host) {
      args[1] = cors_api_url + args[1];
    }
    return open.apply(this, args);
  };
};
corsAnywhere();