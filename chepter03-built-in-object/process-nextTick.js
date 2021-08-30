/* 
  * [process.nextTick]
  * 이벤트 루프가 다른 콜백 함수들보다 nextTick의 콜백함수를 우선적으로 처리하도록 만든다.
  * process.nextTick은 setImmediate나 setTimeout 보다 먼저 실행된다.
  * process.nextTick위에 Promise를 넣은 것은 resolve된 Promise도 nextTick 처럼 다른 콜백들 보다 우선시 되기 때문이다.
  * 그래서 process.nextTick과 Promise를 마이크로태스트(microtask)라고 따로 구분지어 부른다.
*/

setImmediate(() => { // => 4위
  console.log('immediate');
});

Promise.resolve().then(() => console.log('promise')); // => 2위

process.nextTick(() => { // => 1위
  console.log('nextTick');
});

setTimeout(() => { // => 3위
  console.log('timeout');
}, 0);

// 1 번 출력 : nextTick
// 2 번 출력 : promise
// 3 번 출력 : timeout
// 4 번 출력 : immediate

/*
  * [마이크로태스크의 재귀 호출]
  * process.nextTick으로 받은 콜백이나 resolve된 Promise는 다른 이벤트 루프에서 대기하는 콜백함수보다 먼저 실행된다.
  * 그래서 비동기 처리를 할 때 setImmediate보다 process.nextTick을 더 선호하는 개발자도 있다.
  * 하지만 이런 마이크로태스크를 재귀 호출하게 되면 이벤트 루프는 다른 콜백 함수보다 마이크로태스크를 우선하여 처리하므로,
  * 콜백 함수들이 실행되지 않을 수도 있다.
*/