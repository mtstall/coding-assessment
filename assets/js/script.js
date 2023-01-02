var start = document.querySelector("#start");
var timer = document.querySelector("#timer");
var questionArea = document.querySelector(".questions");
var answerChoices = document.querySelector(".answers");
var checker = document.querySelector(".checker");
var secondsLeft = 60;
var timeLeft = 1;
var numCorrectAnswers = 0;
var numWrongAnswers = 0;
var isQuizComplete = false;
var enterInitials = document.querySelector(".enterInitials");

//object containing all quiz questions and answer choices
var allQuestions = [
  {
    question:
      "#1. Commonly used data types do NOT include which of the following:",
    optionA: "strings",
    optionB: "booleans",
    optionC: "alerts",
    optionD: "numbers",
    correctAnswer: "C",
  },
  {
    question: "#2. Arrays in JavaScript can be used to store __________.",
    optionA: "numbers and strings",
    optionB: "other arrays",
    optionC: "booleans",
    optionD: "all of the above",
    correctAnswer: "D",
  },
  {
    question:
      "#3. String values must be enclosed within __________ when being assigned to variables.",
    optionA: "commas",
    optionB: "curly brackets",
    optionC: "quotes",
    optionD: "parenthesis",
    correctAnswer: "C",
  },
  {
    question:
      "#4. A very useful tool used during development and debugging for printing content to the debugger is:",
    optionA: "JavaScript",
    optionB: "terminal/bash",
    optionC: "for loops",
    optionD: "console.log",
    correctAnswer: "D",
  },
  {
    question:
      "The condition in an if / else statement is enclose with _________.",
    optionA: "quotes",
    optionB: "curly brackets",
    optionC: "parenthesis",
    optionD: "square brackets",
    correctAnswer: "C",
  },
];

var currentQuestionIndex = 0;
var lastQuestionIndex = allQuestions.length;

//this function saves the users initials and final score to local storage
function saveInitials(event) {
  event.preventDefault();
  var score = (numCorrectAnswers / 5) * 100;

  var quizResults = {
    initials: document.getElementById("input-msg").value,
    score: score,
  };

  localStorage.setItem("quizResults", JSON.stringify(quizResults));

  var lastScore = JSON.parse(localStorage.getItem("quizResults"));

  if (lastScore !== null) {
    document.querySelector(".message").textContent =
      "Initials: " + lastScore.initials + " - Score: " + lastScore.score;
  }
}

//this function runs either when the timer hits zero or the user has finished answering all questions
function quizComplete() {
  questionArea.textContent = "";

  var answers = document.querySelectorAll("button");
  for (var i = 0; i < answers.length; i++) {
    answers[i].remove();
  }

  var score = (numCorrectAnswers / 5) * 100;
  timer.textContent = "Quiz Over! Final Score: " + score;

  //creating spot for user to input initials
  var initialsInput = document.createElement("textarea");
  initialsInput.setAttribute("id", "input-msg");
  enterInitials.appendChild(initialsInput);

  //creating spot for user to save initials and score
  var initialsButton = document.createElement("button");
  initialsButton.setAttribute("id", "initials");
  initialsButton.textContent = "Add initials";
  enterInitials.appendChild(initialsButton);

  //adding event listener to click button to save users initials
  initialsButton.addEventListener("click", saveInitials);
}

//countdown timer after user clicks Start Quiz
function countdown() {
  start.remove();
  timer.textContent = "Time left: " + secondsLeft + " seconds";
  var timerInterval = setInterval(function () {
    timer.textContent = "Time left: " + secondsLeft + " seconds";
    secondsLeft--;
    if ((secondsLeft > 0 && isQuizComplete) || secondsLeft <= 0) {
      clearInterval(timerInterval);
      quizComplete();
    }
  }, 1000);
}

//this function creates the current question
function loadQuestion() {

    //if this is the first question being loaded, create the button elements for user to pick from
  if (currentQuestionIndex === 0) {
    var answerA = document.createElement("button");
    answerA.setAttribute("id", "A");
    answerChoices.appendChild(answerA);

    var answerB = document.createElement("button");
    answerB.setAttribute("id", "B");
    answerChoices.appendChild(answerB);

    var answerC = document.createElement("button");
    answerC.setAttribute("id", "C");
    answerChoices.appendChild(answerC);

    var answerD = document.createElement("button");
    answerD.setAttribute("id", "D");
    answerChoices.appendChild(answerD);
  }
  //create variables for the answer chocies to reference in next if statement
  answerA = document.querySelector("#A");
  answerB = document.querySelector("#B");
  answerC = document.querySelector("#C");
  answerD = document.querySelector("#D");

    //setting text of current question and answers  
  if (currentQuestionIndex < lastQuestionIndex) {
    var currentQuestion = allQuestions[currentQuestionIndex];
    questionArea.textContent = currentQuestion.question;

    answerA.textContent = currentQuestion.optionA;
    answerB.textContent = currentQuestion.optionB;
    answerC.textContent = currentQuestion.optionC;
    answerD.textContent = currentQuestion.optionD;
  }
}

//function that makes the Correct or Wrong text go away after one second
function textDisappear() {
  var textDisappear = setInterval(function () {
    timeLeft--;

    if (timeLeft === 0) {
      clearInterval(textDisappear);
      checker.textContent = "";
      timeLeft = 1;
    }
  }, 1000);
}

//this function starts the timer and loads the first question
function startQuiz() {
  countdown();
  loadQuestion();
}

//this function checks if the selected answer is correct or not
function checkAnswer(event) {
  event.preventDefault();
  //pulls the correct answer for the given question from the allQuestions object
  if (currentQuestionIndex < lastQuestionIndex) {
    var correctAnswer = allQuestions[currentQuestionIndex].correctAnswer;
    //finds the button the user clicked
    var buttonClicked = event.target;
    var chosenAnswer = buttonClicked.getAttribute("id");
    var correctOrWrong = document.createElement("p");

    //determines if user will get a Correct or Wrong message based on answer choice
    if (
      chosenAnswer === correctAnswer &&
      currentQuestionIndex < lastQuestionIndex
    ) {
      correctOrWrong.textContent = "Correct!";
      numCorrectAnswers++;
    } else if (
      chosenAnswer !== correctAnswer &&
      currentQuestionIndex < lastQuestionIndex
    ) {
      correctOrWrong.textContent = "Wrong!";
      secondsLeft = secondsLeft - 10;
      numWrongAnswers++;
    }
    checker.appendChild(correctOrWrong);
    //run text disappear function so text doesn't stay on the page forever
    textDisappear();
  }

  currentQuestionIndex++;

  if (currentQuestionIndex == lastQuestionIndex) {
    isQuizComplete = true;
  }
  loadQuestion(currentQuestionIndex);
}

//adding click event listener to start button and running startQuiz function once clicked
start.addEventListener("click", startQuiz);
//adding click event listener to answerChoices variable to check user answer
answerChoices.addEventListener("click", checkAnswer);
