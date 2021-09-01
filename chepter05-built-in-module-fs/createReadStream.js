/*
  * [버퍼 방식의 단점]
  * 만약 용량이 100MB인 파일이 있으면 읽을 때 메모리 100MB의 버퍼를 만들어야한다.
  * 이 작업을 동시에 10개만 해도 1GB에 달하는 메모리가 사용된다.
  * 특히 서버처럼 몇 명이 이용할지 모르는 환경에서 메모리 문제가 발생할 수 있다.
  * 또한, 모든 내용을 버퍼에 다 쓴 후에야 다음 동작으로 넘어가므로 읽기, 압축, 쓰기 등의 조작을 연달아 할 때 매번 전체 용량을 버퍼로 처리해야 다음 단계로 넘어갈 수 있다.
*/

/*
  * [버퍼 방식의 단점 극복]
  * 버퍼의 크기를 작게 만든 후 여러 번으로 나눠 보내는 방식이 등장했다.
  * 예를 들면 버퍼 1MB를 만든 후 100MB 파일을 백 번에 걸쳐 나눠 보내는 것이다.
  * 이로써 메모리 1MB로 100MB 파일 전송을 할 수 있다.
  * 이를 편리하게 만든 것이 스트림이다.
*/

const fs = require('fs');

const readStream = fs.createReadStream('./readme3.txt', { highWaterMark: 16 });
const data = [];

readStream.on('data', (chunk) => {
  data.push(chunk);
  console.log('data :', chunk.toString(), chunk.length);
});

readStream.on('end', () => {
  console.log('end :', Buffer.concat(data).toString());
});

readStream.on('error', (err) => {
  console.log('error :', err);
});

/*
  * 먼저 createReadStream으로 읽기 스트림을 만든다.
  * 첫 번째 인수로 읽을 파일 경로를 넣는다.
  * 두 번째 인수로 옵션 객체이다.
  * highWaterMark 라는 옵션이 버퍼의 크기(바이트 단위)를 정할 수 있다.
  * 기본 값은 64KB이지만, 여러 번 나눠서 보내는 모습을 보여주기 위해 16B로 낮췄다.
  * 대부분의 txt 파일은 한 번에 전송된다.
  * 
  * createReadStream은 이벤트 리스너를 붙여서 사용한다.
  * 보통 data, end, error 이벤트를 사용한다.
*/