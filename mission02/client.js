//net Module 호출
var net = require('net');
	
var client = net.connect({port:8107, host:'localhost'}, function(){
    console.log('서버에 접속되었습니다.');
    client.write('안녕! \r\n');

});

client.on('data',function (data) {
    console.log('서버가 보낸 메세지 : '+data.toString());
    client.end();
});

client.on('end',function () {
    console.log('접속이 종료되었습니다.');

});