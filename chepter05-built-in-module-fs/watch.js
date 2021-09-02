// 파일/폴더의 변경 사항을 감시할 수 있는 watch 메서드에 대해 알아보자.
const fs = require('fs');

fs.watch('./target.txt', (eventType, filename) => {
  console.log(eventType, filename);
});

/*
  * watch.js 를 실행하고 target.txt 파일을 변경하거나 파일을 삭제하면 이벤트가 발생한다.
  * 내용물을 수정할 때는 change 이벤트가 발생한다.
  * 파일을 삭제하거나 파일명을 변경하면 reaname 이벤트가 발생한다.
  * rename 이벤트가 발생한 후에는 더 이상 watch가 수행되지 않는다. - X
  * 파일명을 변경했어도 watch가 수행되었다.
  * change 이벤트가 두 번씩 발생하기도 하므로 실무에서는 사용 시 주의해야한다.
*/