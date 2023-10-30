//Defining global variables
var questionBlank = document.querySelector(".question-blank");
var scoreDisplay = document.querySelector(".score");
var initialDisplay = document.querySelector(".initials");
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
var timer;
var timerCount;
var questionId = 0;
var score = 0;
var isGameOver = false;
//Defining questions and answers object for the web development quiz game
var questions = [
  {
    question: "What is the most common computer language for web development?",
    Answers: [
      { ans: "Java", correct: false },
      { ans: "Python", correct: false },
      { ans: "JavaScript", correct: true },
      { ans: "C", correct: false },
    ],
  },

  {
    question: "What does HTML stand for?",
    Answers: [
      { ans: "Hyper Tank Mean Language", correct: false },
      { ans: "Human Text Markup Language", correct: false },
      { ans: "Human Text Markup Literature", correct: false },
      { ans: "HyperText Markup Language", correct: true },
    ],
  },
  {
    question: "What does CSS stand for?",
    Answers: [
      { ans: "Cascading Style Sheet", correct: true },
      { ans: "Chrome Style Sheet", correct: false },
      { ans: "Cascading System Style", correct: false },
      { ans: "Creative Style Sheet", correct: false },
    ],
  },
  {
    question: "What does DOM stand for?",
    Answers: [
      { ans: "Dynamic Object Model", correct: false },
      { ans: "Document Object Model", correct: true },
      { ans: "Dynamic Object Manual", correct: false },
      { ans: "Document Object Manual", correct: false },
    ],
  },
  {
    question: "What does API stand for?",
    Answers: [
      { ans: "Application Programming Indicator", correct: false },
      { ans: "A Program Indicator", correct: false },
      { ans: "Application Programming Interface", correct: true },
      { ans: "Application Programming Indicator", correct: false },
    ],
  },
];
// Defining function to start game
function startGame() {
  timerCount = 20;
  startButton.disabled = true;
  displayQuestions(questionId);
  startTimer();
}
// Defining timer function
function startTimer() {
  timer = setInterval(function () {
    timerCount--;
    timerElement.textContent = timerCount;
    if (timerCount > 0 && isGameOver) {
      clearInterval(timer);
      endGame();
    }
    if (timerCount <= 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);
}
// Defining function to display questions and answers based on id and creating/appending order for answers.  Creating a click event to call the "checkAnswers" function to check for correct answer
function displayQuestions(id) {
  questionBlank.innerHTML = questions[id].question;
  var answerOptions = document.createElement("ol");

  questionBlank.append(answerOptions);

  for (let i = 0; i < questions[id].Answers.length; i++) {
    //Looping through the answer list in an array and display them via list items
    var listItem = document.createElement("li");
    listItem.setAttribute("id", "answer" + i);
    listItem.setAttribute("onclick", `checkAnswers(${id},${i})`);
    listItem.append(questions[id].Answers[i].ans);
    answerOptions.append(listItem);
  }
}
// defining function for next questions and answers and check to find out whether this is the last question
function nextQuestion(id) {
  if (questions.length > id) {
    displayQuestions(id);
  } else {
    isGameOver = true;
  }
}
// Defining function to check whether the answer is correct or not and increment score if answer is correct.  If answer incorrectly, 2 seconds are taken off the clock.
function checkAnswers(questionId, answerId) {
  if (questions[questionId].Answers[answerId].correct === true) {
    score += 1;
    document.querySelector(".score").innerHTML = score;
  } else {
    if (timerCount < 2) {
      timerCount = 0;
    } else {
      timerCount -= 2;
    }
  }
  nextQuestion(questionId + 1);
}
//defining function to endgame -- capturing the final score and player initials
function endGame() {
  var playerInitsField = document.createElement("input");
  playerInitsField.setAttribute("id", "getInitials");
  questionBlank.innerHTML = "Please enter your initials";
  var initialButton = document.createElement("button");
  initialButton.setAttribute("onclick", "saveScore()");
  initialButton.append("submit");
  questionBlank.append(playerInitsField);
  questionBlank.append(initialButton);
}
// defining function to store scores and player initials in local storage
function saveScore() {
  var playerInits = document.querySelector("#getInitials").value;
  initialDisplay.innerHTML = playerInits;
  var scoreBoard = JSON.parse(localStorage.getItem("saveScore"));

  if (scoreBoard === null) {
    localStorage.setItem(
      "saveScore",
      JSON.stringify({ score: [], playerInits: [] })
    );
    scoreBoard = JSON.parse(localStorage.getItem("saveScore"));
  }
  scoreBoard.score.push(score);
  scoreBoard.playerInits.push(playerInits);
  localStorage.setItem("saveScore", JSON.stringify(scoreBoard));
}

startButton.addEventListener("click", startGame);
