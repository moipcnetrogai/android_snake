const canvas = document.getElementById("map");
let ctx = canvas.getContext("2d");

const ground = new Image();
ground.src = "img/map.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

let box = 16;

let score = 0;

let food = {
x: Math.floor((Math.random() * 20))* box,
y: Math.floor((Math.random() * 40))* box
};

let snake = [];
snake[0] = {
  x:10*box,
  y:20*box,
};
var dir;
var initialPoint;
var finalPoint;
document.addEventListener("touchstart", function(event){
event.preventDefault();
event.stopPropagation();
initialPoint=event.changedTouches[0];
}, false);
document.addEventListener("touchend", function(event){
  event.preventDefault();
  event.stopPropagation();
  finalPoint=event.changedTouches[0];
  var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
  var yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
  if(xAbs>20||yAbs>20){
    if(xAbs>yAbs){
      if(finalPoint.pageX<initialPoint.pageX && dir != "right"){
        dir = "left"}
        else{
          if (dir != "left"){
            dir = "right"}
          }
        }
        else {
           if (finalPoint.pageY<initialPoint.pageY && dir != "down"){
              dir = "up"}
              else{
                if (dir != "up"){
                  dir = "down"}
                }
              }
            }
          }, false);
            

function eatTail(head, arr){
  for(let i = 0; i < arr.length; i++){
    if(head.x == arr[i].x && head.y == arr[i].y)
    clearInterval(game);
  }
}

function drawGame(){
  ctx.drawImage(ground, 0, 0);

  ctx.drawImage(foodImg, food.x, food.y);

  for (let i = 0; i < snake.length; i++){
    ctx.fillStyle = i == 0 ? "red" : "green";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.fillStyle = "blue";
  ctx.font = "24px Arial";
  ctx.fillText(score,5 * box, 1.5 * box);

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if(snakeX == food.x && snakeY == food.y){
    score++;
    food = {
      x: rand(0, 19)* box,
      y: rand(0, 39)* box
    };
  }else
    snake.pop();

  if(snakeX <0 || snakeX >320 || snakeY <0 || snakeY >640)
  clearInterval(game);
  if(dir == "left") snakeX -= box;
  if(dir == "right") snakeX += box;
  if(dir == "up")snakeY -= box;
  if(dir == "down")snakeY += box;

  let newHead = {
    x: snakeX,
    y: snakeY
  };

  eatTail(newHead, snake);

  snake.unshift(newHead);
}

let game = setInterval(drawGame, 50);
