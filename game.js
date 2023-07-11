const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [{
        question: "Who was the first Estonian footballer to score an English Premier League goal?",
        choice1: "Igors Stepanovs",
        choice2: "Ragnar Klavan",
        choice3: "Tomas Danilevicius",
        choice4: "Marian Pahars",
        answer: 2
    },
    {
        question: "Who became the first Kazakh tennis player to win a Grand Slam in tennis?",
        choice1: "Alexander Bublik",
        choice2: "Mikhail Kukushkin",
        choice3: "Yulia Putintseva",
        choice4: "Elena Rybakina",
        answer: 4
    },
    {
        question: "Who won the World Snooker Championship in 1997?",
        choice1: "Ronnie O'Sullivan",
        choice2: "John Higgins",
        choice3: "Ken Doherty",
        choice4: "Stephen Hendry",
        answer: 3
    },

];

//Constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        return window.location.assign("end.html")
    }

    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;

};

choices.forEach(choice => (
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
));

startGame();