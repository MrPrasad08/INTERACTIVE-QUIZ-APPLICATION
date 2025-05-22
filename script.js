const questions = [
  {
    question: "What does HTML and CSS stand for?",
    answers: [
      { text: "Home Tool MarkUp Language and Colorful Style Sheet", correct: false },
      { text: "Hyper Links and Text MarkUp Language and Computer Style Sheet", correct: false },
      { text: "Hyper Text MarkUp Language and Cascading Style Sheet", correct: true },
      { text: "Hover Tool Making Language", correct: false },
    ]
  },
  {
    question: "What is the syntax used to underline a word or sentence in HTML?",
    answers: [
      { text: "<underline></underline>", correct: false },
      { text: "<U></U>", correct: true },
      { text: "<ul></ul>", correct: false },
      { text: "<UnderLine></UnderLine>", correct: false },
    ]
  },
  {
    question: "What do <h1> to <h6> tags represent?",
    answers: [
      { text: "Heading Tags", correct: true },
      { text: "Header Tags", correct: false },
      { text: "Head Table", correct: false },
      { text: "Hyper Tags", correct: false },
    ]
  },
  {
    question: "What is the Capital of India?",
    answers: [
      { text: "Mumbai", correct: false },
      { text: "New Delhi", correct: true },
      { text: "Gujarat", correct: false },
      { text: "Maharashtra", correct: false },
    ]
  },
  {
    question: "The '.' (dot) symbol defines which in HTML/CSS?",
    answers: [
      { text: "Dot", correct: false },
      { text: "Class", correct: true },
      { text: "ID", correct: false },
      { text: "End", correct: false },
    ]
  }
];

const questionContainer = document.getElementById("question-box");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("ans-buttons");
const nextButton = document.getElementById("next-btn");
const scoreContainer = document.getElementById("score-container");
const scoreElement = document.getElementById("score");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerText = "Next";
  scoreContainer.classList.add("secret");
  questionContainer.classList.remove("secret");
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;
  currentQuestion.answers.forEach(answer=> {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) button.dataset.correct = true;
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.classList.add("secret");
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(a) {
  const selectedButton = a.target;
  const correct = selectedButton.dataset.correct === "true";
  if (correct) {
    selectedButton.classList.add("correct");
    score++;
  } else {
    selectedButton.classList.add("wrong");
  }

  Array.from(answerButtons.children).forEach(button => {
    button.disabled = true;
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
  });

  nextButton.classList.remove("secret");
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  questionContainer.classList.add("secret");
  scoreContainer.classList.remove("secret");
  scoreElement.innerText = `${score} / ${questions.length}`;
}

startQuiz();