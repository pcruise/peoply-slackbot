var util = require("util");
var today_str = "";
var today = {};

var tcomma = function(inp){
  return (''+parseInt(inp,10)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

var check_today = function(){
  var date_now = new Date(Date.now() - (1000*60*60*5) );

  if(today_str != date_now.toDateString()){
    today = {
      hotel: 0,
      coin: 0,
      hotel_price: 0,
      coin_price: 0
    };
    today_str = date_now.toDateString();
  }
};


var hottel = function(req){
  var message = "";
  var t = "";

  check_today();

  var body = req.body;
  var data;
  data = {
    hotel_name: body["data[hotel_name]"],
    room_name: body["data[room_name]"],
    coin: body["data[coin]"],
    price: body["data[price]"],
    customer_name: body["data[customer_name]"]
  };

  switch(req.command){
    case "판매 성공":
      today.hotel += 1;
      today.hotel_price += data.price;

      if(data.coin > 0){
        t = util.format("판매가: %s원 (코인사용 %s) ", tcomma(data.price), tcomma(data.coin));
      } else {
        t = util.format("판매가: %s원", tcomma(data.price));
      }
      message = util.format("오늘 %d번째 호텔방을 예약중이에요! (%s / %s, %s) %s",
        today.hotel, data.hotel_name, data.room_name, data.customer_name, t);
    break;
    case "코인 판매 성공":
      today.coin += 1;
      today.coin_price += data.price;

      message = util.format("오늘 %d번째 코인 결제가 성공했어요! / %s, 구매자: %s",
        today.coin, data.hotel_name, data.customer_name);
    break;
  }
  req.speaker("[핫텔] " + message);
};

module.exports = hottel;