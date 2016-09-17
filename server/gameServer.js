module.exports = {
  loadQuestions: function () {
    var config = require('./questions.json');
    console.log(config[0].qId + ' ' + config[1].qId);
  },
  submitAnswer: function () {
    console.log('answer submitted');
  },
  getScore: function () {
    return score;
  }
};

var currentQuestion;

var score =0;

var zemba = function () {
}