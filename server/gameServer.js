module.exports = {
  startGame: function () {
    totalQuestionNumber =0;
    sessionQuestionsBeginner =[];
    sessionQuestionsIntermediate=[];
    sessionQuestionsExpert=[];
  },

 loadQuestions: function () {
    questions = require('./questions.json');
    questionsBeginner = require('./questionsBeginner.json');
    questionsIntermediate = require('./questionsIntermediate.json');
    questionsExpert = require('./questionsExpert.json');
 },

  submitAnswer: function (answerGiven) {
     if(curQuestion != undefined){
        var isCorrect = false;
        if( curQuestion.options[answerGiven] === curQuestion.answer){
                score = score+1;
                isCorrect = true;
           } else {
                score = score-1;
           }
         return isCorrect;
       } else{
         return undefined;
       }
  },
  timeUp: function (answerGiven) {
    if(curQuestion != undefined){
        score = score-1;
    }
    return false;
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
    if(totalQuestionNumber >= 10 || score == 10 ){
        return undefined;
    } else if( totalQuestionNumber <= 10)
    {
        var newCur = curQuestion;
        newCur.score = score;
        newCur.questionCount = totalQuestionNumber;
        return newCur;
    }
     return undefined;
     },

  endGame: function () {
        currentQuestionIndex = undefined;
        sessionQuestionsBeginner = [];
        sessionQuestionsIntermediate =[];
        sessionQuestionsExpert =[];
        totalQuestionNumber = 0;
        curQuestion = undefined;
        var tempScore = score;
        score = 0;
        return tempScore;
  },

 setCurrentQuestion: function(){
    var q;
    var level = getLevel();
    console.log('level '+ level);
    switch (level){
        case 0 :
            console.log('questionsBeginner '+ questionsBeginner);
            if(questionsBeginner == undefined){
                module.exports.loadQuestions();
            }
            q = randomInt(0,questionsBeginner.length);
            console.log('q '+ q);
            console.log(' sessionQuestionsBeginner '+  sessionQuestionsBeginner);
            while(sessionQuestionsBeginner.indexOf(q) != -1){
                q = randomInt(0,questionsBeginner.length);
            }
            sessionQuestionsBeginner.push(q);
            console.log(' sessionQuestionsBeginner after'+  sessionQuestionsBeginner);

            curQuestion = questionsBeginner[q];
            console.log(' curQuestion '+  curQuestion);

            totalQuestionNumber=totalQuestionNumber+1;
            console.log(' totalQuesion '+  totalQuestionNumber);

            break;
        case 1 :
           if(questionsIntermediate == undefined){
                module.exports.loadQuestions();
            }
            q = randomInt(0,questionsIntermediate.length);
            while(sessionQuestionsIntermediate.indexOf(q) != -1){
                q = randomInt(0,questionsIntermediate.length);
            }
            sessionQuestionsIntermediate.push(q);
            curQuestion = questionsIntermediate[q];
            totalQuestionNumber=totalQuestionNumber+1;
            break;
        case 2 :
            if(questionsExpert == undefined){
                module.exports.loadQuestions();
            }
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
};

var questionsBeginner;
var questionsIntermediate;
var questionsExpert;

var score = 2;

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


var getLevel =function(){
    if(score <4){
        return 0;
    } else if(score <7){
        return 1;
    } else if(score <= 10){
        return 2;
    }
}


























