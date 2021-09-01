/*
// 2부터 100만까지의 숫자 중에 소수가 모두 몇 개 있는지를 알아내는 코드이다. 싱글 스레드 (prime: 252.162ms)
const min = 2;
const max = 1000000;
const primes = [];

function generatePrimes(start, range) {
  let isPrime = true;
  const end = start + range;

  for (let i = start; i < end; i++) {
    for (let j = min; j < Math.sqrt(end); j++) {
      if (i !== j && i % j === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) primes.push(i);
    isPrime = true;
  }
}

console.time('prime');
generatePrimes(min, max);
console.timeEnd('prime');
console.log(primes.length);
*/

// 워커 스레드를 사용하여 여러 개의 스레드들이 문제를 나눠서 풀도록 하는 방법
// 코드를 똑같이 카피했는데 이상하게 시간이 더 늘어났지 단축되지 않는다. 그리고 스레드를 8개로하고 max를 100만으로 했을 때 에러가 발생한다. javascript 힙 메모리 부족하다고 나온다.
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

const min = 2;
let primes = [];

function findPrimes(start, range) {
  let isPrime = true;
  let end = start + range;

  for (let i = start; i < end; i++) {
    for (let j = min; j < Math.sqrt(end); j++) {
      if (i !== j && i % j === 0) {
        isPrime = false;
        break;
      }
      if (isPrime) primes.push(i);
      isPrime = true;
    }
  }
}

if (isMainThread) {
  const max = 1000000;
  const threadCount = 2;
  const threads = new Set();
  const range = Math.ceil((max - min) / threadCount);
  let start = min;

  console.time('prime');

  // 워커 생성
  for (let i = 0; i < threadCount-1; i++) {
    const wStart = start;
    threads.add(new Worker(__filename, { workerData: { start: wStart, range } }));
    start += range;
  }

  threads.add(new Worker(__filename, { workerData: { start, range: range + ((max - min + 1) % threadCount) } }));

  // 각 스레드의 이벤트 리스너로 이벤트 3개 추가
  for (let worker of threads) {
    worker.on('error', (err) => {
      throw err;
    });
    worker.on('exit', () => {
      threads.delete(worker);
      if (threads.size === 0) {
        console.timeEnd('prime');
        console.log(primes.length);
      }
    });
    worker.on('message', (msg) => {
      primes = primes.concat(msg);
    });
  }
}
else {
  // 함수 실행
  findPrimes(workerData.start, workerData.range);
  parentPort.postMessage(primes);
}