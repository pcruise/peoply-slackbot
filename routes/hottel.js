var util = require("util");
var today_str = "";
var today = 0;

var tcomma = function(inp){
  return (''+parseInt(inp,10)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};


var weather = function(req){
  var message = "";
  var date_now = new Date(Date.now() - (1000*60*60*5) );
  var t = "";
  var data = req.body.data;

  switch(req.command){
    case "판매 성공":
      if(today_str != date_now.toDateString()){
        today = 0;
        today_str = date_now.toDateString();
      }
      today+=1;
      if(data.coin > 0){
        t = util.format("판매가: %s원 (코인사용 %s) ", tcomma(data.price), tcomma(data.coin));
      } else {
        t = util.format("판매가: %s원", tcomma(data.price));
      }
      message = util.format("오늘 %d번째 호텔방을 예약중이에요! (%s / %s, %s) %s",
        today, data.hotel_name, data.room_name, data.customer_name, t);
    break;
  }
  req.speaker("[핫텔] " + message);
};