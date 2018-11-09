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
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

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

module.exports = app;
