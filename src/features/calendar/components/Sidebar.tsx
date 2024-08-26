import { ReactElement, RefObject, useState } from "react";
import FullCalendar from "@fullcalendar/react";

import moment from "moment";
import {Button, DatePicker, Flex, Select} from "antd";

const { RangePicker } = DatePicker;
export type TCalendarHeader = {
  calendarRef: RefObject<FullCalendar>;
};

const calendarViews = [
  {
    label: "Day",
    value: "resourceTimeGridDay",
  },
  {
    label: "Week",
    value: "resourceTimeGridWeek",
  }
];

const dateFormat = 'YYYY-MM-DD';

export const Sidebar = ({ calendarRef }: TCalendarHeader): ReactElement => {
  const [view, setView] = useState<string>(calendarViews[1].value);

  const selectViewHandle = (value: string) => {
    const calApi = calendarRef.current?.getApi();
    calApi?.changeView(value);
    setView(value);
  };

  const handleDateChange = (values): void => {
    console.log(moment(values[0].$d).format(dateFormat))
    const calApi = calendarRef.current?.getApi();

    // TODO: Not working yet
    calApi?.changeView(view, {
      start: moment(values[0].$d).format(dateFormat),
      end: moment(values[1].$d).format(dateFormat),
    });
  };

  return (
    <Flex justify="space-between" align="center" style={{margin: "0 auto", maxWidth: "1140px"}}>
        <Select
          defaultValue={view}
          style={{ width: 120 }}
          onChange={selectViewHandle}
          options={calendarViews}
        />
        <div>
          <RangePicker onChange={handleDateChange} />
          <Button
            style={{marginLeft: "10px"}}
            onClick={() => {
              const calApi = calendarRef.current?.getApi();
              if (calApi) {
                calApi.prev();
              }
            }}
          >
            Prev
          </Button>
          <Button
            style={{marginLeft: "10px"}}
            onClick={() => {
              const calApi = calendarRef.current?.getApi();
              if (calApi) {
                calApi.today();
              }
            }}
          >
            Today
          </Button>
          <Button
            style={{marginLeft: "10px"}}
            onClick={() => {
              const calApi = calendarRef.current?.getApi();
              if (calApi) {
                calApi.next();
              }
            }}
          >
            Next
          </Button>
        </div>
    </Flex>
  );
};
