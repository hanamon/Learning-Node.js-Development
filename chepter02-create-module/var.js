/*const odd = '홀수입니다.';
const even = '짝수입니다.';

module.exports = {
  odd,
  even
};*/

exports.odd = '홀수 입니다.';
exports.even = '짝수 입니다.';

// exports는 module.exports를 참조하고 module.exports는 {}를 참조한다.
// console.log(module.exports);
// console.log(exports);
// console.log(module.exports === exports); // true
// exports = '안녕하세요.'
// console.log(module.exports === exports); // false

console.log('var.js 코드', require.main === module); // require.main은 노드 첫 실행 시 첫 모듈을 가리킨다.
console.log('var.js 코드', require.main.filename);
