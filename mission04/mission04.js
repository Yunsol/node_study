/*메모를 기록하고 사진과 함께 웹 서버로 보내는 기능 만들기
- 메모를 작성하고 서버에 보낸 후 응답을 받아 표시하는 기본 화면은 앞의 초급 과제와 같습니다. 파일을 복사하여 만들고 한 두가지 기능을 추가 합니다.
- 작성 화면의 아래쪽에는 사진을 선택해서 표시할 수 있도록 구성합니다. [사진 선택] 버튼을 누르면 PC나 모바일 단말에서 사진을 선택 한 후 보여 줍니다.
- [저장] 버튼을 누르면 웹 서버로 메모 내용을 보내고 사진도 함께 보냅니다. 웹 서버에서는 메모 내용을 확인하고 사진도 업로드한 후 정상적으로 저장되었다는 응답 메시지를 클라이언트로 보냅니다.
- 클라이언트에서 응답 메시지를 받으면 응답 화면에 메시지를 보여 줍니다. 응답 메시지 아래쪽에는 서버에 업로드한 사진을 보여 줍니다.*/
var express = require("express"); //익스프레스 엔진
var http = require("http"); //http프로토콜
var static = require("serve-static"); //서버 패스 개방
var bodyParser = require("body-parser"); // post방식 데이터 반환
var path = require("path"); //경로
// 파일 업로드 관련 모듈
//npm i multer
var multer = require("multer");
var fs = require("fs");

var app = express();

app.set("port", process.env.port || 3000); //설정된 포트나 3000포트 개방
app.use("/public", static(path.join(__dirname, "public"))); //서버의 public 폴더 개방
app.use("/upload", static(path.join(__dirname, "upload"))); //서버의 public 폴더 개방

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); //post 방식의 body 에 담긴 데이터를  Json방식으로 변환

var storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "upload");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  }
});

var upload = multer({
  storage: storage,
  limits: {
    files: 10,
    fileSize: 1024 * 1024 * 1024
  }
});

var router = express.Router(); //라우터 기능

router.route("/process/memo").post(upload.single("photo"), function(req, resp) {
  console.log("/process/memo 라우팅 함수에서 받음");

  try {
    var paramName = req.body.name;
    var paramDate = req.body.date;
    var paramContents = req.body.contents;
    var file = req.file;
    console.log("작성자 :" + paramName);
    console.log("작성일시 : " + paramDate);
    console.log("메모내용 : " + paramContents);
    console.log("파일: " + file);

    var originalname = file.originalname;
    var filename = file.filename;
    var mimetype = file.mimetype;
    var size = file.size;
    var context = { imageUrl: file.path };
    console.log(file.path);

    resp.setHeader("Content-Type", "text/html");
    resp.writeHead(200);
    resp.write("<html><head><title>Simple HTTP Server</title></head>");
    resp.write("<body>");
    resp.write("<img src='/" + file.path + "'/>");
    resp.end("\n</body></html>");
  } catch (err) {
    console.dir(err.stack);
  }
});
/*
router.route("/memo").get((req, res) => {
  console.log("hi1!!");
  res.redirect("/public/memo.html");
});
*/

router.get("/memo", (req, res) => {
  console.log("GET방식으로 memo 호출");
  res.redirect("/public/memo.html");
});

router.route("/process/rememo").post(function(req, resp) {
  res.render("index", { title: "Express" });

  console.log("/process/rememo 라우팅 함수에서 받음");
  resp.redirect("/public/memo.html");
});

app.use("/", router);

app.all("*", function(req, resp) {
  resp.status(404).send("<h1>ERROR-페이지를 찾을 수 없습니다.</h1>");
});
/*
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});
*/

var server = http.createServer(app).listen(app.get("port"), function() {
  console.log("익스프레스로 서버를 실행함 : " + app.get("port"));
});
