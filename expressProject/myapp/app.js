/**
 * 모듈선언
 * require()를 사용하여 모듈들을 선언한다.
 */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 미리 구현한 라우팅 모듈을 가져온다.
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

/**
 * express 객체 초기화
 */
var app = express();

// view engine setup
/**
 * express 세팅
 * 제이드 모듈을 익스프레스와 연동
 */
app.set('views', path.join(__dirname, 'views')); // views 폴더에 있는 제이드파일을 렌더링 할 수 있는 준비 완료
app.set('view engine', 'jade'); // 뷰엔진을 제이드로 설정

/**
 * 미들웨어
 * 미들웨어는 기본적으로 app.use(function(req, res, next){ ..... }); 의 구조를 가진 함수라고 생각하면 된다.
 */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// URL에 따라 라우팅 모듈을 설정한다.
app.use('/', indexRouter);
app.use('/users', usersRouter);

// 에러가 발생했을 때 어떻게 처리할지
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/*
middleware1은 요청객체를 이용해 인증 여부를 검사하는 미들웨어입니다. 
인증이 되었으면 다음 로직을 수행하기 위해 next()를 호출하게 되고 
그렇지 않을 경우 next() 함수에 에러 인스턴스를 만들어 넘겨줍니다.
*/
app.use(function middleware1(req, res, next) {
  console.log('middleware1: 인증작업...')
  if (/*인증 되었으면*/true) {
    next();
  } else {
    next(new Error('Unauthorized'))
  }
});

/*
인증에 통과하면 middlware2를 수행하게 될 것입니다.
이것은 단순히 로깅 작업만 수행한 뒤 next()를 호출합니다.
*/
app.use(function middleware2(req, res, next) {
  console.log('middleware2: 로깅작업...')
  next();
});

/*
middleware3는 좀 특별한 미들웨어입니다. 파라매터를 보면 첫번째 에러객체 err가 추가된 것을 볼 수 있을 겁니다.
이것은 에러를 처리하는 미들웨어의 인터페이스인데, next(에러객체)를 호출하게 되면 이 에러 미들웨어가 동작하게 됩니다.

미들웨어의 실행 순서를 정리하자면 다음과 같습니다

인증에 성공할 경우: middleware1 -> middleware2 -> 라우팅 로직 -> 응답
인증에 실패할 경우: middleware1 -> middleware3 -> 응답
*/
app.use(function middleware3(err, req, res, next) {
  if (err) {
    if (err.message === 'Unauthorized') {
      return res.status(401).send('Unauthorized');
    }
    return res.satus(400).send('BadRequest');
  }
  next()
});

module.exports = app;
