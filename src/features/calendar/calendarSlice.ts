import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EventInput } from "@fullcalendar/core";
import {ResourceInput} from "@fullcalendar/resource";
import { INITIAL_EVENTS } from "../../share/utils/calendarEvent.ts";

interface CalendarSlice {
  events: EventInput[];
  resources:  ResourceInput[];
}

const initialState: CalendarSlice = {
  events: INITIAL_EVENTS,
  resources: [{ id: "invoice1", title: "Invoice 1" }, { id: "invoice2", title: "Invoice 2" }, { id: "invoice3", title: "Invoice 3" }],
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    hydrate:(_state, action) => {
      return action.payload
    },
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
  }
});

export const { addEvent, removeEvent, hydrate, updateEvent } = calendarSlice.actions;

export default calendarSlice.reducer;
