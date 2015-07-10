var util = require("util");
var fs = require("fs");

var today_str = "";
var today;

var tcomma = function(inp){
  return (''+parseInt(inp,10)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

var date_format = function(ts){
  ts = Number(ts);
  date = new Date(ts);
  return date.getFullYear()+'/'+(''+(date.getMonth()+101)).substr(1)+'/'+(''+(date.getDate()+100)).substr(1)+'-'+(''+(date.getHours()+100)).substr(1)+':'+(''+(date.getMinutes()+100)).substr(1);
};

var check_today = function(){
  var date_now = new Date(Date.now() - (1000*60*60*5) );

  if(today_str != date_now.toDateString()){
    console.log("new day!");
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

var read_db = function(){
  global.client.get("slackbot:hottel:db", function(e, r){
    try {
      today = JSON.parse(r);
      today_str = today.today_str;
    } catch(e){
      today = {};
      today_str = "";
    }
    console.log("db restored.");
    console.log(today);
    check_today();
  });
}

var write_db = function(){
  global.client.set("slackbot:hottel:db", JSON.stringify(today));
}

read_db();


var hottel = function(req){
  var message = "";
  var t = "";

  check_today();

  var body = req.body;
  var data;
  data = {
    ts: body["data[ts]"],
    checkin_ts: body["data[checkin_ts]"],
    hotel_name: body["data[hotel_name]"],
    room_name: body["data[room_name]"],
    coin: body["data[coin]"],
    price: body["data[price]"],
    customer_name: body["data[customer_name]"]
    customer_phone: body["data[customer_phone]"]
  };

  switch(req.command){
    case "판매 성공":
      today.hotel += 1;
      today.hotel_price += parseInt(data.price,10);

      if(data.coin > 0){
        today.hotel_coin_used += parseInt(data.coin,10);
        t = util.format("판매가: %s원 (코인사용 %s) ", tcomma(data.price), tcomma(data.coin));
      } else {
        t = util.format("판매가: %s원", tcomma(data.price));
      }

      message = util.format("(%d번째) %s / %s / %s \n- 체크인 날짜: %s\n- %s\n- 구매자 연락처: %s\n- 오늘 판매 합계: %s원, %sC",
        today.hotel, data.hotel_name, data.room_name, data.customer_name, new Date(parseInt(data.checkin_ts,10)).toLocaleDateString(), t, data.customer_phone, tcomma(today.hotel_price), tcomma(today.hotel_coin_used));

      write_db();
    break;
    case "코인 판매 성공":
      today.coin += 1;
      today.coin_price += parseInt(data.price,10);

      message = util.format("오늘 %d번째 코인 결제가 성공했어요! / %s, 구매자: %s [총: %s]",
        today.coin, data.hotel_name, data.customer_name, tcomma(today.coin_price));

      write_db();
    break;
    case "팩스 전송 실패":
      message = util.format("팩스 전송 실패했어요. 고객명: %s , 예약호텔명: %s , 결제시간: %s", data.customer_name, data.hotel_name, date_format(data.ts));
    break;
  }
  req.speaker("> [핫텔] " + message);
};

module.exports = hottel;