
 const displayEvents = function () {

   $.ajax({
     type:"GET",
     url:"https://app.ticketmaster.com/discovery/v2/events.json?apikey=nwxOIKtHH091zDnP5hT7HPf3mYiGEHN1&keyword=music&size=10",
     async:true,
     dataType: "json",
     success: function(json) {
                 console.log(json);
                 // Parse the response.
                 // Do other things.
                 for (let i = 0; i < json._embedded.events.length; i++) {
                   $('#eventInfo').append(`<div class="col-4"><div class="card" style="width: 18rem;">
                   <img class="card-img-top" src="${json._embedded.events[i].images[0].url}" alt="Card image cap">
                   <div class="card-body">
                     <h6 class="card-title">${json._embedded.events[i].name}</h6>
                     <p class="card-text">${json._embedded.events[i].dates.start.localDate} <br>
                     ${json._embedded.events[i]._embedded.venues[0].city.name}</p>
                     <a target="_blank" href="#" class="card-link">Add to Channel</a>
                     <a target="_blank" href="#" class="card-link">Details</a>
                     <a target="_blank" href="${json._embedded.events[i].url}" class="card-link">Tickets</a>
                 </div>`);
                 }

              },
     error: function(xhr, status, err) {
                 // This time, we do not end up here!
              }
   });



 }

$('.findEvent').on('click', displayEvents)
