var request = require("request");
var LOC_DATA = {
  // 서울지역 동일
  "서울": [126.98955,37.5651],
  "강남": [126.98955,37.5651],
  "강북": [126.98955,37.5651],
  "강서": [126.98955,37.5651],
  "강동": [126.98955,37.5651],

  "부산": [129.0718,35.16445],
  "경기": [127.1173206,37.5983211],
  "인천": [126.67435,37.46455],
  "제주": [126.5690003,33.3354988],
  "강원": [128.2039048,37.8665198],
  "충청": [126.954107,36.562294],
  "경상": [128.9876741,35.8059055],
  "전라": [126.954107,35.356425],
  "판교": [127.8733,35.81905]
};

var weather = function(req){
  if(req.body.text == "!날씨"){
    find(req, "판교");
  } else if(req.body.text.indexOf(" ") == -1) {
  } else {
  }
};

function find(req, loc){
  var lng_lat = LOC_DATA[loc];

  request('http://api.openweathermap.org/data/2.5/weather?lat='+lng_lat[1]+'&lon='+lng_lat[0], function(e, r){
    var body = JSON.parse(r.body);
    var message = "";

    var c = [body.main.temp_min - 273.15, body.main.temp_max - 273.15];
    var h = body.main.humidity;
    var w = body.weather[0].icon;

    switch(w){
      case "01": case "02":
        message = "날씨는 맑아요 :)";
      break;
      case "03": case "04": case "50":
        message = "날씨가 흐려요";
      break;
      case "09": case "10": case "11":
        message = "는 비가 오고 있어요.";
      break;
      case "13":
        message = "는 눈이 오고 있어요.";
      break;
    }

    message = "[" + loc + "] " + message + " (최저기온: "+c[0]+"'C 최고기온 "+c[1]+"'C / 습도 "+h+"%)";

    req.speaker(message);
  });
}

module.exports = weather;