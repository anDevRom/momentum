//
const nameQuestionPage = document.querySelector(".name-question")
const cityQuestionPage = document.querySelector(".city-question")
const mainPage = document.querySelector(".main-page")

const nameQuestionText = document.querySelector(".name-question__text")
const cityQuestionText = document.querySelector(".city-question__text")

const userName = document.querySelector(".greet-block__user-name")
const city = document.querySelector(".city-block__value")
const focus = document.querySelector(".user-inf-block__focus")
const quotationButton = document.querySelector(".footer__change-quotation")

const arrOfImg = [
    ["mor00.jpg", "mor01.jpg", "mor02.jpg", "mor03.jpg", "mor04.jpg", "mor05.jpg"],
    ["day00.jpg", "day01.jpg", "day02.jpg", "day03.jpg", "day04.jpg", "day05.jpg"],
    ["eve00.jpg", "eve01.jpg", "eve02.jpg", "eve03.jpg", "eve04.jpg", "eve05.jpg"],
    ["nig00.jpg", "nig01.jpg", "nig02.jpg", "nig03.jpg", "nig04.jpg", "nig05.jpg"],
]
const numberOfImage = getRandomInt(6)
const timeNow = new Date
const indexDayPart = getPartOfDay(timeNow.getHours())
const list = createListOfImg()
let count = 0
const buttonChangeImage = document.querySelector(".footer__change-img")

const weatherIcon = document.querySelector('.temperature-block__icon')
const temperature = document.querySelector('.temperature-block__value')
const humidity = document.querySelector(".add-option-block__humidity-value")
const wind = document.querySelector(".add-option-block__wind-value")
const refreshButton = document.querySelector(".city-block__button")

const dayOfWeek = document.querySelector(".date-block__day-of-week")
const date = document.querySelector(".date-block__date")
const month = document.querySelector(".date-block__month")
const hours = document.querySelector(".time-block__hours")
const minutes = document.querySelector(".time-block__minutes")
const seconds = document.querySelector(".time-block__seconds")
const partOfDay = document.querySelector(".greet-block__day-part")

const daysOfWeek = ["Sunday,", "Monday,", "Tuesday,", "Wednesday,", "Thursday,", "Friday,", "Saturday,"]
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const partsOfDay = ["Morning","Day", "Evening", "Night"]

// Start
function renderCheck() {
    if (localStorage.hasOwnProperty("name") && localStorage.hasOwnProperty("city")) {
        getQuotation()
        getWeather()
        userName.textContent = localStorage.getItem("name")
        city.textContent = localStorage.getItem("city")
        if (localStorage.hasOwnProperty("focus")) {
            focus.textContent = localStorage.getItem("focus")
        }
        mainPage.classList.remove("hidden")
    } else {
        nameQuestionPage.classList.remove("hidden")
    }
}
renderCheck()

// Change city
city.addEventListener("click", () => {
    city.textContent = ""
})

city.addEventListener("keypress", (event) => {
    if (event.code === "Enter" && city.textContent !== "") {
        localStorage.setItem("city", city.textContent)
        getWeather()
        city.blur()
    } else if(event.code === "Enter" && city.textContent === "") {
        city.textContent = localStorage.getItem("city")
        city.blur()
    }
})

// Change name
userName.addEventListener("click", () => {
    userName.textContent = ""
})

userName.addEventListener("keypress", (event) => {
    if (event.code === "Enter" && userName.textContent !== "") {
        localStorage.setItem("name", userName.textContent)
        userName.blur()
    } else if (event.code === "Enter" && userName.textContent === "") {
        userName.textContent = localStorage.getItem("name")
        userName.blur()
    }
})

// Change focus
focus.addEventListener("click", () => {
    focus.textContent = ""
})

focus.addEventListener("keypress", (event) => {
    if (event.code === "Enter" && focus.textContent !== "") {
        localStorage.setItem("focus", focus.textContent)
        focus.blur()
    } else if (event.code === "Enter" && focus.textContent === "") {
        if (localStorage.hasOwnProperty("focus")) {    
            focus.textContent = localStorage.getItem("focus")
        } else {
            focus.textContent = "What is your focus for today?"
        }
        focus.blur()
    }
})

// Listener for name and city and focus
mainPage.addEventListener("click", (event) => {
    if (event.target !== userName) {
        userName.textContent = localStorage.getItem("name")
        userName.blur()
    }
    if (event.target !== city) {
        city.textContent = localStorage.getItem("city")
        city.blur()
    }
    if (event.target !== focus && localStorage.hasOwnProperty("focus")) {
        focus.textContent = localStorage.getItem("focus")
        focus.blur()
    } else if (event.target !== focus && !localStorage.hasOwnProperty("focus")) {
        focus.textContent = "What is your focus for today?"
        focus.blur()
    }
})

// Weather Part
async function getWeather() {
    if (localStorage.hasOwnProperty("city")) {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${localStorage.getItem("city")}&lang=en&appid=56ce279b60bf03d2accf6e59b04d8a08&units=metric`
            const res = await fetch(url)
            const data = await res.json()
            weatherIcon.classList.add(`owf-${data.weather[0].id}`);
            temperature.textContent = `${Math.floor(data.main.temp)} °C`;
            humidity.textContent = `${Math.floor(data.main.humidity)} %`
            wind.textContent = `${Math.floor(data.wind.speed)} m/s`
        } catch (e) {
            alert("Please enter correct name of the city, if you want to see weather value")
            city.textContent = localStorage.getItem("city")
        }
    }
}
getWeather()

/*refreshButton.addEventListener("click", function() {
    this.blur()
    getWeather()
})*/

// Time block
function getTime() {
    let time = new Date
    
    function returnCorrectTime(method) {
        if (method < 10) {
            return `0${method}`
        } else {
            return method
        }
    }
    function returnCorrectDayOrMonth(method, arr) {
        const index = method
        return arr[Number(index)]
    }

    dayOfWeek.innerText = returnCorrectDayOrMonth(time.getDay(), daysOfWeek)
    date.innerText = returnCorrectTime(time.getDate())
    month.innerText = returnCorrectDayOrMonth(time.getMonth(), months)
    hours.innerText = returnCorrectTime(time.getHours())
    minutes.innerText = returnCorrectTime(time.getMinutes())
    seconds.innerText = returnCorrectTime(time.getSeconds())
    if (time.getHours() >= 6 && time.getHours() < 12) {
        partOfDay.textContent = partsOfDay[0]
    } else if (time.getHours() >= 12 && time.getHours() < 18) {
        partOfDay.textContent = partsOfDay[1]
    } else if (time.getHours() >= 18) {
        partOfDay.textContent = partsOfDay[2]
    } else if (time.getHours() >= 0 && time.getHours() < 6) {
        partOfDay.textContent = partsOfDay[3]
    }
}

getTime()
setInterval(getTime, 1000)

// Change image
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

function getPartOfDay(hourValue) {
    if (hourValue >= 6 && hourValue < 12) {
          return 0
      } else if (hourValue >= 12 && hourValue < 18) {
          return 1
      } else if (hourValue >= 18) {
          return 2
      } else if (hourValue >= 0 && hourValue < 6) {
          return 3
      }
}

function createListOfImg() {
    const arrOfImgSorted = arrOfImg.map((elem) => {
      return elem.sort(() => Math.random() - 0.5)
    })
    let result = []
    let resultForReturn = []
    let secondPartOfArray = arrOfImgSorted.splice(indexDayPart)
    result.push(secondPartOfArray[0].splice(numberOfImage), ...arrOfImgSorted, ...secondPartOfArray.reverse())
    result.forEach((elem) => {
      resultForReturn.push(...elem)
    })
    return resultForReturn
}

function renderBackground() {
    if (count === 23) {
        mainPage.style.backgroundImage = `url('img/${list[count]}')`
        mainPage.style.transition = "background-image 2s ease-in-out"
        count = 0
    } else {
        mainPage.style.backgroundImage = `url('img/${list[count]}')`
        mainPage.style.transition = "background-image 2s ease-in-out"
        count = count + 1
    }
  }

buttonChangeImage.addEventListener("click", function() {
    this.blur()
    renderBackground()
    buttonChangeImage.disabled = true;
    setTimeout(function() { buttonChangeImage.disabled = false }, 2000)
})
renderBackground()
setInterval(() => {
    renderBackground()
}, 3600000)

// Quatation
async function getQuotation() {
    const quotationText = document.querySelector(".quotation-block__text")
    const quotationAuthor = document.querySelector(".quotation-block__author")
    const url = "https://type.fit/api/quotes"
    const response = await fetch(url)
    const request = await response.json()
    const indexForQuotation = getRandomInt(request.length + 1)
    quotationText.textContent = request[indexForQuotation].text
    quotationAuthor.textContent = request[indexForQuotation].author
}

quotationButton.addEventListener("click", function() {
    this.blur()
    getQuotation()
})

//
nameQuestionText.addEventListener("keypress", (event) => {
    if (event.code === "Enter" && nameQuestionText.textContent !== "") {
        localStorage.setItem("name", nameQuestionText.textContent)
        nameQuestionPage.classList.add("hidden")
        cityQuestionPage.classList.remove("hidden")
    } else if (event.code === "Enter" && nameQuestionText.textContent === "") {
        nameQuestionText.textContent = "What is your name?"
        nameQuestionText.blur()
    }
})

nameQuestionText.addEventListener("click", (event) => {
    nameQuestionText.textContent = ""
})

nameQuestionPage.addEventListener("click", (event) => {
    if (event.target !== nameQuestionText) {
        nameQuestionText.textContent = "What is your name?"
    }
})

cityQuestionText.addEventListener("keypress", (event) => {
    if (event.code === "Enter" && cityQuestionText.textContent !== "") {
        localStorage.setItem("city", cityQuestionText.textContent)
        cityQuestionPage.classList.add("hidden")
        renderCheck()
    } else if (event.code === "Enter" && cityQuestionText.textContent === "") {
        cityQuestionText.textContent = "What is your city?"
        cityQuestionText.blur()
    }
})

cityQuestionText.addEventListener("click", (event) => {
    cityQuestionText.textContent = ""
})

cityQuestionPage.addEventListener("click", (event) => {
    if (event.target !== cityQuestionText) {
        cityQuestionText.textContent = "What is your city?"
    }
})


