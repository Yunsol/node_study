// Module Import
var path = require('path');

var pjtPath = 'c:/Users/User/NodeJS/File_exam';
var homeDir = 'c:/Users/User/NodeJSS';
var workDir = 'c:/Users/User/NodeJS';
var projectDir = '/File_exam';
var fileName = '/file_exam.js';

console.log(path.normalize(pjtPath));

var filePath = path.join(homeDir,workDir,projectDir,fileName);

console.log('파일전체경로:'+filePath);                // 경로 생성후 출력
console.log('디렉토리:'+path.dirname(filePath));    // 디렉토리 추출후 출력
console.log('파일:'+path.basename(filePath));      // 파일명 추출후 출력
console.log('확장자:'+path.extname(filePath));     // 파일확장자 추출후 출력
console.log('파일명:'+path.basename(filePath, path.extname(filePath)));// 파일명 추출시 확장자 제외후 출력