// Node.js에 기본 내장되어 있는 http 모듈을 로드한다
var http = require("http");

// http 모듈의 createServer 메소드를 호출하여 HTTP 서버 생성
http.createServer(function(request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"}); // (1) 요청(request)이 올 때마다 response.writeHead() 함수를 사용해서 HTTP status 200 과 content-type을 응답 헤더로 보내고,
    response.write("Hello World");  // (2) response.write()로 HTTP 응답 바디에 “Hello World” 텍스트를 담아 보낸다.
    response.end();                 // (3) 마지막으로 response.end()로 응답을 마무리한다.
  }).listen(8888);