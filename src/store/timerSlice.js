import { createSlice } from "@reduxjs/toolkit";

const timerSlice = createSlice({
  name: "timer",
  initialState: {
    breakLength: 5,
    sessionLength: 25,
    isRunning: false,
    currentTime: 1500, // 25 minutes in seconds
    mode: "session", // 'session' or 'break'
    shouldBeep: false,
  },
  reducers: {
    incrementBreak: (state) => {
      if (state.breakLength < 60) state.breakLength += 1;
    },
    decrementBreak: (state) => {
      if (state.breakLength > 1) state.breakLength -= 1;
    },
    incrementSession: (state) => {
      if (state.sessionLength < 60) state.sessionLength += 1;
      state.currentTime = state.sessionLength * 60;
    },
    decrementSession: (state) => {
      if (state.sessionLength > 1) state.sessionLength -= 1;
      state.currentTime = state.sessionLength * 60;
    },
    reset: (state) => {
      state.breakLength = 5;
      state.sessionLength = 25;
      state.isRunning = false;
      state.currentTime = 1500;
      state.mode = "session";
    },
    startStop: (state) => {
      state.isRunning = !state.isRunning;
    },
    tick: (state) => {
      if (state.isRunning) {
        if (state.currentTime > 0) {
          state.currentTime -= 1;
          state.shouldBeep = false;
        } else {
          state.mode = state.mode === "session" ? "break" : "session";
          state.currentTime =
            state.mode === "session"
              ? state.sessionLength * 60
              : state.breakLength * 60;
          state.shouldBeep = true;
        }
      }
    },
  },
});

export const {
  incrementBreak,
  decrementBreak,
  incrementSession,
  decrementSession,
  reset,
  startStop,
  tick,
} = timerSlice.actions;

export default timerSlice.reducer;
