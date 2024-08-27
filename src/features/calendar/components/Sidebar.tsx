import { ReactElement, RefObject } from "react";
import FullCalendar from "@fullcalendar/react";
import { Button, DatePicker, Flex, Select } from "antd";
import { calendarViews } from "../../../share/utils/constants.ts";
import { useAppDispatch, useAppSelector } from "../../../hooks/storeHook.ts";
import { setViewType } from "../calendarSlice.ts";
import dayjs from "dayjs";

export type TCalendarHeader = {
  calendarRef: RefObject<FullCalendar>;
};

export const Sidebar = ({ calendarRef }: TCalendarHeader): ReactElement => {
  const { viewType } = useAppSelector((state) => state.calendar);
  const dispatch = useAppDispatch();

  const selectViewHandle = (value: string) => {
    const calApi = calendarRef.current?.getApi();
    calApi?.changeView(value);
    calApi?.refetchEvents();
    dispatch(setViewType(value));
  };

  const handleDateChange = (value) => {
    const calApi = calendarRef.current?.getApi();
    calApi?.gotoDate(value.toDate());
  };

  return (
    <Flex
      justify="space-between"
      align="center"
      style={{ margin: "0 auto", maxWidth: "1140px" }}
    >
      <Select
        defaultValue={viewType}
        style={{ width: 120 }}
        onChange={selectViewHandle}
        options={calendarViews}
      />
      <div>
        <DatePicker
          defaultValue={dayjs()}
          onChange={handleDateChange}
          picker={
            viewType === calendarViews[0].value
              ? "date"
              : viewType === calendarViews[1].value
                ? "week"
                : "month"
          }
        />
        <Button
          style={{ marginLeft: "10px" }}
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
          style={{ marginLeft: "10px" }}
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
          style={{ marginLeft: "10px" }}
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
