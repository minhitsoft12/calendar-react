import {ReactDatePickerCustomHeaderProps} from "react-datepicker";
import {ReactElement} from "react";
import {months, years} from "@/share/utils/constants";
import {getMonth, getYear} from "date-fns";

const DatePickerHeader = ({
  monthDate,
  changeYear,
  changeMonth,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled
}: ReactDatePickerCustomHeaderProps): ReactElement => {
  return (
    <div className="datepicker-header-custom flex justify-between h-[46px] items-center border-b-[1px_solid_#ebeff3]">
      <div className={`btn btn-ghost p-0 w-[24px] min-h-max h-[24px] --previous v2-btn-default --icon-sm --transparent ${prevMonthButtonDisabled ? "pointer-events-none disabled" : ""}`} onClick={decreaseMonth}>
        <svg width="24" height="24" className="inline" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.5 5.5L8 12L14.5 18.5" stroke="#4D5054" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      </div>
      <div className="flex items-center gap-1">
        <div className="datepicker-header-custom__option --month">
          <select value={months[getMonth(monthDate)]}
                  onChange={({target: {value}}) =>
                    changeMonth(months.indexOf(value))
                  } className="select select-bordered select-xs pr-2 max-w-xs !outline-0 text-[.875rem]">
            {months.map(month => <option key={month}>{month}</option>)}
          </select>
        </div>
        <div className="datepicker-header-custom__option --year">
          <select value={getYear(monthDate)}
                  onChange={({target: {value}}) => changeYear(Number(value))} className="select select-bordered select-xs w-full max-w-xs !outline-0 text-[.875rem]">
            {years.map(year => <option key={year}>{year}</option>)}
          </select>
        </div>
      </div>
      <div className={`btn btn-ghost p-0 w-[24px] min-h-max h-[24px] --next v2-btn-default --icon-sm --transparent ${nextMonthButtonDisabled ? "pointer-events-none disabled" : ""}`} onClick={increaseMonth}>
        <svg width="24" height="24" className="inline" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.5 5.5L16 12L9.5 18.5" stroke="#4D5054" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      </div>
    </div>
  )
}

export default DatePickerHeader;
