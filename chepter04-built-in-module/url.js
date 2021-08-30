const url = require('url');

//console.log(url);

// WHATWG url 구분 방식
const { URL } = url;
const myURL = new URL('http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor');

console.log('new URL(주소) => myURL:', myURL);
console.log('url.format(객체):', url.format(myURL));

console.log('----------------------------------------');

// 기존 노드 url 구분 방식
const parsedUrl = url.parse('http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor');
// url.parse() 주소를 분해한다. WHATWG 방식과 비교하면 username과 password 대신 auth 속성이 있고, searchParams 대신 query 가 있다.
console.log('url.parse(주소) => parsedUrl:', parsedUrl);
// url.format() WHATWG 방식 url과 기존 노드 url을 모두 사용할 수 있다. 분해되었던 ur 객체를 다시 원래 상태로 조립한다.
console.log('url.format(객체):', url.format(parsedUrl));

/*
  * 두 방법은 취향에 따라 사용하면 되지만 노드의 url 형식을 꼭 사용해야 하는 경우가 있다.
  * host 부분 없이 pathname 부분만 오는 주소인 경우(예: /book/bookList.apsx)에는 WHATWG 방식이 처리할 수 없다.
  * 서버를 만들 때에는 host 부분 없이 parthname 만 오는 주소를 보게 된다.
  * WHATWG 방식은 search 부분을 searchParams 라는 특수한 객체로 변환하므로 유용하다.
  * search 부분은 보통 주소를 통해 데이터를 전달 할 때 사용된다.
  * search는 물을표로 시작하고, 그 뒤에 키=값 형식으로 데이터를 전달하며, 여러 키가 있을 경우 &로 구분한다.
*/
