// WhAtWG 방식의 url 대신 기존 노드의 url을 사용할 때, search 부분을 사용하기 쉽게 객체로 만드는 모듈이다.
const url = require('url');
const querystring = require('querystring');

const parsedUrl = url.parse('http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript');
console.log('parsedUrl:', parsedUrl);
console.log('parsedUrl.query:', parsedUrl.query);

const query = querystring.parse(parsedUrl.query);

// url의 query 부분을 자바스크립트 객체로 분해한다.
console.log('querystring.parse(쿼리) => query:', query);
// 분해된 query 객체를 문자열로 다시 조립한다.
console.log('querystring.stringify(객체)', querystring.stringify(query));

console.log(parsedUrl.query === querystring.stringify(query));