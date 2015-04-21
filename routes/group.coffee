speaker = global.speaker;
message_help = "!게시 [제목: 필수];[내용: 선택];[태그: 선택 쉼표(,)로 구분]\n예시: !게시 테스트;테스트 내용;테스트,종료됨"

group = (req) ->
  console.log(req.body)
  message = "" + req.body.text.replace('!게시 ','')
  req.speaker(message)

module.exports = group;