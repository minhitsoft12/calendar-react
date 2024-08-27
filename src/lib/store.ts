import {configureStore} from "@reduxjs/toolkit";
import calendarSlice from "../features/calendar/calendarSlice.ts";

export const store = configureStore({
  reducer: {
    calendar: calendarSlice,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
