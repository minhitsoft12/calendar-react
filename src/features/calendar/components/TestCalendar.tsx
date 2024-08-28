import {ReactElement, RefObject, useMemo, useState} from "react";
import FullCalendar from "@fullcalendar/react";
import {Divider, Select, Space, Switch} from "antd";
import {calendarViews} from "@/share/utils/constants.ts";
import {useAppDispatch, useAppSelector} from "@/hooks/storeHook.ts";
import {setShowWeekends, setViewType} from "@/features/calendar/calendarSlice.ts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {format} from "date-fns";

export type TCalendarHeader = {
  calendarRef: RefObject<FullCalendar>;
};

export const CustomDatePicker = ({calendarRef}: TCalendarHeader): ReactElement => {
  const {viewType, showWeekends} = useAppSelector((state) => state.calendar);
  const [dateSelected, setDateSelected] = useState<Date>(new Date());
  const dispatch = useAppDispatch();

  const selectViewHandle = (value: string) => {
    return () => {
      const calApi = calendarRef.current?.getApi();
      calApi?.changeView(value);
      calApi?.refetchEvents();
      dispatch(setViewType(value));
    }
  };

  const handleDateChange = (value) => {
    setDateSelected(value);
    const calApi = calendarRef.current?.getApi();
    calApi?.gotoDate(value);
  };

  const dateFormat = useMemo(() => {
    return format(dateSelected, "MMMM d, yyyy")
  }, [dateSelected])

  const viewTypeLabel = useMemo(() => calendarViews.find(view => view.value === viewType)?.label ?? "Calendar view", [viewType])

  return (
    <div className="navbar -mx-2">
      <div className="navbar-start">
        <div className="dropdown dropdown-bottom">
          <div tabIndex={0} role="button" className="btn btn-outline font-normal btn-sm w-[90px] px-2">{viewTypeLabel}
            <svg width="6" height="3" className="ml-2 overflow-visible" aria-hidden="true">
              <path d="M0 0L3 3L6 0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </div>
          <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[10] w-[190px] text-sm p-2 shadow">
            {calendarViews.map(item => <li className={`m-0${viewType === item.value ? " bg-[#fff5d9]" : " "}`} key={item.value}><a onClick={selectViewHandle(item.value)}>{item.label}</a></li>)}
            <Divider style={{margin: '8px 0'}}/>
            <Space style={{padding: '0 8px 4px'}}>
              <Switch size="small" defaultChecked={showWeekends} onChange={(e) => {
                dispatch(setShowWeekends(e))
              }}/> Show weekends
            </Space>
          </ul>
        </div></div>
      <div className="navbar-center">
        <div className="join">
          <button className="btn join-item btn-outline font-normal btn-sm" onClick={() => {
            const calApi = calendarRef.current?.getApi();
            if (calApi) {
              calApi.prev();
            }
          }}>
            <svg className="h-6 w-6 fill-current md:h-8 md:w-8" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"></path>
            </svg>
          </button>
          <button className="btn join-item btn-outline font-normal btn-sm" onClick={() => {
            const calApi = calendarRef.current?.getApi();
            if (calApi) {
              calApi.today();
            }
          }}>Today
          </button>
          <div className="dropdown dropdown-bottom join-item">
            <div tabIndex={0} role="button" className="btn btn-outline font-normal btn-sm join-item">{dateFormat}</div>
            <div tabIndex={0} className="dropdown-content bg-base-100 rounded-box z-[10] p-2 shadow">
              {viewType === calendarViews[0].value
                ? <DatePicker inline onChange={handleDateChange} monthsShown={2} selected={dateSelected} startDate={dateSelected} calendarClassName="outline"/> :
                <DatePicker inline monthsShown={2} startDate={dateSelected} selectsRange={true}/>}
            </div>
          </div>
          <button className="btn join-item btn-outline font-normal btn-sm" onClick={() => {
            const calApi = calendarRef.current?.getApi();
            if (calApi) {
              calApi.next();
            }
          }}>
            <svg className="h-6 w-6 fill-current md:h-8 md:w-8" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path>
            </svg>
          </button>
        </div>
      </div>
      <div className="navbar-end"></div>
    </div>
  );
};
