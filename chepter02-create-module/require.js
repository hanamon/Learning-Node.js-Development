// require는 함수이고, 함수는 객체이므로 require는 객체로서 몇 가지 속성을 갖고 있다.
// 그 중에서 require.cache와 require.main에 대해 알아보자.
console.log('require가 가장 위에 오지 않아도 됩니다.');

module.exports = '저를 찾아보세요.';

require('./var');

// console.log('require.cache입니다.');
// console.log(require.cache);
// console.log('require.main입니다.');
// console.log(require.main);
// console.log(require.main === module);
// console.log(require.main.filename);

// require가 반드시 파일 최상단에 위치할 필요가 없고,
// module.exports도 최하단에 위치할 필요가 없다.
// 아무 곳에서나 사용해도 된다.
