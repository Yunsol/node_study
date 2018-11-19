/**
 * 메모를 기록하여 웹 서버로 보내는 기능 만들기
- 화면을 구성할 때 모바일 단말에서도 잘 보이도록 간단하게 만들되 예쁘게 만들 필요는 없습니다.
- 화면은 작성 화면과 응답 화면으로 구성합니다. 작성 화면에는 작성자와 작성 날짜 그리고 내용을 입력할 수 있는 입력 상자를 추가합니다. 가장 아래쪽에는 [저장] 버튼과 [닫기] 버튼을 배치합니다.
- [저장]버튼을 누르면 웹 서버로 메모 내용을 보냅니다. 웹 서버에서는 메모 내용을 확인한 후 정상적으로 저장되었다는 응답 메시지를 클라이언트로 보냅니다.
- 클라이언트에서 응답 메시지를 받으면 응답 화면에 메시지를 보여 줍니다. 응답 메시지 아래쪽에는 [다시 작성] 버튼을 만들고, 이 버튼을 누르면 작성 화면이 표시됩니다.
 */
//필요 모듈 선언 부 	
var express = require('express'); //익스프레스 엔진
var http = require('http'); //http프로토콜
var static = require('serve-static'); //서버 패스 개방
var bodyParser = require('body-parser'); // post방식 데이터 반환
var path = require('path');//경로

var app = express();

app.set('port', process.env.port || 3000); //설정된 포트나 3000포트 개방
app.use('/public',static(path.join(__dirname,'public'))); //서버의 public 폴더 개방

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json()); //post 방식의 body 에 담긴 데이터를  Json방식으로 변환

var router = express.Router(); //라우터 기능

router.route('/process/memo').post(function (req,resp) {

    console.log('/process/memo 라우팅 함수에서 받음');

    var paramName = req.body.name;
    var paramDate = req.body.date;
    var paramContents = req.body.contents;

    console.log('작성자 :'+paramName);
    console.log('작성일시 : '+paramDate);
    console.log('메모내용 : '+paramContents);

    resp.redirect('/public/response.html');
});


router.get('/memo', (req, res) => {
    console.log('GET방식으로 memo 호출')
    res.redirect('/public/memo.html');
});

router.route('/process/rememo').post(function (req,resp) {

    res.render('index', { title: 'Express' });

    console.log('/process/rememo 라우팅 함수에서 받음');
    resp.redirect('/public/memo.html');

});

app.use('/', router);

app.all('*',function (req,resp) {
    resp.status(404).send('<h1>ERROR-페이지를 찾을 수 없습니다.</h1>');
});

var server = http.createServer(app).listen(app.get('port'),function () {
    console.log('익스프레스로 서버를 실행함 : '+app.get('port'));
});
