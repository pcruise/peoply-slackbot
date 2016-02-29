# 슬랙 채널에 글 쓰는 코드. req에 붙여서 사용
Slack = require "slack-node"
domain = global.C.domain;
webhookToken = global.C.webhookToken;

slack = new Slack(webhookToken, domain);

speaker = (message, ch) ->
  # console.log message
  if this.body?
    channel = this.body.channel_name;
  else if ch
    channel = ch;
  else
    console.log(ch);
    channel = "announcement"

  thebody = this.body
  option =
    channel: "#" + channel,
    username: global.C.bot_name,
    text: message

  respon = (err, response) ->
    if err?
      console.log(err, response)
      setTimeout ()->
        this.body = thebody
        speaker(message,channel)
      , 1000

  slack.webhook(option, respon);

module.exports = speaker
