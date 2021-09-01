/*
  * readFile 와 createReadStream 두 메서드의 데이터 사용량이 얼마나 다른지 확인해보자.
  * 다음은 100MB 용량의 텍스트 파일을 만드는 코드이다.
*/

const fs = require('fs');
const file = fs.createWriteStream('./big.txt');

for (let i=0; i<=1000000; i++) {
  file.write('안녕하세요. 엄청나게 큰 파일을 만들어 볼 것입니다. 각오 단단히 하세요! \n');
}

file.end();