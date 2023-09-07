//https://opentdb.com/api.php?amount=10
const question = document.getElementById("question");
const options = document.querySelector(".quiz-options");
const correctScore = document.getElementById("correct-score");
const totalQuestion = document.getElementById("total-question");
const checkBtn = document.getElementById("check-answer");
const playAgainBtn = document.getElementById("play-again");
const result = document.getElementById("result");
let correctAnswer = "";
let correctScoreAchieved = (askedCount = 0);
let totalNoOfQuestions = 10;

document.addEventListener("DOMContentLoaded", () => {
  loadQuestion();
  correctScore.textContent = correctScoreAchieved;
  totalQuestion.textContent = totalNoOfQuestions;
});

// displaying questions and options
async function loadQuestion() {
  const APIUrl = "https://opentdb.com/api.php?amount=10";
  const response = await fetch(`${APIUrl}`);
  const data = await response.json();
  //   console.log(data.results[0])
  options.innerHTML = ``;
  showQuestion(data.results[0]);
}
function showQuestion(data) {
  correctAnswer = data.correct_answer;
  //   console.log(correctAnswer)
  let incorrectAnswer = data.incorrect_answers;
  let optionsList = incorrectAnswer;
  optionsList.splice(
    Math.floor(Math.random() * (incorrectAnswer.length + 1)),
    0,
    correctAnswer
  );
  question.innerHTML = `${data.question} <br> <span class="category">${data.category}</span>`;
  //   options.innerHTML= optionsList.map((option, index)=>{ return `<li>${index+1}. <span>${option}</span></li>`}).join('')
  for (let i = 0; i < optionsList.length; i++) {
    options.innerHTML += `<li>${i + 1}. <span>${optionsList[i]}</span></li>`;
  }
  selectOptions();
}

// selecting options
function selectOptions() {
  options.querySelectorAll("li").forEach((option) => {
    option.addEventListener("click", (e) => {
      if (options.querySelector(".selected")) {
        const activeOption = options.querySelector(".selected");
        activeOption.classList.remove("selected");
      }
      option.classList.add("selected");
    });
  });
}

// adding event listener to check button
checkBtn.addEventListener("click", () => {
  checkAnswer();
});
function checkAnswer() {
  checkBtn.disabled = true;
  if (options.querySelector(".selected")) {
    let selectedOption = options.querySelector(".selected span").textContent;
    // console.log(selectedOption)
    if (selectedOption == correctAnswer) {
      correctScoreAchieved++;
      checkBtn.disabled = false;
      result.innerHTML = `<p><i class = "fas fa-check"></i>Correct Answer!</p>`;
    } else {
      result.innerHTML = `<i class = "fas fa-times"></i>Incorrect Answer! <small><b>Correct Answer: </b>${correctAnswer}</small>`;
      checkBtn.disabled = false;
    }
    checkCount();
  } else {
    result.innerHTML = `<p><i class = "fas fa-question"></i>Please select an option!</p>`;
    checkBtn.disabled = false;
  }
}
function checkCount() {
  askedCount++;
  displayCount();
  if (askedCount === totalNoOfQuestions) {
    result.innerHTML += `<p>Your score is ${correctScoreAchieved}/10</p>`;
    playAgainBtn.style.display = "block";
    checkBtn.style.display = "none";
  } else {
    setTimeout(() => {
      loadQuestion();
    }, 300);
  }
}
function displayCount() {
  correctScore.textContent = askedCount;
}

// adding event listener to playagain btn
playAgainBtn.addEventListener("click", () => {
  result.innerHTML = ``;
  correctAnswer = "";
  correctScoreAchieved = askedCount = 0;
  loadQuestion();
  playAgainBtn.style.display = "none";
  checkBtn.style.display = "block";
});
