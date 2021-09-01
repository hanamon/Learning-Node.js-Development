const  { Worker, isMainThread, parentPort, workerData }  = require('worker_threads');

if (isMainThread) { // 메인일 때
  const threads = new Set();

  // new Worker를 호출할 때 두 번째 인수로 workerData 속성으로 원하는 데이터를 보낼 수 있다.
  // 워커에서는 workerData로 메인으로 부터 데이터를 받는다.
  threads.add(new Worker(__filename, {
    workerData: { start: 1 },
  }));
  threads.add(new Worker(__filename, {
    workerData: { start: 2 },
  }));

  // threads 개수 만큼 이벤트 추가하기
  for (let worker of threads) {
    worker.on('message', (message) => console.log('from worker', message));
    worker.on('exit', () => {
      threads.delete(worker);
      if (threads.size === 0) console.log('job done!');
    });
  }
  
}
else { // 워커일 때
  const data = workerData;
  // 현재 두 개의 워커가 돌아가고 있으며 각각 메인으로 부터 숫자를 받아 100을 더해 돌려준다.
  // 돌려주는 순간 워커가 종료되어 worker.on('exit')가 실행된다.
  // 왜냐하면 parentPort.on() 메소드를 사용하지 않았기 때문이다.
  parentPort.postMessage(data.start + 100);
}