function gameStart() {
    let userName = document.getElementById("userName").value.trim()

    let namePageBG = document.getElementsByClassName("nameInserterBG")
    let namePage = document.getElementsByClassName("nameInserter")
    


    if(userName == "") {
        alert("Пустое или некорректное имя!")
    }
    else {
        namePage[0].remove()
        namePageBG[0].remove()
        
        let request = new XMLHttpRequest()
        request.open("GET", "../files/quiestions.json")
        request.responseType = "json"
        request.send()
        request.onload = function() {
            let questions = request.response
            setText(questions)
        }
    }
}
function nameRequest() {
    let div = document.createElement("div")
    div.className = "nameInserterBG"

    let form = document.createElement("div")
    form.className = "nameInserter"

    let text = document.createElement("h1")
    text.textContent = "Введите ваше имя!"
    form.append(text)

    let nameInput = document.createElement("input")
    nameInput.id = "userName"
    form.append(nameInput)

    let startButton = document.createElement("button")
    startButton.textContent = "Продолжить"
    startButton.onclick = gameStart
    form.append(startButton)

    document.body.append(div)
    document.body.append(form)
}
function setText(questionsOBJ) {
    if(currentQuestion < Object.keys(questionsOBJ).length) {
        let currentQuestionString = "q".concat(currentQuestion+1)
        let q = questionsOBJ[currentQuestionString]
        let quizHTML = document.createElement("div")
        quizHTML.className = "quiz"

        let questionHTML = document.createElement("div")
        questionHTML.className = "question"
        questionHTML.textContent = q["question"]

        let answersHTML = document.createElement("div")
        answersHTML.className = "answers"

        for (let i = 0; i < 4; i++) {
            let answer = document.createElement("div")
            answer.className = "answer"
            answerString = "a".concat(i + 1)
            answer.textContent = q[answerString]
            answer.addEventListener("click", answering.bind(
                null, questionsOBJ, currentQuestionString
            ))
            answersHTML.append(answer)
        }

        quizHTML.append(questionHTML)
        quizHTML.append(answersHTML)

        document.body.append(quizHTML)
    }
    else {
        let results = document.createElement("h1")
        results.textContent = "Тут будут результаты"
        document.body.append(results)
    }

}
function answering(questionsOBJ, currentQuestionString) {
    if (event.target.textContent == questionsOBJ[
        currentQuestionString
    ]["correct"]) {
        score += 1
    }
    currentQuestion += 1
    let oldQ = document.getElementsByClassName("quiz")[0]
    oldQ.remove()
    setText(questionsOBJ)
}

let currentQuestion = 0
let score = 0


nameRequest()