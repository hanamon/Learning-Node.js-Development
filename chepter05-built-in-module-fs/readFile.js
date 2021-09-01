/*
  * [fs 모듈]
  * fs 모듈은 파일 시스템에 접근하는 모듈이다.
  * 즉, 파일을 생성, 삭제, 읽기, 쓰기 가능
  * 폴더도 생성 삭제 가능
  * 웹 브라우저에서는 자바스크립트를 사용할 때는 일부를 제외하고는 파일 시스템 접근이 금지되어있다.
*/

const fs = require('fs').promises;

// 여기에서 파일의 경로가 현재 파일 기준이 아니라 node 명렬어를 실행하는 콘솔 기준이라는 점에 유의해야한다.
/*fs.readFile('./readme.txt', (err, data) => {
  if( err ) throw err;
  // data로 Buffer이 출력된다.
  console.log(data);
  console.log(data.toString());
});*/

// readFile의 결과물은 버퍼라는 형식으로 제공된다. (버퍼는 단순하게는 메모리의 데이터라고 생각하면 된다.)
// readFile 메서드는 전체 파일을 모두 버퍼에 저장한다.
// fs는 기본적으로 콜백 형식의 모듈이지만 프로미스 형식으로 바꿔줄 수 있다.
// fs 모듈에 promises 속성을 불러오면 프로미스 기반 fs 모듈을 사용할 수 있게 된다.

fs.readFile('./readme.txt')
  .then((data) => {
    console.log(data);
    console.log(data.toString());
  })
  .catch((err) => {
    console.error(err);
  });