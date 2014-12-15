# Put example
# {
#   product: "핫텔",
#   action: "판매 성공",
#   data: {
#     hotel_name: "호텔 이름",
#     room_name: "방 이름",
#     coin: "사용한 코인",
#     price: "가격 (구매가)",
#     customer_name: "구매자 이름"
#   }
# }

coffee = require "coffee-script/register"

express = require "express"
router = express.Router();
request = require "request"
util = require "util"
redis = require "redis"

global.client = redis.createClient()

speaker = require "./lib/speaker.coffee"
global.speaker = speaker

weather = require "./weather.js"
hottel = require "./hottel.js"
bab = require "./bab.js"
group = require "./group.coffee"

TOKEN = "SYB244fFe6JePkdvBqHDgSzs"

post = (req, res) ->
  if req.body? and req.body.token == TOKEN
    command = req.body.text.replace(/\s.*/g, "")
    req.speaker = speaker

    console.log "Chat Posted:" + command
    switch command
      when "!날씨"
        weather req
      when "!게시"
        group req

    res.end()

put = (req, res) ->
  req.body.channel_name = "announcement";

  if req.body? and req.body.product? and req.body.action?
    command = [req.body.product, req.body.action]

    req.speaker = speaker;
    req.command = command[1];
    req.put_data = req.body.data;

    console.log "Put Posted:" + command

    switch command[0]
      when "핫텔"
        hottel(req);

  res.end();


router.post("/", post)
router.put("/", put);

module.exports = router;