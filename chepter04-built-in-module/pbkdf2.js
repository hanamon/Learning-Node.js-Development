/*
  * 가끔 nopqrst라는 문자열이 qvew로 변환되어 abcdefgh를 넣었을 때와 똑같은 문자열로 바뀔 때도 있다.
  * 이러한 상황을 충돌이 발생했다고 한다.
  * 해킹용 컴퓨터의 역할은 어떠한 문자열이 같은 출력 문자열을 반환하는지 찾아내는 것이다.
  * 여러 입력 문자열이 같은 출력 문자열로 변환될 수 있으며, 비밀번호를 abcdefgh로 설정했어도 nopqrst로 뚫리는 사태가 발생하게 된다.
  * 언젠가 sha512의 취약점도 발견될 것이다.
  * 그렇게 된다면 더 강력한 알고리즘으로 이전하면 된다.
  * 
  * 현재는 주로 pbkdf2 나 bcrypt, scrypt 라는 알고리즘으로 비밀번호를 암호화하고 있다.
  * 그중 노드에서 지원하는 pbkdf2 에 대해 알아보자.
  * 간단히 말하면 기존 문자열에 salt라고 불리는 문자열을 붙인 후 해시 알고리즘을 반복해서 적용하는 것이다.
*/

const crypto = require('crypto');

crypto.randomBytes(64, (err, buf) => {
  const salt = buf.toString('base64');
  console.log('salt:', salt);
  crypto.pbkdf2('비밀번호', salt, 100000, 64, 'sha512', (err, key) => {
    console.log('password:', key.toString('base64'));
  });
});

// randomBytes() 메서드로 64 바이트 길이의 문자열을 만든다. 이것이 salt가 된다. 매번 실행할 때마다 결과가 달라진다. 따라서 salt를 잘 보관하고 있어야 비밀번호도 찾을 수 있다.
// pbkdf2() 메서드는 순서대로 비밀번호, salt, 반복 횟수, 출력 바이트, 해시 알고리즘을 인수로 넣는다.
// 예시에서는 sha512로 반환된 결괏값을 다시 sha512로 변환하는 과정을 10만 번 반복하는 것이다. 
// 컴퓨터 성능에 따라 다르지만 위 예시에서 10만번을 반복하면 1초 정도 걸린다. (1초 정도가 되도록 반복 횟수를 만든다.)

// crypto.randomBytes()와 crypto.pbkdf2() 메서드는 내부적으로 스레드풀을 사용해 멀티 스레딩으로 동작한다.
// 이러한 메서드들이 몇 개 더 있다.

// pbkdf2()는 간단하지만 bcrypt 나 scrypt 보다 취약하므로 나중에 더 나은 보안이 필요하면 bcrypt 나 scrypt 방식을 사용하면 된다.