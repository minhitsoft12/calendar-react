import {createSlice} from "@reduxjs/toolkit";
import {EventApi} from "@fullcalendar/core";
import {ResourceSourceInput} from "@fullcalendar/resource";

interface CalendarSlice {
  events: EventApi[];
  resources: ResourceSourceInput
}

const initialState: CalendarSlice = {
  events: [],
  resources: []
}

const CalendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {

  }
})
