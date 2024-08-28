import FullCalendar from "@fullcalendar/react";
import {CalendarOptions} from "@fullcalendar/core";
import {useAppSelector} from "@/hooks/storeHook";
import listPlugin from "@fullcalendar/list";

const optionListView: CalendarOptions = {
  initialView: 'listWeek',
  plugins: [listPlugin],
  views: {
    listDay: {buttonText: 'list day'},
    listWeek: {buttonText: 'list week'},
    listMonth: {buttonText: 'list month'}
  },
}

export const CalendarSidebar = () => {
  const events = useAppSelector(state => state.calendar.events);

  return <><FullCalendar {...optionListView} events={events}/></>
}
