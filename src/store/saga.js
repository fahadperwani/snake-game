import {
  MOVE_RIGHT,
  MOVE_DOWN,
  MOVE_LEFT,
  MOVE_UP,
  setDisAllowedDir,
  RIGHT,
  LEFT,
  UP,
  DOWN,
  STOP_GAME,
} from "./actions";
import {
  CallEffect,
  delay,
  put,
  PutEffect,
  takeLatest,
} from "redux-saga/effects";

export function* moveSaga(params) {
  while (true) {
    //dispatches movement actions
    yield put({
      type: params.type.split("_")[1],
      payload: params.payload,
    });

    //Dispatches SET_DIS_DIRECTION action
    switch (params.type.split("_")[1]) {
      case RIGHT:
        yield put(setDisAllowedDir(LEFT));
        break;

      case LEFT:
        yield put(setDisAllowedDir(RIGHT));
        break;

      case UP:
        yield put(setDisAllowedDir(DOWN));
        break;

      case DOWN:
        yield put(setDisAllowedDir(UP));
        break;
    }
    yield delay(100);
  }
}

function* watcherSagas() {
  yield takeLatest(
    [MOVE_RIGHT, MOVE_LEFT, MOVE_UP, MOVE_DOWN, STOP_GAME],
    moveSaga
  );
}

export default watcherSagas;
