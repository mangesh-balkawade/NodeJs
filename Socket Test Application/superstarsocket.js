const ioClient = require('socket.io-client');

const socketUrl = 'https://api-dev.superstarr.co/user-chat-module'; // Replace with your server URL

// Define the chat data (token and receiver ID)
const chatData = {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJfaWQiOiI2NTllMjZkNDliOWY4ZGIwZWQ4OGRkNTUiLCJ1c2VyX25hbWUiOiJtYW5nZXNoYmFsa2F3YWRlMjE5QGdtYWlsLmNvbSIsIm5hbWUiOiJTdXBlclN0YXIjM2QwODg2NCIsInN1cGVyc3Rhcl9pZCI6MTAwMDAzLCJsb2dpbl90eXBlIjoiVSJ9LCJpYXQiOjE3MDY4NTg5MTksImV4cCI6MTcwOTQ1MDkxOX0.yqqM1kVn14afiHBWcnKoUoledXkWQhogvay8vT3eMdU',
    // receiver_id: 'recipient_user_id_here'
};

async function test() {
    // Connect to the socket server
    const socket = await ioClient('http://localhost:3000/user-chat-module', {
        query: {
            chat_data: JSON.stringify(chatData)
        }
    });

    socket.on('connect', () => {
        console.log('Connected to chat server');
    });

    // Event listener for successful connection
    socket.on('connect', () => {
        console.log('Connected to chat server');
    });

    // Event listener for chat messages
    socket.on('chatMessage', (message) => {
        console.log('Received message:', message);
    });

    // Event listener for disconnection
    socket.on('disconnect', () => {
        console.log('Disconnected from chat server');
    });
}

test();


// Example of sending a message
//socket.emit('sendMessage', 'recipient_user_id_here', 'Hello, world!');
