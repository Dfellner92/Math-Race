"usestrict";

const elem = document.querySelector(".barStatus");
const questionClass = document.querySelector(".question");
const answerClass = document.querySelector(".answer");
const time = 200;
let score = 0;
let width = 0;
let operator = ["+", "-"];
let num1 = 0;
let num2 = 0;
let opRandom = 0;
let opExpression = "";
let numericalExp = "";
let sum = 0;
let answer = 0;
let possibleAnswers = [];
let possibleAnswerLooper = 0;
let postedAnswer = 0;

const selectorAdd = () => {
  score++;
  document.querySelector("#current-score").textContent = score;
  initiate();
};

const enderAdd = () => {
  //alert("GAME OVER");
  document.querySelector(".main").classList.add("game-over");
  document.querySelector(".ended").classList.remove("game-over");
  document.querySelector("#current-score-end").textContent = score;
};

const move = () => {
  width = 0;
  setInterval(() => {
    if (width >= 100) {
      enderAdd();
    } else {
      width++;
      elem.style.width = width + "%";
    }
  }, time);
};

const setTruths = () => {
  document.querySelector("#wrong").removeEventListener("click", selectorAdd);
  document.querySelector("#right").removeEventListener("click", enderAdd);
  document.querySelector("#right").addEventListener("click", selectorAdd);
  document.querySelector("#wrong").addEventListener("click", enderAdd);
};

const setFalses = () => {
  document.querySelector("#right").removeEventListener("click", selectorAdd);
  document.querySelector("#wrong").removeEventListener("click", enderAdd);
  document.querySelector("#wrong").addEventListener("click", selectorAdd);
  document.querySelector("#right").addEventListener("click", enderAdd);
};

const iteration = () => {
  num1 = Math.trunc(Math.random() * 20) + 1;
  num2 = Math.trunc(Math.random() * 20) + 1;
  opRandom = Math.trunc(Math.random() * 2);
  opExpression = operator[opRandom];
  numericalExp = `${num1} ${opExpression} ${num2}`;
  sum = num1 + num2;
  answer = opExpression === "+" ? sum : `${num1}` - `${num2}`;
  possibleAnswers = [
    answer - 2,
    answer - 1,
    answer,
    answer,
    answer,
    answer + 1,
    answer + 2,
  ];
  possibleAnswerLooper = Math.trunc(Math.random() * 7);
  postedAnswer = possibleAnswers[possibleAnswerLooper];

  questionClass.textContent = numericalExp;
  answerClass.textContent = postedAnswer;
  let correctSelector = true;
  if (postedAnswer === answer) {
    correctSelector = true;
  } else {
    correctSelector = false;
  }
  console.log(correctSelector);
  console.log(score);

  if (correctSelector === true) {
    setTruths();
  } else if (correctSelector === false) {
    setFalses();
  }
};

// click handler for play again

document.querySelector("#play-again").addEventListener("click", function () {
  document.querySelector(".main").classList.remove("game-over");
  document.querySelector(".ended").classList.add("game-over");
  score = 0;
  initiate();
});

// if score changes, above logic rerenders
const initiate = () => {
  move();
  iteration();
};

initiate();
