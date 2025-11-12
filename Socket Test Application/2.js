const io = require('socket.io-client');

//const socket = io.connect('http://localhost:3000/chat'); // Replace with the actual URL of your socket server
//const socket = io.connect('https://apis-dev.heartyhelper.co/chat');// dev
const socket = io.connect('https://apis.heartyhelper.co/chat');/// prod

socket.on('connect', () => {
  console.log('Connected to socket server');

  // Simulate a new user connecting
  socket.emit('new-user-add', 'user2');

  // Simulate sending a message to another user
  socket.emit('send-message', { receiverId: "user1", message: "Hi Message From User 2", senderId: "user2" });

});

socket.on('get-users', (activeUsers) => {
  console.log('Active users:', activeUsers);
});

socket.on('receive-message', (data) => {
  console.log('Received message:', data);
});


socket.on('disconnect', () => {
  console.log('Disconnected from socket server');
});
