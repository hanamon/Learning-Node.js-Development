// node 8.5 버전 이후부터는 createReadStream 과 createWriteStream 을 pipe 하지 않아도 파일을 복사할 수 있다.
const fs = require('fs').promises;

fs.copyFile('readme4.txt', 'writeme4.txt')
  .then(() => {
    console.log('복사 완료');
  })
  .catch((err) => {
    console.error(err);
  });