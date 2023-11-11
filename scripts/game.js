const levelTitle = document.getElementById("level-title");
const redButton = document.getElementById("red");
const yellowButton = document.getElementById("yellow");
const greenButton = document.getElementById("green");
const blueButton = document.getElementById("blue");

// we need 2 arrays, game array to store order of colors, and user to store his input and compare
let gamePattern = [];
let userPattern = [];
let gameLevel = 0;

window.addEventListener("keypress", StartnextIteration);
redButton.addEventListener("click", () => {
  pressButton("red");
  comparePatterns("red");
});
blueButton.addEventListener("click", () => {
  pressButton("blue");
  comparePatterns("blue");
});
yellowButton.addEventListener("click", () => {
  pressButton("yellow");
  comparePatterns("yellow");
});
greenButton.addEventListener("click", () => {
  pressButton("green");
  comparePatterns("green");
});

function resetGame() {
  gamePattern = [];
  userPattern = [];
  gameLevel = 0;
  levelTitle.textContent = "Press Any Key to Start";
}
// effects done when a button is pressed
function pressButton(color) {
  const button = document.getElementById(color);
  const sound = document.querySelector(`[sound='${color}']`);
  button.classList.add("pressed");
  sound.play();
  setTimeout(() => {
    button.classList.remove("pressed");
  }, 200);
}
//  each iteration we take the array and for each element in it we set a timer
//  we need the index to be multiplied bu a constant because if we use same timeout,
//  all array elements will apply the pressed effect at the same time
function Iteration(pattern) {
  pattern.forEach((color, index) => {
    setTimeout(() => {
      pressButton(color);
    }, (index + 1) * 700);
  });
}
// generate random color
function nextColor() {
  const tiles = ["red", "green", "blue", "yellow"];
  const random = tiles[parseInt(Math.random() * 4)];
  return random;
}
// push generated color
function StartnextIteration() {
  document.body.style.backgroundColor = "#011F3F";
  gameLevel += 1;
  levelTitle.textContent = `Level ${gameLevel}`;
  const nextSequence = [...gamePattern];
  nextSequence.push(nextColor());
  Iteration(nextSequence);
  gamePattern = [...nextSequence];
}
// compare game array elements and user array elements
function comparePatterns(buttonColor) {
  const index = userPattern.push(buttonColor) - 1;
  const sound = document.querySelector(`[sound='${buttonColor}']`);
  sound.play();

  if (userPattern[index] !== gamePattern[index]) {
    document.body.style.backgroundColor = "red";
    const sound = document.querySelector(`[sound=wrong]`);
    sound.play();
    setTimeout(() => {
      resetGame();
    }, 300);
    return;
  }

  if (userPattern.length === gamePattern.length) {
    userPattern = [];
    setTimeout(() => {
      StartnextIteration();
    }, 1000);
    return;
  }
}
