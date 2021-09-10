/*
  * 비동기 메서드들은 백그라운드에서 실행되고, 실행된 후에는 다시 메인 스레드의 콜백 함수나 프로미스의 then 부분이 실행된다.
  * 이때 fs 메서드를 여러 번 실행해도 백그라운드에서 동시에 처리되는데, 이는 스레드풀이 있기 때문이다.
  * 
  * fs 외에도 내부적으로 스레드풀을 사용하는 모듈로는 crypto, zlib, dns.lookup 등이 있다.
  * 스레드 풀을 쓰는 crypto.pbkdfs 메서드의 예제로 스레드풀의 존재를 확인해보자.
*/

const crypto = require('crypto');

const pass = 'pass';
const salt = 'salt';
const start = Date.now();

crypto.pbkdf2(pass, salt, 100000, 128, 'sha512', () => {
  console.log('1:', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 100000, 128, 'sha512', () => {
  console.log('2:', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 100000, 128, 'sha512', () => {
  console.log('3:', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 100000, 128, 'sha512', () => {
  console.log('4:', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 100000, 128, 'sha512', () => {
  console.log('5:', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 100000, 128, 'sha512', () => {
  console.log('6:', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 100000, 128, 'sha512', () => {
  console.log('7:', Date.now() - start);
});

crypto.pbkdf2(pass, salt, 100000, 128, 'sha512', () => {
  console.log('8:', Date.now() - start);
});

/*
  * 실행할 때마다 순서가 달라진다.
  * 스레드풀이 작업을 동시에 처리하므로 여덟 개의 작업 중에서 어느 것이 먼저 처리될지 모른다.
  * 하지만 하나의 규칙을 발견할 수 있다.
  * 1~4와 5~8이 그룹으로 묶여 있고, 5~8이 1~4보다 시간이 더 소요된다.
  * 이는 기본적으로 스레드풀의 개수가 네 개이기 때문이다.
  * 스레드풀이 네 개이므로 처음 네 작업이 동시에 실행되고, 그것들이 종료되면 다음 네 개의 작업이 실행된다.
  * 만약 컴퓨터의 코어 개수가 4개 보다 작다면 다른 결과가 생길 수 있다.
*/

/*
  * 스레드풀의 개수를 컨트롤 할 수 있다.
  * 맥 리눅스의 쉘에 UV_THREADPOOL_SIZE=1을 입력해서 스레드의 개수를 1로 제한하면 작업이 한 번에 하나씩만 처리된다.
  * -> 해봤는데 적용이 안되는 것 같다. 커멘드 오류는 없었다.
*/