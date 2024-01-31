import "./style.css";
import { Questions } from "./questions";

console.log(Questions);

const app = document.querySelector("#app");

const startButton = document.querySelector("#start");
startButton.addEventListener("click", startQuiz);

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
    const answersDiv = createAnswers(question.answers);
    app.appendChild(answersDiv);

    const submitButton = getSubmitButton();
    app.appendChild(submitButton);
  }

  function createAnswers(answers) {
    const answersDiv = document.createElement("div");
    answersDiv.classList.add("answers");

    for (const answer of answers) {
      const label = getAnswerElement(answer);
      answersDiv.appendChild(label);
    }
    return answersDiv;
  }
}

function getTitleElement(text) {
  const title = document.createElement("h3");
  title.innerText = text;
  return title;
}

function getAnswerElement(text) {
  const label = document.createElement("label");
  label.innerText = text;
  const input = document.createElement("input");
  const id = text.replaceAll(" ", "-").toLowerCase();
  input.id = id;
  label.htmlFor = id;
  input.setAttribute("type", "radio");
  input.setAttribute("name", "answer");
  input.setAttribute("value", text);
  label.appendChild(input);

  return label;
}

function getSubmitButton() {
  const submitButton = document.createElement("button");
  submitButton.innerText = "Submit";
  return submitButton;
}
