// 사용할 변수들을 선언
const { odd, even } = require('./var');//.js생략가능

function checkOddOrEven(num) {
    if (num % 2) { // 홀수면
        return odd;
    }
    return even;
}

module.exports = checkOddOrEven;