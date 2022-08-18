//node server which will handle socket io

const io = require('socket.io')(3000);

const users = {}

io.on('connection',socket =>{

    socket.on('new-user-joined', username =>{
       console.log('New user joined', username)
       users[socket.id] = username; 
       socket.broadcast.emit('user-joined', username)
    });

    socket.on('send', message=>{
        socket.broadcast.emit('receive', {message: message, username: users[socket.id]})
    });

    // If someone leaves the chat, let others know 
       socket.on('disconnect', message =>{
           socket.broadcast.emit('leave', users[socket.id]);
           delete users[socket.id];
       });

})
