const fs = require('fs');

const writeStream = fs.createWriteStream('./writeme2.txt');

writeStream.on('finish', () => {
  console.log('파일 쓰기 완료');
});

writeStream.write('이 글을 씁니다. \n');
writeStream.write('한 번 더 씁니다.');
writeStream.end();

/*
  * createWriteStream으로 파일을 만들었다. write 메서드로 파일에 넣을 데이터도 썼다.
*/