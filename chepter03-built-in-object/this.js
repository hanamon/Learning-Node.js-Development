// 최상위에 스코프에 존재하는 this는 module.expors(또는 exports 객체)를 가리킨다.
console.log(this);
console.log(this === module.exports); // true
console.log(this === exports); // true

// 함수 선언문 내부의 this는 global 객체를 가리킨다.
function whatIsThis() {
  console.log('function', this === exports, this === global); // function false true
}
whatIsThis();
