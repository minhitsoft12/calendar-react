import range from "lodash/range";
import {getYear} from "date-fns";

export const calendarViews = [
  {
    label: "Day",
    value: "resourceTimeGridDay",
  },
  {
    label: "Week",
    value: "resourceTimeGridWeek",
  },
  {
    label: "Month",
    value: "dayGridMonth",
  },
];

export const dateFormat = "YYYY-MM-DD";

export const years = range(2014, getYear(new Date()) + 20, 1);
export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
