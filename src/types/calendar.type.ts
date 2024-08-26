import {DateInput} from "@fullcalendar/core";

export interface Calendar {}

export interface CalenderEvent {
  id: number;
  start: DateInput;
  title: string;
}
