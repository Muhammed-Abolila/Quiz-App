import { Quiz } from "./quiz.js"
export class Settings {
    constructor() {
        this.categoryElmnt = document.getElementById("category");
        this.difficultyElmnt = document.getElementsByName("difficulty");
        this.amountElmnt = document.getElementById("number");
        this.numberAlert = document.getElementById("numberAlert");
        this.startBtn = document.getElementById("startBtn");
        this.settingSection = document.getElementById("setting");
        this.quizSection = document.getElementById("quiz");
        this.startBtn.addEventListener("click", this.getData.bind(this));
    };
    getData() {
        let categoryValue = this.categoryElmnt.value;
        if (this.amountElmnt.value > 50) {
            this.numberAlert.innerHTML = "Value must be less than or equal to 50";
            this.numberAlert.style.cssText = "visibility: visible !important;";
        } else {
            let amountValue = this.amountElmnt.value;
            let difficultyValue = [...this.difficultyElmnt].filter(ele => ele.checked);
            this.fetchApi(categoryValue, amountValue, difficultyValue)
        }
    };
    async fetchApi(categoryValue, amountValue, difficultyValue) {
        let response = await fetch(`https://opentdb.com/api.php?amount=${amountValue}&category=${categoryValue}&difficulty=${ difficultyValue[0].value}`);
        let data = await response.json()
        let dataValue = data.results
        this.startQuiz(dataValue, amountValue)
    };
    startQuiz(dataValue, amountValue) {
        if (dataValue.length > 0) {
            this.settingSection.style.cssText = "display:none !important";
            this.quizSection.style.cssText = "display:flex !important";
            new Quiz(dataValue, amountValue)
        } else {
            this.numberAlert.innerHTML = "Please Enter Number of Questions";
            this.numberAlert.style.cssText = "visibility: visible !important;";
        }
    }

}