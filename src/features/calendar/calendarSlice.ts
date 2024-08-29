import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {EventInput} from "@fullcalendar/core";
import {ResourceInput} from "@fullcalendar/resource";
import {calendarViews} from "@/share/utils/constants.ts";

interface CalendarSlice {
  viewType: string;
  events: EventInput[];
  externalEvents: EventInput[];
  resources: ResourceInput[];
  showWeekends: boolean;
}

const initialState: CalendarSlice = {
  viewType: calendarViews[1].value,
  events: [],
  externalEvents: [],
  resources: [
    { id: "invoice1", title: "Invoice 1" },
    { id: "invoice2", title: "Invoice 2" },
  ],
  showWeekends: true
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<EventInput>) => {
      state.events.push(action.payload);
    },
    updateEvent: (state, action: PayloadAction<EventInput>) => {
      const eventId = action.payload.id;
      if (eventId) {
        const index = state.events.findIndex(({ id }) => id === eventId);
        state.events[index] = action.payload;
      }
    },
    removeEvent: (state, action: PayloadAction<string>) => {
      state.events.splice(
        state.events.findIndex((event) => action.payload === event.id),
        1,
      );
    },
    setViewType: (state, action: PayloadAction<string>) => {
      state.viewType = action.payload;
    },
    setShowWeekends: (state, action: PayloadAction<boolean>) => {
      state.showWeekends = action.payload;
    },
  },
});

export const { addEvent, removeEvent, updateEvent, setViewType, setShowWeekends } =
  calendarSlice.actions;

export default calendarSlice.reducer;
