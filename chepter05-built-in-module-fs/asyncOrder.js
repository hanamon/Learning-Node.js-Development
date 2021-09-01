/*
  * [동기 메서드와 비동기 메서드]
  * setTimeout 같은 타이머와 process.nextTick 외에도 노드는 대부분의 메서드를 비동기 방식으로 처러한다.
  * 하지만 몇몇 메서드는 동기 방식으로 사용할 수 있다.
  * 특히 fs 모듈이 그러한 메서드를 많이 가지고 있다.
  * 어떤 메섣가 동기 또는 비동기 방식으로 동작하는지와 언제 어떤 메서드를 사용하는지 알아보자.
*/

// [파일 하나를 여러번 읽기] - 비동기 - 순서 보장 O
const fs = require('fs');

// [파일 하나를 여러번 읽기] - 비동기 - 순서 보장 O
console.log('시작');

fs.readFile('./readme2.txt', (err, data) => {
  if (err) throw err;
  console.log('1번', data.toString());
  fs.readFile('./readme2.txt', (err, data) => {
    if (err) throw err;
    console.log('2번', data.toString());
    fs.readFile('./readme2.txt', (err, data) => {
      if (err) throw err;
      console.log('3번', data.toString());
    });
  });
});

console.log('끝');

/*
  * [비동기 방식으로 하되 순서를 유지하고 싶다면?]
  * 이전 readFile의 콜백에 다음 readFile을 넣으면 된다.
  * 이른바 콜백 지옥이 펼쳐지지만 적어도 순서가 어긋나는 일은 없다.
  * 콜백 지옥은 Promise나 async/await으로 어느 정도 해결할 수 있다.
*/