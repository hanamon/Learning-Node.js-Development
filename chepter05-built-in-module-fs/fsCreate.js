// fs는 파일 시스템을 조작하는 다양한 메서드를 제공한다.
// fs 메서드로 파일을 생성하고 삭제할 수 있으며, 폴더를 생성하고 삭제할 수도 있다.

const fs = require('fs').promises;
const constants = require('fs').constants;

fs.access('./folder', constants.F_OK | constants.W_OK | constants.R_OK)
  .then(() => {
    return Promise.reject('이미 폴더 있음');
  })
  .catch((err) => {
    // 폴더/파일이 없거나 권한이 없다면 에러를 일으킨다.
    if (err.code === 'ENOENT') {
      // 파일/폴더가 없을 때 발생하는 에러 코드가 ENOENT 이다.
      console.log('폴더 없음');
      return fs.mkdir('./folder');
    }
    // 다른 이유로 에러가 발생하면 reject를 리턴하면서 종료된다.
    return Promise.reject(err);
  })
  .then(() => {
    // 파일/폴더가 없고 별다른 에러가 없다면 여기로 넘어온다.
    console.log('폴더 만들기 성공');
    // fs.open 메서드는 파일의 아이디를 가져온다.
    // 파일이 존재하지 않으면 새로 만든 후 그 아이디를 가져온다.
    // 두번 째 인수로 w를 넣으므로 파일이 없을 때 새로 만들 수 있다.
    // 파일이 없는데 r를 넣었다면 에러가 발생한다.
    return fs.open('./folder/file.js', 'w');
  })
  .then((fd) => {
    console.log('빈 파일 만들기 성공', fd);
    return fs.rename('./folder/file.js', './folder/newfile.js');
  })
  .then(() => {
    console.log('이름 바꾸기 성공');
  })
  .catch((err) => {
    console.error(err);
  });


/*
  * fs.access(경로, 옵션, 콜백) :
    폴더나 파일에 접근할 수 있는지 체크한다.
    두 번째 인수로 상수들(constants를 통해 가져온다.)을 넣었다.
    F_OK는 파일 존재 여부, R_OK는 읽기 권한 여부, W_OK는 쓰기 권한 여부를 체크한다.
    파일/폴더나 권한이 없다면 에러를 발생한다.
    이때, 파일/폴더가 없을 때 발생하는 에러 코드는 ENOENT 이다.

  * fs.mkdir(경로, 콜백) : 
    폴더를 만드는 메서드이다.
    이미 폴더가 있다면 에러를 발생한다.
    그래서 먼저 access 메서드를 호출해서 확인하는 것이 중요하다.

  * fs.open(경로, 옵션, 콜백) : 
    파일의 아이디(fd 변수)를 가져오는 메서드이다.
    파일이 없다면 파일을 생성한 뒤 그 아이디를 가져온다.
    가져온 아이디를 사용해 fs.read 나 fs.wirte 로 읽거나 쓸 수 있다.
    두 번째 인수로 어떤 동작을 할 것인지 설정할 수 있다.
    쓰려면 w, 읽으려면 r, 기존 파일에 추가하려면 a이다.

    * fs.rename(기존 경로, 새 경로, 콜백) : 
    파일의 이름을 바꾸는 메서드이다.
    기존 파일 위치와 새로운 파일 위치를 적으면 된다.
    꼭 같은 폴더를 지정할 필요없다. => 잘라내기 같은 기능으로 사용할 수도 있다.
*/