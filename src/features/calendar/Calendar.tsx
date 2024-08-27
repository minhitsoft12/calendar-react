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
import {calendarViews, Sidebar} from "./components/Sidebar.tsx";
import {useAppDispatch, useAppSelector} from "../../hooks/storeHook.ts";
import {addEvent, removeEvent, updateEvent} from "../../features/calendar/calendarSlice.ts";
import {createEventId} from "../../share/utils/calendarEvent.ts";

export default function Calendar(): ReactElement {
  const { events, resources } = useAppSelector(state => state.calendar);
  const dispatch = useAppDispatch();
  const calendarRef = useRef<FullCalendar>(null);

  function handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();

    if (title) {
      const data = {
        id: createEventId(),
        title,
        start: selectInfo.start.toISOString(),
        end: selectInfo.end.toISOString(),
        resourceId: selectInfo.resource._resource.id,
        allDay: selectInfo.allDay
      }
      dispatch(addEvent(data))
      calendarApi.addEvent(data)
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

  const handleEventRemove = (removeInfo) => {
    dispatch(removeEvent(removeInfo.event.id));
  }

  const handleEventChange = (changeInfo) => {
    dispatch(updateEvent(changeInfo.event.toPlainObject()))
  }


  return (
    <div className="demo-app">
      <Sidebar calendarRef={calendarRef} />
      <div className="demo-app-main">
        <FullCalendar
          schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
          ref={calendarRef}
          headerToolbar={false}
          initialView={calendarViews[1].value}
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            resourceTimeGridPlugin,
          ]}
          datesAboveResources={true}
          resources={resources}
          editable={true}
          selectable={true}
          events={events}
          weekends={false}
          select={handleDateSelect}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          eventChange={handleEventChange} // called for drag-n-drop/resize
          eventRemove={handleEventRemove}
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
