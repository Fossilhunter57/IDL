const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

let questions = [
    {
        question : "Sample question one",
        imgSrc : "img/html.png",
        choiceA : "A) ",
        choiceB : "B)",
        choiceC : "C)",
        choiceD : "D)",
        correct : "A"

    },{
        question : "Sample question two",
        imgSrc : "img/css.png",
        choiceA : "A)",
        choiceB : "B)",
        choiceC : "C)",
        choiceD : "D)",
        correct : "B"
    },{
        question : "Sample question three",
        imgSrc : "img/css.png",
        choiceA : "A)",
        choiceB : "B)",
        choiceC : "C)",
        choiceD : "D)",
        correct : "C"
      },{
        question : "Sample question four",
        imgSrc : "img/css.png",
        choiceA : "A)",
        choiceB : "B)",
        choiceC : "C)",
        choiceD : "D)",
        correct : "D"
      },{
        question : "Sample question five",
        imgSrc : "img/css.png",
        choiceA : "A)",
        choiceB : "B)",
        choiceC : "C)",
        choiceD : "D)",
        correct : "A"
      },{
        question:  "Sample question six",
        imgSrc : "img/css.png",
        choiceA : "A)",
        choiceB : "B)",
        choiceC : "C)",
        choiceD : "D)",
        correct : "B"
      },{
        question:  "Sample question seven",
        imgSrc : "img/css.png",
        choiceA : "A)",
        choiceB : "B)",
        choiceC : "C)",
        choiceD : "D)",
        correct : "C"
      },{
        question:  "Sample question eight",
        imgSrc : "img/css.png",
        choiceA : "A)",
        choiceB : "B)",
        choiceC : "C)",
        choiceD : "D)",
        correct : "D"
      },{
        question:  "Sample question nine",
        imgSrc : "img/css.png",
        choiceA : "A)",
        choiceB : "B)",
        choiceC : "C)",
        choiceD : "D)",
        correct : "A"
      },{
        question:  "Sample question ten",
        imgSrc : "img/css.png",
        choiceA : "A)",
        choiceB : "B)",
        choiceC : "C)",
        choiceD : "D)",
        correct : "C"
    }
];


const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 300; // 5min
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

function renderQuestion(){
    let q = questions[runningQuestion];

    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        score++;
        answerIsCorrect();
    }else{
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        clearInterval(TIMER);
        scoreRender();
    }
}

function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

function scoreRender(){
    scoreDiv.style.display = "block";

    const scorePerCent = Math.round(100 * score/questions.length);

    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";

    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}