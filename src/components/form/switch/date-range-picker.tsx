import React, { useEffect, useRef } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

type Props = {
  setDate: React.Dispatch<React.SetStateAction<{
    startDate: string;
    endDate: string;
  }>>;
};

const DateRangePicker: React.FC<Props> = ({ setDate }) => {
  const datepickerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (datepickerRef.current) {
      const fpInstance = flatpickr(datepickerRef.current, {
        mode: "range",
        dateFormat: "d-m-Y",
        onChange: (selectedDates: Date[]) => {
          const [start, end] = selectedDates;
          setDate((prev) => ({
            ...prev,
           startDate: start ? start.toISOString() : "",
            endDate: end ? end.toISOString() : "",
          }));
        },
      });
    return () => {
      fpInstance.destroy();
    };
    }
  }, [setDate]);

  return (
    <div className="flex flex-col gap-2">
      <input
        id="date-picker"
        ref={datepickerRef}
        placeholder="Pilih Tanggal"
       className="h-11 w-full rounded-lg border appearance-none px-2 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30  bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700  dark:focus:border-brand-800 "
      />
    </div>
  );
};

export default DateRangePicker;
