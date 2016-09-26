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
     if(curQuestion == undefined){
            return "";
        } else {
            return curQuestion;
        }
  },
  triggerNextAction: function(){
     console.log('totalQuestionNumber '+ totalQuestionNumber);
    if(totalQuestionNumber > 10 || score == 10 || score < 0){
        return undefined;
    } else if( totalQuestionNumber <= 10)
    {
        var newCur = curQuestion;
        newCur.score = score
        return newCur;
    }
     return undefined;
     },

  endGame: function () {
        currentQuestionIndex = undefined;
        sessionQuestionsBeginner = [];
        sessionQuestionsIntermediate =[];
        sessionQuestionsExpert =[];
        totalQuestionNumber =2;
        curQuestion = undefined;
        var tempScore = score;
        score = 2;
        return tempScore;
  }
};

var questionsBeginner;
var questionsIntermediate;
var questionsExpert;

var score = 2;
var noOfQuestionForEachSession = 4

var sessionQuestionsBeginner = [];
var sessionQuestionsIntermediate = [];
var sessionQuestionsExpert = [];

var maxQuestionsBeginner = 3;
var maxQuestionsIntermediate = 3;
var maxQuestionsExpert = 3;

var curQuestion;
var totalQuestionNumber;

var randomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var loadQuestions = function () {
    questions = require('./questions.json');
    questionsBeginner = require('./questionsBeginner.json');
    questionsIntermediate = require('./questionsIntermediate.json');
    questionsExpert = require('./questionsExpert.json');
}

var setCurrentQuestionIndex = function(){
    var q;
    var level = getLevel();
    console.log('level '+ level);
    switch (level){
        case 0 :
            q = randomInt(0,questionsBeginner.length);
            while(sessionQuestionsBeginner.indexOf(q) != -1){
             console.log('level 0 q'+q+ '  current sessionQuestionsBeginer == '+ sessionQuestionsBeginner);
                q = randomInt(0,questionsBeginner.length);
            }
            sessionQuestionsBeginner.push(q);
            curQuestion = questionsBeginner[q];
            totalQuestionNumber=totalQuestionNumber+1;
            console.log(' pushed. current question is '+ curQuestion + " total questions "+ totalQuestionNumber);

            break;
        case 1 :
            q = randomInt(0,questionsIntermediate.length);
            while(sessionQuestionsIntermediate.indexOf(q) != -1){
             console.log('level 1 q'+q+ '  current sessionQuestionsIntermediate == '+ sessionQuestionsIntermediate);
                q = randomInt(0,questionsIntermediate.length);
            }
            sessionQuestionsIntermediate.push(q);
            curQuestion = questionsIntermediate[q];
            totalQuestionNumber=totalQuestionNumber+1;
            console.log(' pushed. current question is '+ curQuestion + " total questions "+ totalQuestionNumber);

            break;
        case 2 :
            q = randomInt(0,questionsExpert.length);
            while(sessionQuestionsExpert.indexOf(q) != -1){
                console.log('level 2 q'+q + '  current sessionQuestionsexpert == '+ sessionQuestionsExpert);
                q = randomInt(0,questionsExpert.length);
            }
            sessionQuestionsExpert.push(q);
            curQuestion = questionsExpert[q];
            totalQuestionNumber=totalQuestionNumber+1;
            console.log(' pushed. current question is '+ curQuestion + " total questions "+ totalQuestionNumber);

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


























