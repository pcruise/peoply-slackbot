request = require 'request'

speaker = global.speaker;
message_help = "!게시 [제목: 필수];[내용: 선택];[태그: 선택 쉼표(,)로 구분]\n예시: !게시 테스트;테스트 내용;테스트,종료됨"
app_id = global.C.parse_app_id
app_key = global.C.parse_app_key

close_time = 2
open_time = 8

group = (data) ->
  message = "" + data.text.replace('!게시 ','')
  send_channel = data.channel_name
  if data.channel_name == 'concierge_new' and data.user_key
    auto_message_check(data.user_key, data.me)
  if message
    console.log(message,send_channel)
    speaker(message,send_channel)

auto_message_check = (user_key, is_user)->
  global.client.get 'hottel:concierge:last_ts:'+user_key, (e,r)->
    date = new Date()
    ts = date.getTime()
    hour = date.getHours()
    if hour >= close_time and hour < open_time and is_user
      send_parse user_key, global.C.auto_msg.timeout
    else if (!r or Number(r) < ts - 3600000) and is_user
      send_parse user_key, global.C.auto_msg.wait
    global.client.set 'hottel:concierge:last_ts:'+user_key, ts, (e,r)->

send_parse = (user_key, msg)->
  request
    url:"https://api.parse.com/1/classes/Concierge"
    method:'POST'
    headers:
      'Accept': 'application/json'
      'X-Parse-Application-Id': app_id
      'X-Parse-REST-API-Key': app_key
      'Content-Type': 'application/json'
    body:JSON.stringify(
      msg: msg
      me: false
      user_key: user_key
    )
  , (e,r,b)->
    console.log b,'post'
    request
      url:"https://api.parse.com/1/push"
      method:'POST'
      headers:
        'Accept': 'application/json'
        'X-Parse-Application-Id': app_id
        'X-Parse-REST-API-Key': app_key
        'Content-Type': 'application/json'
      body:JSON.stringify({
        channels: ["private_"+user_key]
        data:
          alert: "Hottel Concierge: "+msg
      })
    , (e,r,b)->
      console.log b,'push'

module.exports = group;