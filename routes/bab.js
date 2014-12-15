// 밥먹을 시간에 밥먹자고 합니다.
// 토, 일요일은 쉽니다
// 11시 50분 - 점심, 6시 15분 - 저녁 (참가인원 받음)

var client = global.client;
var anounced = false;

function loop(){
  var h, m, d;
  d = new Date();
  h = d.getHours();
  m = d.getMinutes();

  if (h == 11 && m == 50) {
    client.speaker("[밥] 드세요");
    anounced = true;
  }

  if(h == 20) {
    anounced = false;
  }
}
setInterval(loop,5000)