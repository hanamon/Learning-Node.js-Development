const { odd, even} = require('./var');

function checkOddOrEven(num) {
  if (num % 2) return odd;
  return even;
}

module.exports = checkOddOrEven;

// module.exports에 함수를 대입한 경우에는 exports로 바꿀 수 없다. (참조 관계가 끊어진다.)
// console.log(module.exports);
// console.log(exports);
// console.log(module.exports === exports); // false

// console.log(module);
// console.log(require.cache);
// console.log(require.main);
// console.log(require.main === module);
