// fs는 파일 시스템을 조작하는 다양한 메서드를 제공한다.
// fs 메서드로 파일을 생성하고 삭제할 수 있으며, 폴더를 생성하고 삭제할 수도 있다.

const fs = require('fs').promises;
const constants = require('fs').constants;

fs.access('./folder', constants.F_OK | constants.W_OK | constants.R_OK)
  .then(() => {
    return Promise.reject('이미 폴더 있음'); 
  })
  .catch((err) => {
    if (err.code === 'EVOENT') {
      console.log('폴더 없음');
      return fs.mkdir('./folder');
    }
    return Promise.reject(err);
  });
  