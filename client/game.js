 var doAnswer = function(ans){
        answer(ans);
        if(state.selectedQuestions.length == 0){
            displayScore()
            resetSession()
        }else{
            nextQuestion();
            displayQuestion();
        }
    }

    var displayScore = function(){
       document.getElementById("score").innerHTML  = 'Score :' + state.score;
       document.getElementById("questions").visibility = 'hidden';
    }

    var displayQuestion = function(){
        document.getElementById("question").innerHTML  = state.currentQuestion.question;
        document.getElementById("score").innerHTML  = '';
    }

    var newSession = function(n){
        startNewSession(n);
        displayQuestion();
    }
