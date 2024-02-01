import "./style.css";
import { Questions } from "./questions";

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
    submitButton.addEventListener("click", submit);
    app.appendChild(submitButton);
  }

  function submit() {
    // Handle submit for answers
    const selectedAnswer = app.querySelector('input[name="answer"]:checked');
    const value = selectedAnswer.value;
    const question = Questions[currentQuestion];
    const isCorrect = question.correct === value;

    if (isCorrect) {
      score++;
    }
    showFeedBack(isCorrect, question.correct, value);
    // test for getting answer value
    // alert(`Submit ${isCorrect ? "Correct" : "Incorrect"}`);
  }

  // Score Handler 
  function showFeedBack(isCorrect, correct, answer) {
    const correctAnswerId = formatId(correct)
    const correctElement = document.querySelector(`label[for="${correctAnswerId}"]`)

    const selectedAnswerId = formatId(answer)
    const selectedElement = document.querySelector(`label[for="${selectedAnswerId}"]`)

    if (isCorrect) {
      selectedElement.classList.add("correct");
    } else {
      selectedElement.classList.add("incorrect");
      correctElement.classList.add("correct");
    }



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

// Id format Handler
function formatId(text) {
  return text.replaceAll(" ", "-").toLowerCase();
}

function getAnswerElement(text) {
  const label = document.createElement("label");
  label.innerText = text;
  const input = document.createElement("input");
  const id = formatId(text);
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
