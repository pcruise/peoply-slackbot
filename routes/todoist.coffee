request = require("request")
APIPATH = "https://api.todoist.com/API/"
APITOKEN = "8fba3459957cb5b4492c53296efb7f4ec6d3ac43"
APITAIL = "?token=#{APITOKEN}"

todoist = (req) ->
  text_token = []

  if(req.body.text.indexOf(" ") == -1)
    # nothing to do
  else
    text = req.body.text
    text_token = req.body.text.split(" ")
    if text_token[1] == "추가"
      # Add
      console.log "add"
    else if text_token[1] == "분류추가"
      # Add
      add_projects req, text_token.slice(2, 1000).join(" ")

    else if text_token[1] == "끝"
      # Add
      console.log "add"
    else if text_token[1] == "삭제"
     # Add
      console.log "add"

  get_projects req, (req, r)->
    projects = ""
    project_names = []
    first = true
    for item in r
      project_names.push item.name
      projects = projects + ", "
      if first
        projects = ""
        first = false

      projects = "#{projects}#{item.name}(#{item.is_archived}/#{item.cache_count})"

    if (project_names.indexOf text_token[1]) >= 0
      req.speaker r[project_names.indexOf text_token[1]]
    else
      req.speaker "사용 방법:\n!할일 [추가|끝|삭제|분류추가|분류삭제] [분류 이름] [할일 제목]\n목록 보기: !할일 [프로젝트 이름]\n등록된 분류: #{projects}"

add_projects = (req, name)->
  call_api "addProject", (e, r, b) ->
    req.speaker "[할일] #{name} 분류 추가되었습니다."
  , {
    name: name
  }

get_projects = (req, callback)->
  call_api "getProjects", (e, r, b) ->
    if !e && r
      callback req, JSON.parse b
    else
      req.speaker "에러가 발생하였습니다.. #{e}"

call_api = (name, callback, query = {}) ->
  query.token = APITOKEN
  request {url:"#{APIPATH}#{name}", qs:query}, callback

module.exports = todoist;