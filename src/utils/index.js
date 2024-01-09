export const drawSnake = (
  context,
  body,
  gameEnded = false,
  strikeIndex = 0
) => {
  if (context) {
    body.forEach((object, i) => {
      if (i == 0) context.fillStyle = "green";
      else if (gameEnded && i === strikeIndex) context.fillStyle = "red";
      else context.fillStyle = "#56ff56";
      context.fillRect(object.x, object.y, 20, 20);
      context.strokeStyle = gameEnded ? "red" : "blue";
      context.lineWidth = 1;
      context.strokeRect(object.x, object.y, 20, 20);
    });
  }
};

export const drawFood = (context, pos) => {
  if (context) {
    context.fillStyle = "steelblue";
    context.fillRect(pos.x, pos.y, 20, 20);
  }
};

export const clearBoard = (context) => {
  if (context) {
    context.clearRect(0, 0, 1000, 600);
  }
};

function randomNumber(min, max) {
  let random = Math.random() * max;
  return random - (random % 20);
}

export const generateFoodPosition = (width, height) => {
  return {
    x: randomNumber(0, width),
    y: randomNumber(0, height),
  };
};

export const hasSnakeColided = (snake, headPos) => {
  for (let i = 1; i < snake.length; i++) {
    console.log("first" + snake[i].x === headPos.x && snake[i].y === headPos.y);
    if (snake[i].x === headPos.x && snake[i].y === headPos.y) return i;
  }
  return 0;
};
