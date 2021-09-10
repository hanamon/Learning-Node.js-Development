/**
 * 이번 예제에서는 정말 예측이 불가능한 에러를 처리하는 방법에 대해 알아보자.
 * 
 * process 객체에 uncaughtException 이벤트 리스너를 달면,
 * 처리하지 못한 에러가 발생했을 때 이벤트 리스너가 샐행되고 프로세스가 유지된다.
 * 
 * 이 부분이 없다면 아래 예제에서 setTimeout이 실행되지 않는다.
 * 실행 후 1초만에 setInterval에서 에러가 발행해서 프로세스가 멈추기 때문이다.
 * 하지만 uncaughtException 이벤트 리스너가 연결되어 있으므로 프로세스가 멈추지 않는다.
 */

process.on('uncaughtException', (err) => {
  console.error('예기치 못한 에러', err);
});

setInterval(() => {
  throw new Error('서버를 고장내주마!');
}, 1000);

setTimeout(() => {
  console.log('실행됩니다.');
}, 2000);

/**
 * 노드 공식 문서에서는 uncaughtException 이벤트를 최후의 수단으로 사용할 것을 명시하고 있다.
 * 노드는 uncaughtException 이벤트 발생 후 다음 동작이 제대로 동작하는지를 보증하지 않는다.
 * 즉, 복구 작업 코드를 넣어두었더라도 그것이 동작하는지 확신할 수 없다.
 * 따라서 uncaughtException 은 단순히 에러 내용을 기록하는 정도로 사용하고.
 * 에러를 기록한 후 process.exit()으로 프로세스를 종료하는 것이 좋다.
 * 에러가 발생하는 코드를 수정하지 않는이상, 프로세스가 실행되는 동안 에러는 계속 발생할 것이다.
 */
