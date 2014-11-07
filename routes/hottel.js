var weather = function(req){
  req.channel_name = "bottest";

  switch(req.command){
    case "판매 성공":
      req.speaker("판매 성공?");
    break;
  }
};