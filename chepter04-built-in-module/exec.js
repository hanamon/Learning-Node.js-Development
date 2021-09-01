/*
  * [child_process 모듈]
  * 노드에서 다른 프로그램을 실행하고 싶거나 명령어를 수행하고 싶을 때 사용하는 모듈
  * 이 모둘을 통해 다른 언어의 코드(예를 들면, 파이썬)를 실행하고 결괏값을 받을 수 있다.
  * 
  * 이름이 child_process(자식 프로세스)인 이유?
  * 현재 노드 프로세스 외에 새로운 프로세스를 띄워서 명령을 수행하고, 다른 노드 프로세스에 결과를 알려주기 때문이다.
  * 
  * 결과는 stdout(표준 출력)과 stderr(표준 에러)에 붙여둔 data 이벤트 리스너에게 버퍼 형태로 전달된다.
*/

const exec = require('child_process').exec;
const spawn = require('child_process').spawn; // 파이썬 프로그램 등 실행은 spawn 사용 (새로운 프로세스를 띄우면서 명령어를 실행)
const process = exec('cat README.md'); // 명령 프롬프트의 쉘 명령어 입력
// const process = spawn('ls', [], { shell: true });

process.stdout.on('data', function(data) {
  console.log(data.toString());
}); // 실행 결과

process.stderr.on('data', function(data) {
  console.error(data.toString());
}); // 실행 에러

/*
  * [exec 과 spawn 의 차이]
  * exec 는 쉘을 실행해서 명령어를 수행하고, spawn은 새로운 프로세스를 띄우면서 명령어를 실행한다.
  * spawn에서 세 번째 인수로 { shell: true }를 제공하면 exec처럼 쉘을 실행해서 명령어를 수행한다. 
*/