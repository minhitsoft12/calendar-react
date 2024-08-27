import { configureStore } from "@reduxjs/toolkit";
import calendarSlice from "@/features/calendar/calendarSlice.ts";

const localStorageMiddleware = ({ getState }) => {
  return (next) => (action) => {
    const result = next(action);
    localStorage.setItem("states_management", JSON.stringify(getState()));
    return result;
  };
};

const reHydrateStore = () => {
  if (localStorage.getItem("states_management") !== null) {
    return JSON.parse(<string>localStorage.getItem("states_management"));
  }
};

export const store = configureStore({
  reducer: {
    calendar: calendarSlice,
  },
  preloadedState: reHydrateStore(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
