var express = require('express');
var router = express.Router();
var request = require("request");

var Slack = require('slack-node');
var util = require("util");

domain = "peoply";
webhookToken = "tLK3w8TgCnbeLixtqXqKpqDG";

slack = new Slack(webhookToken, domain);

var weather = require("./weather.js");
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

    console.log(command);
    switch(command){
      case "!날씨":
        weather(req);
      break;
    }
    res.end();
    return;
  }
});

module.exports = router;
