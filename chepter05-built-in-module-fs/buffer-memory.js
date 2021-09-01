/*
  * readFile 와 createReadStream 두 메서드의 데이터 사용량이 얼마나 다른지 확인해보자.
  * readFile 메서드를 사용해서 big.txt를 big2.txt로 복사하기
*/

const fs = require('fs');

console.log('before: ', process.memoryUsage().rss); // before:  19951616

const data1 = fs.readFileSync('./big.txt');
fs.writeFileSync('./big2.txt', data1);

console.log('buffer: ', process.memoryUsage().rss); // buffer:  121982976

// 100MB 용량의 파일을 복사하기 위해 메모리에 파일을 모두 올려둔 후 writeFileSync를 수행하였다.