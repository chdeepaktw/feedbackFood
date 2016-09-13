var state = {
                       "selectedQuestions": [] ,
                       "score" : 0,
                       "currentQuestion" : {}
                     };

var startNewSession = function (noOfQuestions) {
          var questions = JSON.parse(question_pool);

          var shuffled = questions.sort(function(){return .5 - Math.random()});// shuffle
          var selected =shuffled.slice(0,noOfQuestions) ; //get sub-array of first n elements AFTER shuffle

          state.selectedQuestions = selected;
          state.score = 0;
          nextQuestion();
}

var resetSession = function () {
          state.selectedQuestions = [];
          state.score = 0;
}

var nextQuestion = function(){
    var q = state.selectedQuestions.pop()
    console.log('question : ' + q.question)
    state.currentQuestion = q;
}


var answer = function(ans){
    if(state.currentQuestion.answer == ans){
        console.log('Answer is correct')
        state.score++;
    }else{
        console.log('Answer is wrong')
    }
}


