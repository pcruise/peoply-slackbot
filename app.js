var Slack = require('slack-node');
var util = require("util");

domain = "peoply";
webhookToken = "tLK3w8TgCnbeLixtqXqKpqDG";

slack = new Slack(webhookToken, domain);

var http = require('http');

http.createServer(function (req, res) {

  if (req.method == 'POST') {
    var body = '';
    req.on('data', function (data) {
      body += data;
    });
    req.on('end', function () {
      util.log("New Response here:");
      console.log(body);
    });
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('post received');
  }

  // slack.webhook({
  //   channel: "#developer",
  //   username: "slackbot",
  //   text: "Hello :)"
  // }, function(err, response) {
  //   console.log(response);
  // });

  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('');
}).listen(1337, '1.234.27.35');
console.log("Server Listening!");