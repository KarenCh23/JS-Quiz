import "./style.css";
import { Questions } from "./questions";

const app = document.querySelector("#app");

const startButton = document.querySelector("#start");
startButton.addEventListener("click", startQuiz);

function startQuiz(event) {
  event.stopPropagation();
  let currentQuestion = 0;
  let score = 0;

  displayQuestion(currentQuestion);

  function clean() {
    while (app.firstElementChild) {
      app.firstElementChild.remove();
    }
  }

  function displayQuestion(index) {
    clean();
    const question = Questions[index];

    if (!question) {
      // Finish quiz
      displayFinishMessage();
      return;
    }

    const title = getTitleElement(question.question);
    app.appendChild(title);
    const answersDiv = createAnswers(question.answers);
    app.appendChild(answersDiv);

    const submitButton = getSubmitButton();
    submitButton.addEventListener("click", submit);
    app.appendChild(submitButton);
  }

  //  Show Quiz ending Message
  function displayFinishMessage() {
    const h1 = document.createElement("h1");
    const p = document.createElement("p");

    h1.innerText = "Bravo, tu as terminé le quiz !";
    p.innerText = `Tu as eu ${score} sur ${Questions.length} point`;
    app.appendChild(h1);
    app.appendChild(p);
  }

  // Handle submit for answers
  function submit() {
    const selectedAnswer = app.querySelector('input[name="answer"]:checked');
    const value = selectedAnswer.value;
    const question = Questions[currentQuestion];
    const isCorrect = question.correct === value;

    if (isCorrect) {
      score++;
    }
    showFeedBack(isCorrect, question.correct, value);
    const feedback = feedBackMessage(isCorrect, question.correct);
    app.appendChild(feedback);

    // Show the next question
    setTimeout(() => {
      currentQuestion++;
      displayQuestion(currentQuestion);
    }, 4000);
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

// Score Handler
function showFeedBack(isCorrect, correct, answer) {
  const correctAnswerId = formatId(correct);
  const correctElement = document.querySelector(
    `label[for="${correctAnswerId}"]`
  );

  const selectedAnswerId = formatId(answer);
  const selectedElement = document.querySelector(
    `label[for="${selectedAnswerId}"]`
  );

  correctElement.classList.add("correct");
  selectedElement.classList.add(isCorrect ? "correct" : "incorrect");
}

// Success Message after submit
function feedBackMessage(isCorrect, correct) {
  const paragraph = document.createElement("p");
  paragraph.innerText = isCorrect
    ? "Bravo ! Tu as la bonne réponse"
    : `Désolé...mais la bonne réponse était ${correct}`;

  return paragraph;
}
