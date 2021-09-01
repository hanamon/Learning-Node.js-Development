/*
  * createReadStream으로 파일을 읽고 그 스트림을 전달받아 createWriteStream으로 파일을 쓸 수도 있다.
  * 파일 복사와 비슷한다.
  * 스트림끼리 연결하는 것을 '파이핑한다'고 표현한다.
  * 액체가 흐르는 관(파이프: pipe)처럼 데이터가 흐른다고 해서 지어진 이름이다.
*/

const fs = require('fs');

const readStream = fs.createReadStream('readme4.txt');
const writeStream = fs.createWriteStream('writeme3.txt');
readStream.pipe(writeStream);

/*
  * 미리 읽기 스트림과 쓰기 스트림을 만들어둔 후 두 개의 스트림 사이를 pipe 메서드로 연결하면 저절로 데이터가 writeStream으로 넘어간다.
  * 따로 on('data') 나 writeStream.write를 하지 않아도 알아서 전달되므로 편리하다.
  * 노드 8.5 버전이 나오기 전까지는 이 방식으로 파일을 복사하곤 했다.
  * 새로운 파일 복사 방식은 뒤에 나온다.
*/