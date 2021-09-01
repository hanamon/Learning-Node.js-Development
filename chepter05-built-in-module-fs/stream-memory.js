/*
  * readFile 와 createReadStream 두 메서드의 데이터 사용량이 얼마나 다른지 확인해보자.
  * 스트림 메서드를 사용해서 big.txt를 big3.txt로 복사하기
*/

const fs = require('fs');

console.log('before: ', process.memoryUsage().rss); // before:  19759104

const readStream = fs.createReadStream('./big.txt');
const writeStream = fs.createWriteStream('./big3.txt');

readStream.pipe(writeStream);

readStream.on('end', () => {
  console.log('stream: ', process.memoryUsage().rss); // stream:  34725888
});

// 큰 파일을 조각내어 작은 버퍼 단위로 옮겼기 때문에 메모리 사용량이 크게 개선되었다.
// 이처럼 스트림을 사용하면 효과적으로 데이터를 전송할 수 있다.
// 동영상과 같은 큰 파일을 전송할 때 이러한 이유로 스트림을 사용한다.