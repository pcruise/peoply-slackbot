var Slack = require('slack-node');

domain = "peoply";
webhookToken = "tLK3w8TgCnbeLixtqXqKpqDG";

slack = new Slack(webhookToken, domain);

var http = require('http');

http.createServer(function (req, res) {

  // slack.webhook({
  //   channel: "#developer",
  //   username: "slackbot",
  //   text: "Hello :)"
  // }, function(err, response) {
  //   console.log(response);
  // });

  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');