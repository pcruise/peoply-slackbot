request = require 'request'

speaker = global.speaker;
message_help = "!게시 [제목: 필수];[내용: 선택];[태그: 선택 쉼표(,)로 구분]\n예시: !게시 테스트;테스트 내용;테스트,종료됨"
app_id = 'NAllo4M9E53cRyp6SGtHVQchPJmYbrHdA5Iz9Anq'
app_key = 'BQiD4TQOl1tC0qCemsFyRxN7DkecFRE2RuLnJRGd'

wait_msg = '안녕하세요! 컨시어지를 찾아주셔서 감사합니다. 현재 컨시어지 마스터님과 연결중이니 잠시만 기다려주세요.'
timeout_msg = '안녕하세요! 현재 컨시어지는 매일 08:00 ~ 24:00 에 만나실 수 있습니다. 입력하신 메시지는 컨시어지 마스터에게 전달이 되었으니 내일 오전에 다시 연락 드리겠습니다 :)'
close_time = 0
open_time = 8

group = (req) ->
  console.log(req.body)
  message = "" + req.body.text.replace('!게시 ','')
  if req.body.channel_name == 'concierge_new' and req.body.user_key == 'e0d0a395c04c1a158a900dd870c38a40'
    auto_request(req.body.user_key)
  req.speaker(message)

auto_message_check = (user_key)->
  global.client.get 'hottel:concierge:last_ts:'+user_key, (e,r)->
    date = new Date()
    ts = date.getTime()
    hour = date.getHours()
    if hour >= close_time and hour < open_time
      send_parse timeout_msg, user_key
    else if r and Number(r) < ts - 3600000
      send_parse wait_msg, user_key
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

module.exports = group;