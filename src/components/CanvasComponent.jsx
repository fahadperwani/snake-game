import React, { useCallback } from "react";
import { useRef, useEffect, useState } from "react";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import {
  clearBoard,
  drawFood,
  drawSnake,
  generateFoodPosition,
  hasSnakeColided,
} from "../utils";
import {
  makeMove,
  MOVE_LEFT,
  MOVE_RIGHT,
  MOVE_UP,
  MOVE_DOWN,
  increaseSnake,
  stopGame,
  resetGame,
} from "../store/actions";
import Information from "./Information";

function CanvasComponent() {
  const canvasRef = useRef();
  const [context, setContext] = useState(null);
  const snake = useSelector((state) => state.snake);
  const disallowedDir = useSelector((state) => state.disAllowedDir);
  const [food, setFood] = useState(generateFoodPosition(800 - 20, 500 - 20));
  const dispatch = useDispatch();
  const [isConsumed, setIsConsumed] = useState(false);
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const moveSnake = useCallback(
    (dx = 0, dy = 0, ds) => {
      if (dx > 0 && dy === 0 && ds !== "RIGHT") {
        dispatch(makeMove(dx, dy, MOVE_RIGHT));
      }

      if (dx < 0 && dy === 0 && ds !== "LEFT") {
        dispatch(makeMove(dx, dy, MOVE_LEFT));
      }

      if (dx === 0 && dy < 0 && ds !== "UP") {
        dispatch(makeMove(dx, dy, MOVE_UP));
      }

      if (dx === 0 && dy > 0 && ds !== "DOWN") {
        dispatch(makeMove(dx, dy, MOVE_DOWN));
      }
    },
    [dispatch]
  );

  const handleKeyEvents = useCallback(
    (event) => {
      if (disallowedDir) {
        switch (event.key) {
          case "w":
            moveSnake(0, -20, disallowedDir);
            break;
          case "s":
            moveSnake(0, 20, disallowedDir);
            break;
          case "a":
            moveSnake(-20, 0, disallowedDir);
            break;
          case "d":
            event.preventDefault();
            moveSnake(20, 0, disallowedDir);
            break;
        }
      } else {
        if (
          disallowedDir !== "LEFT" &&
          disallowedDir !== "UP" &&
          disallowedDir !== "DOWN" &&
          event.key === "d"
        )
          moveSnake(20, 0, disallowedDir); //Move RIGHT at start
        setGameStarted(true);
      }
    },
    [disallowedDir, moveSnake]
  );

  const resetBoard = useCallback(() => {
    window.removeEventListener("keypress", handleKeyEvents);
    dispatch(resetGame());
    clearBoard(context);
    drawSnake(context, snake);
    drawFood(context, [generateFoodPosition(500 - 20, 800 - 20)]);
    setIsGameEnded(false);
    window.addEventListener("keypress", handleKeyEvents);
  }, [context, dispatch, handleKeyEvents, snake]);

  useEffect(() => {
    setContext(canvasRef.current && canvasRef.current.getContext("2d"));
    clearBoard(context);
    if (snake[0].x == food.x && snake[0].y == food.y) setIsConsumed(true);
    const index = hasSnakeColided(snake, snake[0]);
    if (
      index !== 0 ||
      snake[0].x < 0 ||
      snake[0].y < 0 ||
      snake[0].x >= 800 ||
      snake[0].y >= 500
    ) {
      dispatch(stopGame());
      setIsGameEnded(true);
      setGameStarted(false);
    }
    drawFood(context, food, isGameEnded);
    drawSnake(context, snake, isGameEnded, index);
  }, [context, snake]);

  useEffect(() => {
    if (isConsumed) {
      setFood(generateFoodPosition(800 - 20, 500 - 20));
      setIsConsumed(false);
      dispatch(increaseSnake());
    }
  }, [isConsumed, food]);

  useEffect(() => {
    window.addEventListener("keypress", handleKeyEvents);

    return () => window.removeEventListener("keypress", handleKeyEvents);
  }, [disallowedDir, handleKeyEvents]);

  return (
    <>
      <canvas
        height={500}
        width={800}
        style={{ border: `8px solid ${isGameEnded ? "red" : "black"}` }}
        ref={canvasRef}
      ></canvas>
      <Information
        resetBoard={resetBoard}
        isGameEnded={isGameEnded}
        gameStarted={gameStarted}
      />
    </>
  );
}

export default CanvasComponent;
