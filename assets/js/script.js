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

//countdown timer
function countdown () {
    start.remove();
    timer.textContent = "Time left: "+secondsLeft+" seconds";
    var timerInterval = setInterval(function() {
        timer.textContent = "Time left: "+secondsLeft+" seconds";
        secondsLeft --;
    
        if(secondsLeft === 0) {
            clearInterval(timerInterval);
            timer.textContent = "Quiz Over!";
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

//this function starts the timer and loads the first question
function startQuiz () {
    countdown();
    loadQuestion();
}

function checkAnswer (event) {
    event.preventDefault();
    var correctAnswer = allQuestions[currentQuestionIndex].correctAnswer;
    //console.log("This is the correct answer: ",correctAnswer);
    var buttonClicked = event.target;
    var chosenAnswer = buttonClicked.getAttribute("id");
    //console.log(chosenAnswer);

    if (chosenAnswer === correctAnswer && currentQuestionIndex < lastQuestionIndex) {
        var correct = document.createElement("p");
        correct.textContent = "";
        checker.appendChild(correct);

        var timeLeft = 3;
        var fadeOut = setInterval(function() {
            //console.log(checker);
            checker.textContent = "Correct!";
            timeLeft --;
            //console.log(timeLeft);
        
            if(timeLeft === 0) {
                clearInterval(fadeOut);
                checker.textContent = "";
            }
            }, 1000);
    }
    else {
        var wrong = document.createElement("p");
        wrong.textContent = "Wrong!";
        checker.appendChild(wrong);
        secondsLeft = secondsLeft - 10;
    }
    if(currentQuestionIndex < lastQuestionIndex) {
        currentQuestionIndex++;
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