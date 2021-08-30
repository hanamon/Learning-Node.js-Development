// process 객체는 현재 실행되고 있는 노드 프로세스에 대한 정보를 담고 있다.
// process 객체 안에는 다양한 속성이 있다.

console.log(process.version); // v14.16.0 => 설치된 노드 버전
console.log(process.arch); // x64 => 프로세스 아키텍처 정보
console.log(process.platform); // darwin => 운영 체제 플랫폼 정보
console.log(process.pid); // 11375 => 현재 프로세스의 아이디
console.log(process.uptime()); // 178.535850554 => 프로세스가 시작된 후 흐른 시간 (단위는 초)
console.log(process.execPath); // /usr/local/bin/node => 노드의 경로 (여기에서 node 프로그램 클릭하면 실행됨)
console.log(process.cwd()); // /Users/hanamon/Documents/Learning-Node.js-Development => 현재 프로세스가 실행되는 위치
console.log(process); // { user: 710048, system: 121585 } => 현재 cpu 사용량이다.

// 이 정보들의 사용 빈도는 그리 높지 않지만 일반적으로 운영체제나 실행 환경별로 다른 동작을 하고 싶을 때 사용한다.
// process.env, process.nextTick, process.exit()는 중요하니 따로 설명한다.

/*
  * [process.env]
  * 이 정보들은 시스템의 환경 변수이다.
  * 시스템 혼경 변수는 노드에 직접 영향을 미치기도한다.
  * 대표적인 것이 UV_THREADPOOL_SIZE 와 NODE_OPTIONS 가 있다.
  * 
  * [NODE_OPTIONS]
  * 노드를 실행할 대 옵션들을 입력받는 환경 변수이다.
  * 옵션이 다양하게 존재한다.
  * 
  * [UV_THREADPOOL_SIZE]
  * 노드에서 기본적으로 사용하는 스레드풀의 스레드 개수를 조절할 수 있게 한다.
  * 
  * 시스템 환경 변수 외에도 임의로 환경 변수를 저장할 수 있다.
  * process.env는 서비스의 중요한 키를 저장하는 공간으로 사용된다.
  * 서버나 데이터베이스의 비밀번호와 각종 API 키를 코드에 직접 입력하는 것은 위험하다.
  * 혹여 서비스가 해킹을 당해 코드가 유출되었을 때는 비밀번호나 코드가 남아 있어 추가 피해가 발생할 수 있다.
  * 따라서 중요한 비밀번호는 다음과 같이 process.env의 속성으로 대체한다.
*/

const secretId = process.env.SECRET_ID;
const secretCode = process.env.SECRET_CODE;

// 이제 process.env에 직접 SECRET_ID 와 SECRET_CODE를 넣으면 된다.
// 넣는 방법은 운영체제마다 차이가 있다.
// 하지만 한번에 모든 운영체제에 동일하게 넣을 수 있는 방법이 있다. => dotenv 모듈 사용
