module.exports = {
  startGame: function () {
    loadQuestions();
    setCurrentQuestionIndex();
  },
  submitAnswer: function (answerGiven) {
    console.log('answer submitted ' + answerGiven);
     if(currentQuestionIndex != undefined){
              if (currentQuestionIndex  < noOfQuestionForEachSession){
                  if( questions[currentQuestionIndex].options[answerGiven]=== questions[currentQuestionIndex].answer){
                    score = score+1;

                  }
                    console.log("score = " +score);
              }
              setCurrentQuestionIndex();
         }

  },
  getScore: function () {
    return score;
  },
  getCurrentQuestion: function(){
     if(currentQuestionIndex == undefined){
            return "";
        } else if (currentQuestionIndex  < noOfQuestionForEachSession){
            return questions[currentQuestionIndex].question;
        } else {
            console.log("not defined");
     }
  },
  triggerNextAction: function(){
     if(currentQuestionIndex != undefined){
          if (currentQuestionIndex  < noOfQuestionForEachSession){
              return questions[currentQuestionIndex];
          }
     }
     return undefined;
     },

  endGame: function () {
        currentQuestionIndex = undefined;
        return score;
  }
};

var currentQuestionIndex;
var questions;
var score =0;
var noOfQuestionForEachSession = 2

var sessionQuestions = [];
var maxQuestions;

var randomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var loadQuestions = function () {
    questions = require('./questions.json');
    maxQuestions = questions.length;
    sessionQuestions =[];
    var q = randomInt(0,maxQuestions);
    while(sessionQuestions.length == undefined || sessionQuestions.length < noOfQuestionForEachSession){
        if(sessionQuestions.indexOf(q) == -1){
            sessionQuestions.push(q);
        }
        q = randomInt(0,maxQuestions);
       }
    console.log(sessionQuestions);
}

var setCurrentQuestionIndex = function(){

    if(currentQuestionIndex == undefined){
        currentQuestionIndex = 0;
    } else if (currentQuestionIndex  < noOfQuestionForEachSession-1){
        currentQuestionIndex=currentQuestionIndex+1;
    } else {
        currentQuestionIndex = undefined;
    }
}
