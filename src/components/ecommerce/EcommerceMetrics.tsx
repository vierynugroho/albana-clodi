import { TbPackageExport } from "react-icons/tb";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BoxIconLine,
  DollarLineIcon,
  // GroupIcon,
} from "../../icons";
import Badge from "../ui/badge/Badge";
import { FaCalendar } from "react-icons/fa";

export default function EcommerceMetrics() {
  const metrics = [
    {
      label: "Laba Kotor",
      value: "Rp4,96jt",
      change: 8.2,
      trend: "up",
      icon: (
        <DollarLineIcon className="text-gray-800 size-6 dark:text-white/90" />
      ),
    },
    {
      label: "Item Terjual",
      value: 413,
      change: 3.5,
      trend: "up",
      icon: (
        <TbPackageExport className="text-gray-800 size-6 dark:text-white/90" />
      ),
    },
    {
      label: "Order Belum Diproses",
      value: 27,
      change: "",
      trend: "",
      icon: <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />,
    },
    {
      label: "Order Hari Ini",
      value: 92,
      change: 2.3,
      trend: "down",
      icon: <FaCalendar className="text-gray-800 size-6 dark:text-white/90" />,
    },
  ];
  return (
    // <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
    //   {/* <!-- Metric Item Start --> */}
    //   <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
    //     <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
    //       <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
    //     </div>

    //     <div className="flex items-end justify-between mt-5">
    //       <div>
    //         <span className="text-sm text-gray-500 dark:text-gray-400">
    //           Customers
    //         </span>
    //         <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
    //           3,782
    //         </h4>
    //       </div>
    //       <Badge color="success">
    //         <ArrowUpIcon />
    //         11.01%
    //       </Badge>
    //     </div>
    //   </div>
    //   {/* <!-- Metric Item End --> */}

    //   {/* <!-- Metric Item Start --> */}
    //   <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
    //     <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
    //       <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />
    //     </div>
    //     <div className="flex items-end justify-between mt-5">
    //       <div>
    //         <span className="text-sm text-gray-500 dark:text-gray-400">
    //           Orders
    //         </span>
    //         <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
    //           5,359
    //         </h4>
    //       </div>

    //       <Badge color="error">
    //         <ArrowDownIcon />
    //         9.05%
    //       </Badge>
    //     </div>
    //   </div>
    //   {/* <!-- Metric Item End --> */}
    // </div>

    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 md:gap-6">
      {metrics.map((item) => (
        <div
          key={item.label}
          className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 
                  dark:border-gray-800 dark:bg-white/[0.03] md:p-6 shadow-md">
          {/* Content */}
          <div className="relative z-10">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
              {item.icon}
            </div>

            <div className="flex items-end justify-between mt-5">
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {item.label}
                </span>
                <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                  {item.label === "Laba Kotor"
                    ? `Rp ${item.value.toLocaleString("id-ID")}`
                    : item.value.toLocaleString()}
                </h4>
              </div>
              <Badge color={item.trend === "up" ? "success" : "error"}>
                {item.trend === "up" ? <ArrowUpIcon /> : <ArrowDownIcon />}
                {item.change}%
              </Badge>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
