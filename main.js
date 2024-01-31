import './style.css';
import { Questions } from "./questions";

console.log(Questions);

const app = document.querySelector("#app");

const startButton = document.querySelector("#start");
startButton.addEventListener("click", startQuiz)

function startQuiz(event) {
  event.stopPropagation();
  let currentQuestion = 0;
  let score = 0;

  clean();
  displayQuestion(currentQuestion);

  function clean() {
  while (app.firstElementChild) {
    app.firstElementChild.remove();
  }
  }

  function displayQuestion(index) {
    const question = Questions[index];

    if (!question) {
      // Finish quiz
    }

    const title = getTitleElement(question.question);
    app.appendChild(title);
  }

  function createAnswers(answers) {
    const answersDiv = document.createElement("div");
    answersDiv.classList.add("answers");
  }
}

function getTitleElement(text) {
  const title = document.createElement("h3");
  title.innerText = text;
  return title;
}

