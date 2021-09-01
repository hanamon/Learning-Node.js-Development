/*
  * pipe는 스트림 사이에 여러 번 연결할 수 있다.
  * 다음 코드는 파일을 읽은 후 gzip 방식으로 압축하는 코드이다.
*/

const zlib = require('zlib'); // 노드 내장 모듈 (파일 압출 기능 제공)
const fs = require('fs');

const readStream = fs.createReadStream('./readme4.txt');
// zlib의 createGzip 메서드가 스트림을 지원한다.
// 그래서 readStream과 writeStream 중간에서 파이핑을 할 수 있다.
const zlibStream = zlib.createGzip();
const writeStream = fs.createWriteStream('./readme4.txt.gz');

// 버퍼 데이터가 전달 되다가 gzip 압축을 거친 후 파일로 써진다.
readStream.pipe(zlibStream).pipe(writeStream);