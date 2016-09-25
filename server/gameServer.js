module.exports = {
  startGame: function () {
    totalQuestionNumber =0;
    loadQuestions();
    setCurrentQuestionIndex();
  },
  submitAnswer: function (answerGiven) {
    console.log('answer submitted ' + answerGiven);
     if(curQuestion != undefined){
        // total number of question check here
        if( curQuestion.options[answerGiven] === curQuestion.answer){
                score = score+1;
           } else {
                score = score-1;
           }
         console.log("score = " +score);
        setCurrentQuestionIndex();
       } else{
         module.exports.startGame();
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
  console.log('totalQuestionNumber '+ totalQuestionNumber);
    if(totalQuestionNumber >= 10 || score == 10 || score <0){
        return undefined;
    } else if( totalQuestionNumber < 10)
    {
        var newCur = curQuestion;
        newCur.score = score
        return newCur;
    }
     return undefined;
     },

  endGame: function () {
        currentQuestionIndex = undefined;
        var tempScore = score;
        score =0;
        return tempScore;
  }
};

var questionsBeginner;
var questionsImmediate;
var questionsExpert;

var score = 2;
var noOfQuestionForEachSession = 4

var sessionQuestionsBeginner = [];
var sessionQuestionsImmediate = [];
var sessionQuestionsExpert = [];

var maxQuestionsBeginner = 3;
var maxQuestionsImmediate = 3;
var maxQuestionsExpert = 3;

var randomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var loadQuestions = function () {
    questions = require('./questions.json');
    questionsBeginner = require('./questionsBeginner.json');
    questionsImmediate = require('./questionsImmediate.json');
    questionsExpert = require('./questionsExpert.json');
}
var curQuestion;
var totalQuestionNumber;

var setCurrentQuestionIndex = function(){
    var q;
    var level = getLevel();
    console.log('level '+ level);
    switch (level){
        case 0 :
            q = randomInt(0,questionsBeginner.length);
            while(sessionQuestionsBeginner.indexOf(q) != -1){
                q = randomInt(0,questionsBeginner.length);
            }
            sessionQuestionsBeginner.push(q);
            curQuestion = questionsBeginner[q];
            totalQuestionNumber=totalQuestionNumber+1;
            break;
        case 1 :
            q = randomInt(0,questionsImmediate.length);
            while(sessionQuestionsImmediate.indexOf(q) != -1){
                q = randomInt(0,questionsImmediate.length);
            }
            sessionQuestionsImmediate.push(q);
            curQuestion = questionsImmediate[q];
            totalQuestionNumber=totalQuestionNumber+1;
            break;
        case 2 :
            q = randomInt(0,questionsExpert.length);
            while(sessionQuestionsExpert.indexOf(q) != -1){
                q = randomInt(0,questionsExpert.length);
            }
            sessionQuestionsExpert.push(q);
            curQuestion = questionsExpert[q];
            totalQuestionNumber=totalQuestionNumber+1;
            break;
    }
}

var getLevel =function(){
    if(score <4){
        return 0;
    } else if(score <7){
        return 1;
    } else if(score <= 10){
        return 2;
    }
}


























