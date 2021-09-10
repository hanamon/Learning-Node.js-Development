/**
 * 노드 자체에서 잡아는 에러를 알아보자.
 * fs.unlink로 존재하지 않는 파일을 지우고 있으므로 에러가 발생한다.
 * 하지만 노드 내장 모듈의 에러는 실행 중인 프로세스를 멈추지 않는다.
 * 에러 로그를 기록해두고 나중에 원인을 찾아서 수정하면 된다.
 */

const fs = require('fs');

setInterval(() => {
  fs.unlink('./abcdefg.js', (err) => {
    if (err) console.log(err);
  });
}, 1000);

/**
 * 에러가 발생했을 때, throw를 하면 노드 프로세스가 멈춰버린다.
 * 따라서 throw를 하는 경우 반드시 try/catch문으로 throw한 에러를 잡아야한다.
 */