request = require 'request'

speaker = global.speaker;
message_help = "!게시 [제목: 필수];[내용: 선택];[태그: 선택 쉼표(,)로 구분]\n예시: !게시 테스트;테스트 내용;테스트,종료됨"
app_id = global.C.parse_app_id
app_key = global.C.parse_app_key

wait_msg = '안녕하세요! 컨시어지를 찾아주셔서 감사합니다. 현재 컨시어지 마스터님과 연결중이니 잠시만 기다려주세요.'
timeout_msg = '안녕하세요! 현재 컨시어지는 매일 08:00 ~ 02:00 에 만나실 수 있습니다. 입력하신 메시지는 컨시어지 마스터에게 전달이 되었으니 내일 오전에 다시 연락 드리겠습니다 :)'
close_time = 2
open_time = 8

group = (req) ->
  message = "" + req.body.text.replace('!게시 ','')
  send_channel = req.body.channel_name
  if req.body.channel_name == 'concierge_new' and req.body.user_key
    auto_message_check(req.body.user_key, req.body.me)
  if message
    req.speaker(message,send_channel)

auto_message_check = (user_key, is_user)->
  global.client.get 'hottel:concierge:last_ts:'+user_key, (e,r)->
    date = new Date()
    ts = date.getTime()
    hour = date.getHours()
    if hour >= close_time and hour < open_time and is_user
      send_parse user_key, timeout_msg
    else if (!r or Number(r) < ts - 3600000) and is_user
      send_parse user_key, wait_msg
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
          alert: "핫텔 컨시어지: "+msg
      })
    , (e,r,b)->
      console.log b,'push'

module.exports = group;