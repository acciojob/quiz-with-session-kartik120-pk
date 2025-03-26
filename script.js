// Retrieve elements
const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars", "Saturn"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Load progress from session storage
function loadProgress() {
  const storedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};
  return storedProgress;
}

function saveProgress(questionIndex, answer) {
  let progress = loadProgress();
  progress[questionIndex] = answer;
  sessionStorage.setItem("progress", JSON.stringify(progress));
}

// Display the quiz questions and choices
function renderQuestions() {
  questionsElement.innerHTML = "";
  const userAnswers = loadProgress();

  questions.forEach((question, i) => {
    const questionElement = document.createElement("div");
    questionElement.innerHTML = `<p>${question.question}</p>`;
    
    question.choices.forEach((choice) => {
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);
      choiceElement.addEventListener("change", () => saveProgress(i, choice));
      
      if (userAnswers[i] === choice) {
        choiceElement.checked = true;
      }
      
      const label = document.createElement("label");
      label.appendChild(choiceElement);
      label.appendChild(document.createTextNode(choice));
      questionElement.appendChild(label);
    });
    
    questionsElement.appendChild(questionElement);
  });
}

function calculateScore() {
  const userAnswers = loadProgress();
  let score = 0;
  
  questions.forEach((question, i) => {
    if (userAnswers[i] === question.answer) {
      score++;
    }
  });
  
  localStorage.setItem("score", score);
  return score;
}

submitButton.addEventListener("click", () => {
  const finalScore = calculateScore();
  scoreElement.innerText = `Your score is ${finalScore} out of 5.`;
});

// Load previous score if available
const storedScore = localStorage.getItem("score");
if (storedScore !== null) {
  scoreElement.innerText = `Your last score was ${storedScore} out of 5.`;
}

renderQuestions();
