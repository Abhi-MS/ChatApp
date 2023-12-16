document.addEventListener('DOMContentLoaded', function () {
  var socket = io();

  var userName = prompt('Welcome to the Chatbox! \nPlease enter your name:');

  if (!userName) {
    userName = 'User' + Math.floor(Math.random() * 1000);
  }

  function appendMessage(data) {
    var messagesList = document.getElementById('messages');
    if (data.origin === 'server') {
      return;
    }
    var li = document.createElement('li');

    li.classList.add(data.origin === 'server' ? 'incoming' : 'outgoing');

    li.classList.add(data.user === userName ? 'outgoing' : 'incoming');

    li.textContent = `${data.user}: ${data.message}`;

    messagesList.appendChild(li);

    messagesList.scrollTop = messagesList.scrollHeight;
  }

  socket.on('chat message', function (data) {
    appendMessage(data);
  });

  document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault();
    var input = document.getElementById('input');
    var message = input.value.trim();

    if (message !== '') {
      socket.emit('chat message', { message, user: userName });
      input.value = '';
    }
  });
});
