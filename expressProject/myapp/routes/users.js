var express = require('express');
var router = express.Router();

/* GET users listing. */
/*
1.첫번째 파라미터에 /만 설정한 이유는 app.js에
  app.use('/users', users) 코드로 라우팅 설정되어 있기 때문에
  user.js 모듈에는 /만 라우팅 설정할 수 있음
2.두번째 파라미터는 콜백
  URL에 접속했을 때 실행되는 함수
  - req는 클라이언트 응답에 대한 정보
    req.params, req.param(), req.body등 요청하는 데이터에 접근
  - res는 클라이언트로 응답을 위한 객제
    res.send()함수를 이용해 문자열로 응답
    이 외에도 res.json() 제이슨 객체로 응답, res.render() 제이드 템플릿을 렌더링, res.sendfile() 파일 다운로드
 */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
