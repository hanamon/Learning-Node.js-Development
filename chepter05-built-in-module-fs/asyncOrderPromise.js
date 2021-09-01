/*
  * [동기 메서드와 비동기 메서드]
  * setTimeout 같은 타이머와 process.nextTick 외에도 노드는 대부분의 메서드를 비동기 방식으로 처러한다.
  * 하지만 몇몇 메서드는 동기 방식으로 사용할 수 있다.
  * 특히 fs 모듈이 그러한 메서드를 많이 가지고 있다.
  * 어떤 메섣가 동기 또는 비동기 방식으로 동작하는지와 언제 어떤 메서드를 사용하는지 알아보자.
*/

// [파일 하나를 여러번 읽기] - 비동기 - 순서 보장 O - 콜백 지옥 탈출 - Promise 시용
const fs = require('fs').promises;

console.log('시작');

fs.readFile('./readme2.txt')
  .then((data) => {
    console.log('1번', data.toString());
    return fs.readFile('./readme2.txt');
  })
  .then((data) => {
    console.log('2번', data.toString());
    return fs.readFile('./readme2.txt');
  })
  .then((data) => {
    console.log('3번', data.toString());
    console.log('끝');
  })
  .catch((err) => {
    console.error(err);
  });
