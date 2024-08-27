import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EventInput } from "@fullcalendar/core";
import { ResourceSourceInput } from "@fullcalendar/resource";
import { INITIAL_EVENTS } from "../../share/utils/calendarEvent.ts";

interface CalendarSlice {
  events: EventInput[];
  resources: ResourceSourceInput;
}

const initialState: CalendarSlice = {
  events: INITIAL_EVENTS,
  resources: [{ id: "invoice", title: "Invoice" }],
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<EventInput>) => {
      state.events.push(action.payload);
    },
    setEvents: (state, action: PayloadAction<EventInput[]>) => {
      state.events = action.payload
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

export const { addEvent, removeEvent, setEvents, updateEvent } = calendarSlice.actions;

export default calendarSlice.reducer;
