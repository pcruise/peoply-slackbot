# 슬랙 채널에 글 쓰는 코드. req에 붙여서 사용
Slack = require "slack-node"
domain = "peoply";
webhookToken = "tLK3w8TgCnbeLixtqXqKpqDG";

slack = new Slack(webhookToken, domain);

module.exports = (message) ->
  console.log message
  channel = this.body.channel_name;
  option =
    channel: "#" + channel,
    username: "PeoplyBot",
    text: message

  respon = (err, response) ->
    console.log(response);

  slack.webhook(option, respon);
