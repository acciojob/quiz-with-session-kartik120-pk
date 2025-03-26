// Get references to HTML elements
const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Questions array
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
  return JSON.parse(sessionStorage.getItem("progress")) || {};
}

// Save progress to session storage
function saveProgress(questionIndex, selectedValue) {
  const progress = loadProgress();
  progress[questionIndex] = selectedValue;
  sessionStorage.setItem("progress", JSON.stringify(progress));
}

// Load final score from local storage
function loadScore() {
  const savedScore = localStorage.getItem("score");
  if (savedScore !== null) {
    scoreElement.textContent = `Your score is ${savedScore} out of 5.`;
  }
}

// Render quiz questions
function renderQuestions() {
  const savedProgress = loadProgress();
  questionsElement.innerHTML = ""; // Clear previous content

  questions.forEach((question, index) => {
    const questionElement = document.createElement("div");
    questionElement.innerHTML = `<p>${question.question}</p>`;

    question.choices.forEach((choice) => {
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${index}`);
      choiceElement.setAttribute("value", choice);
      
      // Retain the selected choice after page reload
      if (savedProgress[index] === choice) {
        choiceElement.checked = true;
      }

      // Save user selection when changed
      choiceElement.addEventListener("change", () => {
        saveProgress(index, choice);
      });

      const label = document.createElement("label");
      label.appendChild(choiceElement);
      label.appendChild(document.createTextNode(choice));
      
      questionElement.appendChild(label);
    });

    questionsElement.appendChild(questionElement);
  });
}

// Calculate score and store in local storage
function calculateScore() {
  const savedProgress = loadProgress();
  let score = 0;

  questions.forEach((question, index) => {
    if (savedProgress[index] === question.answer) {
      score++;
    }
  });

  localStorage.setItem("score", score);
  scoreElement.textContent = `Your score is ${score} out of 5.`;
}

// Event listener for submit button
submitButton.addEventListener("click", calculateScore);

// Initialize the quiz
renderQuestions();
loadScore();
