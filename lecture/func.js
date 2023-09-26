/*

const value = require('./var') //.하나는 현재 내가 있는 폴더를 의미
console.log(value); //모듈의 객체

*/

const {odd, even} = require('./var');

function checkOddOrEven(number) {
    if (number % 2) {
        return odd;
    } else {
        return even;
    }
}

module.exports = checkOddOrEven;