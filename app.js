import express from 'express'

let app = express();

let http = require('http').Server(app);
let io = require('socket.io')(http);



const PORT = 3000;
http.listen(PORT, () => {
    console.log('Server on port ', PORT);
})