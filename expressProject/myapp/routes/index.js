/** index.ejs
 * ejs : Embedded JavaScript
 */

var express = require('express');
var router = express.Router();

/* GET home page. */
// 루트주소로 들어올 경우 index.ejs를 렌더하는 구문
/**
 * 라우트는 router.VERB(url, fn1, fn2, …. , fn)의 방식으로 정의
 * VERB종류
  - all : 모든 요청에 대해 처리
  - get : GET요청에 대해 처리
  - post : POST 요청에 대해 처리
  - put : PUT 요청에 대해 처리
  - del : DELETE 요청에 대해 처리
 */
router.get('/', function(req, res, next) {
  // {title: 'Express'}객체를 설정한 경우 /views/index.jade에서 이 객체를 이용해 페이지 정보를 구성
  res.render('index', { title: 'Express' }); 
});
/*
render(view, locals)
view : 렌더링할 템플릿 파일명
locals: 템플릿 파일에 주입할 객체
*/

// localhot:3000/abc 에 접속을 할 때, example.ejs의 화면을 보여주고 싶다면
/*
route.get('/abc', function(req, res, next) {
  res.render('example', {title : 'Express'});
  // example의 html <%=title%>부분에 Express로 출력
});
*/
module.exports = router;
