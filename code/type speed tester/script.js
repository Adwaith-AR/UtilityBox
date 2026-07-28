const wordPool = [
          "the", "and", "for", "you", "say", "but", "not", "what", "all", "were",
          "when", "your", "can", "said", "there", "use", "each", "which", "how",
          "will", "other", "about", "many", "then", "them", "write", "would",
          "like", "into", "time", "look", "more", "come", "could", "people",
          "than", "first", "water", "been", "call", "who", "now", "find", "long",
          "down", "day", "make", "over", "new", "sound", "take", "only", "little",
          "work", "know", "place", "year", "back", "give", "most", "very", "good"
];

// How many words to put in one test.
const WORD_COUNT = 30;


// ---------- 2. Grab the HTML elements we need ----------
// document.getElementById finds an element by its id="" attribute.
const quoteElement = document.getElementById("quote");
const inputElement = document.getElementById("input");
const restartButton = document.getElementById("restart");
const themeButton = document.getElementById("theme-toggle");
const wpmElement = document.getElementById("wpm");
const accuracyElement = document.getElementById("accuracy");
const timerElement = document.getElementById("timer");


// ---------- 3. Values that change while playing ----------
// "let" means the value can change (unlike "const").
let currentQuote = ""; // the full text for this round
let startTime = null; // when the first letter was typed
let timerId = null; // the running clock, so we can stop it


// ---------- 4. Build a random sentence from the word pool ----------
function makeRandomText() {
          const chosen = [];
          for (let i = 0; i < WORD_COUNT; i++) {
                    // Math.random() gives 0-1; scale it to a valid array index.
                    const index = Math.floor(Math.random() * wordPool.length);
                    chosen.push(wordPool[index]);
          }
          // join() glues the list into one string, separated by spaces.
          return chosen.join(" ");
}


// ---------- 5. Start (or restart) a test ----------
function startTest() {
          currentQuote = makeRandomText();

          // Empty the quote box, then add one <span> per character.
          // A span per letter lets us colour each one on its own.
          quoteElement.innerHTML = "";
          for (const character of currentQuote) {
                    const span = document.createElement("span");
                    span.textContent = character;
                    quoteElement.appendChild(span);
          }

          // Mark the very first letter as the caret position.
          quoteElement.querySelector("span").classList.add("current");

          // Reset the input and the stats back to the start.
          inputElement.value = "";
          wpmElement.textContent = "0";
          accuracyElement.textContent = "100";
          timerElement.textContent = "0";

          // Stop any old timer and forget the old start time.
          clearInterval(timerId);
          timerId = null;
          startTime = null;

          // Put the cursor in the hidden box so typing works right away.
          inputElement.focus();
}


// ---------- 6. Tick the on-screen clock every second ----------
function updateTimer() {
          const secondsPassed = Math.floor((Date.now() - startTime) / 1000);
          timerElement.textContent = secondsPassed;

          // Once the timer is running we can also refresh the speed.
          updateWpm();
}


// ---------- 7. Work out words-per-minute from the elapsed time ----------
function updateWpm() {
          if (startTime === null) return; // haven't started yet, nothing to do

          const minutes = (Date.now() - startTime) / 1000 / 60;
          if (minutes <= 0) return;

          // Standard typing-test rule: 5 characters counts as one "word".
          const words = inputElement.value.length / 5;
          const wpm = Math.round(words / minutes);
          wpmElement.textContent = wpm;
}


// ---------- 8. The main logic: runs on every keystroke ----------
function handleTyping() {
          const typed = inputElement.value; // what's typed so far
          const letters = quoteElement.querySelectorAll("span"); // every letter span

          // Start the timer on the FIRST keypress only. Before you type,
          // there is no speed and no time - it waits for you.
          if (startTime === null && typed.length > 0) {
                    startTime = Date.now();
                    timerId = setInterval(updateTimer, 1000); // tick once a second
          }

          let correctCount = 0;// how many letters are right so far

          // Loop over every target letter and compare it to the input.
          letters.forEach(function (span, index) {
                    const typedChar = typed[index]; // undefined if not typed yet

                    // Clear old classes before deciding the new state.
                    span.classList.remove("correct", "wrong", "current");

                    if (typedChar == null) {
                              // Not typed yet. The first untyped letter holds the caret.
                              if (index === typed.length) {
                                        span.classList.add("current");
                              }
                    } else if (typedChar === span.textContent) {
                              span.classList.add("correct");// matches -> white
                              correctCount++;
                    } else {
                              span.classList.add("wrong");// mismatch -> red
                    }
          });

          // ----- Accuracy = correct letters / letters typed, as a % -----
          if (typed.length > 0) {
                    const accuracy = Math.round((correctCount / typed.length) * 100);
                    accuracyElement.textContent = accuracy;
          } else {
                    accuracyElement.textContent = "100";
          }

          // Refresh the speed on each keystroke too.
          updateWpm();

          // ----- Finished? Stop the clock when the text is complete. -----
          if (typed === currentQuote) {
                    clearInterval(timerId);
          }
}


// ---------- 9. Switch between dark and light themes ----------
function toggleTheme() {
          // Read the theme currently stored on the <body>.
          const current = document.body.getAttribute("data-theme");

          // Flip it: dark -> light, or light -> dark.
          const next = current === "dark" ? "light" : "dark";
          document.body.setAttribute("data-theme", next);

          // Update the button label to show what clicking will do next.
          themeButton.textContent = next === "dark" ? "Light" : "Dark";
}


// ---------- 10. Connect the events (wire it all up) ----------
// "input" fires on every keystroke inside the hidden box.
inputElement.addEventListener("input", handleTyping);

// Clicking anywhere on the page re-focuses the hidden input,
// so you can always just start typing.
document.addEventListener("click", function () {
          inputElement.focus();
});

// The restart and theme buttons.
restartButton.addEventListener("click", startTest);
themeButton.addEventListener("click", toggleTheme);


// ---------- 11. Kick things off when the page loads ----------
startTest();
