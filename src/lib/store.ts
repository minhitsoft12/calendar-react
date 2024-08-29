import {configureStore} from "@reduxjs/toolkit";
import calendarSlice from "@/features/calendar/calendarSlice.ts";
import {initData} from "@/share/utils/calendarEvent.ts";
import {calendarViews} from "@/share/utils/constants.ts";

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
  } else {
    console.log("initial data")
    const initDataEvents = initData()
    const dataCalendarInit = {
      calendar: {
        ...initDataEvents,
        viewType: calendarViews[1].value,
        resources: [
          {id: "invoice1", title: "Invoice 1"},
          {id: "invoice2", title: "Invoice 2"},
        ],
        showWeekends: true
      }
    }
    localStorage.setItem("states_management", JSON.stringify(dataCalendarInit))

    return dataCalendarInit
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
