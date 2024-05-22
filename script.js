// Access HTML elements
const doorImage1 = document.getElementById('door1');
const doorImage2 = document.getElementById('door2');
const doorImage3 = document.getElementById('door3');
const startButton = document.getElementById('start');

let botDoorPath = 'https://content.codecademy.com/projects/chore-door/images/robot.svg';
let beachDoorPath = 'https://content.codecademy.com/projects/chore-door/images/beach.svg';
let spaceDoorPath = 'https://content.codecademy.com/projects/chore-door/images/space.svg';
let closedDoorPath = 'https://content.codecademy.com/projects/chore-door/images/closed_door.svg';

let numClosedDoors = 3;
let openDoor1;
let openDoor2;
let openDoor3;
let currentlyPlaying = true;

// Define game logic to check doors, progress game, end game, and choose a random chore door.
// Check if the door is open looking at the current source property of the door.
const isClicked = door => {
  if(door.src == closedDoorPath){
    return true;
  }
  else{
    return false;
  }
}

// Check if the door source is the botDoorPath image
const isBot = door => {
  if(door.src == botDoorPath){
    return true;
  }
  else{
    return false;
  }
}

// Change startButton and currentPlaying variables based on status 
const gameOver = status => {
  if(status == "win"){
      startButton.innerHTML = 'You win! Play again?';
  }
  else{
      startButton.innerHTML = 'Game over! Play again?';
  }
  currentPlaying = false;
}

const playDoor = door => {
  numClosedDoors -= 1; 
  if(numClosedDoors == 0){
    gameOver("win");
  }
  else if(isBot(door) == true){
    gameOver();
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// Randomize behind which door the bot will be located
const randomChoreDoorGenerator = choreDoor => {
  // Give an int between 0 and 3 (not included)
  choreDoor = getRandomInt(numClosedDoors);
  if(choreDoor == 0){
    openDoor1 = botDoorPath;
    openDoor2 = beachDoorPath;
    openDoor3 = spaceDoorPath;
  }
  else if(choreDoor == 1){
    openDoor1 = beachDoorPath;
    openDoor2 = botDoorPath;
    openDoor3 = spaceDoorPath;
  }
  else{
    openDoor1 = beachDoorPath;
    openDoor2 = spaceDoorPath;
    openDoor3 = botDoorPath;
  }
}

doorImage1.onclick = () => {
  if (currentlyPlaying && isClicked(doorImage1)) {
    doorImage1.src = openDoor1;
    playDoor(doorImage1);
  }
}

doorImage2.onclick = () => {
  if (currentlyPlaying && isClicked(doorImage2)) {
    doorImage2.src = openDoor2;
    playDoor(doorImage2);
  }
}

doorImage3.onclick = () => {
  if (currentlyPlaying && isClicked(doorImage3)) {
    doorImage3.src = openDoor3;
    playDoor(doorImage3);
  }
}

startButton.onclick = () => {
  if (currentlyPlaying === false) {
    startRound();
  }
}

const startRound = () => {
  doorImage1.src = closedDoorPath;
  doorImage2.src = closedDoorPath;
  doorImage3.src = closedDoorPath;
  numClosedDoors = 3;
  currentlyPlaying = true;
  startButton.innerHTML = "Good Luck!";
  randomChoreDoorGenerator();
}

// Start a game round
startRound();
