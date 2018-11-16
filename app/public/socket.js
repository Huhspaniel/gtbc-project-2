$(function () {
  var socket = io();
  $('form').submit(function () {
    socket.emit('chat message', `<span style="color:orange">@${localStorage.getItem('username') || 'Anonymous'}:</span> ${$('#m').val()}`);
    $('#m').val('');
    return false;
  });
  socket.on('chat message', function (msg) {
    $('#socketMessages').append($('<li>').html(msg));
    const chatBox = document.querySelector('#socketMessages');
    chatBox.scrollTop = chatBox.scrollHeight;
  });
});