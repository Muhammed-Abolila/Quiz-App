export class Quiz {
    constructor(dataValue, amountValue) {
        this.datavalue = dataValue;
        this.amountValue = amountValue;
        this.currentQuestionEle = document.getElementById("currentQuestion");
        this.amountOfQuestionsEle = document.getElementById("amountOfQuestions");
        this.question = document.getElementById("question");
        this.answersEle = document.getElementById("answers");
        this.submitBtn = document.getElementById("submitBtn");
        this.quizSection = document.getElementById("quiz");
        this.finishSection = document.getElementById("finish");
        this.answerValue = document.getElementsByName("answer");
        this.correctOrIncorrectAlert = document.getElementById("correctOrIncorrectAlert");
        this.scoreElmnt = document.getElementById("scoreElmnt");
        this.alertAnswer = document.getElementById("alertAnswer");
        this.tryAgain = document.getElementById("tryAgain")
        this.submitBtn.addEventListener("click", this.nextQuestion.bind(this));
        this.numberOfQuestion = 0;
        this.score = 0;
        this.showQuestions();
    }
    nextQuestion() {
        let checkedAnswerArray = [...this.answerValue].filter(ele => ele.checked);
        if (checkedAnswerArray.length === 0) {
            this.fade(this.alertAnswer, 0, 4000, "opacity-error-animation")
        } else {
            let correctAnswer = this.datavalue[this.numberOfQuestion].correct_answer;
            let checkAnswer = checkedAnswerArray[0].value;
            if (checkAnswer === correctAnswer) {
                this.correctOrIncorrectAlert.innerHTML = "correct";
                this.correctOrIncorrectAlert.style.backgroundColor = "green";
                this.fade(this.correctOrIncorrectAlert, 0, 500, "opacity-animation")
                this.score++
            } else {
                this.correctOrIncorrectAlert.innerHTML = "incorrect";
                this.correctOrIncorrectAlert.style.backgroundColor = "red";
                this.fade(this.correctOrIncorrectAlert, 0, 500, "opacity-animation")
            }
            this.numberOfQuestion++;
            (this.numberOfQuestion < this.amountValue) ? this.showQuestions(): this.finish();
        }
    }
    showQuestions() {
        this.currentQuestionEle.innerHTML = this.numberOfQuestion + 1;
        this.amountOfQuestionsEle.innerHTML = this.amountValue;
        this.question.innerHTML = `Q${this.numberOfQuestion+1}:- ${this.datavalue[this.numberOfQuestion].question}`;
        this.getAnswers(this.datavalue[this.numberOfQuestion])
    }
    getAnswers(answersArray) {
        let answers = [
            answersArray.correct_answer,
            ...answersArray.incorrect_answers
        ];
        let ranAnswers = [];
        let i = answers.length;
        let j = 0;
        while (i--) {
            j = Math.floor(Math.random() * (i + 1));
            ranAnswers.push(answers[j]);
            answers.splice(j, 1);
        }
        this.showAnswers(ranAnswers)
    }
    showAnswers(answers) {
        let temp = ``;
        for (let i = 0; i < answers.length; i++) {
            temp += `<input type="radio" name="answer" value="${answers[i]}">
            <span>${answers[i]}</span><br>`
        }
        this.answersEle.innerHTML = temp;
    }
    finish() {
        setTimeout(() => {
            this.quizSection.style.cssText = "display:none !important";
            this.finishSection.style.cssText = "display:flex !important";
        }, 500)
        this.scoreElmnt.innerHTML = this.score;
        this.tryAgain.addEventListener("click", function() {
            location.reload();
        })
    }
    fade(id, timeToShow, timeToHide, Class) {
        setTimeout(() => {
            id.classList.add(Class);
            setTimeout(() => {
                id.classList.remove(Class);
            }, timeToHide)
        }, timeToShow)
    }
}