import {ReactElement, useMemo, useRef} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import {CalendarOptions, EventClickArg, EventContentArg,} from "@fullcalendar/core";
import CalenderSidebar from "@/features/calendar/components/CalendarNavbar.tsx";
import {useAppDispatch, useAppSelector} from "@/hooks/storeHook.ts";
import {addEvent, removeEvent, updateEvent,} from "@/features/calendar/calendarSlice";
import {createEventId} from "@/share/utils/calendarEvent.ts";
import {CalendarSidebar} from "@/features/calendar/components/sidebar";
import {calendarViews} from "@/share/utils/constants.ts";

export default function Calendar(): ReactElement {
  const { events, resources, viewType, showWeekends } = useAppSelector(
    (state) => state.calendar,
  );
  const dispatch = useAppDispatch();
  const calendarRef = useRef<FullCalendar | null>(null);

  function handleDateSelect(selectInfo) {
    const title = prompt("Please enter a new title for your event");
    const color = prompt("Please enter color");
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
    if (title) {
      const data = {
        id: createEventId(),
        title,
        start: selectInfo.start.toISOString(),
        end: selectInfo.end.toISOString(),
        ...(selectInfo?.resource?._resource.id
          ? { resourceId: selectInfo?.resource?._resource.id }
          : { resourceIds: resources.map((resource) => resource.id) }),
        allDay: selectInfo.allDay,
        backgroundColor: color,
        color: color,
      };
      dispatch(addEvent(data));
      calendarApi.addEvent(data);
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
  };

  const handleEventChange = (changeInfo) => {
    if (changeInfo.event._def.resourceIds[0]) {
      const data = {
        id: changeInfo.event.id,
        title: changeInfo.event.title,
        start: changeInfo.event.startStr,
        end: changeInfo.event.endStr,
        resourceId: changeInfo.event._def.resourceIds[0],
        allDay: changeInfo.event.allDay,
        backgroundColor: changeInfo.event.backgroundColor,
        color: changeInfo.event.color,
      };
      dispatch(updateEvent(data));
    }
  };

  const calendarOptions = useMemo<CalendarOptions>(() => ({
    schedulerLicenseKey: "GPL-My-Project-Is-Open-Source",
    headerToolbar: false,
    plugins: [
      dayGridPlugin,
      timeGridPlugin,
      interactionPlugin,
      resourceTimeGridPlugin,
    ],
    initialView: viewType,
    datesAboveResources: true,
    editable: true,
    selectable: true,
    dayMaxEventRows: true,
    weekends: showWeekends
  }), [viewType, showWeekends])

  return (
    <div className="flex">
      <div id="displayView" className="calendar-container calendar-mode-vertical display-vertical w-4/5">
        <CalenderSidebar calendarRef={calendarRef}/>
        <div className="wrapper-main-page">
          <div className="view-calendar view-month">
            <div id="fullCalendar" className="full-calendar">
              <div id="fullcalendar_wrapper" className="full-calendar__wrapper">
                <FullCalendar
                  {...calendarOptions}
                  ref={calendarRef}
                  resources={resources}
                  events={events}
                  select={handleDateSelect}
                  eventContent={renderEventContent}
                  eventClick={handleEventClick}
                  eventChange={handleEventChange}
                  eventRemove={handleEventRemove}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sidebar">
        <CalendarSidebar />
      </div>
    </div>
  );
}

function renderEventContent(eventInfo: EventContentArg) {

  return (
    <>
      <div id={eventInfo.event.id}>
        <div>
          <div>{eventInfo.timeText} {eventInfo.event.id}</div>
        </div>
        <div>
          {eventInfo.event.title}
        </div>
      </div>
    </>
  );
}
