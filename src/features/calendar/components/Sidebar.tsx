import {ReactElement, RefObject} from "react";
import FullCalendar from "@fullcalendar/react";
import {Button, DatePicker, Divider, Select, Space, Switch} from "antd";
import {calendarViews} from "@/share/utils/constants.ts";
import {useAppDispatch, useAppSelector} from "@/hooks/storeHook.ts";
import {setShowWeekends, setViewType} from "@/features/calendar/calendarSlice.ts";
import dayjs from "dayjs";

export type TCalendarHeader = {
  calendarRef: RefObject<FullCalendar>;
};

export const Sidebar = ({ calendarRef }: TCalendarHeader): ReactElement => {
  const {viewType, showWeekends} = useAppSelector((state) => state.calendar);
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
    <div className="flex justify-between items-center">
      <Select
        defaultValue={viewType}
        style={{width: 85}}
        onChange={selectViewHandle}
        popupMatchSelectWidth={false}
        options={calendarViews}
        dropdownRender={(menu) => (
          <>
            {menu}
            <Divider style={{margin: '8px 0'}}/>
            <Space style={{padding: '0 8px 4px'}}>
              <Switch size="small" defaultChecked={showWeekends} onChange={(e) => {
                dispatch(setShowWeekends(e))
              }}/> Show weekends
            </Space>
          </>
        )}
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
    </div>
  );
};
