const io = require('socket.io-client');

//const socket = io.connect('http://localhost:3000/chat'); // Replace with the actual URL of your socket server
//const socket = io.connect('https://apis-dev.heartyhelper.co/chat'); // Dev 
const socket = io.connect('https://apis.heartyhelper.co/chat'); // Prod

socket.on('connect', () => {
  console.log('Connected to socket server');

  // Simulate a new user connecting
  socket.emit('new-user-add', 'user3');

  // Simulate sending a message to another user
  socket.emit('send-message', { receiverId: "user2", message: "Hi Message From User 3", senderId: "user3" });

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
