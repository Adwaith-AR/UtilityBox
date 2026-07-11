const display = document.getElementById("display")
const numOfDigitToDisplay = document.getElementById("numOfDigitToDisplay")
const numberType = document.getElementById("numberType")
const numOfDigit = document.getElementById("numOfDigit")
const min = document.getElementById("min")
const max = document.getElementById("max")
const historyContainer = document.getElementById("historyMainContainer")
const generateBtn = document.getElementById("generateBtn")


const minContainer = document.getElementById("minContainer")
const maxContainer = document.getElementById("maxContainer")
const numberTypeContainer = document.getElementById("numberTypeContainer")
const numOfDigitContainer = document.getElementById("numOfDigitContainer")

const typesOfNumber = ["Integers", "Decimals", "Even", "Odd", "Prime Number"]

let historyData = []


max.value = 10
min.value = 12
numberType.textContent = "Integers"
numOfDigit.value = 2

function randomNumberGenerator() {
          if (Number(min.value) <= Number(max.value)) {
                    if (Number(numOfDigit.value) >= 1 && Number(numOfDigit.value) <= 12) {
                              if (max.value.length >= Number(numOfDigit.value) && max.value.length <= Number(numOfDigit.value)) {
                                        if (numberType.textContent == "Integers") {
                                                  let randomNumber = Math.floor((Math.random() * max.value + 1) + min.value)
                                                  Display(randomNumber)
                                        }

                              }
                              else {
                                        generateBtn.disabled = true
                                        maxContainer.classList.add("shake")
                                        numOfDigitContainer.classList.add("shake")
                                        setTimeout(() => {
                                                  numOfDigitContainer.classList.remove("shake")
                                                  maxContainer.classList.remove("shake")
                                                  generateBtn.disabled = false
                                                  window.alert("keep your max value's number of digits is greater than the no of digit you selected ");
                                                  reset()
                                        }, 500);
                              }
                    }


          }
          else {
                    generateBtn.disabled = true
                    minContainer.classList.add("shake")
                    maxContainer.classList.add("shake")

                    setTimeout(() => {
                              min.value = 1
                              max.value = 10
                              minContainer.classList.remove("shake")
                              maxContainer.classList.remove("shake")
                              generateBtn.disabled = false
                              window.alert("Keep the minimum value less than the maximum value or vice versa");
                    }, 500);


          }


}




function numberTypeForward() {
          let currentType = typesOfNumber.indexOf(numberType.textContent)
          if (currentType != 4) {
                    numberType.textContent = typesOfNumber[currentType + 1]
          }

}
function numberTypeBackward() {

          let currentType = typesOfNumber.indexOf(numberType.textContent)
          if (currentType != 0) {
                    numberType.textContent = typesOfNumber[currentType - 1]
          }
}
function numberIncrease(id) {
          const displayValue = document.getElementById(id)
          if (id !== "numOfDigit") {
                    const displayValue = document.getElementById(id)
                    displayValue.value = Number(displayValue.value) + 1
          }
          if (id == "numOfDigit") {
                    const displayValue = document.getElementById(id)
                    if (Number(displayValue.value < 12)) {
                              numOfDigitToDisplay.textContent = `${Number(displayValue.value) + 1}-Degit Number`
                              displayValue.value = Number(displayValue.value) + 1

                    }

          }

}

function numberDecrease(id) {
          if (id !== "numOfDigit") {
                    const displayValue = document.getElementById(id)
                    displayValue.value = Number(displayValue.value) - 1
          }
          if (id == "numOfDigit") {
                    const displayValue = document.getElementById(id)
                    if (Number(displayValue.value > 1)) {
                              numOfDigitToDisplay.textContent = `${Number(displayValue.value) - 1}-Degit Number`
                              displayValue.value = Number(displayValue.value) - 1

                    }

          }
}

function reset() {
          clearHistory()
          display.textContent = 0
          numOfDigitToDisplay.textContent = "2-Degit Number"
          max.value = 10
          min.value = 1
          numberType.textContent = "Integers"
          numOfDigit.value = 2
}
function clearHistory() {
          historyData = []
          historyContainer.innerHTML = ""
}

function Display(randomNumber) {
          display.textContent = randomNumber
          historyData.push(`<div class="historyData"><p>${randomNumber}</p><button>😒</button></div>`)
          historyContainer.innerHTML = historyData.reverse().join("")
}