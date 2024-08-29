import {useAppSelector} from "@/hooks/storeHook";
import {forwardRef, useEffect, useRef} from "react";
import {Draggable} from "@fullcalendar/interaction"
import {dateFormat} from "@/share/utils/constants.ts";

interface Props {

}

interface ComponentRef {

}

export const CalendarSidebar = forwardRef<Props, ComponentRef>(({}, ref) => {
  const externalEvents = useAppSelector(state => state.calendar.externalEvents);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      let draggableEl = document.getElementById("external-events");
      if (draggableEl) {
        new Draggable(draggableEl, {
          itemSelector: ".fc-event",
          eventData: function (eventEl) {
            const id = eventEl.dataset.id;
            const title = eventEl.getAttribute("title");
            const color = eventEl.dataset.color;
            const backgroundColor = eventEl.dataset.backgroundcolor;
            const custom = eventEl.dataset.custom;

            return {
              id,
              title,
              color,
              backgroundColor,
              custom,
              create: true
            };
          }
        });
      }
    }
  }, []);

  return <div className="p-2">
    <h5 className="text-3xl font-semibold">Jobs list</h5>
    <div id="external-events" className="external-events">
      {externalEvents.map((event) => (
        <div
          className="fc-event fc-h-event mb-1 fc-daygrid-event fc-daygrid-block-event p-2"
          title={event.title}
          data-id={event.id}
          data-color={event.color}
          data-backgroundcolor={event.backgroundColor}
          data-custom={event.custom}
          key={event.id}
          style={{
            backgroundColor: event.backgroundColor,
            borderColor: event.color,
            borderWidth: "0 0 0 3px",
            cursor: "pointer"
          }}
        >
          <div className="fc-event-main">
            <div className="min-h-[50px]">
              <p>{new Date(event.start).toLocaleDateString()} - {new Date(event.end).toLocaleDateString()}</p>
              <strong>{event.title}</strong>
            </div>
            {event.custom}
          </div>
        </div>
      ))}
    </div>
  </div>
})
