var start = document.querySelector('#start');
var timer = document.querySelector('#timer');
var questionArea = document.querySelector('.questions');
var answerChoices = document.querySelector('.answers');
var answerA = document.querySelector('#A');
var answerB = document.querySelector('#B');
var answerC = document.querySelector('#C');
var answerD = document.querySelector('#D');
var checker = document.querySelector('.checker');
var secondsLeft = 60;
var timeLeft = 3;
var numCorrectAnswers = 0;
var numWrongAnswers = 0;
var isQuizComplete = false;

//object containing all quiz questions and answer choices
var allQuestions = [{
    question: 'This is question one?',
    optionA: 'Answer a',
    optionB: 'Answer b',
    optionC: 'Answer c',
    optionD: 'Answer d',
    correctAnswer: 'C'
    },
    {
    question: 'This is question two?',
    optionA: 'Answer a',
    optionB: 'Answer b',
    optionC: 'Answer c',
    optionD: 'Answer d',
    correctAnswer: 'B'
    },
    {
    question: 'This is question three?',
    optionA: 'Answer a',
    optionB: 'Answer b',
    optionC: 'Answer c',
    optionD: 'Answer d',
    correctAnswer: 'A'
    },
    {
    question: 'This is question four?',
    optionA: 'Answer a',
    optionB: 'Answer b',
    optionC: 'Answer c',
    optionD: 'Answer d',
    correctAnswer: 'A'
    },
    {
    question: 'This is question five?',
    optionA: 'Answer a',
    optionB: 'Answer b',
    optionC: 'Answer c',
    optionD: 'Answer d',
    correctAnswer: 'D'
    }
];

var currentQuestionIndex = 0;
var lastQuestionIndex = allQuestions.length;

//this function runs either when the timer hits zero or the user has finished answering all questions
function quizComplete () {
    var score = (numCorrectAnswers / 5) * 100;
    timer.textContent = "Quiz Over! Final Score: "+score;
    console.log("quiz complete function is running");
    questionArea.textContent = '';

    answerA.textContent = '';
    answerB.textContent = '';
    answerC.textContent = '';
    answerD.textContent = '';
}

//countdown timer
function countdown () {
    start.remove();
    timer.textContent = "Time left: "+secondsLeft+" seconds";
    var timerInterval = setInterval(function() {
        timer.textContent = "Time left: "+secondsLeft+" seconds";
        secondsLeft --;
        if ((secondsLeft>0 && isQuizComplete) || secondsLeft === 0){
            clearInterval(timerInterval);
            quizComplete();  
        }
        }, 1000); 
}

//this function creates the current question
function loadQuestion () {
    if(currentQuestionIndex < lastQuestionIndex) {
    var currentQuestion = allQuestions[currentQuestionIndex];
    questionArea.textContent = currentQuestion.question;

    answerA.textContent = currentQuestion.optionA;
    answerB.textContent = currentQuestion.optionB;
    answerC.textContent = currentQuestion.optionC;
    answerD.textContent = currentQuestion.optionD;
    }
}

function textDisappear () {
    setInterval(function() {
        //console.log(checker);
        timeLeft --;
        //console.log(timeLeft);
    
        if(timeLeft === 0) {
            clearInterval(textDisappear);
            checker.textContent = "";
            timeLeft = 3;
        }
        }, 1000);
}

//this function starts the timer and loads the first question
function startQuiz () {
    countdown();
    loadQuestion();
}

//this function checks if the selected answer is correct or not
function checkAnswer (event) {
    event.preventDefault();
    //pulls the correct answer for the given question from the allQuestions object
    if(currentQuestionIndex < lastQuestionIndex) {
    var correctAnswer = allQuestions[currentQuestionIndex].correctAnswer;
    //finds the button the user clicked
    var buttonClicked = event.target;
    var chosenAnswer = buttonClicked.getAttribute("id");
    var correctOrWrong = document.createElement("p");

        if (chosenAnswer === correctAnswer && currentQuestionIndex < lastQuestionIndex) {
            correctOrWrong.textContent = "Correct!";
            numCorrectAnswers ++;
        }
        else if (chosenAnswer !== correctAnswer && currentQuestionIndex < lastQuestionIndex) {
            correctOrWrong.textContent = "Wrong!";
            secondsLeft = secondsLeft - 10;
            numWrongAnswers ++;
        }
    checker.appendChild(correctOrWrong);
    textDisappear();
    }

    currentQuestionIndex++;
    console.log(currentQuestionIndex);

    if (currentQuestionIndex == lastQuestionIndex) {
        isQuizComplete = true;
        console.log(isQuizComplete);
        console.log("currentQuestion Index: ",currentQuestionIndex);
        console.log("lastquestionindex: ",lastQuestionIndex);
    }
    loadQuestion(currentQuestionIndex);
}

//adding click event listener to start button and running startQuiz function once clicked
start.addEventListener("click", startQuiz);
answerChoices.addEventListener("click", checkAnswer);

/*
//winGame function is called with the win condition is met
function winGame() {

}

//loseGame function is called with the timer reaches 0
function loseGame () {

}
*/