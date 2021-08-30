/*
  * [path 모듈]
  * 폴더나 파일의 경로를 쉽게 조작하도록 도와주는 모듈이다.
  * path 모듈이 필요한 이유 중 하나는 운영체제별로 경로 구분자가 다르기 때문이다.
  * 크게 윈도 타입과 OPSIX 타입으로 구분된다.
  * POSIX는 유닉스 기반의 운영체제들을 의미하며, 맥과 리눅스가 속해 있다.
  * 윈도 : C:\Users\hanamon
  * POSIX : /home/hanamon
  * 이외에도 파일 경로에서 파일명이나 확장자만 따로 떼어주는 기능을 구현해두어 직접 구현하지 않고도 편리하게 사용 가능하다.
*/

const path = require('path');
const string = __filename;

console.log('path.sep:', path.sep); // / => 경로의 구분자
console.log('path.delimiter:', path.delimiter); // : => 환경 변수의 구분자 // POSIX는 콜론 // process.env.PATH를 입력하면 이 구분자로 경로가 구분되어 있음

console.log('----------------------------------------');
console.log('path.dirname(경로):', path.dirname(string)); // 파일이 위치한 폴더 경로
console.log('path.extname(경로):', path.extname(string)); // .js => 파일의 확장자
console.log('path.basename(경로, 확장자):', path.basename(string)); // path.js => 파일의 이름(확장자 포함)
console.log('path.basename - extname:', path.basename(string, path.extname(string))); // path => 파일 이름
console.log('----------------------------------------');

console.log('path.parse(경로):', path.parse(string)); // 파일의 경로를 root, dir, base, ext, name으로 분리한다.
console.log('path.parse(경로).name:', path.parse(string).name); // path => 파일 이름
console.log('path.format(객체):', path.format({ // /Users/hanamon/Documents/path.js => path.parse()한 객체를 파일 경로로 합친다.
  dir: '/Users/hanamon/Documents',
  name: 'path',
  ext: '.js'
}));

console.log('----------------------------------------');
console.log('path.normalize(경로):', path.normalize('/Users////hanamon/////Documents/path.js')); // 슬래시를 실수로 여러번 사용했거나 혼용했을 때 정상적인 경로로 변환
console.log('path.isAbsolute(경로):', path.isAbsolute('./')); // 파일의 경로가 절대 경로인지 상대경로인지를 true나 flase로 알려준다. (여기서 / 면 true ./ 면 false 이다.)
console.log('path.relative(기준경로, 비교경로):', path.relative('/Users', '/')); // 경로를 두 개 넣으면 첫 번째 경로에서 두 번째 경로로 가는 방법을 알려준다.
console.log('path.join(경로, ...):', path.join(__dirname, '..', '..', 'Algorithms')); // 여러 인수를 넣으면 하나의 경로로 합친다. 상대경로인 ..(부모 디렉터리)와 .(현위치)도 알아서 처리한다.
console.log('path.resolve(경로, ...)', path.resolve(__dirname, '..', '..', 'Algorithms')); // path.join()고 비슷하지만 차이가 있다. 차이점은 아래를 참고하자.

/*
  * [join과 resolve의 차이]
  * path.join과 path.resove는 동작 방식이 다르다.
  * /를 만나면 path.resolve는 절대 경로로 인식해서 앞의 경로를 무시한다.
  * path.join은 상대 경로로 처리한다.
  * path.join('/a', '/b', '/c'); => '/a/b/c'
  * path.resolve('/a', '/b', '/c'); => '/b/c'
  * 
*/

console.log(path.posix);
console.log(path.win32.sep); // => \

console.log(require.main);