/*
  * [양방향 암호화]
  * 양방향 대칭형 암호화에 대해 알아보자.
  * 암호화된 문자열을 복호화 할 수 있으며, 키(열쇠)라는 것이 사용된다.
  * 대칭형 암호화에서 암호를 복호화하려면 암호화할 때 사용한 키와 같은 키를 사용해야한다.
*/

// 다음은 노드로 양방향 암호호하는 방법이다.
// 다음 코드를 완벽하게 이해하려면 암호학을 추가로 공부해야한다.
const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const key = 'abcdefghijklmnopqrstuvwxyx123456';
const iv = '1234567890123456';

const cipher = crypto.createCipheriv(algorithm, key, iv);
let result = cipher.update('암호화할 문장', 'utf-8', 'base64');
console.log('출력 결과물:', result);
result += cipher.final('base64');
console.log('암호화:', result);

const decipher = crypto.createDecipheriv(algorithm, key, iv);
let result2 = decipher.update(result, 'base64', 'utf-8');
console.log('출력 결과물:', result2);
result2 += decipher.final('utf-8');
console.log('복호화:', result2);

/*
  * [crypto.createCipheriv(알고리즘, 키, iv)]
  * 암호화 알고리즘과 키, iv를 넣는다.
  * 암호화 알고리즘은 aes-256-cbc를 사용했으먀, 다른 알고리즘을 사용해도 된다.
  * aes-256-cbc 알고리즘의 경우 키는 32바이트여야하고, iv는 16바이트 여야한다.
  * iv는 암호화할 때 사용하는 초기화 벡터를 의미하지만, 내용이 많으므로 AES 암호화에 대해 따로 공부하는 것이 좋다.
  * 사용 가능한 알고리즘 목록은 crypto.getCiphers()를 호출하면 볼 수 있다.
  * 
  * [cipher.update(문자열, 인코딩, 출력 인코딩)]
  * 암호화할 대상과 대상의 인코딩, 출력 결과물의 인코딩을 넣는다.
  * 보통 문자열은 utf-8 인코딩을, 암호는 base64를 많이 사용한다.
  * 
  * [cipher.final(출력 인코딩)]
  * 출력 결과물의 인코딩을 넣으면 암호화가 완료된다.
  * 
  * [crypto.createDecipheriv(알고리즘, 키, iv)]
  * 복호화 할 때 사용한다.
  * 암호화 할 때 사용했던 알고리즘, 키, iv를 그대로 넣어야한다.
  * 
  * [decipher.update(문자열, 인코딩, 출력 인코딩)]
  * 암호화된 문장, 그 문장의 인코딩, 복호할 인코딩을 넣는다.
  * createCipheriv 의 update()에서 utf-8, base64 순으로 넣었다면 createDecipheriv의 update()에서는 base64, uft-8순으로 넣으면된다.
  * 
  * [decipher.final(출력 인코딩)]
  * 복호화 결과물의 인코딩을 넣는다.
*/

// 사용 가능한 알고리즘 목록 보기
//console.log(crypto.getCiphers());

// crypto 모듈은 양방향 비대칭형 암호화, HMAC 등과 같은 다양한 암호화를 제공하고 있다.
// 암호화가 필요하면 어떤 메서드들을 지원하는지 노드 공식문서에서 확인해보면 좋다.
// 좀 더 간단하게 암호화를 하고 싶다면 npm 패키지인 crypto-js 를 추천한다.
