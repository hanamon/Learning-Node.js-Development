const EventEmitter = require('events');

const myEvent = new EventEmitter();

myEvent.addListener('event1', () => console.log('이벤트 1 addListener'));
myEvent.on('event2', () => console.log('이벤트 2 on'));
myEvent.on('event2', () => console.log('이벤트 2 on 추가'));
myEvent.once('event3', () => console.log('이벤트 3 once'));

myEvent.emit('event1'); // 이벤트 호출
myEvent.emit('event2'); // 이벤트 호출
myEvent.emit('event3'); // 이벤트 호출
myEvent.emit('event3'); // 실행 안됨

myEvent.on('event4', () => console.log('이벤트 4 on'));
myEvent.removeAllListeners('event4');
myEvent.emit('event4'); // 실행 안됨

const listener = () => console.log('이벤트 5');
myEvent.on('event5', listener);
myEvent.removeListener('event5', listener);
myEvent.emit('event5'); // 실행 안됨

console.log(myEvent.listenerCount('event2'));

/**
 * [events 모듈]
 * myEvent라는 객체를 먼저 만든다. 객체는 이벤트를 관리하기 위한 메서드를 가지고 있다.
 * 
 * on(이벤트명, 콜백) : 
 * 이벤트 이름과 이벤트 발생 시의 콜백을 연결한다.
 * 이렇게 연결하는 동작을 이벤트 리스닝이라고 부른다.
 * 이벤트 하나에 여러 개를 달아줄 수도 있다.
 * 
 * addListener(이벤트명, 콜백) :
 * on 과 같은 기능이다.
 * 
 * emit(이벤트명) :
 * 이벤트를 호출하는 메서드이다.
 * 
 * once(이벤트명, 콜백) : 
 * 한 번만 실행되는 이벤트이다.
 * 
 * removeAllListeners(이벤트명) :
 * 이벤트에 연결된 모든 이벤트 리스너를 제거한다.
 * 
 * removeListener(이벤트명, 리스너) :
 * 이벤트에 연결된 리스너를 하나씩 제거한다.
 * 
 * off(이벤트명, 콜백) :
 * 노드 10 버전에서 추가된 메서드로, removeListener와 기능이 같다.
 * 
 * listenerCount(이벤트명) :
 * 현재 리스너가 몇 개 연결되어 있는지 확인한다.
 */

/*
// [JavaScript 클래스로 new EventEmitter() 구현하기]
class EventEmitter {
    // 생성자 함수안에 멤버 변수 선언 및 초기화
    constructor() {
    this.events = {}
    }
    // 이벤트 추가하기
    on(event, callback) {
        this.events[event] = callback;
    }
    // 이벤트 호출하기
    emit(event) {
        if( this.events[event] ) this.events[event]();
    }
    // 이벤트 제거하기
    off(event, callback) {
        this.events[event] = null;
    }
}
*/