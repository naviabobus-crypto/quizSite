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
            setText(questions, userName)
        }
    }
}
function nameRequest() { // запрос на ввод имени
    let bg = document.createElement("div")
    bg.className = "nameInserterBG"

    let form = document.createElement("div")
    form.className = "nameInserter"

    let text1 = document.createElement("h1")
    text1.textContent = "Введите ваше имя!"

    text2 = document.createElement("p")
    text2.textContent = "После начала викторины, на каждый\
    вопрос будет дано по 30 секунд."

    text3 = document.createElement("p")
    text3.textContent = "Чем быстрее ответите,\
    тем больше получите баллов."

    let nameInput = document.createElement("input")
    nameInput.id = "userName"

    let startButton = document.createElement("button")
    startButton.textContent = "Продолжить"
    startButton.onclick = gameStart

    form.append(text1, text2, text3, nameInput, startButton)

    document.body.append(bg, form)
}
function setText(questionsOBJ, userName) { // установка вопроса и ответов в контейнеры
    if(currentQuestionNumber < Object.keys(questionsOBJ).length) { // если не все вопросы пройдены
        let currentQuestionString = "q".concat(currentQuestionNumber+1) // номер вопроса в словаре
        let q = questionsOBJ[currentQuestionString] // словарь текущего вопроса (вопрос, ответы, правильный ответ)
        let quizHTML = document.createElement("div") // контейнер с вопросом и ответами
        quizHTML.className = "quiz"

        let timerContainer = document.createElement("div") // контейнер с таймером
        timerContainer.className = "timerContainer"
        timerContainer.textContent = "Остаток времени на доп. баллы: " + maxTimer + " сек."

        let questionHTML = document.createElement("div") // контейнер с вопросом
        questionHTML.className = "question"
        questionHTML.textContent = q["question"]
        let answersHTML = document.createElement("div") // контейнер с ответами
        answersHTML.className = "answers"
        for (let i = 0; i < 4; i++) { // установка 4 ответов
            let answer = document.createElement("div") // контейнер с одним ответом
            answer.className = "answer"
            answer.textContent = q["a".concat(i + 1)]
            answer.addEventListener("click", answering.bind( // добавление ивента при нажатии для ответа
                null, questionsOBJ, currentQuestionString, userName
            ))
            answersHTML.append(answer)
        }
        if(currentQuestionNumber == 0) { // запуск таймера, если вопрос первый
            setInterval(timer, 1000)
        }
        quizHTML.append(timerContainer)
        quizHTML.append(questionHTML)
        quizHTML.append(answersHTML)
        document.body.append(quizHTML)
    }
    else { // если все вопросы пройдены
        let bg = document.createElement("div")
        bg.className = "nameInserterBG"
        let resultContainer = document.createElement("div")
        resultContainer.className = "nameInserter"
        let text1 = document.createElement("h1")
        text1.textContent = userName + ", поздравляем с прохождением!"
        let text2 = document.createElement("p")
        text2.textContent = "Ваш счет: " + score + " (из " + Object.keys(questionsOBJ).length * 10 * 2 + " макс.)"
        let confirm = document.createElement("button")
        confirm.textContent = "На главную"
        confirm.onclick = function () {
            window.location.href = "../index.html"
        }

        resultContainer.append(text1, text2, confirm)

        document.body.append(bg)
        document.body.append(resultContainer)
    }

}
function answering(questionsOBJ, currentQuestionString, userName) { // при ответе
    let comparing = questionsOBJ[currentQuestionString]
    let userTime = Number(document.getElementsByClassName("timerContainer")[0].textContent.slice(31, 33))
    if (event.target.textContent == comparing[comparing["correct"]]) {
        score = Number((score + defaultAnswerScore * Number(1 + userTime / maxTimer)).toFixed(2))
    }
    currentQuestionNumber += 1
    let oldPage = document.getElementsByClassName("quiz")[0]
    oldPage.remove()
    setText(questionsOBJ, userName)
}
function timer() {
    let timer = document.getElementsByClassName("timerContainer")[0]
    let leftTime = Number(timer.textContent.slice(31, 33)) - 1
    if (leftTime <= 0) {
        leftTime = 0
    }
    timer.textContent = "Остаток времени на доп. баллы: " + leftTime + " сек."
}

let maxTimer = 30
let curentTimer = 0
let defaultAnswerScore = 10
let currentQuestionNumber = 0
let score = 0

nameRequest()