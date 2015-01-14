request = require("request")
APIPATH = "https://api.todoist.com/API/"
APITOKEN = "8fba3459957cb5b4492c53296efb7f4ec6d3ac43"
APITAIL = "?token=#{APITOKEN}"

todoist = (req) ->
  if(req.body.text.indexOf(" ") == -1)
    # nothing to do
  else
    text = req.body.text
    text_token = req.body.text.split(" ")
    if text_token[1] == "추가"
      # Add
      console.log "add"
    else if text_token[1] == "끝"
      # Add
      console.log "add"
    else if text_token[1] == "삭제"
     # Add
      console.log "add"

  getProjects req, (req, r)->
    projects = ""
    first = true
    for item in r
      projects = projects + ", "
      if first
        projects = ""
        first = false

      projects = "#{projects}#{item.name}(#{item.is_archived}/#{item.cache_count})"

    req.speaker "사용 방법:\n!할일 [추가|끝|삭제] [프로젝트 이름] [할일 이름]\n!할일 [프로젝트 이름]\n등록된 프로젝트: "

get_projects = (req, callback)->
  request "#{APIPATH}getProjects#{APITAIL}", (e, r) ->
    if !e && r
      callback req, JSON.parse r
    else
      req.speaker "에러가 발생하였습니다.. #{e}"


module.exports = todoist;