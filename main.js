import './style.css';
import { Questions } from "./questions";

console.log(Questions);

const app = document.querySelector("#app");

const startButton = document.querySelector("#start");

let i = 0;

startButton.addEventListener("click", () => {
 const question = document.querySelector("#question") ?? document.createElement("p")
 question.id = "question";
 question.innerText = Questions[i].question;
 app.insertBefore(question, startButton);

 i++;
 if(i > Questions.length - 1) {
  i = 0;
 }
});