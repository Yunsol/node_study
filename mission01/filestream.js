/**
 * mission01 . 파일의 내용을 한 줄씩 읽어 들여 화면에 출력하는 기능 만들기
- 하나의 파일을 만들고 각 줄에는 공백으로 구분된 이름, 나이, 전화번호가 들어가도록 구성
- 파일의 내용을 한 줄씩 읽어 들이면서 각 정보를 공백으로 구분
- 구분된 정보 중에서 이름만 화면에 출력
 */

const fs = require('fs');
const readline = require('readline');

var rd = readline.createInterface({
    input: fs.createReadStream('./mission01/readFile.txt'),
    output: process.stdout,
    console: false
});

rd.on('line', (line) => {
    //console.log(line);
    var info = line.split(' ');
    var name = info[0];
    var age = info[1];
    var phone = info[2];
    console.log(name);
});

/*
fs.readFile('./readFile.txt', (err, data) => {
    if(err) { 
        throw err;
    }
    console.log(data.toString());
});
*/