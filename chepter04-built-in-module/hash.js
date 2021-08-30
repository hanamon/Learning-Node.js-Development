/*
  * [crypto]
  * 다양한 방식의 암호화를 도와주는 모듈이다.
  * 고객의 비밀번호는 반드시 암호화해야한다.
  * 비밀번호를 암호화하지 않으면 비밀번호를 저장해둔 데이터베이스가 해킹되는 순간,
  * 고객들의 비밀번호도 고스란히 해커의 손에 넘어가고 만다.
  * 물론 데이터베이스가 해킹되지 않도록 노력해야겠지만, 안전 장치를 이중으로 만들어놓는 것이 좋다.
  * 
*/

/*
  * [단방향 암호화]
  * 비밀번호는 보통 단방향 암호화 알고리즘을 사용해 암호화한다.
  * 단방향 암호화란 복호화 할 수 없는 암호화 방식을 뜻한다.
  * 복호화는 암호화된 문자열을 원래 문자열로 되돌려놓는 것을 의미한다.
  * 즉, 단방향 암호화는 한 번 암호화하면 원래 문자열을 찾을 수 없다.
  * 복호화 할 수 없으므로 암호화라고 표현하는 대신 해시 함수라고 부르기도 한다.
*/

/*
  * [단방향 암호화가 필요한 이유]
  * 고객의 비밀번호는 복호화할 필요가 없다.
  * 먼저 고객의 비밀번호를 암호화해서 데이터베이스에 저장한다.
  * 그리고 로그인 할 때마다 입력받은 비밀번호를 같은 암호화 알고리즘로 암호화한 후, 데이터 베이스의 비밀번호와 비교하면 된다.
  * 원래 비밀번호는 어디에도 저장되지 않고 암호화된 문자열로만 비교하는 것이다.
*/

/*
  * [단방향 암호화 알고리즘]
  * 단방향 암호화 알고리즘은 주로 해시 기법을 사용한다.
  * 해시 기법이란 어떠한 문자열을 고정된 길이의 다른 문자열로 바꿔버리는 방식이다.
  * 입력 문자열의 길이는 다르지만, 출력 문자열의 길이는 네 자리로 고정되어 있다.
*/

// 노드에서 해시 함수를 사용하는 방법
const crypto = require('crypto');

console.log('인코딩 is base64:', crypto.createHash('sha512').update('이 문자열을 바꿔버린다.').digest('base64'));
console.log('인코딩 is hex:',    crypto.createHash('sha512').update('이 문자열을 바꿔버린다.').digest('hex'));

/*
  * [createHash(알고리즘)]
  * 사용할 해시 알고리즘을 넣는다.
  * md5, sha1, sha256, sha512 등이 가능하지만, md5와 sha1은 이미 취약점이 발견되었다.
  * 현재는 sha512 정도로 충분하지만, 나중에 sha512 마저도 취약해지면 더 강화된 알고리즘으로 바꿔야한다.
  * 
  * [update(문자열)]
  * 변환할 문자열을 넣는다.
  * 
  * [digest(인코딩)]
  * 인코딩할 알고리즘을 넣는다.
  * base64, hex, latin1 이 주로 사용된다.
  * 그 중 base64가 결과 문자열이 가장 짧아 애용된다.
  * 결과물로 변환된 문자열을 반환한다.
*/

// 해시 함수 
// 비밀번호 -> 해시 함수 -> 다이제스트 (O)
// 다이제스트 -> 해시 함수 -> 비밀번호 (X)