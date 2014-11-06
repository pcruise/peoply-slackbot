var WEATHER_URL = "http://api.openweathermap.org/data/2.5/weather?lat=%27+lng_lat%5B1%5D+%27&lon=%27+lng_lat%5B0%5D"
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
    find("판교");
  } else if(req.body.text.indexOf(" ") == -1) {
  } else {
  }
};

function find(loc){
  var lng_lat = LOC_DATA[loc];

  require('http://api.openweathermap.org/data/2.5/weather?lat='+lng_lat[1]+'&lon='+lng_lat[0], function(a, b){
    console.log(a, b);
    req.speaker("test");
  });
}

module.exports = weather;