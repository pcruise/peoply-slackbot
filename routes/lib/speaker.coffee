# 슬랙 채널에 글 쓰는 코드. req에 붙여서 사용
Slack = require "slack-node"
domain = global.C.domain;
webhookToken = global.C.webhookToken;

slack = new Slack(webhookToken, domain);

speaker = (message) ->
  # console.log message
  if this.body?
    channel = this.body.channel_name;
  else
    channel = "announcement"

  thebody = this.body
  option =
    channel: "#" + channel,
    username: global.C.bot_name,
    text: message

  respon = (err, response) ->
    console.log(err, response)
    if err?
      setTimeout ()->
        this.body = thebody
        speaker(message)
      , 1000

  slack.webhook(option, respon);

module.exports = speaker
