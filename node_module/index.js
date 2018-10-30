const { odd, even } = require('./var');
const checkNumber = require('./func');

function checkStringOddOrEven(str) {
    if (str.length % 2) { // 홀수면
        return odd;
    }
    return even;
}

console.log(checkNumber(10));
console.log(checkStringOddOrEven('hello'));
console.log(global); // 노드의 전역 객체