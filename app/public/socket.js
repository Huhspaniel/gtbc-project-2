$(function () {
  var socket = io();
  $('form').submit(function () {
    socket.emit('message', JSON.stringify({
      room: localStorage.getItem('joinroom'),
      msg: `<span style="color:orange">@${localStorage.getItem('username') || `Anonymous-${socket.id}`}:</span> ${$('#m').val()}`
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
    socket.emit('joinroom', {room: room, user: localStorage.getItem('username') || undefined});
  }
  function leaveRoom(room) {
    socket.emit('leaveroom', {room: room, user: localStorage.getItem('username') || undefined});
  }
  window.addEventListener('joinroom', function (e) {
    $('#socketMessages').html('')
    if (localStorage.getItem('leaveroom')) {
      joinRoom(localStorage.getItem('joinroom'));
      leaveRoom(localStorage.getItem('leaveroom'));
    } else {
      joinRoom(localStorage.getItem('joinroom'));
    }
    localStorage.setItem('leaveroom', localStorage.getItem('joinroom'));
  })
});

window.addEventListener('load', function (e) {
  localStorage.removeItem('leaveroom');
})