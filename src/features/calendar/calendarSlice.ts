import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EventInput } from "@fullcalendar/core";
import { ResourceSourceInput } from "@fullcalendar/resource";
import { createEventId } from "../../share/utils/calendarEvent.ts";

interface CalendarSlice {
  events: EventInput[];
  resources: ResourceSourceInput;
}

type EventApiNew = Omit<EventInput, "id">;

const initialState: CalendarSlice = {
  events: [],
  resources: [{ title: "Invoice" }],
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<EventApiNew>) => {
      const eventId = createEventId();
      const newEvent = {
        id: eventId,
        ...action.payload,
      };
      state.events.push(newEvent);
    },
    removeEvent: (state, action: PayloadAction<string>) => {
      state.events.splice(
        state.events.findIndex((event) => action.payload === event.id),
        1,
      );
    },
  },
  // extraReducers: (builder) => {
  //   builder.addMatcher((action) => action.type === addEvent, (state, action: PayloadAction<EventApiNew>) => {
  //     const eventId = createEventId();
  //     const newEvent = {
  //       id: eventId,
  //       ...action.payload,
  //     }
  //     state.events.push(newEvent)
  //   })
  // }
});

export const { addEvent, removeEvent } = calendarSlice.actions;

export default calendarSlice.reducer;
