$(function () {
  var socket = io();
  $('form').submit(function () {
    socket.emit('message', JSON.stringify({
      room: localStorage.getItem('joinroom'),
      msg: `<span style="color:orange">@${localStorage.getItem('username') || 'Anonymous'}:</span> ${$('#m').val()}`
    }));
    $('#m').val('');
    return false;
  });
  socket.on('connection', function () {
    socket.on('message', function (msg) {
      $('#socketMessages').append($('<li>').html(msg));
      const chatBox = document.querySelector('#socketMessages');
      chatBox.scrollTop = chatBox.scrollHeight;
    });
  });
  function joinRoom(room) {
    socket.emit('joinroom', room);
  }
  window.addEventListener('joinroom', function (e) {
    if (localStorage.getItem('leaveroom')) {
      socket.emit('leaveroom', localStorage.getItem('leaveroom'));
      // $('#socketMessages').html('');
      joinRoom(localStorage.getItem('joinroom'));
      localStorage.setItem('leaveroom', localStorage.getItem('joinroom'));
    } else {
      joinRoom(localStorage.getItem('joinroom'));
      localStorage.setItem('leaveroom', localStorage.getItem('joinroom'));
    }
  })
});

window.addEventListener('load', function (e) {
  localStorage.removeItem('leaveroom');
})