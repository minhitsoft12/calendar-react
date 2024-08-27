import {ReactElement, useRef} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import {
  DateSelectArg,
  EventClickArg,
  EventContentArg,
} from "@fullcalendar/core";
import { Sidebar } from "./components/Sidebar.tsx";
import {useAppDispatch, useAppSelector} from "../../hooks/storeHook.ts";
import {addEvent} from "../../features/calendar/calendarSlice.ts";

export default function Calendar(): ReactElement {
  const { events, resources } = useAppSelector(state => state.calendar);
  const dispatch = useAppDispatch();
  const calendarRef = useRef<FullCalendar>(null);

  function handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect();

    if (title) {
      dispatch(addEvent({
        title,
        start: selectInfo.start,
        end: selectInfo.end,
        startStr: selectInfo.startStr,
        endStr: selectInfo.endStr,
        allDay: selectInfo.allDay,
      }))
    }
  }

  function handleEventClick(clickInfo: EventClickArg) {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`,
      )
    ) {
      clickInfo.event.remove();
    }
  }

  // function handleEvents(events: EventApi[]): void {
  //   setCurrentEvents(events);
  // }

  return (
    <div className="demo-app">
      <Sidebar calendarRef={calendarRef} />
      <div className="demo-app-main">
        <FullCalendar
          schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
          ref={calendarRef}
          // headerToolbar={false}
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            resourceTimeGridPlugin,
          ]}
          resources={resources}
          editable={true}
          selectable={true}
          events={events}
          weekends
          select={handleDateSelect}
          eventContent={renderEventContent}
          eventClick={handleEventClick}

        />
      </div>
    </div>
  );
}

function renderEventContent(eventInfo: EventContentArg) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}
