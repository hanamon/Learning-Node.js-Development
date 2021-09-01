// 노드에서 멀티 스레드 방식으로 작업하는 방법 => worker_threads 모듈

const { Worker, isMainThread, parentPort } = require('worker_threads');

if (isMainThread) { // 메인일 때
  const worker = new Worker(__filename);
  // worker.postMessage 함수를 실행 함으로써 아래 워커에게 메세지를 보낸다.
  worker.postMessage('ping');

  // worker.on('message') 이벤트 리스너로 워커에서 보낸 메세지를 받을 수 있다.
  // 참고로 메세지를 한 번만 받고 싶으면 once('message')를 사용하면 된다.
  worker.on('message', (message) => console.log('나는 메인이고 워커에서 받아온 데이터다. => from worker', message));
  
  // 워커에서 parenrtPort.close() 하면 worker.on('exit') 가 실행된다.
  worker.on('exit', () => console.log('워커에서 메인의 exit 이벤트를 호출 했다. woker exit'));
}
else { // 워커일 때
  parentPort.on('message', (value) => {
    // parentPort.on('message') 이벤트 리스너로 메인에서 보낸 메세지를 받을 수 있다.
    console.log('나는 워커고 메인에서 받아온 데이터다. => from parent', value); 

    // parentPort.postMessage 함수를 실행 함으로써 위 메인에게 메세지를 보낸다.
    parentPort.postMessage('pong'); 
    
    // 주의! 워커에서 on 메소드를 사용할 때 직접 워커를 종료해야한다.
    // (on 메소드를 사용하지 않았다면 워커 코드가 끝나면 자동으로 메인에서 worker.on('exit')가 실행된다.)
    // parentPort.close()를 하면 메인과의 연결이 종료된다.
    // 종료 될 때 worker.on('exit') 가 실행된다.
    parentPort.close();
  });
}

/*
  * [isMainThread]
  * 현재 코드가 메인 스레드(기존에 동작하던 싱글 스레드 메인 스레드, 또는 부모 스레드)에서 실행되는지, 아니면 생성한 워커 스레드에서 실행되는지 구분된다.
  * 
  * 메인 스레드에서는 new Worker를 통해 현재 파일(__filename)을 워커 스레드에서 실행시키고 있다.
  * (물론 현재 파일의 else 부분만 실행된다.)
  * 
  * 여기서는 워커 스레드를 사용해 복잡한 작업은 하지 않았다.
  * 여러 개의 워커 스레드에 데이터를 넘기는 것은 worker_data.js에서 한다.
*/