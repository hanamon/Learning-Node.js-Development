const EventEmitter = require('events');

const myEvent = new EventEmitter();

myEvent.addListener('event1', () => console.log('이벤트 1 addListener'))
myEvent.on('event1', () => console.log('이벤트 1 on'));
myEvent.on('event1', () => console.log('이벤트 1 on 추가'));

myEvent.emit('event1'); // 이벤트 호출
myEvent.emit('event2ddd'); // 이벤트 호출

// JavaScript 클래스로 new EventEmitter() 구현하기
/*
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