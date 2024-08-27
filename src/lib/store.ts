import {configureStore} from "@reduxjs/toolkit";
import calendarSlice from "../features/calendar/calendarSlice.ts";
import {thunk} from "redux-thunk";

export const store = configureStore({
  reducer: {
    calendar: calendarSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
