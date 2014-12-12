var util = require("util");
var fs = require("fs");

var today_str = "";
var today;

var db = fs.readFileSync('db.hottel.json', 'utf8');
if(!db){
  db = {};
} else {
  try {
    db = JSON.parse(db);
  } catch(e){
    db = {};
  }
  today_str = db.today_str;
}
var today = db;

var tcomma = function(inp){
  return (''+parseInt(inp,10)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

var check_today = function(){
  var date_now = new Date(Date.now() - (1000*60*60*5) );

  if(today_str != date_now.toDateString()){
    today_str = date_now.toDateString();
    today = {
      hotel: 0,
      coin: 0,
      hotel_price: 0,
      hotel_coin_used: 0,
      coin_price: 0,
      today_str: today_str
    };

    write_db();
  }
};

var write_db = function(){
  db = today;
  fs.writeFileSync('db.hottel.json', JSON.stringify(db));
}

check_today();


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
        today.hotel_coin_used += data.coin;
        t = util.format("판매가: %s원 (코인사용 %s) ", tcomma(data.price), tcomma(data.coin));
      } else {
        t = util.format("판매가: %s원", tcomma(data.price));
      }

      message = util.format("오늘 %d번째 호텔방을 예약중이에요! (%s / %s, %s) %s [총: %s, %sC]",
        today.hotel, data.hotel_name, data.room_name, data.customer_name, t, today.hotel_price, today.hotel_coin_used);

      write_db();
    break;
    case "코인 판매 성공":
      today.coin += 1;
      today.coin_price += data.price;

      message = util.format("오늘 %d번째 코인 결제가 성공했어요! / %s, 구매자: %s",
        today.coin, data.hotel_name, data.customer_name);

      write_db();
    break;
  }
  req.speaker("[핫텔] " + message);
};

module.exports = hottel;