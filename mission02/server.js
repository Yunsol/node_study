/**
 * 소켓 서버와 소켓 클라이언트 기능을 노드로 구성하여 소켓 클라이언트에서 데이터를 보내면 소켓 서버에서 다시 돌려주는 기능 만들기
- 노드의 소켓 기능을 이용해 소켓 서버와 소켓 클라이언트를 만든다
- 소켓 클라이언트에서는 소켓 서버로 연결
- 소켓 클라이언트에서 소켓 서버로 '안녕!'같은 글자를 보내면 소켓 서버에서 그 글자를 그대로 다시 소켓 클라이언트로 보낸다
- 소켓 클라이언트와 소켓 서버에서는 보내고 받은 데이터를 화면에 출력
*/
//net Module 호출
var net = require('net');
var server = net.createServer(function (client) {
//클라이언트가 접속 후 접속메세지 출력
       console.log('클라이언트가 접속했습니다');

//서버가 클라이언트에서 스트링 데이터로 받은 메세지 출력
    client.on('data', function (data) {
        console.log('클라이언트가 보낸 메세지 : ' + data.toString());
        client.write(data.toString());
    });
// 클라이언트 접속 종료 후 출력 메세지
    client.on('end', function () {
        console.log('클라이언트 접속이 종료되었습니다.');

    });
});
//8107포트로 서버 생성 후 대기
server.listen(8107, function () {

    console.log('서버가 시작되었습니다.');

});