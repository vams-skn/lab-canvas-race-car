let cnv = document.getElementById('canvas');
const ctx = cnv.getContext('2d');
let carImage;
let roadImage;
let obstacles = [];
let score = 0;
const carWidth = 50;
const carHeight = 100;
let carX = 225;
const carY = 600;
const obstacleWidth = 50;
const obstacleHeight = 100;
let carSpeed = 10;
let obstacleSpeed = 5;

function startGame() {
  roadImage = new Image();
  roadImage.src = './images/road.png';
  carImage = new Image();
  carImage.src = './images/car.png';

  roadImage.onload = () => {
      drawRoad();
      carImage.onload = () => {
          drawCar();
          createObstacles();
          updateGame();
      };
  };
}

function drawRoad() {
  ctx.drawImage(roadImage, 0, 0, canvas.width, canvas.height);
}

function drawCar() {
  ctx.drawImage(carImage, carX, carY, carWidth, carHeight);
}

function moveCar(event) {
  if (event.key === 'ArrowLeft') {
      carX -= carSpeed;
  } else if (event.key === 'ArrowRight') {
      carX += carSpeed;
  }

  carX = Math.max(0, Math.min(canvas.width - carWidth, carX));
  drawRoad();
  drawCar();
  drawObstacles();
  drawScore();
}

function createObstacles() {
  setInterval(() => {
      let x = Math.random() * (canvas.width - obstacleWidth);
      obstacles.push({ x: x, y: 0 });
  }, 3000);
}

function drawObstacles() {
  obstacles.forEach((obstacle, index) => {
      let obstacleImage = new Image();
      obstacleImage.src = './images/obstacle.png';
      obstacleImage.onload = () => {
          ctx.drawImage(obstacleImage, obstacle.x, obstacle.y, obstacleWidth, obstacleHeight);
      };
  });
}

function updateObstacles() {
  obstacles.forEach((obstacle, index) => {
      obstacle.y += obstacleSpeed;

      if (obstacle.y > canvas.height) {
          obstacles.splice(index, 1);
      }
  });
}

function drawScore() {
  ctx.fillStyle = 'white';
  ctx.font = '20px Arial';
  ctx.fillText('Score: ' + score, 10, 30);
}

function updateGame() {
  setInterval(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawRoad();
      drawCar();
      updateObstacles();
      drawObstacles();
      drawScore();
      score++;
  }, 1000 / 60);
}


window.addEventListener('load', () => {
  let startBtn = document.getElementById('start-button');

  startBtn.addEventListener('click', () => {
      startGame();
  });
  document.addEventListener('keydown', moveCar);
});