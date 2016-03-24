document.addEventListener("DOMContentLoaded", ready);

function ready(){
  /*var arr=[];
  for(i=1;i<33;i++){
    var x = i+"";
    chrome.storage.sync.get(x,function(obj){
      console.log(JSON.stringify(obj));
      console.log(JSON.stringify(obj).indexOf("true"));
      if(JSON.stringify(obj).indexOf("true")>0)
        arr[i]=true;
      else
        arr[i]=false;  
    });
  }*/
  getScores("http://www.nfl.com/liveupdate/scorestrip/ss.xml");
  document.getElementById("reg").addEventListener("click", function(){getScores("http://www.nfl.com/liveupdate/scorestrip/ss.xml")});
  document.getElementById("post").addEventListener("click",function(){getScores("http://www.nfl.com/liveupdate/scorestrip/postseason/ss.xml")});
}

function getXML(url){
  var req = new XMLHttpRequest();
  req.onreadystatechange = function(){
    if(req.readyState==1)
      console.log("Server connection established...");
    if(req.readyState==2)
      console.log("Request received...");
    if(req.readyState==3)
      console.log("Processing request...");
    if(req.readyState==4&&req.status == 200){
      console.log("Response is ready...");
    }
  }
  req.open("GET",url,false);
  req.send(null);
  return req.responseXML;
}

function getScores(url){
  if(url=="http://www.nfl.com/liveupdate/scorestrip/postseason/ss.xml")
    document.getElementById("para").style.opacity=1;
  else if(url=="http://www.nfl.com/liveupdate/scorestrip/ss.xml")
    document.getElementById("para").style.opacity=0;
  var table = document.getElementById("regscores");
  table.innerHTML="";
  var xmlDoc = getXML(url);
  var x = xmlDoc.getElementsByTagName("g");
  for(i=0;i<x.length;i++){
    var row = table.insertRow(i);
    if(url.indexOf("postseason")>1){
      var round = row.insertCell(0);
      var team1 = row.insertCell(1);
      var score1 = row.insertCell(2);
      var score2 = row.insertCell(3);
      var team2 = row.insertCell(4);
      var completion = row.insertCell(5);
    }else{
      var team1 = row.insertCell(0);
      var score1 = row.insertCell(1);
      var score2 = row.insertCell(2);
      var team2 = row.insertCell(3);
      var completion = row.insertCell(4);
    }
    team1.innerHTML=x[i].getAttribute("h");
    score1.innerHTML=x[i].getAttribute("hs");
    var hscore = x[i].getAttribute("hs");
    var vscore = x[i].getAttribute("vs");
    score2.innerHTML=x[i].getAttribute("vs");
    team2.innerHTML=x[i].getAttribute("v");
    var com = x[i].getAttribute("q");
    if(com=="F"){
      completion.innerHTML="Final";
      if(parseInt(hscore,10)>parseInt(vscore,10))
        score1.style.color="#E80000";
      else if(parseInt(hscore,10)<parseInt(vscore,10))
        score2.style.color="#E80000";
    }
    else if(com=="FO"){
      completion.innerHTML="Final/OT";
      if(parseInt(hscore,10)>parseInt(vscore,10))
        score1.style.color="#E80000";
      else if(parseInt(hscore,10)<parseInt(vscore,10))
        score2.style.color="#E80000";
    }
    else if(com=="H")
      completion.innerHTML="Halftime";
    else{
        switch(com){
          case "1":
            completion.innerHTML=x[i].getAttribute("q")+"st "+x[i].getAttribute("k");
            break;
          case "2":
            completion.innerHTML=x[i].getAttribute("q")+"nd "+x[i].getAttribute("k");
            break;
          case "3":
            completion.innerHTML=x[i].getAttribute("q")+"rd "+x[i].getAttribute("k");
            break;
          case "4":
            completion.innerHTML=x[i].getAttribute("q")+"th "+x[i].getAttribute("k");
            break;
          default:
            completion.innerHTML=x[i].getAttribute("d")+" "+x[i].getAttribute("t");
            break;

        }
    }
    if(url.indexOf("postseason")>1){
      switch(x[i].getAttribute("gt")){
        case "WC":
          round.innerHTML="Wild Card";
          break;
        case "DIV":
          round.innerHTML="Divisional";
          break;
        case "CON":
          round.innerHTML="Conference"
          break;
        case "SB":
          round.innerHTML="Super Bowl";
          break;
        case "PRO":
          round.innerHTML="Pro Bowl";
          break;
      }
    }

  }
}
    