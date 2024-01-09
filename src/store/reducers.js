import {
  DOWN,
  LEFT,
  RIGHT,
  SET_DISALLOWED_DIR,
  UP,
  INCREASE_SNAKE,
  CLASSIC_MODE,
  RESET,
  CHANGE_MODE,
  WALL_MODE,
} from "./actions";

const globalState = {
  snake: [
    { x: 580, y: 300 },
    { x: 560, y: 300 },
    { x: 540, y: 300 },
    { x: 520, y: 300 },
    { x: 500, y: 300 },
  ],
  disAllowedDir: "",
  score: 0,
  size: 5,
  mode: CLASSIC_MODE,
};
const gameReducer = (state = globalState, action) => {
  switch (action.type) {
    case RIGHT:
    case LEFT:
    case DOWN:
    case UP: {
      let newSnake = [...state.snake];
      for (let i = state.size - 1; i > 0; i--) {
        newSnake[i] = {
          x: newSnake[i - 1].x,
          y: newSnake[i - 1].y,
        };
      }
      newSnake[0].x += action.payload[0];
      newSnake[0].y += action.payload[1];
      if (state.mode === CLASSIC_MODE) {
        if (newSnake[0].x < 0) newSnake[0].x = 780;
        if (newSnake[0].x >= 800) newSnake[0].x = 0;
        if (newSnake[0].y < 0) newSnake[0].y = 480;
        if (newSnake[0].y >= 500) newSnake[0].x = 0;
      }
      return {
        ...state,
        snake: newSnake,
      };
    }

    case SET_DISALLOWED_DIR:
      return {
        ...state,
        disAllowedDir: action.payload,
      };

    case INCREASE_SNAKE:
      return {
        ...state,
        score: state.score + 1,
        size: state.size + 1,
      };

    case RESET:
      return {
        ...state,
        snake: [
          { x: 580, y: 300 },
          { x: 560, y: 300 },
          { x: 540, y: 300 },
          { x: 520, y: 300 },
          { x: 500, y: 300 },
        ],
        disAllowedDir: "",
        score: 0,
        size: 5,
      };

    case CHANGE_MODE:
      return {
        ...state,
        mode: state.mode == CLASSIC_MODE ? WALL_MODE : CLASSIC_MODE,
      };

    default:
      return state;
  }
};

export default gameReducer;
