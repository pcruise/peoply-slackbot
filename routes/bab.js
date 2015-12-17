// 밥먹을 시간에 밥먹자고 합니다.
// 토, 일요일은 쉽니다
// 11시 45분 - 점심, 5시 45분 - 저녁 (참가인원 받음)

var anounced = false;

function loop(){
  var h, m, d;
  d = new Date();
  h = d.getHours();
  m = d.getMinutes();

  if (h == 11 && m == 45 && !anounced) {
    global.speaker("Time to get lunch!");
    anounced = true;
  }

  if(h == 16) {
    anounced = false;
  }

  if(h == 17 && m == 45 && !anounced) {
    global.speaker("Are you still working? It's time to get dinner!");
    anounced = true;
  }

  if(h == 20) {
    anounced = false;
  }
}
setInterval(loop,5000)