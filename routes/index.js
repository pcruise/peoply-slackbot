/* Put example

{
  product: "핫텔",
  action: "판매 성공",
  data: {
    hotel_name: "호텔 이름",
    room_name: "방 이름",
    coin: "사용한 코인",
    price: "가격 (구매가)",
    customer_name: "구매자 이름"
  }
}

*/

var express = require('express');
var router = express.Router();
var request = require("request");

var Slack = require('slack-node');
var util = require("util");

domain = "peoply";
webhookToken = "tLK3w8TgCnbeLixtqXqKpqDG";

slack = new Slack(webhookToken, domain);

var weather = require("./weather.js");
var hottel = require("./hottel.js");

var speaker = function(message){
  console.log(message);
  var channel = this.body.channel_name;

  slack.webhook({
    channel: "#" + channel,
    username: "PeoplyBot",
    text: message
  }, function(err, response) {
    console.log(response);
  });
};

router.post('/', function(req, res){
  if(req.body && req.body.token == "SYB244fFe6JePkdvBqHDgSzs" ){
    var command = req.body.text.replace(/\s.*/g, "");

    req.speaker = speaker;

    console.log("Chat Posted:" + command);
    switch(command){
      case "!날씨":
        weather(req);
      break;
    }
    res.end();
    return;
  }
});

router.put("/", function(req, res){
  req.channel_name = "announcement";

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  if(req.body && req.body.product && req.body.action){
    req.speaker = speaker;
    req.command = command[1];
    req.put_data = req.body.data;

    var command = [req.body.product, req.body.action];
    console.log("Put Posted:" + command);

    switch(command[0]){
      case "핫텔":
        hottel(req);
      break;
    }
  }
});

module.exports = router;
