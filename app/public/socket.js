$(function () {
    var socket = io();
    $('form').submit(function () {
      socket.emit('chat message', $('#m').val());
      $('#m').val('');
      return false;
    });
    socket.on('chat message', function (msg) {
      $('#socketMessages').append($('<li>').text(msg));
      // window.scrollTo(0, document.body.scrollHeight);
      const chatBox = document.querySelector('#socketMessages');
      chatBox.scrollTop = chatBox.scrollHeight;
    });
  });