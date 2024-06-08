import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementBreak,
  decrementBreak,
  incrementSession,
  decrementSession,
  reset,
  startStop,
  tick,
} from "./store/timerSlice";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const {
    breakLength,
    sessionLength,
    isRunning,
    currentTime,
    mode,
    shouldBeep,
  } = useSelector((state) => state.timer);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        dispatch(tick());
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning, dispatch]);

  useEffect(() => {
    const beepAudio = document.getElementById("beep");
    if (shouldBeep) {
      beepAudio.play();
    }
  }, [shouldBeep]);

  const handleReset = () => {
    dispatch(reset());
    const beepAudio = document.getElementById('beep');
    beepAudio.pause();
    beepAudio.currentTime = 0;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  return (
    <>
      <div id="container">
        <h1>25 + 5 Clock</h1>
        <div className="controls-container">
          <div className="controls break">
            <div id="break-label">Break Length</div>
            <div>
              <button
                className="btn-level"
                id="break-decrement"
                onClick={() => dispatch(decrementBreak())}
              >
                <i className="fa fa-arrow-down fa-1x"></i>
              </button>
              <span id="break-length" className="indicator">
                {breakLength}
              </span>
              <button
                className="btn-level"
                id="break-increment"
                onClick={() => dispatch(incrementBreak())}
              >
                <i className="fa fa-arrow-up fa-1x"></i>
              </button>
            </div>
          </div>
          <div className="controls session">
            <div id="session-label">Session Length</div>
            <div>
              <button
                className="btn-level"
                id="session-decrement"
                onClick={() => dispatch(decrementSession())}
              >
                <i className="fa fa-arrow-down fa-1x"></i>
              </button>
              <span id="session-length" className="indicator">
                {sessionLength}
              </span>
              <button
                className="btn-level"
                id="session-increment"
                onClick={() => dispatch(incrementSession())}
              >
                <i className="fa fa-arrow-up fa-1x"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="timer-display">
          <h4 id="timer-label">{mode === "session" ? "Session" : "Break"}</h4>
          <div className="time-left" id="time-left">
            {formatTime(currentTime)}
          </div>
          <audio className="clip" id="beep" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"></audio>
        </div>
        <div className="timer-control">
          <button id="start_stop" onClick={() => dispatch(startStop())}>
            <i className="fa fa-play fa-1x"></i>
            <i className="fa fa-pause fa-1x"></i>
          </button>
          <button id="reset" onClick={handleReset}>
            <i className="fa fa-refresh fa-1x"></i>
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
