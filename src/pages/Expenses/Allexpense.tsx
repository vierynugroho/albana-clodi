import { useEffect, useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import TablExpense from "./TableExpense";
import Button from "../../components/ui/button/Button";
import { TbCirclePlus } from "react-icons/tb";
import { DownloadIcon } from "../../icons";
import InfoCard from "./Info_card";
import FormExpense from "./form_expense";
import DatePicker from "../../components/form/date-picker";

interface Expense {
  id: string;
  name: string;
  amount: number;
  date: string;
  quantity: number;
  note: string;
}

export default function AllExpense() {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filterType, setFilterType] = useState<string>("By Date");

  const handleAddExpense = (expense: Expense) => {
    setExpenses((prev) => [...prev, expense]);
  };

  // Hooks for receive screen size
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <PageMeta title="ALBANA GROSIR" description="Expense" />
      <div className="mx-2">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white/90 lg:text-3xl">
          Pengeluaran <i>(Expense)</i>
        </h1>
        <hr className="my-6 border-gray-300 dark:border-gray-700" />
      </div>

      <div className="mx-2">
        <div
          className={`mb-4 flex justify-between items-center ${
            isMobile ? "gap-x-5" : "gap-x-2"
          }`}>
          <form className="flex-1">
            <div className="relative">
              <span className="absolute -translate-y-1/2 pointer-events-auto left-4 top-1/2">
                <svg
                  className="fill-gray-500 dark:fill-gray-400"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                    fill=""
                  />
                </svg>
              </span>
              <input
                // ref={}
                type="text"
                placeholder="Cari data Pengeluaran"
                className="dark:bg-dark-900 h-11 w-1/12 md:w-10/12 rounded-lg border border-gray-200 bg-transparent py-2.5 pl-10 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800  dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 md:pl-12"
              />
            </div>
          </form>
          {/* Button Export expenses */}
          <Button
            size="md"
            variant="outlineblue"
            startIcon={<DownloadIcon className="size-5" />}>
            Export Excel
          </Button>

          {/* Button add Exppenses */}
          <Button
            onClick={() => setShowModal(true)}
            size={isMobile ? "sm" : "md"}
            variant="primary"
            startIcon={<TbCirclePlus className="size-5" />}>
            {!isMobile && "Tambah Pengeluaran"}
          </Button>
        </div>

        <div className="flex gap-3">
          {/* Dropdown Filter Type */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 rounded border border-gray-300 bg-white text-sm">
            <option>By Date</option>
            <option>By Month</option>
          </select>

          {/* Show Date Range if By Date */}
          {filterType === "By Date" && (
            <>
              <DatePicker id="date-picker" placeholder="Select a date" />
              <DatePicker id="date-picker" placeholder="Select a date" />
            </>
          )}

          {/* Show Month Picker if By Month */}
          {filterType === "By Month" && (
            <div className="flex gap-2">
              <select
                className="px-3 py-2 rounded border border-gray-300 bg-white text-sm"
                defaultValue="January">
                <option>January</option>
                <option>February</option>
                <option>March</option>
                <option>April</option>
                <option>May</option>
                <option>June</option>
                <option>July</option>
                <option>August</option>
                <option>September</option>
                <option>October</option>
                <option>November</option>
                <option>December</option>
              </select>
              <select
                className="px-3 py-2 rounded border border-gray-300 bg-white text-sm"
                defaultValue={new Date().getFullYear()}>
                {Array.from(
                  { length: 10 },
                  (_, i) => new Date().getFullYear() - i
                ).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>
      {showModal && (
        <FormExpense
          changeModal={() => setShowModal(false)}
          setExpenses={handleAddExpense}
        />
      )}
      <div>
        <InfoCard />
      </div>

      <div>
        <TablExpense />
      </div>
    </div>
  );
}
