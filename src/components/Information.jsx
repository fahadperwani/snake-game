import React from "react";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { changeMode } from "../store/actions";

function Information({ isGameEnded, resetBoard, gameStarted }) {
  const mode = useSelector((state) => state.mode);
  const score = useSelector((state) => state.score);
  const dispatch = useDispatch();
  return (
    <div className="information">
      <h2>{mode.replace("_", " ")}</h2>
      <button className="play-btn" onClick={resetBoard} disabled={!isGameEnded}>
        ResetBoard
      </button>
      <h3>Score</h3>
      <p className="score">{score}</p>
      <button
        className="change-btn"
        onClick={() => dispatch(changeMode())}
        disabled={gameStarted}
      >
        Change Mode
      </button>
    </div>
  );
}

export default Information;
