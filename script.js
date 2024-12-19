let wordList = []; 
let allowedWords = [];
let targetWord = ""; 
let currentRow = 0;
let guessedWords = []; 
let score = Number.parseFloat(localStorage.getItem("score"));

if(Number.isNaN(score)) {
    score = 0;
}
updateScore();


function updateScore() {
  localStorage.setItem("score",score.toPrecision());
  document.getElementById("score").textContent = "Score: " + score;
}

function loadWords() {
  fetch("words.txt") 
    .then((response) => response.text())
    .then((data) => {
      wordList = data.split("\n");
      console.log("List of answers loaded:", wordList.length, "words");

      setRandomWord();
    })
    .catch((error) => console.error("Error with loading answers:", error));
    fetch("allowed_guesses.txt") 
      .then((response) => response.text())
      .then((data) => {
        const allowedWords = data.split("\n");
        console.log("List of words loaded:", wordList.length, "words");
      })
      .catch((error) => console.error("Error with loading words:", error));
}

function setRandomWord() {
  if (wordList.length > 0) {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    targetWord = wordList[randomIndex].toLowerCase();
    console.log("The word is:", targetWord);
  } else {
    console.error("Word list is empty!");
  }
}

// Создание игровой доски
function createBoard() {
  for (let i = 1; i <= 6; i++) {
    const row = document.getElementById(`row${i}`);
    row.innerHTML = "";
    for (let j = 1; j <= 5; j++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      row.appendChild(cell);
    }
  }
}

// Отправка догадки
function submitGuess() {
  const guessInput = document.getElementById("guess-input");
  const guess = guessInput.value.toLowerCase().trim();
  guessInput.value = "";

  // Проверка длины слова
  if (guess.length !== 5) {
    alert("Enter a word of 5 letters.");
    return;
  }

  // Проверка, есть ли слово в списке
  if (!(allowedWords.includes(guess) || wordList.includes(guess))) {
    alert("The word is not in the list.");
    return;
  }

  // Обработка догадки
  if (currentRow < 6) {
    guessedWords[currentRow] = guess; 
    displayGuess(guess); 
    checkGuess(guess); 
    currentRow++; 
  }

  // Проверка окончания игры
  if (currentRow === 6 && guess !== targetWord) {
    document.getElementById("message").textContent = `The game is over! The word was: ${targetWord.toUpperCase()}`;
  }
}

// Отображение догадки на доске
function displayGuess(guess) {
  const row = document.getElementById(`row${currentRow + 1}`);
  for (let i = 0; i < 5; i++) {
    row.children[i].textContent = guess[i].toUpperCase(); 
  }
}

// Проверка догадки и раскраска ячеек
function checkGuess(guess) {
  const row = document.getElementById(`row${currentRow + 1}`);
  const freqList = generateFrequencyList(targetWord);
  for (let i = 0; i < 5; i++) {
    row.children[i].style.backgroundColor = "gray"
    if (guess[i] === targetWord[i] && freqList.get(guess[i]) > 0) {
      row.children[i].style.backgroundColor = "#40AA40"; // Зелёный: правильная буква на правильном месте
      freqList.set(guess[i],freqList.get(guess[i])-1);
    }
  }
  
  for (let i = 0; i < 5; i++) {
    if(targetWord.includes(guess[i]) && freqList.get(guess[i]) > 0) {
        row.children[i].style.backgroundColor = "#AAAA40"; // Жёлтый: правильная буква, но не на своём месте
        freqList.set(guess[i],freqList.get(guess[i])-1);
    }
  }
    

  // Если угадали слово
  if (guess === targetWord) {
    document.getElementById("message").textContent = "Congratulations, you won!";
    win();
    currentRow = 6; // Завершаем игру
  }
}

function generateFrequencyList(string) {
    let frequencies = new Map();
    for(let i = 0; i < string.length; i++) {
        if(!frequencies.has(string[i])) {
            frequencies.set(string[i],0);
        }
        frequencies.set(string[i],frequencies.get(string[i])+1);
        console.log(frequencies);
    }
    return frequencies;
  }
function backToMenu(){
  window.location.href = "menu.html";
}
function startNewGame() {
  setRandomWord(); 
  currentRow = 0; 
  guessedWords = []; 
  createBoard(); 
  document.getElementById("message").textContent = ""; 
  document.getElementById("guess-input").value = "";
}
function applySavedTheme(){
  const themeLink = document.getElementById("theme-style")
  if (!themeLink) return;
  const savedTheme = localStorage.getItem(`theme`) || `light`

  themeLink.href = savedTheme === `light` ? `style.css` : savedTheme + `-style.css` 
}
function win() {
    score++;
    updateScore();
}


loadWords();
createBoard();
applySavedTheme();

onkeydown = (event) => {
    if(event.key == "Enter") {
        submitGuess();
    }
};