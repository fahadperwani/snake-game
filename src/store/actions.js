export const MOVE_RIGHT = "MOVE_RIGHT";
export const MOVE_LEFT = "MOVE_LEFT";
export const MOVE_UP = "MOVE_UP";
export const MOVE_DOWN = "MOVE_DOWN";
export const SET_DISALLOWED_DIR = "SET_DISALLOWED_DIR";
export const INCREASE_SNAKE = "INCREASE_SNAKE";
export const STOP_GAME = "STOP_GAME";
export const CHANGE_MODE = "CHANGE_MODE";
export const CLASSIC_MODE = "CLASSIC_MODE";
export const WALL_MODE = "WALL_MODE";

export const RIGHT = "RIGHT";
export const LEFT = "LEFT";
export const UP = "UP";
export const DOWN = "DOWN";
export const RESET = "RESET";

export const makeMove = (x, y, direction) => {
  return {
    type: direction,
    payload: [x, y],
  };
};

export const setDisAllowedDir = (direction) => ({
  type: SET_DISALLOWED_DIR,
  payload: direction,
});

export const increaseSnake = () => ({
  type: INCREASE_SNAKE,
});

export const stopGame = () => ({
  type: STOP_GAME,
});

export const resetGame = () => ({
  type: RESET,
});

export const changeMode = () => ({
  type: CHANGE_MODE,
});
