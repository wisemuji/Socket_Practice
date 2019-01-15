import express from 'express'

let app = express();

let http = require('http').Server(app);
let io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

// 요청 -> 반환

// 서버가 값을 보낼 수 있는 방법 중 하나

// io = 나 ( 코드를 실행시키는 위치 ( 서버 혹은 클라이언트 등 ) )
// socket = //#endregion

// room = 채팅방 같은 느낌

io.on('connection', (socket) => { // 소켓 접속
    // 이벤트 옆으로 통신 열고, 받을 변수를 콜백 함수 인자값으로
    console.log('a user connected');
    socket.on('join room', (room) => { // 이벤트 명, 룸 코드(룸 들어가기)
        socket.join(room) // 룸 들어가기
    })
    socket.on('leave room', (room) => { // 이벤트 명, 룸 코드(룸 나가기)
        socket.leave(room) // 룸 나가기
    })
    socket.on('send message', (name, profileImg, index, room) => { // 프론트에서 서버에게 메세지를 보낼 때
        let user_json = { // 데이터 json으로 정리
                name: name,
                profileImg: profileImg,
                index: index
            }
            // io.to(room).emit('receive message', user_json); // 프론트에서 서버에게 메세지를 보낼 때
        socket.broadcast.to(room).emit('receive message', user_json)
    })
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
        console.log('msg=' + msg);
    })
    socket.on('disconnect', () => { // 연결이 끊겼을 때
        console.log('user disconnect')
    })
})

const PORT = 3000;
http.listen(PORT, () => {
    console.log('Server on port ', PORT);
})