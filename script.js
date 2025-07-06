const wordList = [
  { word: 'apple', hint: 'A red or green fruit' },
  { word: 'banana', hint: 'A long yellow fruit' },
  { word: 'elephant', hint: 'The largest land animal' },
  { word: 'guitar', hint: 'A musical instrument with strings' },
  { word: 'rainbow', hint: 'Appears in the sky after rain' },
  { word: 'school', hint: 'A place where kids learn' },
  { word: 'doctor', hint: 'Treats you when you are sick' },
  { word: 'butterfly', hint: 'A colorful flying insect' },
  { word: 'pencil', hint: 'Used for writing or drawing' },
  { word: 'mirror', hint: 'You see your reflection in it' },
  { word: 'garden', hint: 'A place with plants and flowers' },
  { word: 'monkey', hint: 'An animal that loves bananas' },
  { word: 'pillow', hint: 'You rest your head on this' },
  { word: 'candle', hint: 'Used during power cuts or for decoration' },
  { word: 'rocket', hint: 'Flies into space' },
  { word: 'planet', hint: 'Earth is one of them' },
  { word: 'window', hint: 'Lets you see outside your house' },
  { word: 'basket', hint: 'Used to carry things' },
  { word: 'camera', hint: 'Takes pictures' },
  { word: 'jungle', hint: 'A dense forest with animals' },
  { word: 'bottle', hint: 'Holds water or juice' },
  { word: 'spoon', hint: 'Used to eat or stir food' },
  { word: 'button', hint: 'Used to close your shirt' },
  { word: 'cloud', hint: 'White or gray things in the sky' },
  { word: 'breeze', hint: 'A light and gentle wind' },
  { word: 'ladder', hint: 'Used to climb up or down' },
  { word: 'hammer', hint: 'Used to hit nails' },
  { word: 'helmet', hint: 'Protects your head when riding' },
  { word: 'castle', hint: 'A big old royal house' },
  { word: 'pirate', hint: 'Sails the sea and hunts treasure' },
  { word: 'scooter', hint: 'Two-wheeled ride for kids or adults' },
  { word: 'island', hint: 'Land surrounded by water' },
  { word: 'carpet', hint: 'Covers the floor' },
  { word: 'trophy', hint: 'Given as a prize for winning' },
  { word: 'ticket', hint: 'Needed to watch a movie or travel' },
  { word: 'pocket', hint: 'Small part of clothes to carry things' },
  { word: 'bucket', hint: 'Used to hold water' },
  { word: 'wallet', hint: 'Holds your money and cards' },
  { word: 'zebra', hint: 'Striped black and white animal' },
  { word: 'crayon', hint: 'Used by kids to color' },
  { word: 'sweater', hint: 'Keeps you warm in winter' },
  { word: 'shampoo', hint: 'Used to wash hair' },
  { word: 'basketball', hint: 'A sport played with a hoop' },
  { word: 'airplane', hint: 'Flies in the sky with passengers' },
  { word: 'gloves', hint: 'Worn on hands to keep warm' },
  { word: 'ocean', hint: 'A very large body of salt water' },
  { word: 'puzzle', hint: 'A brain game with pieces' },
  { word: 'blanket', hint: 'Keeps you warm while sleeping' },
  { word: 'donkey', hint: 'Animal known for carrying loads' },
  { word: 'cactus', hint: 'A plant that grows in the desert' }
];

let selectedWord = '';
let guessedLetters = [];
let wrongGuesses = 0;
const maxWrong = 6;

let winCount = 0;
let lossCount = 0;
const winEmoji = document.getElementById('winEmoji');
const wordDisplay = document.getElementById('wordDisplay');
const keyboard = document.getElementById('keyboard');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restartBtn');
const hintText = document.getElementById('hintText');
const canvas = document.getElementById('hangmanCanvas');
const ctx = canvas.getContext('2d');
const winDisplay = document.getElementById('wins');
const lossDisplay = document.getElementById('losses');

function drawHangman(step) {
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#333';
  switch (step) {
    case 0:
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.moveTo(10, 240);
      ctx.lineTo(190, 240);
      ctx.moveTo(50, 240);
      ctx.lineTo(50, 20);
      ctx.lineTo(150, 20);
      ctx.lineTo(150, 40);
      ctx.stroke();
      break;
    case 1:
      ctx.beginPath();
      ctx.arc(150, 60, 20, 0, Math.PI * 2);
      ctx.stroke();
      break;
    case 2:
      ctx.beginPath();
      ctx.moveTo(150, 80);
      ctx.lineTo(150, 140);
      ctx.stroke();
      break;
    case 3:
      ctx.beginPath();
      ctx.moveTo(150, 100);
      ctx.lineTo(120, 120);
      ctx.stroke();
      break;
    case 4:
      ctx.beginPath();
      ctx.moveTo(150, 100);
      ctx.lineTo(180, 120);
      ctx.stroke();
      break;
    case 5:
      ctx.beginPath();
      ctx.moveTo(150, 140);
      ctx.lineTo(120, 180);
      ctx.stroke();
      break;
    case 6:
      ctx.beginPath();
      ctx.moveTo(150, 140);
      ctx.lineTo(180, 180);
      ctx.stroke();
      break;
  }
}

function displayWord() {
  const display = selectedWord.split('').map(letter => (
    guessedLetters.includes(letter) ? letter : '_'
  )).join(' ');
  wordDisplay.textContent = display;

  if (!display.includes('_')) {
    message.textContent = 'You won!';
    winCount++;
    winDisplay.textContent = `Wins: ${winCount}`;
     winEmoji.style.display = 'block';
    disableKeyboard();
  }
}

function handleGuess(letter) {
  if (guessedLetters.includes(letter)) return;

  guessedLetters.push(letter);
  document.getElementById(letter).disabled = true;

  if (selectedWord.includes(letter)) {
    displayWord();
  } else {
    wrongGuesses++;
    drawHangman(wrongGuesses);
    if (wrongGuesses === maxWrong) {
      message.textContent = `You lost! Word was: "${selectedWord}"`;
      lossCount++;
      lossDisplay.textContent = `Losses: ${lossCount}`;
      disableKeyboard();
    }
  }
}

function disableKeyboard() {
  document.querySelectorAll('.keyboard button').forEach(btn => btn.disabled = true);
}

function generateKeyboard() {
  keyboard.innerHTML = '';
  for (let i = 65; i <= 90; i++) {
    const letter = String.fromCharCode(i).toLowerCase();
    const btn = document.createElement('button');
    btn.textContent = letter;
    btn.id = letter;
    btn.addEventListener('click', () => handleGuess(letter));
    keyboard.appendChild(btn);
  }
}

function startGame() {
  const random = wordList[Math.floor(Math.random() * wordList.length)];
  selectedWord = random.word;
  hintText.textContent = `Hint: ${random.hint}`;
  guessedLetters = [];
  wrongGuesses = 0;
  message.textContent = '';
    winEmoji.style.display = 'none';
  drawHangman(0);
  generateKeyboard();
  displayWord();
}

restartBtn.addEventListener('click', startGame);
window.onload = startGame;
