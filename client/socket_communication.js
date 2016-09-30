// creating a new websocket
var socket = io.connect('http://localhost:8000');
// on every message recived we print the new datas inside the #container div

socket.on('notification', function (data) {
  // convert the json string into a valid javascript object
  var _data = JSON.parse(data);
  console.log(_data);
  document.getElementById("questionNumberContainer").style.visibility = "visible";

  document.getElementById("timer").style.visibility = "visible";

  $('#welcome').hide();
  $('#leftSection').show();
  $('#rightSection').show();
  $('#question').html(_data.question);
  $("#options").show();
  document.getElementById("yellowButton").style.visibility = "visible";

  $('#optionA').html(_data.options[0]);
  document.getElementById("optionBIcon").style.visibility = "visible";

  $('#optionB').html(_data.options[1]);
  $('#currentQuestionNumber').html(_data.questionCount);

  document.getElementById("correctAnswerGyan").style.visibility = "hidden";
  document.getElementById("wrongAnswerGyan").style.visibility = "hidden";
  document.getElementById("timeUpMessage").style.visibility = "hidden";



  setLevel(_data.score);
  setTimer();

});

socket.on('gyan', function (data) {
  stopTimer();
  var _data = JSON.parse(data);
  console.log(_data);
  $("#options").hide();
  $('#gyan-message-wrong').html(_data);

  document.getElementById("wrongAnswerGyan").style.visibility = "visible";
});

socket.on('congratulations', function (data) {
  stopTimer();
  var _data = JSON.parse(data);
  console.log(_data);
  $("#options").hide();
  $('#gyan-message-correct').html(_data);
  document.getElementById("correctAnswerGyan").style.visibility = "visible";
});

socket.on('timeup', function (data) {
  stopTimer();
  $("#options").hide();
  $('#timeUpMessage').show();

});

socket.on('end', function (data) {
  // convert the json string into a valid javascript object
  var _data = JSON.parse(data);
  console.log(_data);
  $('#score').html(_data);
  $('#question').html("");
  $("#options").hide();
});

socket.on('welcome', function (data) {
  showWelcome()
});


var setLevel = function (score) {
  console.log('score ' + score);
  switch (score) {
    case 0:
    case 1:
    case 2:
    case 3:
      document.getElementById("state-image").src = './images/novice.png';
      break;
    case 4:
    case 5:
    case 6:
      document.getElementById("state-image").src = './images/pro.png';
      break;
    case 7:
    case 8:
    case 9:
    case 10:
      document.getElementById("state-image").src = './images/expert.png';
      break;
    default:
      document.getElementById("state-image").src = './images/novice.png';
      break;
  }
};

var timer ;
var setTimer = function(){

    $('#timer').show();
 timer = new Timer();
  timer.start({precision: 'seconds', startValues: {seconds: 10}, countdown: true});
  timer.addEventListener('secondsUpdated', function (e) {
    $('#countdown').html(timer.getTimeValues().toString(['seconds']));
  });
  timer.addEventListener('targetAchieved', function (e) {
    $("#options").hide();
    $.ajax({ url: "http://localhost:8000/timeUp"}).then(function(data) {
     console.log('res'+ data);
                         });
    document.getElementById("timeUpMessage").style.visibility = "visible";
  });
}

var stopTimer = function (){
    timer.stop();
    $('#timer').hide();
}

var showWelcome = function (){
  $('#leftSection').hide();
  $('#rightSection').hide();
}

var showResult = function (){
  $('#question').html("");
  $("#options").hide();

}